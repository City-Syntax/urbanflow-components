import type { ChartSpec } from "@/lib/chart-types"
import type { Hours } from "@/lib/chart-weather-types"
import { dateOf } from "@/lib/chart-date"

export function demoWeather(): Hours {
  const length = 8760
  const indices = Array.from({ length }, (_, i) => i)
  const day = (i: number) => Math.floor(i / 24) + 1
  const clock = (i: number) => i % 24
  const daylight = (i: number) => Math.max(0, Math.sin((clock(i) - 6) * Math.PI / 12))
  const temperature = (i: number) => 22 + 7 * Math.sin((day(i) - 90) * Math.PI / 182.5) + 4 * Math.sin((clock(i) - 8) * Math.PI / 12)
  return {
    length, month: indices.map(i => dateOf(day(i)).month), dayOfYear: indices.map(day), hourOfDay: indices.map(clock),
    dryBulb: indices.map(temperature), dewPoint: indices.map(i => temperature(i) - 8),
    relativeHumidity: indices.map(i => 55 + 15 * Math.cos(clock(i) * Math.PI / 12)),
    humidityRatio: indices.map(i => 0.008 + 0.005 * daylight(i)),
    ghi: indices.map(i => 800 * daylight(i)), dni: indices.map(i => 700 * daylight(i)),
    globalIlluminance: indices.map(i => 80000 * daylight(i)),
    windSpeed: indices.map(i => 1 + (i % 9)), windDirection: indices.map(i => (i * 17) % 360),
    opaqueSkyCover: indices.map(i => i % 11), sunAltitude: indices.map(i => 70 * Math.sin((clock(i) - 6) * Math.PI / 12)),
    sunAzimuth: indices.map(i => (90 + (clock(i) - 6) * 15 + 360) % 360),
  }
}

const monthly = { columns: ["Month", "Cooling (kWh)"], rows: Array.from({ length: 12 }, (_, i) => [i + 1, 23000 + Math.round(2600 * Math.sin(i / 3))]) }
export const EXAMPLES: readonly { title: string; chart: ChartSpec }[] = [
  { title: "Monthly ideal-loads cooling", chart: { kind: "bar", data: monthly } },
  { title: "Cooling and heating", chart: { kind: "line", data: { columns: ["Month", "Cooling", "Heating"], rows: monthly.rows.map(([m, value]) => [m, value, 28000 - value]) } } },
  { title: "Temperature against cooling", chart: { kind: "scatter", data: { columns: ["Temperature (°C)", "Cooling (kW)"], rows: Array.from({ length: 60 }, (_, i) => [18 + i / 5, 10 + i / 2 + Math.sin(i) * 4]) } } },
  { title: "Temperature range and mean", chart: { kind: "range", data: { columns: ["Month", "Minimum", "Maximum", "Mean"], rows: Array.from({ length: 12 }, (_, i) => [i + 1, 18 + Math.sin(i), 30 + Math.sin(i), 24 + Math.sin(i)]) } } },
  { title: "Daily temperature carpet", chart: { kind: "matrix", data: { columns: ["Day", "Hour", "°C"], rows: Array.from({ length: 30 * 24 }, (_, i) => [Math.floor(i / 24) + 1, i % 24, 24 + 6 * Math.sin(i / 24) * Math.cos(i % 24 / 4)]) } } },
  { title: "Temperature and moisture", chart: { kind: "psychro", data: { columns: ["°C", "g/kg", "Hours"], rows: Array.from({ length: 240 }, (_, i) => [14 + i % 20, 3 + Math.floor(i / 20), 1 + (i * 7) % 90]) } } },
  { title: "Wind direction and speed", chart: { kind: "rose", data: { columns: ["Direction", "All", "Under 6 m/s", "Under 3 m/s"], rows: ["N", "NE", "E", "SE", "S", "SW", "W", "NW"].map((d, i) => [d, 70 + i * 9, 45 + i * 7, 20 + i * 4]) } } },
  { title: "Sun path and temperature", chart: { kind: "sunpath", data: { columns: ["Azimuth", "Altitude", "°C"], rows: Array.from({ length: 180 }, (_, i) => [90 + i, 65 * Math.sin(i * Math.PI / 180), 18 + i / 12]) } } },
  { title: "Hourly cooling with baseline", chart: { kind: "hourly", unit: "kW", figure: { min: 1, max: 72, lines: [
    { label: "Current design", role: "series", slot: 0, points: Array.from({ length: 72 }, (_, i) => ({ x: i + 1, y: 20 + 15 * Math.max(0, Math.sin((i % 24 - 6) * Math.PI / 12)) })) },
    { label: "Baseline", role: "building", slot: 1, baseline: true, points: Array.from({ length: 72 }, (_, i) => ({ x: i + 1, y: 25 + 18 * Math.max(0, Math.sin((i % 24 - 6) * Math.PI / 12)) })) },
  ] } } },
]
