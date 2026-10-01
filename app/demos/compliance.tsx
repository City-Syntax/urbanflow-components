"use client"

import { ComplianceIssue } from "@/registry/ui/compliance-issue"
import { Policy } from "@/registry/ui/policy"

const clause =
  "The building height shall not exceed the maximum permissible height stated in the Master Plan for the site."

export function ComplianceDemo() {
  return (
    <div className="w-96 overflow-hidden rounded-lg bg-background-default ring-1 ring-stroke-default">
      <ComplianceIssue
        status="failed"
        title="Exceeds maximum height"
        location="Building A"
        defaultOpen
        values={[
          { label: "Required", value: "≤ 80 m" },
          { label: "Actual", value: "92 m" },
        ]}
        policy={
          <Policy reference="URA Development Control · Height" source="ura.gov.sg/height-control" href="#">
            {clause}
          </Policy>
        }
      />
      <ComplianceIssue
        status="passed"
        title="Setback requirements met"
        location="Building A"
        values={[
          { label: "Required", value: ">= 19" },
          { label: "Actual", value: "20" },
        ]}
        policy={<Policy reference="URA Setback" defaultOpen={false} />}
      />
      <ComplianceIssue status="passed" title="Plot Ratio within limit" location="Site" />
    </div>
  )
}
