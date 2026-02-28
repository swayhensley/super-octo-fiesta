"use client"

import { motion } from "framer-motion"
import { ReactNode } from "react"

interface AnimatedButtonProps {
  children: ReactNode
  variant?: "primary" | "secondary" | "outline" | "ghost"
  size?: "sm" | "md" | "lg" | "xl"
  className?: string
  onClick?: () => void
  href?: string
  type?: "button" | "submit" | "reset"
}

export function AnimatedButton({
  children,
  variant = "primary",
  size = "md",
  className = "",
  onClick,
  type = "button",
}: AnimatedButtonProps) {
  const baseStyles = "font-bold rounded-full transition-all duration-300 cursor-pointer inline-flex items-center justify-center gap-2 relative overflow-hidden group"
  
  const variants = {
    primary: "bg-gradient-to-r from-[#e67e22] to-[#f39c12] text-white shadow-lg hover:shadow-2xl hover:shadow-[#e67e22]/50",
    secondary: "bg-gradient-to-r from-secondary to-[#1e3a1e] text-white shadow-lg hover:shadow-2xl hover:shadow-secondary/50",
    outline: "border-2 border-[#e67e22] text-[#e67e22] hover:bg-[#e67e22] hover:text-white shadow-md",
    ghost: "bg-transparent text-gray-700 hover:bg-gray-100"
  }
  
  const sizes = {
    sm: "px-6 py-2 text-sm",
    md: "px-8 py-3 text-base",
    lg: "px-10 py-4 text-lg",
    xl: "px-12 py-5 text-xl"
  }

  return (
    <motion.button
      type={type}
      onClick={onClick}
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
      whileHover={{ scale: 1.05, y: -2 }}
      whileTap={{ scale: 0.95 }}
      transition={{ type: "spring", stiffness: 400, damping: 17 }}
    >
      {/* Shimmer effect */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
        initial={{ x: "-100%" }}
        whileHover={{ x: "100%" }}
        transition={{ duration: 0.5 }}
      />
      
      {/* Content */}
      <span className="relative z-10 flex items-center gap-2">
        {children}
      </span>
      
      {/* Ripple on click */}
      <motion.div
        className="absolute inset-0 bg-white/30 rounded-full"
        initial={{ scale: 0, opacity: 1 }}
        whileTap={{ scale: 4, opacity: 0 }}
        transition={{ duration: 0.6 }}
      />
    </motion.button>
  )
}
