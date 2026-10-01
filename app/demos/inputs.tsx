"use client"

import * as React from "react"
import { SearchIcon } from "@urbanflow/icons"

import { Button } from "@/registry/ui/button"
import { InlineError } from "@/registry/ui/field"
import { MultilineField } from "@/registry/ui/multiline-field"
import { Select } from "@/registry/ui/select"
import { TextField } from "@/registry/ui/text-field"

const archetypes = ["Office", "Residential", "Retail", "Hotel", "Education"]

export function InputsDemo() {
  const [height, setHeight] = React.useState(3.6)
  const [use, setUse] = React.useState("Office")
  return (
    <div className="flex flex-col gap-8">
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
        <TextField label="Project name" placeholder="Untitled project" />
        <TextField label="Search" placeholder="Search zones" prefix={<SearchIcon />} />
        <TextField
          label="Floor height"
          labelHelp="from Archetype default"
          inputMode="decimal"
          value={height.toFixed(1)}
          onChange={(e) => setHeight(Number(e.target.value) || 0)}
          unit="m"
          stepper
          onIncrement={() => setHeight((h) => h + 0.1)}
          onDecrement={() => setHeight((h) => Math.max(0, h - 0.1))}
          helpText="from Archetype default"
        />
        <TextField label="Wall to window ratio" defaultValue="140" unit="%" state="error" helpText="Must be 100% or less" />
        <TextField label="Site EUI" defaultValue="212" unit="kWh/m²" state="alert" helpText="Higher than 90% of similar buildings" />
        <TextField label="Disabled" placeholder="Value" disabled />
        <TextField label="Read only" defaultValue="55.7k m²" readOnly />
        <TextField label="Inline label" labelPosition="inline" defaultValue="12" unit="m" />
        <TextField label="With action" labelAction={<Button variant="plain" size="micro">Reset to default</Button>} defaultValue="0.6" />
      </div>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
        <Select label="Archetype" options={archetypes} value={use} onValueChange={setUse} />
        <Select label="Space Use" options={archetypes} placeholder="Select" />
        <Select label="Inline" labelPosition="inline" options={["1", "2", "3"]} defaultValue="2" />
        <Select label="Error" options={archetypes} state="error" helpText="Pick a Space Use" />
        <Select label="Disabled" options={archetypes} defaultValue="Office" disabled />
      </div>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
        <MultilineField label="Notes" placeholder="Add a note" maxLength={200} />
        <MultilineField label="Error" defaultValue="—" state="error" helpText="Notes can't be empty" />
        <div className="flex flex-col gap-3">
          <InlineError>Error message</InlineError>
          <InlineError tone="alert">Alert message</InlineError>
        </div>
      </div>
    </div>
  )
}
