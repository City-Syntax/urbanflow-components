type TimeRange = {
    from: number;
    to: number;
};
const DAYS_IN_YEAR = 365;
const clampDay = (day: number) => Math.min(365, Math.max(1, Math.round(Number.isFinite(day) ? day : 1)));
export function hourLabel(hour: number): string {
    const day = clampDay(Math.floor((hour - 1) / 24) + 1);
    const clock = hour - (day - 1) * 24;
    return `${dateLabel(day)} ${String(clock).padStart(2, '0')}:00`;
}
const STARTS = [0, 31, 59, 90, 120, 151, 181, 212, 243, 273, 304, 334] as const;
const LENGTHS = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31] as const;
export const MONTH_NAMES = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'] as const;
export const FULL_YEAR: TimeRange = { from: 1, to: DAYS_IN_YEAR };
export const dayOf = (month: number, day: number): number => (STARTS[month - 1] ?? 0) + day;
export function dateOf(day: number): {
    readonly month: number;
    readonly day: number;
} {
    const d = clampDay(day);
    let month = 11;
    while (STARTS[month]! >= d)
        month--;
    return { month: month + 1, day: d - STARTS[month]! };
}
const pad = (n: number): string => String(n).padStart(2, '0');
export const mmdd = (day: number): string => {
    const { month, day: d } = dateOf(day);
    return `${pad(month)}-${pad(d)}`;
};
export const dateLabel = (day: number): string => {
    const { month, day: d } = dateOf(day);
    return `${d} ${MONTH_NAMES[month - 1]}`;
};
export function parseMmdd(text: string): number | undefined {
    const match = /^\s*(\d{1,2})-(\d{1,2})\s*$/.exec(text);
    if (!match)
        return undefined;
    const month = Number(match[1]);
    const day = Number(match[2]);
    if (month < 1 || month > 12 || day < 1 || day > LENGTHS[month - 1]!)
        return undefined;
    return dayOf(month, day);
}
export function normaliseRange(range: TimeRange | undefined): TimeRange | undefined {
    if (range === undefined)
        return undefined;
    const a = clampDay(range.from);
    const b = clampDay(range.to);
    const from = Math.min(a, b);
    const to = Math.max(a, b);
    return from === 1 && to === DAYS_IN_YEAR ? undefined : { from, to };
}
export function rangeLabel(range: TimeRange | undefined): string {
    if (range === undefined)
        return 'Full year';
    return range.from === range.to ? dateLabel(range.from) : `${dateLabel(range.from)} – ${dateLabel(range.to)}`;
}
export function rangeHours(range: TimeRange | undefined): {
    readonly first: number;
    readonly last: number;
} {
    const { from, to } = range ?? FULL_YEAR;
    return { first: (from - 1) * 24 + 1, last: to * 24 };
}
export const monthRange = (month: number): TimeRange => ({
    from: dayOf(month, 1),
    to: dayOf(month, LENGTHS[month - 1]!),
});
export const describeRange = (range: TimeRange | undefined): {
    from: string;
    to: string;
} | 'full year' => range === undefined ? 'full year' : { from: mmdd(range.from), to: mmdd(range.to) };
