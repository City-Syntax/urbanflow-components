import assert from "node:assert/strict"
import { readFileSync } from "node:fs"
import { test } from "node:test"
import { chartConfig } from "../lib/chart-config"
import { hourLabel } from "../lib/chart-date"
import { timeConfig } from "../lib/chart-hourly"
import { ramp, type ChartTheme } from "../lib/chart-theme"
import { WEATHER_CHARTS, buildWeatherCharts } from "../lib/chart-weather-catalog"
import { demoWeather, EXAMPLES } from "../app/demos/chart-fixtures"

const css = readFileSync("packages/theme/theme.css", "utf8")
const color = (token: string): string => {
  const value = new RegExp(`--color-${token}:\\s*([^;]+);`).exec(css)?.[1]
  assert.ok(value, `Missing Flow token ${token}`)
  const alias = /^var\(--color-(.+)\)$/.exec(value)
  return alias ? color(alias[1]) : value
}
const theme: ChartTheme = {
  series: ["info-heavy", "critical-heavy", "success-primary", "misc-orange", "magic-primary", "neutral-80"].map(color),
  text: color("texticons-secondary"), grid: color("stroke-default"), gridStrong: color("stroke-strong"),
  accent: color("info-primary"), reference: color("neutral-30"), ink: color("texticons-emphasis"), critical: color("critical-heavy"),
  font: "Figtree", fontSize: 10,
  sequential: Array.from({ length: 21 }, (_, i) => color(`chart-ramp-sequential-${i}`)),
  diverging: Array.from({ length: 21 }, (_, i) => color(`chart-ramp-diverging-${i}`)),
}

test("scatter uses numeric x values and preserves missing y rather than inventing zeros", () => {
  const result = chartConfig({ kind: "scatter", theme, data: { columns: ["Temperature", "Load"], rows: [[10, 2], [40, null], ["bad", 3], [90, " "], [100, "4.5"]] } })
  assert.ok("config" in result)
  assert.deepEqual(result.config.data.datasets[0].data, [{ x: 10, y: 2 }, { x: 40, y: null }, { x: 90, y: null }, { x: 100, y: 4.5 }])
})

test("empty, invalid and nonnumeric results return meaningful states", () => {
  for (const data of [{ columns: ["x"], rows: [[1]] }, { columns: ["x", "y"], rows: [] }, { columns: ["x", "y"], rows: [["a", "no"]] }]) {
    assert.ok("problem" in chartConfig({ kind: "bar", theme, data }))
  }
  assert.ok("problem" in chartConfig({ kind: "line", linearX: true, theme, data: { columns: ["x", "y"], rows: [["bad", 1]] } }))
})

test("floating ranges leave an incomplete pair missing", () => {
  const result = chartConfig({ kind: "range", theme, data: { columns: ["Month", "Low", "High"], rows: [[1, 15, 25], [2, null, 30]] } })
  assert.ok("config" in result)
  assert.deepEqual(result.config.data.datasets[0].data, [[15, 25], null])
})

test("matrix excludes missing cells and supports large result sets without spread overflow", () => {
  const rows = Array.from({ length: 150000 }, (_, i) => [i, 1, i % 20])
  const result = chartConfig({ kind: "matrix", theme, data: { columns: ["x", "y", "value"], rows: [...rows, [1, 2, null], [2, 2, Infinity]] } })
  assert.ok("config" in result)
  assert.equal(result.config.data.datasets[0].data.length, rows.length)
})

test("all nine chart forms build, including hourly roles and gaps", () => {
  assert.equal(new Set(EXAMPLES.map(e => e.chart.kind)).size, 9)
  for (const { chart } of EXAMPLES) {
    if (chart.kind === "hourly") {
      const config = timeConfig(chart.figure, chart.unit ?? "", theme)
      assert.equal(config.data.datasets.length, 2)
    } else {
      assert.ok(!("problem" in chart.data))
      assert.ok("config" in chartConfig({ ...chart, data: chart.data, theme }))
    }
  }
  const config = timeConfig({ min: 1, max: 3, lines: [{ role: "series", slot: 0, label: "Load", points: [{ x: 1, y: 1 }, { x: 2, y: null }, { x: 3, y: 3 }] }] }, "kW", theme)
  assert.deepEqual(config.data.datasets[0].data, [{ x: 1, y: 1 }, { x: 2, y: null }, { x: 3, y: 3 }])
})

test("hour-ending labels preserve Flux boundaries", () => {
  assert.equal(hourLabel(1), "1 Jan 01:00")
  assert.equal(hourLabel(24), "1 Jan 24:00")
  assert.equal(hourLabel(25), "2 Jan 01:00")
  assert.equal(hourLabel(8760), "31 Dec 24:00")
})

test("all 18 weather definitions produce renderable data; missing inputs stay explicit", () => {
  assert.equal(WEATHER_CHARTS.length, 18)
  assert.equal(new Set(WEATHER_CHARTS.map(c => c.id)).size, 18)
  const weather = demoWeather()
  for (const { chart, built } of buildWeatherCharts(weather)) {
    assert.ok(!("problem" in built), chart.id)
    assert.ok("config" in chartConfig({ kind: chart.kind, data: built, theme, linearX: chart.linearX }), chart.id)
  }
  const missing = { ...weather, dryBulb: Array(weather.length).fill(null), humidityRatio: Array(weather.length).fill(null) }
  const charts = buildWeatherCharts(missing)
  for (const id of ["epw-carpet-temp", "epw-monthly-range", "epw-psychrometric"]) {
    assert.ok("problem" in charts.find(item => item.chart.id === id)!.built, id)
  }
})

test("ramps clamp to the Flow stops, and every chart registry import ships transitively", () => {
  assert.equal(ramp(-1, true, theme), ramp(0, true, theme))
  assert.equal(ramp(2, false, theme), ramp(1, false, theme))
  const registry = JSON.parse(readFileSync("registry.json", "utf8")) as { items: { name: string; files: { path: string }[]; registryDependencies?: string[] }[] }
  const files = new Set<string>()
  function visit(name: string) {
    const item = registry.items.find(i => i.name === name)
    assert.ok(item, `Missing registry dependency ${name}`)
    item.files.forEach(f => files.add(f.path))
    item.registryDependencies?.forEach(url => visit(url.split("/").pop()!.replace(".json", "")))
  }
  visit("weather-charts")
  for (const file of files) {
    const content = readFileSync(file, "utf8")
    for (const match of content.matchAll(/from ["']@\/([^"']+)["']/g)) {
      assert.ok(files.has(`${match[1]}.ts`) || files.has(`${match[1]}.tsx`), `${file} has unpackaged import ${match[1]}`)
    }
  }
})
