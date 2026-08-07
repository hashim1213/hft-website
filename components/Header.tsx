"use client"

import { useState, useSyncExternalStore } from "react"
import Image from "next/image"
import Link from "next/link"
import { ArrowUpRight, Menu, X } from "lucide-react"
import { usePathname } from "next/navigation"

const links = [
  { name: "Services", href: "/#services" },
  { name: "Work", href: "/#work" },
  { name: "Approach", href: "/#approach" },
  { name: "About", href: "/about" },
  { name: "Insights", href: "/blog" },
]

function subscribeToScroll(callback: () => void) {
  window.addEventListener("scroll", callback, { passive: true })
  return () => window.removeEventListener("scroll", callback)
}

function getScrollSnapshot() {
  return window.scrollY > 24
}

function getServerScrollSnapshot() {
  return false
}

export default function Header() {
  const [open, setOpen] = useState(false)
  const scrolled = useSyncExternalStore(subscribeToScroll, getScrollSnapshot, getServerScrollSnapshot)
  const pathname = usePathname()
  const home = pathname === "/"
  const light = home && !scrolled

  return (
    <header className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${scrolled || !home ? "border-b border-black/[.06] bg-white/80 backdrop-blur-2xl" : "bg-black/10 backdrop-blur-sm"}`}>
      <div className="mx-auto flex h-[4.5rem] max-w-[1520px] items-center justify-between px-5 md:px-10">
        <Link href="/" aria-label="Bytesavy home" className="relative z-50 block h-10 w-36">
          <Image src="/logo2.png" alt="Bytesavy" fill sizes="144px" priority className={`object-contain object-left transition ${light ? "brightness-0 invert" : ""}`} />
        </Link>
        <nav className="hidden items-center gap-1 lg:flex">
          {links.map(link => <Link key={link.name} href={link.href} className={`rounded-full px-4 py-2 text-sm font-medium transition ${light ? "text-white/70 hover:bg-white/10 hover:text-white" : "text-black/60 hover:bg-black/5 hover:text-black"}`}>{link.name}</Link>)}
        </nav>
        <Link href="/contact" className={`hidden items-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold transition duration-300 lg:flex ${light ? "bg-white text-black hover:scale-[1.03]" : "bg-black text-white hover:scale-[1.03]"}`}>Start a project <ArrowUpRight className="h-4 w-4" /></Link>
        <button onClick={() => setOpen(!open)} aria-label="Toggle menu" className={`relative z-50 rounded-full p-2 lg:hidden ${open || !light ? "text-black" : "text-white"}`}>{open ? <X /> : <Menu />}</button>
      </div>
      {open && <div className="fixed inset-0 z-40 flex min-h-screen flex-col bg-white px-6 pb-10 pt-28 lg:hidden"><nav className="flex flex-col">{links.map(link => <Link onClick={() => setOpen(false)} key={link.name} href={link.href} className="border-b border-black/10 py-5 text-4xl font-semibold tracking-[-.04em]">{link.name}</Link>)}</nav><Link onClick={() => setOpen(false)} href="/contact" className="mt-auto flex items-center justify-between rounded-full bg-black px-6 py-4 font-semibold text-white">Start a project <ArrowUpRight /></Link></div>}
    </header>
  )
}
