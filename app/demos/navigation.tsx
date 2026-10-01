"use client"

import * as React from "react"
import { AnalyticsIcon, BuildingIcon, ListIcon, MassingIcon } from "@urbanflow/icons"

import { Badge } from "@/registry/ui/badge"
import { Button } from "@/registry/ui/button"
import { FullScreenModalHeader } from "@/registry/ui/full-screen-modal-header"
import { PageHeader } from "@/registry/ui/page-header"
import { SegmentedControl } from "@/registry/ui/segmented-control"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/registry/ui/tabs"

export function NavigationDemo() {
  const [view, setView] = React.useState("3d")
  return (
    <div className="flex flex-col gap-8">
      <Tabs defaultValue="energy">
        <TabsList>
          <TabsTrigger value="energy">Energy</TabsTrigger>
          <TabsTrigger value="carbon">Carbon</TabsTrigger>
          <TabsTrigger value="cost">Cost</TabsTrigger>
          <TabsTrigger value="compliance" disabled>Compliance</TabsTrigger>
        </TabsList>
        <TabsContent value="energy" className="text-paragraph-small text-texticons-secondary">Energy results</TabsContent>
        <TabsContent value="carbon" className="text-paragraph-small text-texticons-secondary">Carbon results</TabsContent>
        <TabsContent value="cost" className="text-paragraph-small text-texticons-secondary">Cost results</TabsContent>
      </Tabs>
      <Tabs defaultValue="parameters">
        <TabsList variant="underline">
          <TabsTrigger value="parameters">Parameters</TabsTrigger>
          <TabsTrigger value="space-use">Space Use</TabsTrigger>
          <TabsTrigger value="systems">Systems</TabsTrigger>
        </TabsList>
      </Tabs>
      <div className="flex flex-wrap items-center gap-6">
        <SegmentedControl options={["Day", "Month", "Year"]} defaultValue="Month" />
        <SegmentedControl
          value={view}
          onValueChange={setView}
          options={[
            { value: "3d", icon: <MassingIcon />, ariaLabel: "3D view" },
            { value: "plan", icon: <BuildingIcon />, ariaLabel: "Plan view" },
            { value: "list", icon: <ListIcon />, ariaLabel: "List view" },
          ]}
        />
      </div>
      <div className="flex flex-col gap-4 rounded-lg bg-background-light p-4">
        <PageHeader
          className="rounded-lg"
          title="Marina One Tower"
          badge={<Badge type="info">Retrofit</Badge>}
          description="Office · 55.7k m² GFA · 32 floors"
          onBack={() => {}}
          actions={
            <>
              <Button variant="secondary">Share</Button>
              <Button variant="primary">Run simulation</Button>
            </>
          }
        />
        <FullScreenModalHeader
          className="rounded-lg"
          leading={<AnalysisMark />}
          title="Scheme comparison"
          tabs={
            <Tabs defaultValue="summary">
              <TabsList>
                <TabsTrigger value="summary">Summary</TabsTrigger>
                <TabsTrigger value="detail">Detail</TabsTrigger>
              </TabsList>
            </Tabs>
          }
          actions={<Button variant="secondary">Export</Button>}
          onClose={() => {}}
        />
        <FullScreenModalHeader className="rounded-lg" title="Edit floor plate" onBack={() => {}} />
      </div>
    </div>
  )
}

function AnalysisMark() {
  return (
    <span className="inline-flex size-7 items-center justify-center rounded-md bg-background-medium text-texticons-secondary [&_svg]:size-4">
      <AnalyticsIcon />
    </span>
  )
}
