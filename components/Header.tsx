"use client";

import React, { useState, useEffect } from 'react';
import Link from "next/link";
import Image from "next/image";
import { Menu, LogIn, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";

const NAVIGATION_LINKS = [
  { name: "Home", href: "/" },
  { name: "Solutions", href: "/product" },
  { name: "Contact", href: "/contact" },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className="fixed w-full z-50 px-4 py-2">
      <div className={`max-w-screen-2xl mx-auto transition-all duration-300 rounded-full ${
        scrolled ? "bg-white/80 backdrop-blur-md shadow-md" : "bg-white"
      }`}>
        <div className="flex items-center h-16 justify-between px-6">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <div className="relative h-12 w-36">
              <Image
                src="/logo2.png"
                alt="Logo"
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
                className="group inline-flex items-center text-base font-medium text-gray-700 hover:text-primary transition-colors relative px-4 py-2 rounded-full"
              >
                {link.name}
                <span className="absolute bottom-0 left-0 w-0 h-full bg-primary/5 rounded-full -z-10 transition-all duration-300 ease-out group-hover:w-full" />
              </Link>
            ))}
            
            {/* Login Button */}
            <Link href="/login">
              <Button
                variant="outline"
                className="gap-2 group border-primary text-primary hover:bg-primary hover:text-primary-foreground transition-all duration-300 rounded-full px-6"
              >
                <LogIn className="h-4 w-4 transition-transform group-hover:-translate-y-0.5" />
                Login
              </Button>
            </Link>
          </nav>

          {/* Mobile menu */}
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="lg:hidden rounded-full">
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
                    className="text-lg font-medium hover:text-primary transition-colors group flex items-center gap-2 px-4 py-2 rounded-full relative"
                  >
                    {link.name}
                    <span className="absolute bottom-0 left-0 w-0 h-full bg-primary/5 rounded-full -z-10 transition-all duration-300 group-hover:w-full" />
                  </Link>
                ))}
                <Link href="/login" className="mt-4">
                  <Button 
                    variant="outline" 
                    className="w-full gap-2 group border-primary text-primary hover:bg-primary hover:text-primary-foreground rounded-full"
                  >
                    <LogIn className="h-4 w-4 transition-transform group-hover:-translate-y-0.5" />
                    Login
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