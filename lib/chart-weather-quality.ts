import type { Built, Cell } from '@/lib/chart-weather-chart-data';
import type { Column, Hours } from '@/lib/chart-weather-types';
const missing = (column: Column): number => {
    let gaps = 0;
    for (const value of column)
        if (value === null)
            gaps++;
    return gaps;
};
export function missingReadings(hours: Hours): Built {
    if (hours.length === 0)
        return { problem: 'This file carries no hourly data.' };
    const columns: (readonly [
        string,
        Column
    ])[] = [
        ['dry bulb', hours.dryBulb],
        ['dew point', hours.dewPoint],
        ['humidity', hours.relativeHumidity],
        ['global horizontal', hours.ghi],
        ['direct normal', hours.dni],
        ['wind speed', hours.windSpeed],
        ['opaque sky cover', hours.opaqueSkyCover],
        ['illuminance', hours.globalIlluminance],
    ];
    const rows: Cell[][] = columns.map(([label, column]) => [
        label,
        missing(column),
    ]);
    return { columns: ['column', 'missing'], rows };
}
