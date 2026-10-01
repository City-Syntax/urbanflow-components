"use client"

import * as React from "react"
import { ArrowUpDownIcon, ComplianceIcon, MassingIcon, TimeIcon, TrashIcon } from "@urbanflow/icons"

import { FileActions } from "@/registry/ui/file-actions"
import { FileCategory } from "@/registry/ui/file-category"
import { FileRow } from "@/registry/ui/file-row"
import { IconButton } from "@/registry/ui/icon-button"
import { SelectFloorPlan } from "@/registry/ui/select-floor-plan"

const files = [
  { name: "Tower-04-Floor-Plans.pdf", type: "PDF document", category: "Floor plan", size: "3.1 MB", owner: "Pei Ning", date: "2 days ago" },
  { name: "Site-survey.jpg", type: "JPEG image", category: "Reference", size: "1.4 MB", owner: "Ryan Tan", date: "5 days ago" },
  { name: "Massing-v3.ifc", type: "IFC model", category: null, size: "50.4 MB", owner: "Ana Lim", date: "1 week ago" },
]

export function FilesDemo() {
  const [cats, setCats] = React.useState<(string | null)[]>(files.map((f) => f.category))
  const [selected, setSelected] = React.useState(0)
  return (
    <div className="flex flex-col gap-8">
      <div className="overflow-x-auto">
        <div role="table" className="flex min-w-[1000px] flex-col gap-1">
          {files.map((f, i) => (
            <FileRow
              key={f.name}
              name={f.name}
              type={f.type}
              size={f.size}
              owner={f.owner}
              ownerIndex={i + 1}
              date={f.date}
              selected={selected === i}
              onClick={() => setSelected(i)}
              category={
                <FileCategory value={cats[i]} onValueChange={(v) => setCats((c) => c.map((x, j) => (j === i ? v : x)))} />
              }
              actions={
                <>
                  <FileActions
                    items={[
                      { label: "Turn into geometry", icon: <MassingIcon /> },
                      { label: "Run compliance check", icon: <ComplianceIcon /> },
                    ]}
                  />
                  <IconButton variant="tertiary" label="Replace"><ArrowUpDownIcon /></IconButton>
                  <IconButton variant="tertiary" label="Version history"><TimeIcon /></IconButton>
                  <IconButton variant="tertiary" label="Delete"><TrashIcon /></IconButton>
                </>
              }
            />
          ))}
        </div>
      </div>
      <div className="flex max-w-md flex-col gap-2">
        <SelectFloorPlan kind="upload" />
        <SelectFloorPlan kind="existing" title="Tower-04-Floor-Plans.dwg" meta="Geometry source · 50.4 MB" />
      </div>
    </div>
  )
}
