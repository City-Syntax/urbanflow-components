import { readFileSync } from "node:fs";
import { join } from "node:path";
import * as Icons from "@urbanflow/icons";

// Tokens are read straight from theme.css so this page never drifts from the package.
const themeCss = readFileSync(join(process.cwd(), "packages/theme/theme.css"), "utf8");
const [figmaCss, shadcnCss] = themeCss.split(":root {");
const tokens = (prefix: string, css = figmaCss) =>
  [...css.matchAll(new RegExp(`--${prefix}-([a-z0-9-]+?):\\s*([^;]+);`, "g"))]
    .filter(([, name]) => !name.includes("--"))
    .map(([, name, value]) => ({ name, value: value.trim(), swatch: `var(--${prefix}-${name})` }));

const colorGroups = {
  ...Object.groupBy(tokens("color"), ({ name }) => name.split("-")[0]),
  // shadcn semantic tokens, e.g. bg-primary → var(--primary) → the Figma colour it maps to
  shadcn: tokens("color", shadcnCss.split("@layer")[0]).filter(({ value }) => !value.includes("calc"))
    .map((t) => ({ ...t, swatch: t.value })),
};
const iconEntries = Object.entries(Icons).filter(([name]) => name.endsWith("Icon"));

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="flex flex-col gap-4">
      <h2 className="text-header-large">{title}</h2>
      {children}
    </section>
  );
}

export default function Home() {
  return (
    <main className="mx-auto flex max-w-5xl flex-col gap-12 px-4 py-10">
      <header className="flex flex-col gap-1">
        <h1 className="text-header-xxlarge">UrbanFlow Components</h1>
        <p className="text-paragraph-medium text-content-secondary">
          Tokens from <code className="font-mono">@urbanflow/theme</code>, icons from{" "}
          <code className="font-mono">@urbanflow/icons</code>.
        </p>
      </header>

      <Section title="Colours">
        {Object.entries(colorGroups).map(([group, colors]) => (
          <div key={group} className="flex flex-col gap-2">
            <h3 className="text-label-medium capitalize">{group}</h3>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-6">
              {colors!.map(({ name, value, swatch }) => (
                <div key={name} className="flex flex-col gap-1">
                  <div className="h-12 rounded-md border" style={{ background: swatch }} />
                  <span className="text-label-xsmall">{name}</span>
                  <span className="font-mono text-paragraph-xsmall text-content-secondary">{value}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </Section>

      <Section title="Typography">
        <div className="flex flex-col gap-3">
          {tokens("text").map(({ name, value }) => (
            <div key={name} className="flex items-baseline gap-4 border-b pb-3">
              <span className="w-40 shrink-0 font-mono text-paragraph-xsmall text-content-secondary">
                text-{name} · {value}
              </span>
              <span className={name.startsWith("metric") ? "font-mono" : undefined} style={{ fontSize: `var(--text-${name})`, lineHeight: `var(--text-${name}--line-height)`, fontWeight: `var(--text-${name}--font-weight)` }}>
                {name.startsWith("metric") ? "1,284.50" : "Urban flow across the city"}
              </span>
            </div>
          ))}
        </div>
      </Section>

      <Section title="Shadows & radius">
        <div className="flex flex-wrap gap-6">
          {tokens("shadow").map(({ name }) => (
            <div key={name} className="flex size-28 items-end rounded-lg bg-card p-3 text-label-xsmall" style={{ boxShadow: `var(--shadow-${name})` }}>
              shadow-{name}
            </div>
          ))}
          {["sm", "md", "lg", "xl"].map((r) => (
            <div key={r} className="flex size-28 items-end border bg-muted p-3 text-label-xsmall" style={{ borderRadius: `var(--radius-${r})` }}>
              rounded-{r}
            </div>
          ))}
        </div>
      </Section>

      <Section title={`Icons (${iconEntries.length})`}>
        <div className="grid grid-cols-3 gap-3 sm:grid-cols-5 lg:grid-cols-8">
          {iconEntries.map(([name, Icon]) => (
            <div key={name} className="flex flex-col items-center gap-2 rounded-md border p-3 text-content-secondary">
              <div className="flex items-end gap-2">
                <Icon size={14} />
                <Icon size={16} />
                <Icon size={20} />
              </div>
              <span className="text-center text-paragraph-xsmall">{name.slice(0, -4)}</span>
            </div>
          ))}
        </div>
      </Section>
    </main>
  );
}
