"use client"

import Link from "next/link"
import { useState, useEffect } from "react"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Menu, X } from "lucide-react"

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const pathname = usePathname()
  const isHomePage = pathname === "/"

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen)

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/#about-us", label: "Our Story" },
    { href: "/destinations", label: "Destinations" },
    { href: "/#packages", label: "Safaris" },
    { href: "/contact", label: "Contact" },
  ]

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
      isScrolled || !isHomePage
        ? "bg-white/95 backdrop-blur-md shadow-lg py-3" 
        : "bg-transparent py-5"
    }`}>
      <div className="container-custom flex justify-between items-center w-full">
        {/* Logo */}
        <Link href="/" className={`text-2xl font-black tracking-tighter transition-colors duration-500 ${
          isScrolled || !isHomePage ? "text-[#e67e22]" : "text-white"
        }`}>
          BEYOND <span className={isScrolled || !isHomePage ? "text-secondary" : "text-white/80"}>TOURS</span>
        </Link>

        {/* Desktop Navigation */}
        <ul className="hidden lg:flex items-center gap-8 list-none">
          {navLinks.map((link) => (
            <li key={link.href + link.label}>
              <Link
                href={link.href}
                className={`text-[15px] font-bold uppercase tracking-wider transition-colors duration-300 py-2 relative group ${
                  isScrolled || !isHomePage ? "text-gray-700 hover:text-[#e67e22]" : "text-white/90 hover:text-white"
                }`}
              >
                {link.label}
                <span className={`absolute bottom-0 left-0 w-0 h-0.5 transition-all duration-300 group-hover:w-full ${
                  isScrolled || !isHomePage ? "" : ""
                }`} />
              </Link>
            </li>
          ))}
        </ul>

        {/* Book Now Button - Desktop */}
        <div className="hidden lg:flex items-center gap-4">
          <Link href="/book-now">
            <Button 
              className={`font-bold rounded-full px-8 shadow-md hover:shadow-lg transition-all active:scale-95 ${
                isScrolled || !isHomePage
                  ? "bg-[#e67e22] hover:bg-[#d67219] text-white" 
                  : "bg-white text-[#e67e22] hover:bg-[#e67e22] hover:text-white border-none"
              }`}
            >
              Book Your Adventure
            </Button>
          </Link>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          className={`lg:hidden p-2 rounded-lg transition-colors ${
            isScrolled || !isHomePage ? "text-gray-700 hover:bg-gray-100" : "text-white hover:bg-white/10"
          }`}
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Navigation Drawer */}
      <div className={`fixed top-0 right-0 h-full w-[300px] bg-white shadow-2xl transform transition-transform duration-500 ease-in-out lg:hidden z-50 ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="p-8 flex flex-col h-full">
          <div className="flex justify-between items-center mb-12">
            <span className="text-2xl font-black text-[#e67e22] tracking-tighter">BEYOND <span className="text-secondary">TOURS</span></span>
            <button onClick={() => setIsMenuOpen(false)} className="p-2 hover:bg-gray-100 rounded-full transition-colors text-gray-500">
              <X size={28} />
            </button>
          </div>
          
          <ul className="flex flex-col gap-4 list-none">
            {navLinks.map((link) => (
              <li key={link.href + link.label}>
                <Link
                  href={link.href}
                  className="text-gray-800 text-xl font-bold uppercase tracking-wide hover:text-[#e67e22] transition-colors block py-3 border-b border-gray-50"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>

          <div className="mt-auto">
            <Link href="/book-now" onClick={() => setIsMenuOpen(false)}>
              <Button className="w-full bg-[#e67e22] hover:bg-[#d67219] text-white font-bold rounded-2xl py-7 text-lg shadow-xl shadow-orange-100">
                Book Now
              </Button>
            </Link>
          </div>
        </div>
      </div>
      
      {/* Overlay */}
      {isMenuOpen && (
        <div 
          className="fixed inset-0 bg-black/40 backdrop-blur-sm lg:hidden z-40"
          onClick={() => setIsMenuOpen(false)}
        />
      )}
    </nav>
  )
}

