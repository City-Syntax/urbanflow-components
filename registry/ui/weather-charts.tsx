"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import { buildWeatherCharts, SECTIONS } from "@/lib/chart-weather-catalog"
import type { Hours } from "@/lib/chart-weather-types"
import { ChartCard } from "@/registry/ui/chart-card"

interface WeatherChartsProps {
  hours: Hours
  hiddenIds?: readonly string[] | undefined
  onRemove?: ((id: string) => void) | undefined
  className?: string | undefined
  themeKey?: string | number | undefined
}

function WeatherCharts({ hours, hiddenIds = [], onRemove, className, themeKey }: WeatherChartsProps) {
  const charts = React.useMemo(() => buildWeatherCharts(hours), [hours])
  return <div data-slot="weather-charts" className={cn("flex min-w-0 flex-col gap-6", className)}>
    {SECTIONS.map(section => {
      const visible = charts.filter(({ chart }) => chart.section === section && !hiddenIds.includes(chart.id))
      if (!visible.length) return null
      return <section key={section} aria-label={section} className="flex min-w-0 flex-col gap-3">
        <h3 className="text-header-small">{section}</h3>
        <div className="grid min-w-0 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {visible.map(({ chart, built }) => <ChartCard key={chart.id} title={chart.title} description={chart.description} provenance={chart.section}
            chart={{ kind: chart.kind, data: built, ...(chart.linearX === undefined ? {} : { linearX: chart.linearX }) }}
            onRemove={onRemove ? () => onRemove(chart.id) : undefined} themeKey={themeKey} />)}
        </div>
      </section>
    })}
  </div>
}

export { WeatherCharts }
export type { WeatherChartsProps }
export type { Hours as WeatherHours } from "@/lib/chart-weather-types"
export { WEATHER_CHARTS, buildWeatherCharts } from "@/lib/chart-weather-catalog"
