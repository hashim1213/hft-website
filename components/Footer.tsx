import Image from "next/image"
import Link from "next/link"
import { ArrowUpRight } from "lucide-react"

const groups = [
  { title: "Explore", links: [["Services", "/#services"], ["Selected work", "/#work"], ["Our approach", "/#approach"], ["Insights", "/blog"]] },
  { title: "Capabilities", links: [["Web applications", "/web"], ["Mobile products", "/mobile"], ["AI & automation", "/ai"], ["Modernization", "/consulting"]] },
  { title: "Company", links: [["About Bytesavy", "/about"], ["Contact", "/contact"], ["Privacy", "/privacy"], ["LinkedIn ↗", "https://www.linkedin.com/company/98775344/"]] },
]

export default function Footer() {
  return <footer className="bg-[#10130f] px-5 pb-8 pt-20 text-white md:px-10 md:pt-28">
    <div className="mx-auto max-w-[1440px]">
      <div className="grid gap-16 border-b border-white/15 pb-20 lg:grid-cols-[1.3fr_1fr]">
        <div><Link href="/" className="relative block h-12 w-44"><Image src="/logo2.png" alt="Bytesavy" fill sizes="176px" className="object-contain object-left brightness-0 invert" /></Link><p className="mt-7 max-w-md text-lg leading-relaxed text-white/50">A software design and engineering studio helping ambitious teams turn complex ideas into products people value.</p><a href="mailto:hello@bytesavy.com" className="mt-9 inline-flex items-center gap-2 border-b border-[#b9ff38] pb-1 text-xl font-semibold text-[#b9ff38]">hello@bytesavy.com <ArrowUpRight className="h-5 w-5" /></a></div>
        <div className="grid grid-cols-2 gap-10 md:grid-cols-3">{groups.map(group => <div key={group.title}><h3 className="mb-5 text-xs font-semibold uppercase tracking-[0.18em] text-white/35">{group.title}</h3><ul className="space-y-3">{group.links.map(([name, href]) => <li key={name}><Link href={href} className="text-sm text-white/65 transition hover:text-[#b9ff38]">{name}</Link></li>)}</ul></div>)}</div>
      </div>
      <div className="flex flex-col gap-3 pt-7 text-xs text-white/35 md:flex-row md:items-center md:justify-between"><p>© {new Date().getFullYear()} Bytesavy Digital Solutions Inc.</p><p>Designed and engineered in Canada · Working worldwide</p></div>
    </div>
  </footer>
}
