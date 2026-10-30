import type { Built } from '@/lib/chart-weather-chart-data';
import { adaptiveBand, hoursByCondition, nightPurge, psychrometric, } from '@/lib/chart-weather-comfort';
import type { Hours } from '@/lib/chart-weather-types';
import { missingReadings } from '@/lib/chart-weather-quality';
import { carpetRadiation, facadeBeam, skyCover, sunPath } from '@/lib/chart-weather-sun';
import { carpetDryBulb, degreeDaysByMonth, diurnalSwing, durationCurve, hottestMonthEnvelope, monthlyRange, typicalDay, } from '@/lib/chart-weather-temperature';
import { ventilationRose, windRose } from '@/lib/chart-weather-wind';
type WeatherChartKind = 'bar' | 'line' | 'range' | 'matrix' | 'psychro' | 'rose' | 'sunpath';
export const SECTIONS = [
    'Temperature',
    'Sun',
    'Wind',
    'Moisture and comfort',
    'The file',
] as const;
export type Section = (typeof SECTIONS)[number];
export interface WeatherChart {
    readonly id: string;
    readonly section: Section;
    readonly title: string;
    readonly description: string;
    readonly kind: WeatherChartKind;
    readonly linearX?: true;
    readonly build: (hours: Hours) => Built;
}
export const WEATHER_CHARTS: readonly WeatherChart[] = [
    {
        id: 'epw-carpet-temp',
        section: 'Temperature',
        title: 'Dry bulb through the year (°C)',
        kind: 'matrix',
        description: 'Every hour of the year: day across, hour of day up. The only chart ' +
            'that shows season and time of day at once, which is how you see when ' +
            'the cooling season really starts and whether the heat is a daytime ' +
            'event or a round-the-clock one. A line of 8,760 points cannot show ' +
            'it: at this width each pixel column holds about fifteen hours.',
        build: carpetDryBulb,
    },
    {
        id: 'epw-monthly-range',
        section: 'Temperature',
        title: 'Monthly range and mean (°C)',
        kind: 'range',
        description: 'The floor and ceiling of each month with its mean drawn through. A ' +
            'floating bar rather than three bars from zero, because a range is ' +
            'one quantity and three zero-anchored bars read as three.',
        build: monthlyRange,
    },
    {
        id: 'epw-typical-day',
        section: 'Temperature',
        title: 'Typical day by season (°C)',
        kind: 'line',
        description: 'The average day in each of four months, hour by hour. Hour 0 is ' +
            'midnight: an EPW hour is hour-ending, so its hour 1 is this ' +
            'chart’s hour 0.',
        build: typicalDay,
    },
    {
        id: 'epw-hot-month-envelope',
        section: 'Temperature',
        title: 'The hottest month, hour by hour (°C)',
        kind: 'line',
        description: 'Coldest, mean and warmest reading at each hour of the hottest month. ' +
            'The gap between the top and bottom lines is how much the days vary; ' +
            'the gap between the ends of the mean line is the diurnal swing, ' +
            'which is what decides whether night purge buys anything.',
        build: hottestMonthEnvelope,
    },
    {
        id: 'epw-swing',
        section: 'Temperature',
        title: 'Diurnal swing by month (K)',
        kind: 'bar',
        description: 'How far each day travels between its low and its high, averaged over ' +
            'the month, with the largest single day beside it. Above about ten ' +
            'kelvin thermal mass and night ventilation are worth designing for; ' +
            'below about six they are not.',
        build: diurnalSwing,
    },
    {
        id: 'epw-degree-days',
        section: 'Temperature',
        title: 'Degree days by month',
        kind: 'bar',
        description: 'Heating to a base of 18 °C and cooling to 10 °C, counted from the ' +
            'mean of each day’s 24 readings - not the midrange of its high and ' +
            'low, which is the other convention in use and differs by a few per ' +
            'cent. The balance between the bars is the balance of the climate.',
        build: degreeDaysByMonth,
    },
    {
        id: 'epw-duration',
        section: 'Temperature',
        title: 'Temperature duration curve (°C)',
        kind: 'line',
        linearX: true,
        description: 'Every hour sorted from warmest to coldest. Read across from a ' +
            'temperature to see how many hours are above it - the question ' +
            'behind plant sizing, free cooling and overheating limits alike. ' +
            'How few hours the extremes occupy is usually the surprise.',
        build: durationCurve,
    },
    {
        id: 'epw-carpet-solar',
        section: 'Sun',
        title: 'Global horizontal radiation through the year (Wh/m²)',
        kind: 'matrix',
        description: 'The same grid for solar. The pale band across the middle is night, ' +
            'and its width through the year is the day length. Compare it with ' +
            'the temperature carpet: the lag between peak sun and peak heat is ' +
            'the thermal mass of the place.',
        build: carpetRadiation,
    },
    {
        id: 'epw-sunpath',
        section: 'Sun',
        title: 'Sun path, coloured by temperature (°C)',
        kind: 'sunpath',
        description: 'Every daylight hour of the year plotted where the sun was, looking ' +
            'up: north at the top, the horizon at the rim, the zenith at the ' +
            'centre. Colour is dry bulb, which shows whether the hot hours ' +
            'arrive with the sun or several hours after it.',
        build: sunPath,
    },
    {
        id: 'epw-facade-solar',
        section: 'Sun',
        title: 'Beam radiation on a vertical facade (kWh/m²)',
        kind: 'bar',
        description: 'Direct sun striking a wall of each orientation, summed from the sun ' +
            'position computed for every hour, split into the warm and cold ' +
            'halves of the year. The split is the point: the facade you shade ' +
            'and the facade you glaze are not the same one, and an annual total ' +
            'hides that.',
        build: facadeBeam,
    },
    {
        id: 'epw-sky',
        section: 'Sun',
        title: 'Clear and overcast hours by month',
        kind: 'bar',
        description: 'Counted on opaque sky cover, which is the part that actually blocks ' +
            'the sun and the part that matters for longwave loss to the night ' +
            'sky. Clear is two tenths or less, overcast eight or more. This is ' +
            'the daylight availability question, and the night-sky cooling one.',
        build: skyCover,
    },
    {
        id: 'epw-wind-rose',
        section: 'Wind',
        title: 'Wind rose, all hours',
        kind: 'rose',
        description: 'Where the wind comes from and how hard. The rings are speed bands ' +
            'read from the outside in: the outer petal is every hour from that ' +
            'direction, the next only those under 6 m/s, the innermost only ' +
            'those under 3. Calm hours are excluded, because an EPW records no ' +
            'meaningful direction for them and including them piles a false ' +
            'spike on north.',
        build: windRose,
    },
    {
        id: 'epw-wind-vent',
        section: 'Wind',
        title: 'Wind rose, hours you would open a window',
        kind: 'rose',
        description: 'The same rose, filtered to daytime hours between 18 and 26 °C - the ' +
            'hours when cross ventilation is actually wanted. This is the ' +
            'question the annual rose gets asked and cannot answer, and no ' +
            'mainstream tool shows it by default. Where it differs from the ' +
            'rose above, the annual one is the misleading of the two.',
        build: ventilationRose,
    },
    {
        id: 'epw-psychrometric',
        section: 'Moisture and comfort',
        title: 'Hours by temperature and moisture',
        kind: 'psychro',
        description: 'A psychrometric chart in the round: dry bulb across, humidity ratio ' +
            'in grams per kilogram of dry air up, colour by how many hours land ' +
            'in each cell. Humidity ratio rather than relative humidity, because ' +
            'RH is a ratio against a temperature-dependent denominator and ' +
            'cannot be compared between two temperatures. The dashed box is a ' +
            'simplified ASHRAE 55 comfort zone - the real one depends on ' +
            'clothing, activity, air speed and radiant temperature, none of ' +
            'which a weather file knows, so read it as an orientation.',
        build: psychrometric,
    },
    {
        id: 'epw-adaptive',
        section: 'Moisture and comfort',
        title: 'Adaptive comfort band (°C)',
        kind: 'line',
        linearX: true,
        description: 'The ASHRAE 55 adaptive model, which sets a comfort temperature from ' +
            'the running mean of the last thirty days rather than from a fixed ' +
            'setpoint - people in naturally ventilated buildings acclimatise. ' +
            'Where the daily mean sits inside the 80% band, the building can be ' +
            'run on outside air. This is the free-running feasibility question, ' +
            'answered with the model the standard actually specifies instead of ' +
            'a fixed box.',
        build: adaptiveBand,
    },
    {
        id: 'epw-night-purge',
        section: 'Moisture and comfort',
        title: 'Night hours below 20 °C, by month',
        kind: 'bar',
        description: 'Hours between 22:00 and 06:00 cool enough to purge a building with ' +
            'outside air. Per month, because what matters is whether the nights ' +
            'are cool in the months the days are hot - an annual total hides ' +
            'exactly that.',
        build: nightPurge,
    },
    {
        id: 'epw-hours',
        section: 'Moisture and comfort',
        title: 'Hours of the year, by condition',
        kind: 'bar',
        description: 'What the year is made of. The comfort band here is a plain rectangle ' +
            'rather than ASHRAE 55, so treat it as orientation. The economiser ' +
            'and humid counts usually decide something: free cooling is worth ' +
            'having in proportion to the first, latent load in proportion to ' +
            'the second.',
        build: hoursByCondition,
    },
    {
        id: 'epw-quality',
        section: 'The file',
        title: 'Missing readings, by column',
        kind: 'bar',
        description: 'How much of the file is actually there. An EPW marks a gap with a ' +
            'run of nines rather than a blank, so a reader that does not know ' +
            'the sentinels charts 9999 W/m² of radiation and 99.9 °C of air. ' +
            'These are the ones this parser turned into nulls. A column that is ' +
            'mostly missing is worth knowing about before a simulation, not ' +
            'after it.',
        build: missingReadings,
    },
];
export interface BuiltChart {
    readonly chart: WeatherChart;
    readonly built: Built;
}
export function buildWeatherCharts(hours: Hours): readonly BuiltChart[] {
    return WEATHER_CHARTS.map((chart) => ({ chart, built: chart.build(hours) }));
}
