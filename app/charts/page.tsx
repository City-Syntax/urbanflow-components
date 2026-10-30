import Link from "next/link"
import { ChartsDemo } from "@/app/demos/charts"

export default function ChartsPage() {
  return <main className="mx-auto flex max-w-6xl flex-col gap-8 px-4 py-10">
    <header className="flex flex-col gap-2">
      <Link href="/" className="text-paragraph-small text-texticons-link-primary underline">All components</Link>
      <h1 className="text-header-xxlarge">Charts</h1>
      <p className="text-paragraph-medium text-texticons-secondary">Nine chart forms from Flux, styled with the Flow design system. Open Details to inspect the chart and its data.</p>
      <p className="text-paragraph-small text-texticons-secondary">The examples use illustrative data. Flux supplies live project data when these components are used in the app.</p>
    </header>
    <ChartsDemo />
  </main>
}
