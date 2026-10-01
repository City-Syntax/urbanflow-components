"use client"

import * as React from "react"
import {
  AiIcon,
  AnalyticsIcon,
  ArrowLeftIcon,
  CloudIcon,
  CoinIcon,
  ConstructionIcon,
  FilesIcon,
  HvacIcon,
  LightbulbIcon,
  MassingIcon,
  PencilIcon,
  PhotoIcon,
  RunIcon,
  TimeIcon,
  TrashIcon,
  VersionIcon,
} from "@urbanflow/icons"

import { DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator } from "@/registry/ui/action-list"
import { AppShell, AppShellPin } from "@/registry/ui/app-shell"
import { LeftContextPanel } from "@/registry/ui/left-context-panel"
import { ProposalBadge } from "@/registry/ui/proposal-badge"
import { SegmentedControl } from "@/registry/ui/segmented-control"
import { Tabs, TabsList, TabsTrigger } from "@/registry/ui/tabs"
import { Toggle } from "@/registry/ui/toggle"
import { TopNavigation } from "@/registry/ui/top-navigation"
import { UtilitiesToolbar } from "@/registry/ui/utilities-toolbar"

const team = ["Yu Qing", "Ren Yi", "Bo Yang", "Chen Chen", "Tan Shu", "Pei Ning"]

const fluxMark = (
  <svg viewBox="0 0 16 16" aria-label="Flux">
    <path
      fill="currentColor"
      d="M7.53572 1.76699C4.56459 1.13545 1.64392 3.03216 1.01239 6.00328C0.38086 8.97441 2.27757 11.8951 5.24869 12.5266L5.66451 10.5703C3.77424 10.1685 2.5669 8.30938 2.96869 6.41911C3.37048 4.52884 5.22962 3.32149 7.11989 3.72328L7.53572 1.76699ZM10.7513 3.47282L10.3355 5.42912C12.2258 5.83091 13.4331 7.69006 13.0313 9.58033C12.6295 11.4706 10.7704 12.6779 8.88012 12.2762L8.46429 14.2324C11.4354 14.864 14.3561 12.9673 14.9876 9.99615C15.6192 7.02503 13.7224 4.10436 10.7513 3.47282ZM8.5812 0.455698L10.5375 0.871521L7.41882 15.5437L5.46252 15.1279L8.5812 0.455698Z"
    />
  </svg>
)

const urbanflowMark = <span aria-label="urbanflow" className="size-4 rounded-full bg-texticons-inverse-secondary" />

const urbanflowTools = [
  [
    { value: "analytics", label: "Analytics", icon: <AnalyticsIcon size={20} /> },
    { value: "recommendations", label: "Recommendations", icon: <LightbulbIcon size={20} /> },
    { value: "cost", label: "Cost", icon: <CoinIcon size={20} /> },
  ],
  [
    { value: "ai", label: "AI", icon: <AiIcon size={20} /> },
    { value: "renders", label: "Renders", icon: <PhotoIcon size={20} /> },
    { value: "construction", label: "Construction", icon: <ConstructionIcon size={20} /> },
  ],
]

const fluxModes = [
  [
    { value: "model", label: "Model", icon: <MassingIcon size={20} /> },
    { value: "hvac", label: "HVAC", icon: <HvacIcon size={20} /> },
    { value: "weather", label: "Weather", icon: <CloudIcon size={20} /> },
    { value: "runs", label: "Runs", icon: <RunIcon size={20} /> },
    { value: "results", label: "Results", icon: <AnalyticsIcon size={20} /> },
    { value: "files", label: "Files", icon: <FilesIcon size={20} /> },
  ],
]

function Placeholder({ label, className }: { label: string; className?: string }) {
  return (
    <div
      className={`flex items-center justify-center rounded-lg bg-background-default text-paragraph-xsmall text-texticons-tertiary inset-ring inset-ring-stroke-default ${className ?? ""}`}
    >
      {label}
    </div>
  )
}

