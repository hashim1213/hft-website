import { Smartphone } from "lucide-react"
import CapabilityPage from "@/components/CapabilityPage"

export default function MobilePage() {
  return <CapabilityPage
    kicker="Mobile app development"
    title="Built for the field."
    accent="Loved everywhere."
    intro="We design and engineer fast, dependable mobile products for teams and customers who need the right information wherever work happens."
    icon={Smartphone}
    capabilities={[
      { title: "iOS & Android apps", description: "Polished native-quality experiences delivered efficiently across both platforms." },
      { title: "Offline-first workflows", description: "Keep critical work moving through weak signals, remote sites, and harsh conditions." },
      { title: "Connected field tools", description: "Securely connect devices, cloud systems, cameras, location, and operational data." },
      { title: "Launch & growth", description: "App store delivery, analytics, monitoring, and a roadmap for continuous improvement." },
    ]}
    steps={[
      { title: "Define the moments", description: "Focus on where mobility provides a meaningful advantage to the user." },
      { title: "Prototype on device", description: "Validate ergonomics, navigation, and field conditions before full development." },
      { title: "Engineer & test", description: "Build for performance and verify across devices, networks, and real scenarios." },
      { title: "Launch & learn", description: "Manage release, observe adoption, and evolve from real-world feedback." },
    ]}
    outcomes={["Tools available anywhere", "Reliable offline operation", "High user adoption", "One maintainable product"]}
  />
}
