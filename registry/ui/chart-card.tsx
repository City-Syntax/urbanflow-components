"use client"

import * as React from "react"
import { CloseIcon } from "@urbanflow/icons"
import { cn } from "@/lib/utils"
import { isProblem, type ChartData, type ChartSpec } from "@/lib/chart-types"
import { Chart } from "@/registry/ui/chart"
import { Modal, ModalContent, ModalTrigger } from "@/registry/ui/modal"

interface ChartCardProps {
  title: string
  chart?: ChartSpec | undefined
  loading?: boolean | undefined
  problem?: string | undefined
  truncated?: boolean | undefined
  description?: string | undefined
  provenance?: string | undefined
  query?: string | undefined
  onRemove?: (() => void) | undefined
  themeKey?: string | number | undefined
  className?: string | undefined
}

function ChartDataTable({ chart }: { chart: ChartSpec }) {
  const [open, setOpen] = React.useState(false)
  const data: ChartData | undefined = chart.kind === "hourly"
    ? { columns: ["Hour of year", "Series", chart.unit || "Value"], rows: chart.figure.lines.flatMap(line => line.points.map(p => [p.x, line.label, p.y])) }
    : isProblem(chart.data) ? undefined : chart.data
  if (!data) return null
  return <details open={open} onToggle={e => setOpen(e.currentTarget.open)}>
    <summary className="cursor-pointer rounded-sm text-paragraph-xsmall outline-none focus-visible:shadow-focus">View data</summary>
    {open && <div className="mt-2 max-h-64 overflow-auto">
      {data.rows.length > 500 && <p className="text-paragraph-xsmall">Showing the first 500 of {data.rows.length.toLocaleString()} rows.</p>}
      <table className="w-full text-left text-paragraph-xsmall"><thead><tr>{data.columns.map((column, i) => <th key={i} scope="col" className="border-b border-stroke-default px-2 py-1 font-semibold">{column}</th>)}</tr></thead>
        <tbody>{data.rows.slice(0, 500).map((row, i) => <tr key={i}>{data.columns.map((_, k) => <td key={k} className="border-b border-stroke-subtle px-2 py-1">{row[k] ?? "Missing"}</td>)}</tr>)}</tbody>
      </table>
    </div>}
  </details>
}

function ChartCard({ title, chart, loading = false, problem, truncated = false, description, provenance, query, onRemove, themeKey, className }: ChartCardProps) {
  const titleId = React.useId()
  const content = (large = false) => loading
    ? <p role="status" className="py-6 text-center text-paragraph-xsmall text-texticons-tertiary">Running the query…</p>
    : problem
      ? <p role="status" className="py-1.5 text-paragraph-xsmall text-texticons-secondary">{problem}</p>
      : chart ? <Chart {...chart} label={title} large={large} themeKey={themeKey} />
        : <p className="py-1.5 text-paragraph-xsmall text-texticons-secondary">There is nothing to plot.</p>
  const note = truncated && <p className="pt-1.5 text-paragraph-xsmall text-texticons-secondary">Stopped at the first rows of the answer, so this is a prefix of the query rather than all of it. Aggregate in SQL for the whole picture.</p>
  return <section data-slot="chart-card" aria-labelledby={titleId} aria-busy={loading} className={cn("min-w-0 border-b border-stroke-default pt-1 pb-4 last:border-b-0", className)}>
    <div className="mb-1.5 flex items-baseline gap-2">
      <h3 id={titleId} title={title} className="min-w-0 flex-1 truncate text-chart-title text-texticons-primary">{title}</h3>
      <Modal><ModalTrigger asChild><button type="button" title={`Details for ${title}`} className="flex-none cursor-pointer rounded-sm px-0.5 text-paragraph-xsmall text-texticons-tertiary outline-none hover:text-texticons-primary focus-visible:shadow-focus">Details</button></ModalTrigger>
        <ModalContent title={title} description={description ?? provenance ?? "Chart details and source data."} className="max-h-[90vh] w-220 overflow-y-auto">
          <div className="flex flex-col gap-4">
            {description && provenance && <p className="text-paragraph-xsmall">{provenance}</p>}
            {content(true)}{note}
            {query && <pre className="overflow-auto rounded-md bg-background-medium px-3 py-2 font-mono text-chart-query whitespace-pre-wrap">{query.trim()}</pre>}
            {!loading && !problem && chart && <ChartDataTable chart={chart} />}
          </div>
        </ModalContent>
      </Modal>
      {onRemove && <button type="button" onClick={onRemove} aria-label={`Remove ${title}`} title={`Remove ${title}`} className="flex-none cursor-pointer rounded-sm px-0.5 text-texticons-tertiary outline-none hover:text-texticons-critical-primary focus-visible:shadow-focus"><CloseIcon size={14} /></button>}
    </div>
    {content()}{note}
  </section>
}

export { ChartCard }
export type { ChartCardProps }
