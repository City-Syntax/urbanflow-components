"use client"

import * as React from "react"
import {
  Chart as ChartJS, ArcElement, BarController, BarElement, CategoryScale,
  Decimation, Filler, Legend, LinearScale, LineController, LineElement,
  PointElement, PolarAreaController, RadialLinearScale, ScatterController, Tooltip,
} from "chart.js"
import { MatrixController, MatrixElement } from "chartjs-chart-matrix"
import { cn } from "@/lib/utils"
import { isSquare, specConfig } from "@/lib/chart-config"
import { muteTheme, readChartTheme } from "@/lib/chart-theme"
import type { ChartSpec } from "@/lib/chart-types"

ChartJS.register(ArcElement, BarController, BarElement, CategoryScale, Decimation,
  Filler, Legend, LinearScale, LineController, LineElement, PointElement,
  PolarAreaController, RadialLinearScale, ScatterController, Tooltip, MatrixController, MatrixElement)

type ChartProps = ChartSpec & {
  label: string
  large?: boolean | undefined
  className?: string | undefined
  themeKey?: string | number | undefined
}

interface ChartImageOptions {
  width?: number | undefined
  height?: number | undefined
  pixelRatio?: number | undefined
  fontSize?: number | undefined
  muted?: boolean | undefined
  element?: Element | undefined
}

async function chartImage(spec: ChartSpec, { width = 800, height = 400, pixelRatio = 2, fontSize = 13, muted = false, element }: ChartImageOptions = {}): Promise<string> {
  await document.fonts?.ready
  const read = readChartTheme(element ?? document.documentElement)
  const built = specConfig(spec, { ...(muted ? muteTheme(read) : read), fontSize })
  if ("problem" in built) throw new Error(built.problem)
  const canvas = document.createElement("canvas")
  canvas.width = width
  canvas.height = height
  const chart = new ChartJS(canvas, { ...built.config, options: { ...built.config.options, responsive: false, animation: false, devicePixelRatio: pixelRatio } })
  try { return chart.toBase64Image() } finally { chart.destroy() }
}

function Chart(props: ChartProps) {
  const { kind, label, large = false, className, themeKey } = props
  const data = props.kind === "hourly" ? undefined : props.data
  const figure = props.kind === "hourly" ? props.figure : undefined
  const unit = props.kind === "hourly" ? props.unit : undefined
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
        const spec: ChartSpec | undefined = kind === "hourly"
          ? figure && { kind, figure, unit }
          : data && { kind, data, linearX }
        if (!spec) return
        const built = specConfig(spec, readChartTheme(element))
        if ("problem" in built) { setProblem(built.problem); return }
        chart = new ChartJS(element, built.config)
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

export { Chart, chartImage }
export type { ChartProps, ChartImageOptions }
export type { ChartData, ChartKind, ChartSpec, Figure, FigureLine } from "@/lib/chart-types"
