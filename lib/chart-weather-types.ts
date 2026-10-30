export type Column = readonly (number | null)[];
export interface Hours {
    readonly length: number;
    readonly month: Column;
    readonly dayOfYear: Column;
    readonly hourOfDay: Column;
    readonly dryBulb: Column;
    readonly dewPoint: Column;
    readonly relativeHumidity: Column;
    readonly humidityRatio: Column;
    readonly ghi: Column;
    readonly dni: Column;
    readonly globalIlluminance: Column;
    readonly windSpeed: Column;
    readonly windDirection: Column;
    readonly opaqueSkyCover: Column;
    readonly sunAltitude: Column;
    readonly sunAzimuth: Column;
}
