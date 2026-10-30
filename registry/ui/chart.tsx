"use client"

import * as React from "react"
import {
  Chart as ChartJS, ArcElement, BarController, BarElement, CategoryScale,
  Decimation, Filler, Legend, LinearScale, LineController, LineElement,
  PointElement, PolarAreaController, RadialLinearScale, ScatterController, Tooltip,
  type ChartConfiguration,
} from "chart.js"
import { MatrixController, MatrixElement } from "chartjs-chart-matrix"
import { cn } from "@/lib/utils"
import { chartConfig, isSquare } from "@/lib/chart-config"
import { timeConfig } from "@/lib/chart-hourly"
import { comfortZone, sunPathFrame } from "@/lib/chart-plugins"
import { readChartTheme, type ChartTheme } from "@/lib/chart-theme"
import { isProblem, type ChartSpec } from "@/lib/chart-types"

ChartJS.register(ArcElement, BarController, BarElement, CategoryScale, Decimation,
  Filler, Legend, LinearScale, LineController, LineElement, PointElement,
  PolarAreaController, RadialLinearScale, ScatterController, Tooltip, MatrixController, MatrixElement)

type ChartProps = ChartSpec & {
  label: string
  large?: boolean | undefined
  className?: string | undefined
  themeKey?: string | number | undefined
}

function withTheme(config: ChartConfiguration, theme: ChartTheme): ChartConfiguration {
  const options = config.options ?? {}
  return { ...config, options: {
    animation: false, maintainAspectRatio: false, color: theme.text, borderColor: theme.grid,
    ...options,
    font: { family: theme.font, size: theme.fontSize, ...options.font },
    plugins: { ...options.plugins, legend: { ...options.plugins?.legend,
      labels: { boxWidth: 8, boxHeight: 8, color: theme.text,
        font: { family: theme.font, size: theme.fontSize }, ...options.plugins?.legend?.labels } } },
    scales: Object.fromEntries(Object.entries(options.scales ?? {}).map(([key, axis]) => [key, {
      ...axis, ticks: { color: theme.text, font: { family: theme.font, size: theme.fontSize }, ...axis?.ticks },
    }])),
  } }
}

function Chart(props: ChartProps) {
  const { kind, label, large = false, className, themeKey } = props
  const data = props.kind === "hourly" ? undefined : props.data
  const figure = props.kind === "hourly" ? props.figure : undefined
  const unit = props.kind === "hourly" ? props.unit ?? "" : ""
  const linearX = props.kind === "hourly" ? undefined : props.linearX
  const canvas = React.useRef<HTMLCanvasElement>(null)
  const [problem, setProblem] = React.useState<string>()

  React.useEffect(() => {
    let disposed = false
    let chart: ChartJS | undefined
    async function draw() {
      await document.fonts?.ready
      const element = canvas.current
      if (disposed || !element) return
      try {
        const theme = readChartTheme(element)
        let config: ChartConfiguration
        if (kind === "hourly" && figure) {
          if (!figure.lines.some(line => line.points.some(p => Number.isFinite(p.x) && p.y !== null && Number.isFinite(p.y)))) {
            setProblem("There is nothing to plot."); return
          }
          config = timeConfig(figure, unit, theme)
        } else {
          if (!data) return
          if (isProblem(data)) { setProblem(data.problem); return }
          const built = chartConfig({ kind: kind as Exclude<typeof kind, "hourly">, data, theme, ...(linearX === undefined ? {} : { linearX }) })
          if ("problem" in built) { setProblem(built.problem); return }
          config = built.config
        }
        const plugins = kind === "psychro" ? [comfortZone(theme)] : kind === "sunpath" ? [sunPathFrame(theme)] : []
        chart = new ChartJS(element, { ...withTheme(config, theme), plugins })
        setProblem(undefined)
      } catch (error) { if (!disposed) setProblem(error instanceof Error ? error.message : "The chart could not be drawn.") }
    }
    void draw()
    return () => { disposed = true; chart?.destroy() }
  }, [kind, data, figure, unit, linearX, themeKey])

  const square = kind !== "hourly" && isSquare(kind)
  return <div data-slot="chart" data-chart-kind={kind} className={cn("min-w-0", className)}>
    {problem && <p role="status" className="py-1.5 text-paragraph-xsmall text-texticons-secondary">{problem}</p>}
    <div className={cn("relative", problem && "hidden", square ? `mx-auto aspect-square ${large ? "w-[min(100%,420px)]" : "w-[min(100%,300px)]"}` : large ? "h-[min(60vh,420px)]" : kind === "matrix" ? "h-[190px]" : "h-[170px]")}>
      <canvas ref={canvas} role="img" aria-label={label}>{label}</canvas>
    </div>
  </div>
}

export { Chart }
export type { ChartProps }
export type { ChartData, ChartKind, ChartSpec, Figure, FigureLine } from "@/lib/chart-types"
