import { readFileSync } from "node:fs";
import { join } from "node:path";
import * as Icons from "@urbanflow/icons";
import { ArrowRightIcon, DrawWallIcon, LayoutIcon, PencilIcon, SearchIcon, TrashIcon } from "@urbanflow/icons";

import { CommentsDemo } from "@/app/demos/comments";
import { ComplianceDemo } from "@/app/demos/compliance";
import { FilesDemo } from "@/app/demos/files";
import { InputsDemo } from "@/app/demos/inputs";
import { NavigationDemo } from "@/app/demos/navigation";
import { OverlaysDemo } from "@/app/demos/overlays";
import { SmallDemo } from "@/app/demos/small";
import { UrbanflowDemo } from "@/app/demos/urbanflow";
import { Badge } from "@/registry/ui/badge";
import { Button } from "@/registry/ui/button";
import { Checkbox } from "@/registry/ui/checkbox";
import { IconButton, IconButtonGroup } from "@/registry/ui/icon-button";
import { Toggle } from "@/registry/ui/toggle";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/registry/ui/tooltip";

// Tokens are read straight from theme.css so this page never drifts from the package.
const themeCss = readFileSync(join(process.cwd(), "packages/theme/theme.css"), "utf8");
const tokens = (prefix: string, css = themeCss) =>
  [...css.matchAll(new RegExp(`--${prefix}-([a-z0-9-]+?):\\s*([^;]+);`, "g"))]
    .filter(([, name]) => !name.includes("--"))
    .map(([, name, value]) => ({ name, value: value.trim(), swatch: `var(--${prefix}-${name})` }));

// Grouped like Figma: Background, TextIcons, Stroke, then the Semantic, Neutrals and Misc palettes.
const figmaGroup = (name: string) =>
  ["background", "texticons", "stroke", "neutral", "misc"].find((g) => name.startsWith(`${g}-`)) ?? "semantic";
