import type { Built, Cell } from '@/lib/chart-weather-chart-data';
import type { Hours } from '@/lib/chart-weather-types';
export const SECTORS: readonly string[] = [
    'N',
    'NE',
    'E',
    'SE',
    'S',
    'SW',
    'W',
    'NW',
];
export function sectorOf(direction: number): string {
    const wrapped = ((direction % 360) + 360) % 360;
    const index = Math.floor(((wrapped + 22.5) % 360) / 45);
    return SECTORS[index] ?? 'N';
}
interface Band {
    readonly label: string;
    readonly holds: (speed: number) => boolean;
}
interface RoseOptions {
    readonly bands: readonly Band[];
    readonly keep?: (hours: Hours, i: number) => boolean;
    readonly empty: string;
}
function rose(hours: Hours, options: RoseOptions): Built {
    const counts = new Map<string, number[]>(SECTORS.map((sector) => [sector, options.bands.map(() => 0)]));
    let counted = 0;
    for (let i = 0; i < hours.length; i++) {
        const direction = hours.windDirection[i];
        const speed = hours.windSpeed[i];
        if (direction == null || speed == null)
            continue;
        if (speed <= 0)
            continue;
        if (options.keep && !options.keep(hours, i))
            continue;
        const into = counts.get(sectorOf(direction));
        if (!into)
            continue;
        counted++;
        options.bands.forEach((band, b) => {
            if (band.holds(speed))
                into[b] = (into[b] ?? 0) + 1;
        });
    }
    if (counted === 0)
        return { problem: options.empty };
    const rows: Cell[][] = SECTORS.map((sector) => [
        sector,
        ...(counts.get(sector) ?? []),
    ]);
    return { columns: ['sector', ...options.bands.map((b) => b.label)], rows };
}
export function windRose(hours: Hours): Built {
    return rose(hours, {
        bands: [
            { label: 'all speeds', holds: () => true },
            { label: 'under 6 m/s', holds: (speed) => speed < 6 },
            { label: 'under 3 m/s', holds: (speed) => speed < 3 },
        ],
        empty: 'This file carries no wind direction and speed readings.',
    });
}
export function ventilationRose(hours: Hours): Built {
    return rose(hours, {
        bands: [
            { label: 'usable hours', holds: () => true },
            { label: 'under 3 m/s', holds: (speed) => speed < 3 },
        ],
        keep: (all, i) => {
            const dryBulb = all.dryBulb[i];
            const hour = all.hourOfDay[i];
            if (dryBulb == null || hour == null)
                return false;
            return dryBulb >= 18 && dryBulb <= 26 && hour >= 8 && hour <= 18;
        },
        empty: 'No daytime hour in this file is between 18 and 26 °C with the wind blowing.',
    });
}
