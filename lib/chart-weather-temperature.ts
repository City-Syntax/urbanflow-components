import { carpet, days, groupBy, mean, monthLabel, pick, present, round, type Built, type Problem, } from '@/lib/chart-weather-chart-data';
import type { Hours } from '@/lib/chart-weather-types';
function needDryBulb(hours: Hours): Problem | undefined {
    return present(hours.dryBulb).length === 0
        ? { problem: 'This file carries no dry bulb readings.' }
        : undefined;
}
export function carpetDryBulb(hours: Hours): Built {
    return carpet(hours, hours.dryBulb, '°C', 'dry bulb');
}
export function monthlyRange(hours: Hours): Built {
    const missing = needDryBulb(hours);
    if (missing)
        return missing;
    const rows: (number | string)[][] = [];
    for (const [month, indices] of groupBy(hours.month)) {
        const readings = pick(hours.dryBulb, indices);
        if (readings.length === 0)
            continue;
        rows.push([
            monthLabel(month),
            round(Math.min(...readings), 1),
            round(Math.max(...readings), 1),
            round(mean(readings), 1),
        ]);
    }
    return { columns: ['month', 'low', 'high', 'mean'], rows };
}
export function typicalDay(hours: Hours): Built {
    const missing = needDryBulb(hours);
    if (missing)
        return missing;
    const wanted = [1, 4, 7, 10] as const;
    const names = ['january', 'april', 'july', 'october'];
    const rows: (number | null)[][] = [];
    for (const [hour, indices] of groupBy(hours.hourOfDay)) {
        const row: (number | null)[] = [hour];
        for (const month of wanted) {
            const readings = pick(hours.dryBulb, indices.filter((i) => hours.month[i] === month));
            row.push(readings.length === 0 ? null : round(mean(readings), 1));
        }
        rows.push(row);
    }
    return { columns: ['hour', ...names], rows };
}
export function hottestMonth(hours: Hours): number | undefined {
    let hottest: number | undefined;
    let best = -Infinity;
    for (const [month, indices] of groupBy(hours.month)) {
        const readings = pick(hours.dryBulb, indices);
        if (readings.length === 0)
            continue;
        const average = mean(readings);
        if (average > best) {
            best = average;
            hottest = month;
        }
    }
    return hottest;
}
export function hottestMonthEnvelope(hours: Hours): Built {
    const missing = needDryBulb(hours);
    if (missing)
        return missing;
    const month = hottestMonth(hours);
    if (month === undefined) {
        return { problem: 'No month in this file has a dry bulb reading.' };
    }
    const rows: number[][] = [];
    for (const [hour, indices] of groupBy(hours.hourOfDay)) {
        const readings = pick(hours.dryBulb, indices.filter((i) => hours.month[i] === month));
        if (readings.length === 0)
            continue;
        rows.push([
            hour,
            round(Math.min(...readings), 1),
            round(mean(readings), 1),
            round(Math.max(...readings), 1),
        ]);
    }
    return { columns: ['hour', 'coldest', 'mean', 'warmest'], rows };
}
export function diurnalSwing(hours: Hours): Built {
    const missing = needDryBulb(hours);
    if (missing)
        return missing;
    const byMonth = new Map<number, number[]>();
    for (const day of days(hours)) {
        const swings = byMonth.get(day.month) ?? [];
        swings.push(day.high - day.low);
        byMonth.set(day.month, swings);
    }
    const rows: (number | string)[][] = [...byMonth]
        .sort(([a], [b]) => a - b)
        .map(([month, swings]) => [
        monthLabel(month),
        round(mean(swings), 1),
        round(Math.max(...swings), 1),
    ]);
    return { columns: ['month', 'mean swing', 'largest day'], rows };
}
export function degreeDaysByMonth(hours: Hours): Built {
    const missing = needDryBulb(hours);
    if (missing)
        return missing;
    const byMonth = new Map<number, {
        heating: number;
        cooling: number;
    }>();
    for (const day of days(hours)) {
        const totals = byMonth.get(day.month) ?? { heating: 0, cooling: 0 };
        totals.heating += Math.max(18 - day.mean, 0);
        totals.cooling += Math.max(day.mean - 10, 0);
        byMonth.set(day.month, totals);
    }
    const rows: (number | string)[][] = [...byMonth]
        .sort(([a], [b]) => a - b)
        .map(([month, totals]) => [
        monthLabel(month),
        round(totals.heating),
        round(totals.cooling),
    ]);
    return { columns: ['month', 'heating', 'cooling'], rows };
}
export function durationCurve(hours: Hours): Built {
    const readings = present(hours.dryBulb).sort((a, b) => b - a);
    if (readings.length === 0)
        return { problem: 'This file carries no dry bulb readings.' };
    return {
        columns: ['hours above', '°C'],
        rows: readings.map((value, i) => [i + 1, round(value, 1)]),
    };
}