const colorGroups = Object.groupBy(tokens("color"), ({ name }) => figmaGroup(name));
const groupTitles: Record<string, string> = {
  background: "Background", texticons: "TextIcons", stroke: "Stroke", semantic: "Semantic", neutral: "Neutrals", misc: "Misc",
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
        <h1 className="text-header-xxlarge">urbanflow components</h1>
        <p className="text-paragraph-medium text-texticons-secondary">
          Tokens from <code className="font-mono">@urbanflow/theme</code>, icons from{" "}
          <code className="font-mono">@urbanflow/icons</code>.
        </p>
      </header>

      <Section title="Colours">
        {Object.keys(groupTitles).map((g) => [g, colorGroups[g]] as const).map(([group, colors]) => (
          <div key={group} className="flex flex-col gap-2">
            <h3 className="text-label-medium">{groupTitles[group]}</h3>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-6">
              {colors!.map(({ name, value, swatch }) => (
                <div key={name} className="flex flex-col gap-1">
                  <div className="h-12 rounded-md border" style={{ background: swatch }} />
                  <span className="text-label-xsmall">{name}</span>
                  <span className="font-mono text-paragraph-xsmall text-texticons-secondary">{value}</span>
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
              <span className="w-40 shrink-0 font-mono text-paragraph-xsmall text-texticons-secondary">
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
            <div key={name} className="flex size-28 items-end rounded-lg bg-background-card p-3 text-label-xsmall" style={{ boxShadow: `var(--shadow-${name})` }}>
              shadow-{name}
            </div>
          ))}
          {["none", "xs", "sm", "md", "lg", "full"].map((r) => (
            <div key={r} className="flex size-28 items-end border bg-background-light p-3 text-label-xsmall" style={{ borderRadius: `var(--radius-${r})` }}>
              rounded-{r}
            </div>
          ))}
        </div>
      </Section>

      <Section title="Button">
        <div className="overflow-x-auto">
          <table className="border-separate border-spacing-3 text-left">
            <thead className="text-label-xsmall text-texticons-secondary">
              <tr>
                <th />
                {(["default", "critical", "success"] as const).map((tone) => (
                  <th key={tone}>{tone}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {(["primary", "secondary", "tertiary", "plain"] as const).map((variant) => (
                <tr key={variant}>
                  <th className="pr-4 text-label-xsmall text-texticons-secondary">{variant}</th>
                  {(["default", "critical", "success"] as const).map((tone) => (
                    <td key={tone}>
                      <div className="flex items-center gap-2">
                        {(["micro", "medium", "large"] as const).map((size) => (
                          <Button key={size} variant={variant} tone={tone} size={size}>
                            {size}
                          </Button>
                        ))}
                      </div>
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <Button disabled>Disabled</Button>
          <Button variant="secondary" disabled>Disabled</Button>
          <Button loading>Loading</Button>
          <Button variant="secondary" loading>Loading</Button>
          <Button variant="secondary" aria-pressed>Pressed</Button>
          <Button variant="tertiary" aria-pressed>Pressed</Button>
          <Button>
            Continue <ArrowRightIcon />
          </Button>
          {(["icon-micro", "icon", "icon-large"] as const).map((size) => (
            <Button key={size} variant="secondary" size={size} aria-label="Next">
              <ArrowRightIcon />
            </Button>
          ))}
        </div>
      </Section>

      <Section title="Icon Button">
        <div className="flex flex-wrap items-center gap-6">
          {(["secondary", "tertiary", "primary"] as const).map((variant) => (
            <div key={variant} className="flex items-center gap-2">
              {(["micro", "medium", "large"] as const).map((size) => (
                <IconButton key={size} variant={variant} size={size} label={`Edit (${size})`}>
                  <PencilIcon />
                </IconButton>
              ))}
            </div>
          ))}
          <IconButton variant="secondary" tone="critical" label="Delete"><TrashIcon /></IconButton>
          <IconButton variant="tertiary" label="Draw wall" selected><DrawWallIcon /></IconButton>
          <IconButton variant="secondary" label="Disabled" disabled><PencilIcon /></IconButton>
        </div>
        <div className="flex items-start gap-6 rounded-lg bg-background-light p-6">
          <IconButtonGroup label="Drawing tools">
            <IconButton variant="tertiary" label="Select" selected><LayoutIcon /></IconButton>
            <IconButton variant="tertiary" label="Draw wall"><DrawWallIcon /></IconButton>
            <IconButton variant="tertiary" label="Search"><SearchIcon /></IconButton>
          </IconButtonGroup>
          <IconButtonGroup label="Vertical tools" orientation="vertical">
            <IconButton variant="tertiary" label="Select"><LayoutIcon /></IconButton>
            <IconButton variant="tertiary" label="Draw wall" selected><DrawWallIcon /></IconButton>
          </IconButtonGroup>
        </div>
      </Section>

      <Section title="Inputs">
        <InputsDemo />
      </Section>

      <Section title="Tabs, segmented control & headers">
        <NavigationDemo />
      </Section>

      <Section title="Action list, modal, toast & banner">
        <OverlaysDemo />
      </Section>

      <Section title="Badge">
        <div className="flex flex-wrap items-center gap-3">
          {(["default", "info", "critical"] as const).map((type) => (
            <div key={type} className="flex items-center gap-2">
              <Badge type={type}>Label</Badge>
              <Badge type={type} shape="number">12</Badge>
              <Badge type={type} shape="small-number">3</Badge>
            </div>
          ))}
        </div>
      </Section>

      <Section title="Color indicator, avatar, chips & scroll">
        <SmallDemo />
      </Section>

      <Section title="Checkbox & Toggle">
        <div className="flex flex-wrap items-center gap-6">
          <Checkbox label="Unchecked" />
          <Checkbox label="Checked" defaultChecked />
          <Checkbox label="Indeterminate" defaultChecked="indeterminate" />
          <Checkbox label="Disabled" disabled />
          <Checkbox label="Disabled checked" disabled defaultChecked />
          <Checkbox variant="icon" aria-label="Hide layer" />
          <Checkbox variant="icon" aria-label="Show layer" defaultChecked />
          <Checkbox variant="icon" aria-label="Partly hidden" defaultChecked="indeterminate" />
        </div>
        <div className="flex flex-wrap items-center gap-6">
          <Toggle label="Off" />
          <Toggle label="On" defaultChecked />
          <Toggle label="Disabled" disabled />
          <Toggle label="Disabled on" disabled defaultChecked />
        </div>
      </Section>

      <Section title="Tooltip">
        <div className="flex items-center gap-6 py-8">
          {(["top", "bottom", "left", "right"] as const).map((side) => (
            <Tooltip key={side} defaultOpen={side === "top"}>
              <TooltipTrigger asChild>
                <Button variant="secondary">{side}</Button>
              </TooltipTrigger>
              <TooltipContent side={side}>Tooltip label</TooltipContent>
            </Tooltip>
          ))}
        </div>
      </Section>

      <Section title="↪ Urbanflow">
        <UrbanflowDemo />
      </Section>

      <Section title="↪ Compliance">
        <ComplianceDemo />
      </Section>

      <Section title="↪ Comments">
        <CommentsDemo />
      </Section>

      <Section title="↪ Files">
        <FilesDemo />
      </Section>

      <Section title={`Icons (${iconEntries.length})`}>
        <div className="grid grid-cols-3 gap-3 sm:grid-cols-5 lg:grid-cols-8">
          {iconEntries.map(([name, Icon]) => (
            <div key={name} className="flex flex-col items-center gap-2 rounded-md border p-3 text-texticons-secondary">
              <div className="flex items-end gap-2">
                <Icon size={14} />
                <Icon size={16} />
                <Icon size={20} />
              </div>
              <span className="w-full truncate text-center text-paragraph-xsmall" title={name}>{name.slice(0, -4)}</span>
            </div>
          ))}
        </div>
      </Section>
    </main>
  );
}
