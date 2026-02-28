"use client"

import { useEffect } from "react"
import { usePathname } from "next/navigation"

export const useReveal = () => {
  const pathname = usePathname()

  useEffect(() => {
    const reveal = () => {
      const reveals = document.querySelectorAll(".reveal, .reveal-left, .reveal-right")
      
      for (let i = 0; i < reveals.length; i++) {
        const windowHeight = window.innerHeight
        const elementTop = reveals[i].getBoundingClientRect().top
        const elementVisible = 150
        
        if (elementTop < windowHeight - elementVisible) {
          reveals[i].classList.add("active")
        } else {
          reveals[i].classList.remove("active")
        }
      }
    }

    window.addEventListener("scroll", reveal)
    
    // Slight delay to ensure content is rendered before checking positions
    const timeoutId = setTimeout(reveal, 100)
    
    return () => {
      window.removeEventListener("scroll", reveal)
      clearTimeout(timeoutId)
    }
  }, [pathname])
}
