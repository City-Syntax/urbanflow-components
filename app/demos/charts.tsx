"use client"

import { useMemo, useState } from "react"
import Image from "next/image"
import { ChartCard } from "@/registry/ui/chart-card"
import { chartImage } from "@/registry/ui/chart"
import { WeatherCharts } from "@/registry/ui/weather-charts"
import { Button } from "@/registry/ui/button"
import { demoWeather, EXAMPLES } from "@/app/demos/chart-fixtures"

export function ChartsDemo({ compact = false }: { compact?: boolean }) {
  const [hidden, setHidden] = useState<string[]>([])
  const [image, setImage] = useState<string>()
  const weather = useMemo(() => compact ? undefined : demoWeather(), [compact])
  return <div className="flex flex-col gap-10">
    <div className="grid grid-cols-1 gap-x-8 gap-y-4 sm:grid-cols-2 lg:grid-cols-3">
      {EXAMPLES.slice(0, compact ? 3 : undefined).filter(example => !hidden.includes(example.title)).map(example => <ChartCard key={example.title} {...example} description="Illustrative data for reviewing the component. This is not a project result." provenance="Chart behavior ported from Flux; appearance uses Flow tokens." onRemove={() => setHidden(current => [...current, example.title])} />)}
    </div>
    {hidden.length > 0 && <div><Button variant="secondary" onClick={() => setHidden([])}>Restore removed charts</Button></div>}
    {!compact && <>
      <section className="flex flex-col gap-4"><h2 className="text-header-large">States</h2>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <ChartCard title="Loading" loading />
          <ChartCard title="Empty result" chart={{ kind: "bar", data: { columns: ["Month", "kWh"], rows: [] } }} />
          <ChartCard title="Invalid columns" chart={{ kind: "bar", data: { columns: ["Month"], rows: [[1]] } }} />
          <ChartCard title="Run unavailable" problem="This run is unavailable. Select another run to view its results." />
          <ChartCard title="Query error" problem="The query could not be completed. Check the selected columns and try again." query="SELECT month, cooling_kwh FROM monthly_results" />
          <ChartCard title="Truncated result" chart={EXAMPLES[0].chart} truncated query="SELECT month, cooling_kwh FROM monthly_results" />
        </div>
      </section>
      <section className="flex flex-col gap-4"><h2 className="text-header-large">Image export</h2>
        <p className="text-paragraph-small text-texticons-secondary">chartImage draws a chart off screen as an 800 by 400 PNG at twice the pixel density, with 13 px text and, when muted, the quieter palette used in reports.</p>
        <div><Button variant="secondary" onClick={() => void chartImage(EXAMPLES[1].chart, { muted: true }).then(setImage)}>Export “{EXAMPLES[1].title}” as an image</Button></div>
        {image && <Image src={image} alt={`${EXAMPLES[1].title}, exported`} width={800} height={400} unoptimized className="h-auto w-full max-w-[800px] border border-stroke-default" />}
      </section>
      <section className="flex flex-col gap-4"><h2 className="text-header-large">Weather charts</h2>
        <p className="text-paragraph-small text-texticons-secondary">All 18 weather analyses from Flux, using a generated year of illustrative weather. These are component examples, not a climate assessment.</p>
        {weather && <WeatherCharts hours={weather} />}
      </section>
    </>}
  </div>
}
