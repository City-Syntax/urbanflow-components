import type { ChartConfiguration } from 'chart.js';
import type { ChartTheme } from '@/lib/chart-theme';
import type { Figure, FigureLine } from '@/lib/chart-types';
import { dateLabel, dateOf, MONTH_NAMES, monthRange, hourLabel } from '@/lib/chart-date';
export function timeConfig(figure: Figure, unit: string, theme: ChartTheme): ChartConfiguration {
    const colors = theme.series;
    const grey = theme.reference;
    const ink = theme.ink;
    const critical = theme.critical;
    const grid = theme.grid;
    const span = figure.max - figure.min;
    const style = (line: FigureLine): Record<string, unknown> => {
        switch (line.role) {
            case 'reference':
                return { borderColor: grey, borderWidth: 1.2, borderDash: [4, 3] };
            case 'building':
                return {
                    borderColor: ink,
                    borderWidth: 1.8,
                    ...(line.baseline ? { borderDash: [5, 3] } : {}),
                };
            case 'limit':
                return { borderColor: critical, borderWidth: 1, borderDash: [2, 3] };
            case 'peak':
                return {
                    borderColor: critical,
                    backgroundColor: critical,
                    pointRadius: 3.5,
                    showLine: false,
                };
            default: {
                const color = colors[line.slot % colors.length]!;
                return {
                    borderColor: color,
                    backgroundColor: color,
                    borderWidth: 1.4,
                    ...(line.baseline ? { borderDash: [5, 3] } : {}),
                };
            }
        }
    };
    return {
        type: 'line',
        data: {
            datasets: figure.lines.map((line) => ({
                label: line.label,
                data: line.points.map((p) => ({ x: p.x, y: p.y })),
                pointRadius: 0,
                pointHoverRadius: 3,
                tension: 0,
                spanGaps: false,
                ...style(line),
            })) as ChartConfiguration['data']['datasets'],
        },
        options: {
            responsive: true,
            parsing: false,
            normalized: true,
            interaction: { mode: 'nearest', axis: 'x', intersect: false },
            plugins: {
                legend: {
                    display: figure.lines.length > 1,
                    position: 'bottom',
                    labels: {
                        usePointStyle: true,
                        pointStyle: 'line',
                        filter: (item, data) => {
                            const role = figure.lines[item.datasetIndex ?? -1]?.role;
                            return (data.datasets.length > 0 && role !== 'peak' && role !== 'limit');
                        },
                    },
                },
                tooltip: {
                    callbacks: {
                        title: (items) => items[0] === undefined
                            ? ''
                            : hourLabel(Math.round(items[0].parsed.x ?? 0)),
                        label: (item) => `${item.dataset.label}: ${Number((item.parsed.y ?? 0).toFixed(2))}${unit === '' ? '' : ` ${unit}`}`,
                    },
                },
            },
            scales: {
                x: {
                    type: 'linear',
                    min: figure.min - 1,
                    max: figure.max,
                    afterBuildTicks: (axis) => {
                        const step = span > 45 * 24 ? 0 : span > 14 * 24 ? 7 * 24 : span > 72 ? 24 : 6;
                        const at = step === 0
                            ? MONTH_NAMES.map((_, m) => (monthRange(m + 1).from - 1) * 24)
                            : Array.from({ length: Math.floor(span / step) + 2 }, (_, i) => (Math.ceil((figure.min - 1) / step) + i) * step);
                        axis.ticks = at
                            .filter((v) => v >= figure.min - 1 && v <= figure.max)
                            .map((value) => ({ value }));
                    },
                    ticks: {
                        maxRotation: 0,
                        autoSkip: true,
                        maxTicksLimit: 8,
                        callback: (value) => {
                            const hour = Math.round(Number(value));
                            if (span > 45 * 24)
                                return MONTH_NAMES[dateOf(Math.floor(hour / 24) + 1).month - 1];
                            if (span > 72)
                                return dateLabel(Math.floor(hour / 24) + 1);
                            const clock = ((hour % 24) + 24) % 24;
                            return clock === 0
                                ? dateLabel(hour / 24 + 1)
                                : `${String(clock).padStart(2, '0')}:00`;
                        },
                    },
                    grid: { display: false },
                    border: { color: grid },
                },
                y: {
                    ticks: { maxTicksLimit: 5 },
                    grid: { color: grid },
                    border: { display: false },
                },
            },
        },
    };
}
