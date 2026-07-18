import { Bot } from "lucide-react"
import CapabilityPage from "@/components/CapabilityPage"

export default function AIPage() {
  return <CapabilityPage
    kicker="Applied AI"
    title="Less hype."
    accent="More useful intelligence."
    intro="We apply AI where it creates measurable value—inside real workflows, connected to trusted data, and designed around human judgment."
    icon={Bot}
    capabilities={[
      { title: "Workflow automation", description: "Remove repetitive work while keeping people in control of important decisions." },
      { title: "Knowledge systems", description: "Make policies, research, documents, and institutional knowledge instantly useful." },
      { title: "Decision support", description: "Surface patterns and recommendations from operational data at the right moment." },
      { title: "AI product features", description: "Embed focused intelligence into existing or new digital products safely." },
    ]}
    steps={[
      { title: "Find the value", description: "Identify high-friction work where AI can produce a clear and defensible return." },
      { title: "Prove it", description: "Prototype against representative data before making a large investment." },
      { title: "Integrate", description: "Fit the solution into existing tools, permissions, and ways of working." },
      { title: "Govern & improve", description: "Measure quality, manage risk, and improve performance with real usage." },
    ]}
    outcomes={["Hours returned to teams", "Faster informed decisions", "Responsible AI adoption", "Value measured in production"]}
  />
}
