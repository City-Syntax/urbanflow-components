"use client"

import * as React from "react"
import { AddIcon } from "@urbanflow/icons"

import { Badge } from "@/registry/ui/badge"
import { BuildingHeader, BuildingSelect } from "@/registry/ui/building-select"
import { Button } from "@/registry/ui/button"
import { HybridButtonGroup } from "@/registry/ui/hybrid-button-group"
import { IconButton } from "@/registry/ui/icon-button"
import { OutputSelect } from "@/registry/ui/output-select"
import { TemplateSelect } from "@/registry/ui/template-select"
import { Thumbnail } from "@/registry/ui/thumbnail"

export function UrbanflowDemo() {
  const [open, setOpen] = React.useState(true)
  const [floorsOpen, setFloorsOpen] = React.useState(true)
  const [selected, setSelected] = React.useState("L2")
  const [output, setOutput] = React.useState("p1")
  const [template, setTemplate] = React.useState("square")
  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-wrap items-start gap-8">
        <div className="w-72 rounded-lg bg-background-default p-2 inset-ring inset-ring-stroke-default">
          <BuildingHeader
            title="Buildings"
            count={2}
            collapsed={!open}
            onToggle={() => setOpen(!open)}
            action={
              <IconButton variant="tertiary" size="micro" label="Add building">
                <AddIcon />
              </IconButton>
            }
          />
          {open && (
            <div role="tree" aria-label="Buildings">
              <BuildingSelect
                label="Tower A"
                hasChildren
                expanded={floorsOpen}
                onToggle={() => setFloorsOpen(!floorsOpen)}
                count={3}
                onAdd={() => {}}
                onMore={() => {}}
              />
              {floorsOpen && (
                <>
                  <BuildingSelect hierarchy="child" label="L1 · Lobby" selected={selected === "L1"} onClick={() => setSelected("L1")} />
                  <BuildingSelect
                    hierarchy="child"
                    label="L2–L20 · Office"
                    hasChildren
                    expanded
                    selected={selected === "L2"}
                    onClick={() => setSelected("L2")}
                  />
                  <BuildingSelect hierarchy="2ndChild" label="Zone 1" />
                  <BuildingSelect
                    depth={2}
                    label="Zone 2"
                    hasChildren
                    expanded
                    trailing={<span className="font-mono text-paragraph-xsmall text-texticons-secondary">84 m²</span>}
                  />
                  <BuildingSelect
                    depth={3}
                    label="South wall"
                    hasChildren
                    expanded
                    trailing={<span className="font-mono text-paragraph-xsmall text-texticons-secondary">32 m²</span>}
                  />
                  <BuildingSelect depth={4} label="Window" last />
                  <BuildingSelect depth={2} label="Zone 3" last />
                  <BuildingSelect hierarchy="child" label="Roof" last selected={selected === "R"} onClick={() => setSelected("R")} />
                </>
              )}
              <BuildingSelect label="Podium" hasChildren onToggle={() => {}} />
            </div>
          )}
        </div>
        <div className="flex flex-col items-start gap-4 rounded-lg bg-background-light p-6">
          <HybridButtonGroup context="Tower A · L2" action={<Button variant="primary" size="micro">Done</Button>} />
          <HybridButtonGroup status="Drawing" context="Wall" action={<Button variant="secondary" size="micro">Cancel</Button>} />
          <div className="flex items-end gap-3">
            <Thumbnail size="xsmall" />
            <Thumbnail size="small" />
            <Thumbnail size="medium" />
            <Thumbnail size="large" />
            <Thumbnail size="medium" transparent />
          </div>
        </div>
      </div>
      <div className="flex flex-wrap items-start gap-4">
        {[
          { id: "p1", title: "Proposal 1", eui: "142", carbon: "812" },
          { id: "p2", title: "Proposal 2", eui: "128", carbon: "760" },
        ].map((p) => (
          <OutputSelect
            key={p.id}
            title={p.title}
            meta="Run 2 days ago"
            bordered
            selected={output === p.id}
            onClick={() => setOutput(p.id)}
            onMore={() => {}}
            badges={<Badge type="info">Retrofit</Badge>}
            metrics={[
              { label: "Site EUI", value: p.eui, unit: "kWh/m²" },
              { label: "Embodied carbon", value: p.carbon, unit: "kgCO₂e/m²" },
            ]}
          />
        ))}
      </div>
      <div className="flex flex-wrap gap-2">
        {[
          { id: "square", label: "Square core" },
          { id: "l", label: "L-shape" },
          { id: "courtyard", label: "Courtyard" },
        ].map((t) => (
          <TemplateSelect key={t.id} label={t.label} selected={template === t.id} onClick={() => setTemplate(t.id)} />
        ))}
      </div>
    </div>
  )
}
