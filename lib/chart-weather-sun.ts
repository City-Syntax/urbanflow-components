import { carpet, groupBy, monthLabel, round, type Built, type Cell, } from '@/lib/chart-weather-chart-data';
import type { Hours } from '@/lib/chart-weather-types';
const RAD = Math.PI / 180;
export function carpetRadiation(hours: Hours): Built {
    return carpet(hours, hours.ghi, 'Wh/m²', 'global horizontal radiation');
}
export function sunPath(hours: Hours): Built {
    const rows: number[][] = [];
    for (let i = 0; i < hours.length; i++) {
        const altitude = hours.sunAltitude[i];
        const azimuth = hours.sunAzimuth[i];
        const dryBulb = hours.dryBulb[i];
        if (altitude == null || azimuth == null || dryBulb == null)
            continue;
        if (altitude <= 0)
            continue;
        rows.push([round(azimuth, 1), round(altitude, 1), round(dryBulb, 1)]);
    }
    return rows.length === 0
        ? {
            problem: 'No hour in this file has both the sun above the horizon and a dry bulb reading.',
        }
        : { columns: ['azimuth', 'altitude', '°C'], rows };
}
const FACINGS: readonly (readonly [
    string,
    number
])[] = [
    ['N', 0],
    ['NE', 45],
    ['E', 90],
    ['SE', 135],
    ['S', 180],
    ['SW', 225],
    ['W', 270],
    ['NW', 315],
];
export function facadeBeam(hours: Hours): Built {
    const summer = new Map<string, number>();
    const winter = new Map<string, number>();
    let beam = false;
    let daylight = false;
    for (let i = 0; i < hours.length; i++) {
        const altitude = hours.sunAltitude[i];
        const azimuth = hours.sunAzimuth[i];
        const dni = hours.dni[i];
        const month = hours.month[i];
        if (altitude == null || azimuth == null || dni == null || month == null)
            continue;
        beam = true;
        if (altitude <= 0)
            continue;
        daylight = true;
        const warm = month >= 5 && month <= 9;
        const cold = month <= 3 || month >= 11;
        if (!warm && !cold)
            continue;
        const into = warm ? summer : winter;
        for (const [name, facing] of FACINGS) {
            const cosine = Math.cos(altitude * RAD) * Math.cos((azimuth - facing) * RAD);
            if (cosine <= 0)
                continue;
            into.set(name, (into.get(name) ?? 0) + cosine * dni);
        }
    }
    if (!beam) {
        return { problem: 'This file carries no direct normal radiation readings.' };
    }
    if (!daylight) {
        return {
            problem: 'The sun is never above the horizon in this file, so no facade receives any beam.',
        };
    }
    return {
        columns: ['facing', 'summer', 'winter'],
        rows: FACINGS.map(([name]) => [
            name,
            round((summer.get(name) ?? 0) / 1000),
            round((winter.get(name) ?? 0) / 1000),
        ]),
    };
}
export function skyCover(hours: Hours): Built {
    const rows: Cell[][] = [];
    let any = false;
    for (const [month, indices] of groupBy(hours.month)) {
        let clear = 0;
        let overcast = 0;
        let counted = 0;
        for (const i of indices) {
            const cover = hours.opaqueSkyCover[i];
            if (cover == null)
                continue;
            counted++;
            if (cover <= 2)
                clear++;
            if (cover >= 8)
                overcast++;
        }
        if (counted === 0)
            continue;
        any = true;
        rows.push([monthLabel(month), clear, overcast]);
    }
    return any
        ? { columns: ['month', 'clear', 'overcast'], rows }
        : { problem: 'This file carries no opaque sky cover readings.' };
}
