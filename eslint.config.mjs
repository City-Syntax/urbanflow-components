import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

export default defineConfig([
  ...nextVitals,
  ...nextTs,
  {
    files: ["registry/**"],
    rules: { "@next/next/no-img-element": "off" },
  },
  globalIgnores([".next/**", "public/r/**", "packages/*/dist/**", "packages/icons/src/**", "next-env.d.ts"]),
]);
