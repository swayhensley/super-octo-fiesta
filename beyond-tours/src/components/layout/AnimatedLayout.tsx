"use client"

import { motion, AnimatePresence } from "framer-motion"
import { usePathname } from "next/navigation"
import { pageTransition } from "@/lib/motion-variants"

interface AnimatedLayoutProps {
  children: React.ReactNode
}

/**
 * AnimatedLayout - Wraps pages with smooth entrance animations
 * Provides consistent page transitions across the entire application
 */
export default function AnimatedLayout({ children }: AnimatedLayoutProps) {
  const pathname = usePathname()

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={pathname}
        initial="initial"
        animate="animate"
        exit="exit"
        variants={pageTransition}
        className="w-full"
      >
        {children}
      </motion.div>
    </AnimatePresence>
  )
}
