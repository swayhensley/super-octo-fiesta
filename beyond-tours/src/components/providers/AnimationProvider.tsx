"use client"

import { useReveal } from "@/hooks/useReveal"

export default function AnimationProvider({ children }: { children: React.ReactNode }) {
  useReveal()
  return <>{children}</>
}
