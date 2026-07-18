import { PenTool } from "lucide-react"
import CapabilityPage from "@/components/CapabilityPage"

export default function ProductDesignPage() {
  return <CapabilityPage
    kicker="Product design"
    title="Useful by design."
    accent="Unforgettable by detail."
    intro="We turn operational complexity into clear product experiences—grounded in how people actually think, decide, and work."
    icon={PenTool}
    capabilities={[
      { title: "Product strategy", description: "Align user needs, business goals, and technical realities before pixels or code." },
      { title: "UX & interaction design", description: "Intuitive workflows that make sophisticated tools feel immediately familiar." },
      { title: "Interface systems", description: "Distinctive, accessible visual systems that remain consistent as products grow." },
      { title: "Prototyping & validation", description: "Test the important assumptions early with realistic, interactive prototypes." },
    ]}
    steps={[
      { title: "Understand", description: "Observe the operation, speak with users, and define what success means." },
      { title: "Frame", description: "Map journeys and prioritize the moments where design creates the most value." },
      { title: "Design", description: "Build and refine the end-to-end experience in close collaboration with engineering." },
      { title: "Validate", description: "Put the product in front of real people and improve it with evidence." },
    ]}
    outcomes={["Faster user adoption", "Less training and support", "Confident product decisions", "A scalable design system"]}
  />
}
