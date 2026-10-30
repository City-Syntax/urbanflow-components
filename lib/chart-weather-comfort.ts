import { days, groupBy, mean, monthLabel, round, type Built, type Cell, } from '@/lib/chart-weather-chart-data';
import type { Hours } from '@/lib/chart-weather-types';
export function psychrometric(hours: Hours): Built {
    const cells = new Map<string, [
        number,
        number,
        number
    ]>();
    for (let i = 0; i < hours.length; i++) {
        const dryBulb = hours.dryBulb[i];
        const ratio = hours.humidityRatio[i];
        if (dryBulb == null || ratio == null)
            continue;
        const x = Math.round(dryBulb);
        const y = Math.round(ratio * 1000);
        const key = `${x},${y}`;
        const found = cells.get(key);
        if (found)
            found[2]++;
        else
            cells.set(key, [x, y, 1]);
    }
    return cells.size === 0
        ? {
            problem: 'This file carries no moisture readings, so its hours cannot be binned.',
        }
        : { columns: ['°C', 'g/kg', 'hours'], rows: [...cells.values()] };
}
const PREVAILING_DAYS = 30;
export function adaptiveBand(hours: Hours): Built {
    const daily = days(hours);
    const rows: Cell[][] = [];
    for (let d = 0; d < daily.length; d++) {
        const day = daily[d];
        if (!day)
            continue;
        const window = daily.slice(Math.max(0, d - PREVAILING_DAYS), d);
        if (window.length === 0)
            continue;
        const prevailing = mean(window.map((previous) => previous.mean));
        if (prevailing < 10 || prevailing > 33.5)
            continue;
        const comfort = 0.31 * prevailing + 17.8;
        rows.push([
            day.dayOfYear,
            round(day.mean, 1),
            round(comfort + 3.5, 1),
            round(comfort - 3.5, 1),
        ]);
    }
    return rows.length === 0
        ? {
            problem: 'No run of thirty days in this file has a mean between 10 and 33.5 °C, which is the range the adaptive model is defined over.',
        }
        : {
            columns: ['day of year', 'outdoor mean', 'upper 80%', 'lower 80%'],
            rows,
        };
}
export function nightPurge(hours: Hours): Built {
    const rows: Cell[][] = [];
    let any = false;
    for (const [month, indices] of groupBy(hours.month)) {
        let purge = 0;
        let counted = 0;
        for (const i of indices) {
            const hour = hours.hourOfDay[i];
            const dryBulb = hours.dryBulb[i];
            if (hour == null || dryBulb == null)
                continue;
            if (hour < 22 && hour >= 6)
                continue;
            counted++;
            if (dryBulb < 20)
                purge++;
        }
        if (counted === 0)
            continue;
        any = true;
        rows.push([monthLabel(month), purge]);
    }
    return any
        ? { columns: ['month', 'purge hours'], rows }
        : { problem: 'This file carries no night-time dry bulb readings.' };
}
export function hoursByCondition(hours: Hours): Built {
    const bands: (readonly [
        string,
        (i: number) => boolean | undefined
    ])[] = [
        [
            'Comfortable 18-27 °C',
            (i) => within(hours.dryBulb[i], 18, 27),
        ],
        ['Below 18 °C', (i) => below(hours.dryBulb[i], 18)],
        ['Above 27 °C', (i) => above(hours.dryBulb[i], 27)],
        ['Economiser, below 14 °C', (i) => below(hours.dryBulb[i], 14)],
        ['Humid, dew point over 16 °C', (i) => above(hours.dewPoint[i], 16)],
        ['Sun up', (i) => above(hours.sunAltitude[i], 0)],
    ];
    const counts = bands.map(() => 0);
    let readable = false;
    for (let i = 0; i < hours.length; i++) {
        bands.forEach(([, holds], b) => {
            const answer = holds(i);
            if (answer === undefined)
                return;
            readable = true;
            if (answer)
                counts[b] = (counts[b] ?? 0) + 1;
        });
    }
    return readable
        ? {
            columns: ['condition', 'hours'],
            rows: bands.map(([label], b) => [label, counts[b] ?? 0]),
        }
        : { problem: 'This file carries none of the readings these bands count.' };
}
const within = (value: number | null | undefined, low: number, high: number) => value == null ? undefined : value >= low && value <= high;
const below = (value: number | null | undefined, limit: number) => value == null ? undefined : value < limit;
const above = (value: number | null | undefined, limit: number) => value == null ? undefined : value > limit;