const projectMenu = (
  <>
    <DropdownMenuItem icon={<TimeIcon />}>Show version history</DropdownMenuItem>
    <DropdownMenuItem icon={<VersionIcon />}>Create proposal</DropdownMenuItem>
    <DropdownMenuItem icon={<VersionIcon />}>View proposals</DropdownMenuItem>
    <DropdownMenuItem icon={<PencilIcon />}>Rename project</DropdownMenuItem>
    <DropdownMenuSeparator />
    <DropdownMenuLabel>Project</DropdownMenuLabel>
    <DropdownMenuItem icon={<ArrowLeftIcon />}>Return to home</DropdownMenuItem>
    <DropdownMenuItem icon={<TrashIcon />} destructive>
      Delete project
    </DropdownMenuItem>
  </>
)

export function ShellDemo() {
  const [product, setProduct] = React.useState("urbanflow")
  const [showLeft, setShowLeft] = React.useState(true)
  const [inProposal, setInProposal] = React.useState(false)
  const [mode, setMode] = React.useState("model")
  const flux = product === "flux"
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-wrap items-center gap-4">
        <SegmentedControl
          value={product}
          onValueChange={setProduct}
          options={[
            { value: "urbanflow", label: "urbanflow" },
            { value: "flux", label: "Flux" },
          ]}
        />
        <Toggle label="Show left panel" checked={showLeft} onCheckedChange={setShowLeft} />
        <Toggle label="In a proposal" checked={inProposal} onCheckedChange={setInProposal} />
      </div>
      <div className="h-[560px] overflow-hidden rounded-lg inset-ring inset-ring-stroke-default">
        <AppShell
          className="h-full"
          topNav={
            <TopNavigation
              product={flux ? "flux" : "urbanflow"}
              logo={flux ? <span className="text-texticons-inverse-primary">{fluxMark}</span> : urbanflowMark}
              project={flux ? "warehouse retrofit" : "Marina Bay Project"}
              proposal={inProposal ? { title: "Add storey and change archetype", status: "draft", behindMain: true } : undefined}
              collaborators={team}
              credits={999}
              menu={projectMenu}
            />
          }
          leftPanel={
            showLeft &&
            (flux ? (
              <Placeholder label="Chat panel" className="w-72" />
            ) : (
              <LeftContextPanel
                page="Properties"
                onCollapse={() => setShowLeft(false)}
                tabs={
                  <Tabs defaultValue="properties">
                    <TabsList>
                      <TabsTrigger value="properties">Properties</TabsTrigger>
                      <TabsTrigger value="manage">Manage</TabsTrigger>
                    </TabsList>
                  </Tabs>
                }
              >
                <Placeholder label="Building" className="h-24" />
                <Placeholder label="Floor" className="h-24" />
                <Placeholder label="Zone" className="h-24" />
              </LeftContextPanel>
            ))
          }
          rightPanel={<Placeholder label={flux ? "Model panel" : "Analysis panel"} className="w-60" />}
          canvasTools={
            <>
              <AppShellPin position="top-right">
                {flux ? (
                  <UtilitiesToolbar label="Modes" groups={fluxModes} value={mode} onValueChange={setMode} />
                ) : (
                  <UtilitiesToolbar groups={urbanflowTools} />
                )}
              </AppShellPin>
              <AppShellPin position="bottom-right">
                <SegmentedControl
                  defaultValue={flux ? "3d" : "massing"}
                  options={
                    flux
                      ? [
                          { value: "3d", label: "3D" },
                          { value: "2d", label: "2D" },
                        ]
                      : [
                          { value: "massing", label: "Massing" },
                          { value: "floor-plan", label: "Floor plan" },
                        ]
                  }
                />
              </AppShellPin>
            </>
          }
        />
      </div>
      <div className="flex flex-wrap gap-2">
        {(["draft", "behind-main", "in-review", "changes-suggested", "ready-for-merge", "merged", "closed"] as const).map((s) => (
          <ProposalBadge key={s} status={s} />
        ))}
      </div>
    </div>
  )
}
