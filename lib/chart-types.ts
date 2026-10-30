export type ChartKind = "bar" | "line" | "scatter" | "matrix" | "range" | "psychro" | "rose" | "sunpath"

export interface ChartData {
  readonly columns: readonly string[]
  readonly rows: readonly (readonly (number | string | null)[])[]
}

export interface Problem { readonly problem: string }
export type Built = ChartData | Problem

export interface FigureLine {
  readonly label: string
  readonly role: "series" | "building" | "reference" | "limit" | "peak"
  readonly points: readonly { readonly x: number; readonly y: number | null }[]
  readonly slot: number
  readonly baseline?: boolean | undefined
}

export interface Figure {
  readonly lines: readonly FigureLine[]
  readonly min: number
  readonly max: number
  readonly summary?: string | undefined
}

export type ChartSpec =
  | { readonly kind: ChartKind; readonly data: Built; readonly linearX?: boolean | undefined }
  | { readonly kind: "hourly"; readonly figure: Figure; readonly unit?: string | undefined }

export function isProblem(value: Built): value is Problem { return "problem" in value }
