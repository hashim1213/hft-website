"use client";

import React, { useState, useEffect } from 'react';
import Link from "next/link";
import Image from "next/image";
import { NavigationRegular, ChevronDownRegular } from '@fluentui/react-icons';
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { usePathname } from 'next/navigation';
import { useLanguage } from '@/contexts/LanguageContext';

const SOLUTIONS_LINKS = [
  { name: "Web Development", href: "/web" },
  { name: "Mobile Apps", href: "/mobile" },
  { name: "AI Integration", href: "/ai" },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [solutionsOpen, setSolutionsOpen] = useState(false);
  const pathname = usePathname();
  const isHomePage = pathname === '/';
  const { t } = useLanguage();

  const NAVIGATION_LINKS = [
    { name: t('nav.home'), href: "/" },
    { name: t('nav.blog'), href: "/blog" },
    { name: t('nav.about'), href: "/about" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (!target.closest('.solutions-dropdown')) {
        setSolutionsOpen(false);
      }
    };

    if (solutionsOpen) {
      document.addEventListener('click', handleClickOutside);
    }

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [solutionsOpen]);

  return (
    <header className="fixed w-full z-50">
      {/* Main Header */}
      <div className={`transition-all duration-300 ${
        isHomePage
          ? scrolled
            ? "bg-black/30 backdrop-blur-lg shadow-sm border-b border-white/10"
            : "bg-transparent"
          : "bg-white/95 backdrop-blur-lg shadow-sm border-b border-gray-100"
      }`}>
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex items-center h-20 justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <div className="relative h-10 w-32">
              <Image
                src="/logo2.png"
                alt="Bytesavy Technologies"
                fill
                priority
                sizes="128px"
                style={{ objectFit: "contain" }}
                className={`transition-transform duration-300 hover:scale-105 ${isHomePage ? 'brightness-0 invert' : ''}`}
              />
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-1">
            {NAVIGATION_LINKS.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className={`relative text-sm font-medium transition-colors px-4 py-2 rounded-lg ${
                  isHomePage
                    ? 'text-white hover:text-white/80 hover:bg-white/10'
                    : 'text-gray-700 hover:text-primary hover:bg-gray-50'
                }`}
              >
                {link.name}
              </Link>
            ))}

            {/* Solutions Dropdown */}
            <div
              className="relative solutions-dropdown"
              onMouseEnter={() => setSolutionsOpen(true)}
              onMouseLeave={() => setSolutionsOpen(false)}
            >
              <Link
                href="/product"
                className={`relative inline-flex items-center text-sm font-medium transition-colors px-4 py-2 rounded-lg ${
                  isHomePage
                    ? 'text-white hover:text-white/80 hover:bg-white/10'
                    : 'text-gray-700 hover:text-primary hover:bg-gray-50'
                }`}
              >
                {t('nav.solutions')}
                <ChevronDownRegular className={`w-4 h-4 ml-1 transition-transform duration-200 ${solutionsOpen ? 'rotate-180' : ''}`} style={{ color: isHomePage ? 'white' : undefined }} />
              </Link>

              {solutionsOpen && (
                <div className="absolute top-full left-0 mt-2 w-64 bg-white rounded-lg shadow-xl border border-gray-100 py-3 animate-in fade-in slide-in-from-top-2 duration-200 z-50">
                  <div className="px-4 pb-2 mb-2 border-b border-gray-100">
                    <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Our Solutions</p>
                  </div>
                  {SOLUTIONS_LINKS.map((solution) => (
                    <Link
                      key={solution.name}
                      href={solution.href}
                      className="block px-4 py-3 text-sm font-medium text-gray-700 hover:bg-gray-50 hover:text-primary transition-colors rounded-md mx-2"
                    >
                      {solution.name}
                    </Link>
                  ))}
                  <div className="mt-3 pt-3 border-t border-gray-100 mx-2">
                    <Link
                      href="/product"
                      className="block px-4 py-3 text-sm font-medium text-primary hover:bg-primary/5 transition-colors rounded-md"
                    >
                      View All Solutions →
                    </Link>
                  </div>
                </div>
              )}
            </div>

          </nav>

          {/* Right Side Actions */}
          <div className="hidden lg:flex items-center gap-3">
            <Link href="/contact">
              <Button
                className="bg-accent hover:bg-accent/90 text-white shadow-sm text-sm font-medium px-6"
              >
                {t('nav.contact')}
              </Button>
            </Link>
          </div>

          {/* Mobile menu */}
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className={`lg:hidden ${isHomePage ? 'text-white hover:bg-white/10' : 'text-gray-700 hover:bg-gray-50'}`}>
                <NavigationRegular className="w-6 h-6" style={{ color: isHomePage ? 'white' : undefined }} />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-full sm:w-96">
              <SheetHeader className="border-b pb-4">
                <SheetTitle className="text-left">Menu</SheetTitle>
              </SheetHeader>
              <nav className="flex flex-col gap-2 mt-6">
                {NAVIGATION_LINKS.map((link) => (
                  <Link
                    key={link.name}
                    href={link.href}
                    className="text-base font-medium text-gray-700 hover:text-primary hover:bg-gray-50 transition-colors px-4 py-3 rounded-lg"
                  >
                    {link.name}
                  </Link>
                ))}

                {/* Solutions Dropdown for Mobile */}
                <div className="border-t border-b py-2 my-2">
                  <button
                    onClick={() => setSolutionsOpen(!solutionsOpen)}
                    className="w-full flex items-center justify-between text-base font-medium text-gray-700 hover:text-primary hover:bg-gray-50 transition-colors px-4 py-3 rounded-lg"
                  >
                    <span>{t('nav.solutions')}</span>
                    <ChevronDownRegular className={`w-4 h-4 transition-transform ${solutionsOpen ? 'rotate-180' : ''}`} />
                  </button>
                  {solutionsOpen && (
                    <div className="ml-4 mt-2 flex flex-col gap-1">
                      {SOLUTIONS_LINKS.map((solution) => (
                        <Link
                          key={solution.name}
                          href={solution.href}
                          className="text-sm font-medium text-gray-600 hover:text-primary hover:bg-gray-50 transition-colors px-4 py-2.5 rounded-lg"
                        >
                          {solution.name}
                        </Link>
                      ))}
                      <Link
                        href="/product"
                        className="text-sm font-medium text-primary hover:bg-primary/5 transition-colors px-4 py-2.5 rounded-lg mt-1"
                      >
                        View All Solutions →
                      </Link>
                    </div>
                  )}
                </div>

                <div className="mt-4">
                  <Link href="/contact">
                    <Button
                      className="w-full bg-accent hover:bg-accent/90 text-white text-sm font-medium"
                    >
                      {t('nav.contact')}
                    </Button>
                  </Link>
                </div>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
      </div>
    </header>
  );
}
