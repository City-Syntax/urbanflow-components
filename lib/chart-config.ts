import type { Chart, ChartConfiguration } from 'chart.js';
import type { ChartKind } from '@/lib/chart-types';
import type { ChartData, Problem } from '@/lib/chart-types';
import type { ChartTheme } from '@/lib/chart-theme';
import { fade, ramp } from '@/lib/chart-theme';
export const isSquare = (kind: ChartKind): boolean => kind === 'rose' || kind === 'sunpath';
export { fade };
const numberAt = (row: readonly (number | string | null)[], i: number): number | null => {
    const value = row[i];
    if (typeof value === 'number')
        return Number.isFinite(value) ? value : null;
    if (typeof value === 'string' && value.trim() !== '') {
        const parsed = Number(value);
        return Number.isFinite(parsed) ? parsed : null;
    }
    return null;
};
export interface ConfigOptions {
    readonly kind: ChartKind;
    readonly data: ChartData;
    readonly theme: ChartTheme;
    readonly linearX?: boolean;
}
export type BuiltConfig = {
    readonly config: ChartConfiguration;
} | Problem;
export function chartConfig(options: ConfigOptions): BuiltConfig {
    const { kind, data } = options;
    if (data.columns.length < 2) {
        return { problem: 'A chart needs two columns: a label and a value.' };
    }
    if (data.rows.length === 0)
        return { problem: 'There is nothing to plot.' };
    if (kind === 'matrix' || kind === 'psychro')
        return matrixConfig(options);
    if (kind === 'sunpath')
        return sunPathConfig(options);
    if (kind === 'range')
        return rangeConfig(options);
    return seriesConfig(options);
}
function seriesConfig(options: ConfigOptions): BuiltConfig {
    const { kind, data, theme } = options;
    const linearX = options.linearX || kind === 'scatter';
    const labels = data.rows.map((row) => String(row[0] ?? ''));
    const datasets = data.columns.slice(1).map((name, i) => {
        const color = theme.series[i % theme.series.length]!;
        const values = data.rows.map((row) => numberAt(row, i + 1));
        return {
            label: name,
            data: linearX
                ? values.map((y, at) => ({ x: numberAt(data.rows[at]!, 0), y })).filter((p): p is {
                    x: number;
                    y: number | null;
                } => p.x !== null)
                : values,
            borderColor: color,
            backgroundColor: kind === 'bar' ? fade(color, 0.72) : kind === 'rose' ? fade(color, 0.85) : color,
            borderWidth: kind === 'bar' ? 1 : kind === 'line' ? 1.6 : 0,
            pointRadius: kind === 'scatter' ? 2 : 0,
            tension: 0,
        };
    });
    if (datasets.every((set) => set.data.every((value) => value === null || (typeof value === 'object' && value.y === null)))) {
        return { problem: 'No column in this result is numeric.' };
    }
    const config: ChartConfiguration = {
        type: kind === 'rose' ? 'polarArea' : kind === 'bar' ? 'bar' : kind === 'scatter' ? 'scatter' : 'line',
        data: {
            labels,
            datasets: datasets as ChartConfiguration['data']['datasets'],
        },
        options: {
            responsive: true,
            interaction: { mode: 'nearest', intersect: false },
            plugins: {
                legend: { display: kind !== 'rose' && datasets.length > 1, position: 'bottom' },
                tooltip: { displayColors: datasets.length > 1 },
            },
            scales: kind === 'rose'
                ? {
                    r: {
                        ticks: { backdropColor: 'transparent', showLabelBackdrop: false },
                        grid: { color: theme.grid },
                        angleLines: { color: theme.grid },
                    },
                }
                : {
                    x: {
                        type: linearX ? 'linear' : 'category',
                        ticks: { maxRotation: 0, autoSkip: true, maxTicksLimit: 6 },
                        grid: { display: false },
                        border: { color: theme.grid },
                    },
                    y: {
                        beginAtZero: kind === 'bar',
                        ticks: { maxTicksLimit: 5 },
                        grid: { color: theme.grid },
                        border: { display: false },
                    },
                },
        },
    };
    return { config };
}
function rangeConfig(options: ConfigOptions): BuiltConfig {
    const { data, theme } = options;
    if (data.columns.length < 3) {
        return { problem: 'A range needs a label and two values: low and high.' };
    }
    if (!data.rows.some(row => numberAt(row, 1) !== null && numberAt(row, 2) !== null))
        return { problem: 'There are no complete ranges to plot.' };
    const color = theme.series[0]!;
    const mean = theme.series[1]!;
    const config: ChartConfiguration = {
        type: 'bar',
        data: {
            labels: data.rows.map((row) => String(row[0] ?? '')),
            datasets: [
                {
                    label: `${data.columns[1]} to ${data.columns[2]}`,
                    data: data.rows.map((row) => { const low = numberAt(row, 1); const high = numberAt(row, 2); return low === null || high === null ? null : [low, high]; }) as never,
                    backgroundColor: fade(color, 0.72),
                    borderColor: color,
                    borderWidth: 1,
                },
                ...(data.columns.length > 3
                    ? [
                        {
                            label: data.columns[3]!,
                            type: 'line' as const,
                            data: data.rows.map((row) => numberAt(row, 3)),
                            borderColor: mean,
                            backgroundColor: mean,
                            borderWidth: 1.6,
                            pointRadius: 0,
                        },
                    ]
                    : []),
            ] as never,
        },
        options: {
            responsive: true,
            plugins: { legend: { display: true, position: 'bottom' } },
            scales: {
                x: {
                    ticks: { maxRotation: 0, autoSkip: true, maxTicksLimit: 12 },
                    grid: { display: false },
                },
                y: { ticks: { maxTicksLimit: 5 }, grid: { color: theme.grid } },
            },
        },
    };
    return { config };
}
function matrixConfig(options: ConfigOptions): BuiltConfig {
    const { data, theme } = options;
    if (data.columns.length < 3)
        return { problem: 'A carpet plot needs three columns: across, down, then the value.' };
    const points = data.rows
        .map((row) => ({
        x: numberAt(row, 0),
        y: numberAt(row, 1),
        v: numberAt(row, 2) ?? NaN,
    }))
        .filter((p): p is {
        x: number;
        y: number;
        v: number;
    } => p.x !== null && p.y !== null && Number.isFinite(p.v));
    if (points.length === 0)
        return { problem: 'There is nothing to plot.' };
    const values = points.map((p) => p.v).filter((v) => Number.isFinite(v));
    const low = values.length === 0 ? 0 : values.reduce((a, b) => Math.min(a, b), Infinity);
    const high = values.length === 0 ? 1 : values.reduce((a, b) => Math.max(a, b), -Infinity);
    const span = high - low || 1;
    const sequential = low >= 0;
    const xs = [...new Set(points.map((p) => p.x))].sort((a, b) => a - b);
    const ys = [...new Set(points.map((p) => p.y))].sort((a, b) => a - b);
    const config: ChartConfiguration = {
        type: 'matrix' as never,
        data: {
            datasets: [
                {
                    label: data.columns[2] ?? 'value',
                    data: points as never,
                    backgroundColor: ((ctx: {
                        raw?: {
                            v: number;
                        };
                    }) => Number.isFinite(ctx.raw?.v)
                        ? ramp((ctx.raw!.v - low) / span, sequential, theme)
                        : 'transparent') as never,
                    borderWidth: 0,
                    width: ((ctx: {
                        chart: Chart;
                    }) => ctx.chart.chartArea ? ctx.chart.chartArea.width / xs.length + 0.6 : 1) as never,
                    height: ((ctx: {
                        chart: Chart;
                    }) => ctx.chart.chartArea ? ctx.chart.chartArea.height / ys.length + 0.6 : 1) as never,
                },
            ],
        },
        options: {
            responsive: true,
            plugins: {
                legend: { display: false },
                tooltip: {
                    callbacks: {
                        title: () => '',
                        label: (item: {
                            raw?: unknown;
                        }) => {
                            const p = item.raw as {
                                x: number;
                                y: number;
                                v: number;
                            };
                            return `${data.columns[0]} ${p.x}, ${data.columns[1]} ${p.y}: ${Number(p.v.toFixed(2))}`;
                        },
                    },
                },
            },
            scales: {
                x: {
                    type: 'linear',
                    offset: false,
                    min: xs[0]! - 0.5,
                    max: xs.at(-1)! + 0.5,
                    ticks: { color: theme.text, maxTicksLimit: 6 },
                    grid: { display: false },
                    border: { color: theme.grid },
                },
                y: {
                    type: 'linear',
                    offset: false,
                    reverse: false,
                    min: ys[0]! - 0.5,
                    max: ys.at(-1)! + 0.5,
                    ticks: { color: theme.text, maxTicksLimit: 5 },
                    grid: { display: false },
                    border: { display: false },
                },
            },
        },
    };
    return { config };
}
function sunPathConfig(options: ConfigOptions): BuiltConfig {
    const { data, theme } = options;
    const points = data.rows
        .map((row) => ({
        azimuth: numberAt(row, 0),
        altitude: numberAt(row, 1),
        value: numberAt(row, 2),
    }))
        .filter((p): p is {
        azimuth: number;
        altitude: number;
        value: number | null;
    } => p.azimuth !== null && p.altitude !== null && p.altitude > 0);
    if (points.length === 0) {
        return { problem: 'No hours with the sun above the horizon.' };
    }
    const values = points
        .map((p) => p.value)
        .filter((v): v is number => v !== null && Number.isFinite(v));
    const low = values.length === 0 ? 0 : values.reduce((a, b) => Math.min(a, b), Infinity);
    const span = (values.length === 0 ? 1 : values.reduce((a, b) => Math.max(a, b), -Infinity)) - low || 1;
    const projected = points.map((p) => {
        const radius = 90 - p.altitude;
        const theta = (p.azimuth * Math.PI) / 180;
        return { x: radius * Math.sin(theta), y: radius * Math.cos(theta), v: p.value };
    });
    const config: ChartConfiguration = {
        type: 'scatter',
        data: {
            datasets: [
                {
                    label: data.columns[2] ?? 'sun position',
                    data: projected as never,
                    pointRadius: 1.4,
                    backgroundColor: (values.length > 0
                        ? (ctx: {
                            raw?: {
                                v: number;
                            };
                        }) => Number.isFinite(ctx.raw?.v)
                            ? ramp((ctx.raw!.v - low) / span, low >= 0, theme)
                            : theme.series[0]!
                        : theme.series[0]!) as never,
                },
            ],
        },
        options: {
            responsive: true,
            aspectRatio: 1,
            maintainAspectRatio: true,
            plugins: {
                legend: { display: false },
                tooltip: {
                    callbacks: {
                        title: () => '',
                        label: (item: {
                            dataIndex: number;
                        }) => {
                            const p = points[item.dataIndex]!;
                            return `altitude ${p.altitude.toFixed(0)}°, azimuth ${p.azimuth.toFixed(0)}°`;
                        },
                    },
                },
            },
            scales: {
                x: { min: -104, max: 104, display: false },
                y: { min: -104, max: 104, display: false },
            },
        },
    };
    return { config };
}
