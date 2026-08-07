"use client"

import { useState } from "react"
import Link from "next/link"
import { ArrowRight, Check, ChevronDown } from "lucide-react"
import OfferCountdown from "@/components/OfferCountdown"

const inclusions = [
  "Custom design matched to your brand",
  "Mobile-ready on phones and tablets",
  "Inquiry-focused contact form",
  "Launch setup and support",
]

const steps = [
  {
    title: "Tell us about your business",
    text: "Share what you do, who you serve, and what your new website needs to accomplish.",
  },
  {
    title: "Confirm the right scope",
    text: "We confirm eligibility, website scope, and hosting on a short, no-obligation call.",
  },
  {
    title: "Design, build, and launch",
    text: "If it is a fit, we create the site and help you confidently take it live.",
  },
]

export default function WebsiteOffer() {
  const [expanded, setExpanded] = useState(false)

  return (
    <section id="website-offer" aria-labelledby="website-offer-title" className="bg-[#f5f5f7] px-5 py-14 md:px-10 md:py-24">
      <div className="mx-auto max-w-[1400px]">
        <div className="overflow-hidden rounded-[2rem] shadow-[0_30px_90px_rgba(0,0,0,.16)] ring-1 ring-black/10" style={{ backgroundColor: "#101828", color: "#ffffff" }}>

          {/* Compact teaser — always visible */}
          <div className="flex flex-col gap-6 p-7 sm:p-10 lg:flex-row lg:items-center lg:justify-between lg:gap-10 lg:p-12">
            <div className="flex flex-col gap-3">
              <div className="flex flex-wrap items-center gap-2 text-[11px] font-semibold uppercase tracking-[.14em]">
                <span className="inline-flex min-h-7 items-center gap-2 rounded-full bg-white/10 px-3 text-white/85 ring-1 ring-white/10">
                  <span aria-hidden="true" className="h-2 w-2 rounded-full bg-[#b9ff38]" />
                  Canadian business offer
                </span>
                <span className="inline-flex min-h-7 items-center rounded-full px-3 text-white/50 ring-1 ring-white/15">
                  Applications close <time className="ml-1 text-white/80" dateTime="2026-09-20">Sep 20</time>
                </span>
              </div>
              <h2 id="website-offer-title" className="max-w-3xl text-2xl font-semibold leading-tight tracking-[-.04em] sm:text-3xl md:text-4xl">
                A custom website for $0 — you only cover hosting.
              </h2>
              <p className="max-w-xl text-sm leading-relaxed sm:text-base" style={{ color: "#d7e0ee" }}>
                We're waiving our $3,000+ design &amp; development fee for eligible Canadian businesses.
              </p>
            </div>

            <div className="flex shrink-0 flex-wrap items-center gap-3">
              <Link href="/contact?interest=fall-website-offer#inquiry" className="group inline-flex min-h-12 items-center justify-center gap-2 rounded-full px-5 text-sm font-bold transition duration-300 hover:scale-[1.02]" style={{ backgroundColor: "#c7ff54", color: "#172300" }}>
                Apply now
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
              <button
                onClick={() => setExpanded(!expanded)}
                className="inline-flex min-h-12 items-center gap-2 rounded-full border border-white/20 px-5 text-sm font-semibold text-white/85 transition hover:border-white/40 hover:text-white"
                aria-expanded={expanded}
                aria-controls="offer-details"
              >
                {expanded ? "Less info" : "More info"}
                <ChevronDown className={`h-4 w-4 transition-transform duration-300 ${expanded ? "rotate-180" : ""}`} />
              </button>
            </div>
          </div>

          {/* Expanded details */}
          <div
            id="offer-details"
            className={`grid transition-[grid-template-rows] duration-500 ease-in-out ${expanded ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}
          >
            <div className="overflow-hidden">
              <div className="border-t border-white/10">
                <div className="grid xl:grid-cols-[1.08fr_.92fr]">
                  <div className="flex flex-col p-7 sm:p-10 lg:p-14 xl:p-16" style={{ backgroundColor: "#101828", color: "#ffffff" }}>
                    <h3 className="max-w-4xl text-[clamp(2.5rem,4.5vw,5.5rem)] font-semibold leading-[.9] tracking-[-.07em]">
                      A website built to earn trust—and the next inquiry.
                    </h3>
                    <p className="mt-7 max-w-2xl text-lg leading-relaxed md:text-xl" style={{ color: "#d7e0ee" }}>
                      For a limited time, we are waiving our $3,000+ design and development fee for eligible Canadian businesses. You get a polished, custom website built around your business. You only cover hosting.
                    </p>

                    <div className="mt-9 flex flex-wrap items-center gap-x-6 gap-y-4">
                      <Link href="/contact?interest=fall-website-offer#inquiry" className="group inline-flex min-h-14 items-center justify-center gap-2 rounded-full px-6 text-sm font-bold transition duration-300 hover:scale-[1.02] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-4" style={{ backgroundColor: "#c7ff54", color: "#172300" }}>
                        Apply for the $0 build
                        <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                      </Link>
                      <Link href="#work" className="inline-flex min-h-11 items-center text-sm font-semibold underline decoration-white/30 underline-offset-4 transition hover:decoration-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-4" style={{ color: "#d7e0ee" }}>
                        View recent work
                      </Link>
                    </div>

                    <div className="mt-12 border-t pt-6 text-sm leading-relaxed xl:mt-auto xl:pt-8" style={{ color: "#b8c5d8", borderColor: "#344054" }}>
                      No template package and no payment to apply—just a short fit call to make sure the offer is right for your business.
                    </div>
                  </div>

                  <div className="p-3 sm:p-5 xl:p-7" style={{ backgroundColor: "#e7edf5" }}>
                    <aside aria-label="Website offer price and application" className="flex h-full flex-col rounded-[1.45rem] p-6 shadow-[0_18px_50px_rgba(0,0,0,.09)] sm:p-8 lg:p-10" style={{ backgroundColor: "#ffffff", color: "#111827" }}>
                      <div className="flex items-center justify-between gap-4">
                        <p className="text-xs font-bold uppercase tracking-[.16em]" style={{ color: "#475569" }}>Fall website offer</p>
                        <span className="inline-flex items-center gap-2 rounded-full bg-[#eafbc8] px-3 py-1.5 text-[10px] font-bold uppercase tracking-[.1em] text-[#294500]">
                          <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-[#5f9d00]" />
                          Limited slots
                        </span>
                      </div>

                      <div className="mt-8">
                        <p className="text-sm font-semibold" style={{ color: "#475569" }}>Custom website package</p>
                        <h4 className="mt-2 text-3xl font-semibold leading-[1.02] tracking-[-.045em] sm:text-4xl" style={{ color: "#111827" }}>Everything you need to launch with confidence.</h4>
                      </div>

                      <dl className="mt-8 divide-y divide-black/10 border-y border-black/10 text-sm">
                        <div className="flex items-center justify-between gap-4 py-4">
                          <dt className="font-medium" style={{ color: "#475569" }}>Typical design &amp; build fee</dt>
                          <dd className="font-semibold tabular-nums">$3,000+</dd>
                        </div>
                        <div className="flex items-center justify-between gap-4 py-4">
                          <dt className="font-medium" style={{ color: "#475569" }}>Limited-time offer credit</dt>
                          <dd className="font-semibold tabular-nums text-[#4d7f00]">−$3,000+</dd>
                        </div>
                        <div className="flex items-end justify-between gap-4 py-5">
                          <dt className="font-semibold">Your design &amp; build fee</dt>
                          <dd className="text-5xl font-semibold leading-none tracking-[-.07em] tabular-nums">$0</dd>
                        </div>
                      </dl>

                      <div className="mt-5 rounded-xl px-4 py-3.5" style={{ backgroundColor: "#c7ff54", color: "#172300" }}>
                        <p className="text-sm font-bold">You only pay for hosting.</p>
                        <p className="mt-1 text-xs font-medium leading-relaxed" style={{ color: "#3f5200" }}>Hosting details are confirmed before you decide to proceed.</p>
                      </div>

                      <div className="mt-6 rounded-2xl p-4 text-white" style={{ backgroundColor: "#111827", color: "#ffffff" }}><OfferCountdown /></div>

                      <Link href="/contact?interest=fall-website-offer#inquiry" className="group mt-6 inline-flex min-h-14 w-full items-center justify-center gap-2 rounded-full px-6 text-base font-semibold transition duration-300 hover:scale-[1.015] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2" style={{ backgroundColor: "#111827", color: "#ffffff" }}>
                        Apply for the $0 build
                        <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                      </Link>
                      <p className="mt-3 text-center text-xs font-semibold" style={{ color: "#475569" }}>A few minutes to apply · No payment required</p>
                    </aside>
                  </div>
                </div>

                <div id="offer-includes" className="scroll-mt-24 border-t px-7 py-8 sm:px-10 lg:px-14 lg:py-10" style={{ backgroundColor: "#f3f6fa", color: "#111827", borderColor: "#d1d9e6" }}>
                  <div className="grid gap-7 lg:grid-cols-[.42fr_1fr] lg:items-start">
                    <div>
                      <p className="text-xs font-bold uppercase tracking-[.16em]" style={{ color: "#475569" }}>What is included</p>
                      <p className="mt-2 max-w-sm text-lg font-semibold tracking-[-.025em]" style={{ color: "#111827" }}>A focused business website, ready to make a stronger first impression.</p>
                    </div>
                    <ul className="grid gap-x-10 gap-y-5 sm:grid-cols-2" aria-label="Website package inclusions">
                      {inclusions.map(item => (
                        <li key={item} className="flex items-start gap-3 border-t pt-4 text-sm font-semibold leading-relaxed" style={{ color: "#334155", borderColor: "#cbd5e1" }}>
                          <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-black text-[#b9ff38]">
                            <Check className="h-3 w-3" strokeWidth={3} aria-hidden="true" />
                          </span>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Steps section — also in expanded view */}
        <div className={`grid transition-[grid-template-rows] duration-500 ease-in-out ${expanded ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}>
          <div className="overflow-hidden">
            <div className="mt-10 grid border-y lg:grid-cols-[.38fr_1fr]" style={{ color: "#111827", borderColor: "#cbd5e1" }}>
              <div className="py-8 pr-8 lg:py-10">
                <p className="text-xs font-bold uppercase tracking-[.16em]" style={{ color: "#475569" }}>A simple start</p>
                <h3 className="mt-3 text-3xl font-semibold leading-none tracking-[-.045em]">From application to launch.</h3>
              </div>
              <ol className="grid sm:grid-cols-3">
                {steps.map((step, index) => (
                  <li key={step.title} className="border-t border-black/10 py-8 sm:border-l sm:border-t-0 sm:px-7 lg:py-10">
                    <span className="text-xs font-bold tabular-nums" style={{ color: "#64748b" }}>0{index + 1}</span>
                    <h4 className="mt-5 font-semibold tracking-[-.02em]">{step.title}</h4>
                    <p className="mt-2 text-sm leading-relaxed" style={{ color: "#475569" }}>{step.text}</p>
                  </li>
                ))}
              </ol>
            </div>

            <p className="mx-auto mt-5 max-w-5xl text-center text-[11px] font-medium leading-relaxed" style={{ color: "#64748b" }}>
              Available to eligible Canadian businesses until September 20, 2026. Hosting fees apply. Final website scope is confirmed during a short, no-obligation fit call.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
