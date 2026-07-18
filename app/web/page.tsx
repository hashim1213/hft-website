import { Monitor } from "lucide-react"
import CapabilityPage from "@/components/CapabilityPage"

export default function WebPage() {
  return <CapabilityPage
    kicker="Web application development"
    title="Powerful on the inside."
    accent="Effortless on the surface."
    intro="We design and engineer fast, secure web applications that turn complex workflows, disconnected data, and critical operations into one clear experience."
    icon={Monitor}
    capabilities={[
      { title: "Custom web applications", description: "Purpose-built platforms, portals, and operational tools shaped around the way your organization works." },
      { title: "Data-rich experiences", description: "Make complex information easy to search, understand, act on, and share across teams." },
      { title: "Systems & API integration", description: "Connect existing software, cloud services, and databases into one dependable workflow." },
      { title: "Performance & accessibility", description: "Responsive experiences engineered to load quickly, work everywhere, and serve every user." },
    ]}
    steps={[
      { title: "Understand the operation", description: "Map users, workflows, constraints, and business goals before defining the product." },
      { title: "Design the experience", description: "Prototype the essential journeys and validate clarity with the people who will use them." },
      { title: "Engineer the platform", description: "Build secure frontend, backend, data, and cloud systems in focused, testable increments." },
      { title: "Launch and evolve", description: "Deploy confidently, measure real usage, and continuously improve the product over time." },
    ]}
    outcomes={["One clear source of truth", "Faster operational workflows", "Secure, scalable architecture", "A product people adopt"]}
  />
}
