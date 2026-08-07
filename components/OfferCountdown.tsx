"use client"

import { useEffect, useState } from "react"

const DEADLINE = new Date("2026-09-20T23:59:59-04:00").getTime()

type TimeLeft = {
  days: number
  hours: number
  minutes: number
}

function getTimeLeft(): TimeLeft | null {
  const remaining = DEADLINE - Date.now()

  if (remaining <= 0) return null

  return {
    days: Math.floor(remaining / 86_400_000),
    hours: Math.floor((remaining / 3_600_000) % 24),
    minutes: Math.floor((remaining / 60_000) % 60),
  }
}

export default function OfferCountdown() {
  const [timeLeft, setTimeLeft] = useState<TimeLeft | null | undefined>(undefined)

  useEffect(() => {
    const updateCountdown = () => setTimeLeft(getTimeLeft())
    updateCountdown()

    const timer = window.setInterval(updateCountdown, 60_000)
    return () => window.clearInterval(timer)
  }, [])

  if (timeLeft === null) {
    return <p className="rounded-xl px-4 py-3 text-center text-sm font-semibold" style={{ backgroundColor: "rgba(255,255,255,.10)", color: "#ffffff" }}>This offer has ended.</p>
  }

  const units = [
    { label: "Days", value: timeLeft?.days },
    { label: "Hours", value: timeLeft?.hours },
    { label: "Minutes", value: timeLeft?.minutes },
  ]

  return (
    <div aria-label="Time remaining until applications close on September 20, 2026">
      <div className="mb-2 flex items-center justify-between gap-4">
        <p className="text-[10px] font-bold uppercase tracking-[.16em] text-black/40">Applications close in</p>
        <time dateTime="2026-09-20" className="text-[10px] font-semibold text-black/45">Sep 20</time>
      </div>
      <div role="timer" aria-live="off" className="grid grid-cols-3 divide-x divide-black/10 overflow-hidden rounded-xl bg-[#f3f4f0] ring-1 ring-black/[.06]">
        {units.map(unit => (
          <div key={unit.label} className="px-2 py-3 text-center">
            <span className="block text-2xl font-semibold leading-none tracking-[-.05em] tabular-nums text-black sm:text-3xl">
              {unit.value === undefined ? "--" : String(unit.value).padStart(2, "0")}
            </span>
            <span className="mt-1.5 block text-[9px] font-semibold uppercase tracking-[.11em] text-black/40">{unit.label}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
