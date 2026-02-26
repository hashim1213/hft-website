"use client";

import React, { useState, useEffect } from 'react';
import Link from "next/link";
import Image from "next/image";
import { Menu, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";

const NAVIGATION_LINKS = [
  { name: "Home", href: "/" },
  { name: "Blog", href: "/portal" },
  { name: "About", href: "/about" },
];

const SOLUTIONS_LINKS = [
  { name: "Web Development", href: "/web" },
  { name: "Mobile Apps", href: "/mobile" },
  { name: "AI Integration", href: "/ai" },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [solutionsOpen, setSolutionsOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className="fixed w-full z-50 pt-6 pb-2">
      <div className={`container mx-auto px-4 md:px-6 transition-all duration-300 rounded-2xl border border-accent ${
        scrolled ? "bg-white/80 backdrop-blur-md shadow-md" : "bg-white"
      }`}>
        <div className="flex items-center h-16 justify-between px-6">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <div className="relative h-12 w-36">
              <Image
                src="/logo2.png"
                alt="Bytesavy Logo"
                fill
                priority
                sizes="144px"
                style={{ objectFit: "contain" }}
                className="transition-transform duration-300 hover:scale-105"
              />
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            {NAVIGATION_LINKS.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="group inline-flex items-center text-base font-bold text-primary hover:text-primary/80 transition-colors relative px-4 py-2 rounded-xl"
              >
                {link.name}
                <span className="absolute bottom-0 left-0 w-0 h-full bg-primary/5 rounded-xl -z-10 transition-all duration-300 ease-out group-hover:w-full" />
              </Link>
            ))}

            {/* Solutions Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setSolutionsOpen(true)}
              onMouseLeave={() => setSolutionsOpen(false)}
            >
              <Link
                href="/product"
                className="group inline-flex items-center text-base font-bold text-primary hover:text-primary/80 transition-colors relative px-4 py-2 rounded-xl"
              >
                Solutions
                <ChevronDown className={`ml-1 h-4 w-4 transition-transform ${solutionsOpen ? 'rotate-180' : ''}`} />
                <span className="absolute bottom-0 left-0 w-0 h-full bg-primary/5 rounded-xl -z-10 transition-all duration-300 ease-out group-hover:w-full" />
              </Link>

              {solutionsOpen && (
                <div className="absolute top-full left-0 mt-2 w-56 bg-white rounded-xl shadow-lg border border-gray-100 py-2 z-50">
                  {SOLUTIONS_LINKS.map((solution) => (
                    <Link
                      key={solution.name}
                      href={solution.href}
                      className="block px-4 py-3 text-sm font-medium text-gray-700 hover:bg-primary/5 hover:text-primary transition-colors"
                    >
                      {solution.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {/* Contact Button */}
            <Link href="/contact">
              <Button
                variant="default"
                className="group bg-secondary text-secondary-foreground hover:bg-secondary/90 transition-all duration-300 rounded-xl px-6 font-bold"
              >
                Contact
              </Button>
            </Link>
          </nav>

          {/* Mobile menu */}
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="lg:hidden rounded-xl">
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right">
              <SheetHeader>
                <SheetTitle>Menu</SheetTitle>
              </SheetHeader>
              <nav className="flex flex-col gap-6 mt-8">
                {NAVIGATION_LINKS.map((link) => (
                  <Link
                    key={link.name}
                    href={link.href}
                    className="text-lg font-bold text-primary hover:text-primary/80 transition-colors group flex items-center gap-2 px-4 py-2 rounded-xl relative"
                  >
                    {link.name}
                    <span className="absolute bottom-0 left-0 w-0 h-full bg-primary/5 rounded-xl -z-10 transition-all duration-300 group-hover:w-full" />
                  </Link>
                ))}

                {/* Solutions Dropdown for Mobile */}
                <div>
                  <div className="flex items-center gap-2">
                    <Link
                      href="/product"
                      className="flex-1 text-lg font-bold text-primary hover:text-primary/80 transition-colors group px-4 py-2 rounded-xl relative"
                    >
                      Solutions
                      <span className="absolute bottom-0 left-0 w-0 h-full bg-primary/5 rounded-xl -z-10 transition-all duration-300 group-hover:w-full" />
                    </Link>
                    <button
                      onClick={() => setSolutionsOpen(!solutionsOpen)}
                      className="px-2 py-2 text-primary hover:text-primary/80 transition-colors"
                    >
                      <ChevronDown className={`h-4 w-4 transition-transform ${solutionsOpen ? 'rotate-180' : ''}`} />
                    </button>
                  </div>
                  {solutionsOpen && (
                    <div className="ml-4 mt-2 flex flex-col gap-2">
                      {SOLUTIONS_LINKS.map((solution) => (
                        <Link
                          key={solution.name}
                          href={solution.href}
                          className="text-base font-medium text-gray-700 hover:text-primary transition-colors px-4 py-2 rounded-lg hover:bg-primary/5"
                        >
                          {solution.name}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>

                <Link href="/contact" className="mt-4">
                  <Button
                    variant="default"
                    className="w-full group bg-secondary text-secondary-foreground hover:bg-secondary/90 rounded-xl font-bold"
                  >
                    Contact
                  </Button>
                </Link>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}