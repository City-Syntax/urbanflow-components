export interface ChartTheme {
  readonly series: readonly string[]
  readonly text: string
  readonly grid: string
  readonly gridStrong: string
  readonly accent: string
  readonly reference: string
  readonly ink: string
  readonly critical: string
  readonly font: string
  readonly fontSize: number
  readonly sequential: readonly string[]
  readonly diverging: readonly string[]
}

export const SERIES_TOKENS = ["info-heavy", "critical-heavy", "success-primary", "misc-orange", "magic-primary", "neutral-80"] as const

export function readChartTheme(element: Element): ChartTheme {
  const css = getComputedStyle(element)
  const token = (name: string): string => {
    const value = css.getPropertyValue(name).trim()
    if (!value) throw new Error("Charts need the current @urbanflow/theme stylesheet, including chart tokens.")
    return value
  }
  const color = (name: string) => token(`--color-${name}`)
  return {
    series: SERIES_TOKENS.map(color), text: color("texticons-secondary"),
    grid: color("stroke-default"), gridStrong: color("stroke-strong"), accent: color("info-primary"),
    reference: color("neutral-30"), ink: color("texticons-emphasis"), critical: color("critical-heavy"),
    font: css.fontFamily, fontSize: Number.parseFloat(token("--text-chart-axis")),
    sequential: Array.from({ length: 21 }, (_, i) => color(`chart-ramp-sequential-${i}`)),
    diverging: Array.from({ length: 21 }, (_, i) => color(`chart-ramp-diverging-${i}`)),
  }
}

function channels(color: string): number[] {
  const hex = /^#([0-9a-f]{6})/i.exec(color.trim())?.[1]
  if (hex) return [0, 2, 4].map(i => Number.parseInt(hex.slice(i, i + 2), 16))
  const parts = /^rgba?\((.+)\)$/i.exec(color)?.[1]?.match(/-?\d+(?:\.\d+)?/g)
  if (parts && parts.length >= 3) return parts.slice(0, 3).map(Number)
  throw new Error(`Chart colors must resolve to hex or rgb values: ${color}`)
}

export function fade(color: string, alpha: number): string {
  return `rgba(${channels(color).join(", ")}, ${alpha})`
}

export function ramp(t: number, sequential: boolean, theme: Pick<ChartTheme, "sequential" | "diverging">): string {
  const stops = sequential ? theme.sequential : theme.diverging
  const scaled = Math.min(1, Math.max(0, Number.isFinite(t) ? t : 0)) * (stops.length - 1)
  const i = Math.min(stops.length - 2, Math.floor(scaled))
  const a = channels(stops[i]!), b = channels(stops[i + 1]!)
  return `rgb(${a.map((value, k) => Math.round(value + (b[k]! - value) * (scaled - i))).join(", ")})`
}
