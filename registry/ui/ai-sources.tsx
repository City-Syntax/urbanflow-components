"use client"

import * as React from "react"
import { ChevronDownIcon, FilesIcon, GlobeIcon, ListIcon } from "@urbanflow/icons"

import { cn } from "@/lib/utils"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/registry/ui/collapsible"

type AISource = { id: string; title: string; detail?: string | undefined; href?: string; icon?: React.ReactNode }

type AISourcePart =
  | { type: "source-url"; sourceId: string; url: string; title?: string }
  | { type: "source-document"; sourceId: string; title: string; filename?: string }

function isAISourcePart(part: { type: string }): part is AISourcePart {
  return part.type === "source-url" || part.type === "source-document"
}

function toAISource(part: AISourcePart): AISource {
  return part.type === "source-url"
    ? { id: part.sourceId, title: part.title ?? part.url, href: part.url }
    : { id: part.sourceId, title: part.title, detail: part.filename }
}

const iconClass = "[&_svg]:size-3.5 [&_svg]:shrink-0 [&_svg]:text-texticons-placeholder"

function AISourceRow({ source, onSelect }: { source: AISource; onSelect?: ((source: AISource) => void) | undefined }) {
  const body = (
    <>
      {source.icon ?? (source.href ? <GlobeIcon aria-hidden /> : <FilesIcon aria-hidden />)}
      <span className="truncate text-label-xsmall text-texticons-primary group-hover/source:underline">{source.title}</span>
      {source.detail != null && <span className="truncate text-texticons-secondary">{source.detail}</span>}
    </>
  )
  const rowClass = cn(
    "group/source flex max-w-full items-center gap-1.5 rounded-xs text-paragraph-xsmall outline-none focus-visible:shadow-focus",
    iconClass
  )
  if (onSelect)
    return (
      <button type="button" className={cn(rowClass, "cursor-pointer text-left")} onClick={() => onSelect(source)}>
        {body}
      </button>
    )
  if (source.href)
    return (
      <a href={source.href} target="_blank" rel="noreferrer" className={rowClass}>
        {body}
      </a>
    )
  return <span className={rowClass}>{body}</span>
}

function AISources({
  sources,
  onSelect,
  className,
  ...props
}: Omit<React.ComponentProps<typeof Collapsible>, "children"> & {
  sources: AISource[]
  onSelect?: (source: AISource) => void
}) {
  if (sources.length === 0) return null
  return (
    <Collapsible data-slot="ai-sources" className={cn("flex w-full flex-col", className)} {...props}>
      <CollapsibleTrigger
        className={cn(
          "group/trigger flex items-center gap-1 self-start text-paragraph-xsmall whitespace-nowrap text-texticons-secondary",
          iconClass
        )}
      >
        <ListIcon aria-hidden />
        Used {sources.length} {sources.length === 1 ? "source" : "sources"}
        <ChevronDownIcon aria-hidden className="transition-transform group-data-[state=open]/trigger:rotate-180" />
      </CollapsibleTrigger>
      <CollapsibleContent>
        <ul className="flex flex-col items-start gap-1 pt-1.5 pl-4.5">
          {sources.map((source) => (
            <li key={source.id} className="max-w-full">
              <AISourceRow source={source} onSelect={onSelect} />
            </li>
          ))}
        </ul>
      </CollapsibleContent>
    </Collapsible>
  )
}

export { AISources, isAISourcePart, toAISource, type AISource, type AISourcePart }
