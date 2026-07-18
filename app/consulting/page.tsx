import { Compass } from "lucide-react"
import CapabilityPage from "@/components/CapabilityPage"

export default function ConsultingPage() {
  return <CapabilityPage
    kicker="Technology consulting"
    title="A clearer direction."
    accent="A smarter next move."
    intro="We help leadership teams cut through technology noise, uncover the highest-value opportunities, and turn complex modernization decisions into a practical plan."
    icon={Compass}
    capabilities={[
      { title: "Technology strategy", description: "Connect operational priorities and business goals to a focused, achievable technology roadmap." },
      { title: "Product discovery", description: "Define the right problem, users, workflows, scope, and measures of success before committing to a build." },
      { title: "Systems assessment", description: "Evaluate existing software, data, integrations, risks, and technical debt with an independent perspective." },
      { title: "AI opportunity planning", description: "Identify responsible, high-value uses of AI and automation grounded in real workflows and trusted data." },
    ]}
    steps={[
      { title: "Listen and learn", description: "Meet the people closest to the work and understand goals, constraints, systems, and daily friction." },
      { title: "Find the leverage", description: "Separate symptoms from root causes and identify where technology can create meaningful value." },
      { title: "Shape the roadmap", description: "Prioritize initiatives by impact, effort, risk, dependencies, and readiness for change." },
      { title: "Move with confidence", description: "Translate strategy into clear next steps, implementation guidance, and measurable outcomes." },
    ]}
    outcomes={["Aligned leadership decisions", "A prioritized investment plan", "Lower delivery and technology risk", "Momentum toward measurable value"]}
  />
}
