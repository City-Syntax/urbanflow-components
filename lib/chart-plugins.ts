import type { Chart, Plugin } from 'chart.js';
import type { ChartTheme } from '@/lib/chart-theme';
export function comfortZone(theme: ChartTheme): Plugin {
    return {
        id: 'comfortZone',
        afterDatasetsDraw(chart: Chart) {
            const x = chart.scales['x'];
            const y = chart.scales['y'];
            if (!x || !y)
                return;
            const { ctx } = chart;
            const left = x.getPixelForValue(20);
            const right = x.getPixelForValue(27);
            const bottom = y.getPixelForValue(4);
            const top = y.getPixelForValue(12);
            ctx.save();
            ctx.beginPath();
            ctx.rect(left, top, right - left, bottom - top);
            ctx.strokeStyle = theme.accent;
            ctx.lineWidth = 1.25;
            ctx.setLineDash([4, 3]);
            ctx.stroke();
            ctx.setLineDash([]);
            ctx.fillStyle = theme.accent;
            ctx.font = `${theme.fontSize}px ${theme.font}`;
            ctx.fillText('comfort', left + 3, top - 4);
            ctx.restore();
        },
    };
}
export function sunPathFrame(theme: ChartTheme): Plugin {
    return {
        id: 'sunPathFrame',
        beforeDatasetsDraw(chart: Chart) {
            const x = chart.scales['x'];
            const y = chart.scales['y'];
            if (!x || !y)
                return;
            const { ctx } = chart;
            const centreX = x.getPixelForValue(0);
            const centreY = y.getPixelForValue(0);
            const radius = Math.abs(x.getPixelForValue(90) - centreX);
            ctx.save();
            ctx.strokeStyle = theme.gridStrong;
            ctx.lineWidth = 1;
            for (const altitude of [0, 30, 60]) {
                ctx.beginPath();
                ctx.arc(centreX, centreY, (radius * (90 - altitude)) / 90, 0, 2 * Math.PI);
                ctx.globalAlpha = altitude === 0 ? 1 : 0.45;
                ctx.stroke();
            }
            ctx.globalAlpha = 1;
            ctx.fillStyle = theme.text;
            ctx.font = `${theme.fontSize}px ${theme.font}`;
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            for (const [label, dx, dy] of [
                ['N', 0, -1],
                ['E', 1, 0],
                ['S', 0, 1],
                ['W', -1, 0],
            ] as const) {
                ctx.fillText(label, centreX + dx * (radius + 9), centreY + dy * (radius + 9));
            }
            ctx.restore();
        },
    };
}
