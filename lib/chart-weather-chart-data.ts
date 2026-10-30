import type { Column, Hours } from '@/lib/chart-weather-types';
export type Cell = number | string | null;
export interface ChartData {
    readonly columns: readonly string[];
    readonly rows: readonly (readonly Cell[])[];
}
export interface Problem {
    readonly problem: string;
}
export type Built = ChartData | Problem;
export const isProblem = <T,>(value: T | Problem): value is Problem => typeof value === 'object' && value !== null && 'problem' in value;
export function present(column: Column): number[] {
    const values: number[] = [];
    for (const value of column)
        if (value !== null)
            values.push(value);
    return values;
}
export const sum = (values: readonly number[]): number => values.reduce((total, value) => total + value, 0);
export const mean = (values: readonly number[]): number => values.length === 0 ? NaN : sum(values) / values.length;
export const round = (value: number, places = 0): number => Number(value.toFixed(places));
export const MONTHS: readonly string[] = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
];
export const monthLabel = (month: number): string => MONTHS[month - 1] ?? String(month);
export function groupBy(key: Column): Map<number, number[]> {
    const groups = new Map<number, number[]>();
    for (let i = 0; i < key.length; i++) {
        const value = key[i];
        if (value === null || value === undefined)
            continue;
        const found = groups.get(value);
        if (found)
            found.push(i);
        else
            groups.set(value, [i]);
    }
    return new Map([...groups].sort(([a], [b]) => a - b));
}
export function pick(column: Column, indices: readonly number[]): number[] {
    const values: number[] = [];
    for (const i of indices) {
        const value = column[i];
        if (value !== null && value !== undefined)
            values.push(value);
    }
    return values;
}
export function carpet(hours: Hours, values: Column, label: string, what: string): Built {
    const rows: [
        number,
        number,
        number
    ][] = [];
    for (let i = 0; i < hours.length; i++) {
        const day = hours.dayOfYear[i];
        const hour = hours.hourOfDay[i];
        const value = values[i];
        if (day == null || hour == null || value == null)
            continue;
        rows.push([day, hour, value]);
    }
    return rows.length === 0
        ? { problem: `This file carries no ${what} readings.` }
        : { columns: ['day of year', 'hour', label], rows };
}
export interface Day {
    readonly dayOfYear: number;
    readonly month: number;
    readonly low: number;
    readonly high: number;
    readonly mean: number;
}
export function days(hours: Hours): Day[] {
    const result: Day[] = [];
    for (const [dayOfYear, indices] of groupBy(hours.dayOfYear)) {
        const readings = pick(hours.dryBulb, indices);
        if (readings.length === 0)
            continue;
        const month = pick(hours.month, indices)[0];
        if (month === undefined)
            continue;
        result.push({
            dayOfYear,
            month,
            low: Math.min(...readings),
            high: Math.max(...readings),
            mean: mean(readings),
        });
    }
    return result;
}
