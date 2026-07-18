import { Code2 } from "lucide-react"
import CapabilityPage from "@/components/CapabilityPage"

export default function DevelopmentPage() {
  return <CapabilityPage
    kicker="Software engineering"
    title="Engineered for now."
    accent="Ready for what’s next."
    intro="We build reliable software for demanding operations—from the first architecture decision through launch, support, and years of evolution."
    icon={Code2}
    capabilities={[
      { title: "Custom platforms", description: "Purpose-built web software shaped around your workflows, data, and competitive edge." },
      { title: "Systems integration", description: "Connect fragmented tools and information into one coherent digital operation." },
      { title: "Cloud architecture", description: "Secure, observable infrastructure designed to perform and scale without drama." },
      { title: "Legacy modernization", description: "Replace risk and friction in stages while protecting business continuity." },
    ]}
    steps={[
      { title: "Discover", description: "Translate operational goals into a focused product and technical roadmap." },
      { title: "Architect", description: "Choose the simplest resilient foundation for today and future growth." },
      { title: "Build", description: "Ship in useful increments with testing, review, and visible progress throughout." },
      { title: "Evolve", description: "Monitor, support, and continuously improve the product after launch." },
    ]}
    outcomes={["Reliable critical systems", "Faster daily workflows", "Lower operational risk", "A foundation that scales"]}
  />
}
