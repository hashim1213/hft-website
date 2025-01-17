'use client'
import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import * as Icons from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"

interface NavigationLink {
  name: string;
  href: string;
}

const NAVIGATION_LINKS: NavigationLink[] = [
  { name: 'Home', href: '/' },
  { name: 'Solutions', href: '/product' },
  { name: 'Contact', href: '/contact' }
]

interface MobileMenuProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

const MobileMenu: React.FC<MobileMenuProps> = ({ isOpen, onOpenChange }) => (
  <Sheet open={isOpen} onOpenChange={onOpenChange}>
    <SheetTrigger asChild>
      <Button variant="ghost" size="icon" className="md:hidden">
        <Icons.Menu className="h-6 w-6" />
      </Button>
    </SheetTrigger>
    <SheetContent side="right">
      <SheetHeader>
        <SheetTitle>Menu</SheetTitle>
      </SheetHeader>
      <nav className="flex flex-col gap-4 mt-4">
        {NAVIGATION_LINKS.map((link) => (
          <Link
            key={link.name}
            href={link.href}
            className="text-lg font-medium"
            onClick={() => onOpenChange(false)}
          >
            {link.name}
          </Link>
        ))}
        <Link href="/login">
          <Button variant="outline" className="w-full gap-2">
            <Icons.LogIn className="h-4 w-4" />
            Support
          </Button>
        </Link>
      </nav>
    </SheetContent>
  </Sheet>
)

export default function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [activeSection, setActiveSection] = useState('home')
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id)
          }
        })
      },
      { rootMargin: '-50% 0px -50% 0px' }
    )

    const sections = document.querySelectorAll('section[id]')
    sections.forEach((section) => observer.observe(section))
    return () => sections.forEach((section) => observer.unobserve(section))
  }, [])

  return (
    <header 
      className={`fixed w-full px-4 lg:px-6 h-20 flex items-center transition-all duration-300 z-50
        ${scrolled ? 'bg-white/80 backdrop-blur-md shadow-sm' : 'bg-transparent'}`}
    >
      <Link href="/" className="flex items-center justify-center">
        <div className="relative h-12 w-32">
          <Image
            src="/logo2.png"
            alt="Logo"
            fill
            priority
            sizes="(max-width: 128px) 100vw, 128px"
            style={{ objectFit: 'contain' }}
            className="h-auto w-auto"
          />
        </div>
      </Link>

      <nav className="ml-auto hidden md:flex items-center gap-6">
        {NAVIGATION_LINKS.map((link) => (
          <Link
            key={link.name}
            href={link.href}
            className={`text-sm font-medium relative group ${
              activeSection === link.name.toLowerCase() ? 'text-primary' : ''
            }`}
          >
            {link.name}
            <span 
              className={`absolute -bottom-1 left-0 h-0.5 bg-primary transition-all ${
                activeSection === link.name.toLowerCase() ? 'w-full' : 'w-0 group-hover:w-full'
              }`} 
            />
          </Link>
        ))}
        <Link href="/login">
          <Button variant="outline" className="gap-2">
            <Icons.LogIn className="h-4 w-4" />
            Support
          </Button>
        </Link>
      </nav>

      <MobileMenu isOpen={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen} />
    </header>
  )
}