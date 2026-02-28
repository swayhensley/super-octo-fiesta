"use client"

import { Star, Quote, ChevronLeft, ChevronRight } from "lucide-react"
import { useState, useEffect, useCallback } from "react"

const testimonials = [
  {
    name: "Sarah Johnson",
    role: "Adventure Enthusiast",
    content: "The Maasai Mara safari was beyond my wildest dreams. Our guide was so knowledgeable and we saw the Big Five on our first day! Beyond Tours really knows Kenya.",
    rating: 5
  },
  {
    name: "David Chen",
    role: "Family Traveler",
    content: "Planning a family trip to Mombasa can be stressful, but Beyond Tours handled everything. The beach resort they recommended was perfect for the kids and us.",
    rating: 5
  },
  {
    name: "Elena Rodriguez",
    role: "Solo Traveler",
    content: "As a solo traveler, I felt safe and well-cared for. The Nairobi city tour was fantastic—I loved visiting the Giraffe Centre and the Elephant Orphanage.",
    rating: 5
  }
]

const bgImages = [
  "https://images.unsplash.com/photo-1546182990-dffeafbe841d?auto=format&fit=crop&w=1920&q=80", // Lion
  "https://images.unsplash.com/photo-1557050543-4d5f4e07ef46?auto=format&fit=crop&w=1920&q=80", // Elephant
  "https://images.unsplash.com/photo-1581262133533-513d3ae07e1b?auto=format&fit=crop&w=1920&q=80"  // Giraffe
]

export default function Testimonials() {
  const [activeIndex, setActiveIndex] = useState(0)
  const [bgIndex, setBgIndex] = useState(0)
  const [isExiting, setIsExiting] = useState(false)

  const nextSlide = useCallback(() => {
    setIsExiting(true)
    setTimeout(() => {
      setActiveIndex((prev) => (prev + 1) % testimonials.length)
      setIsExiting(false)
    }, 500)
  }, [])

  const prevSlide = () => {
    setIsExiting(true)
    setTimeout(() => {
      setActiveIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length)
      setIsExiting(false)
    }, 500)
  }

  useEffect(() => {
    const timer = setInterval(nextSlide, 5000)
    const bgTimer = setInterval(() => {
      setBgIndex((prev) => (prev + 1) % bgImages.length)
    }, 5000)
    return () => {
      clearInterval(timer)
      clearInterval(bgTimer)
    }
  }, [nextSlide])

  return (
    <section id="testimonials" className="py-24 md:py-32 bg-secondary text-white overflow-hidden relative">
      {/* Background Images Carousel */}
      <div className="absolute inset-0 z-0">
        {bgImages.map((img, i) => (
          <div 
            key={i}
            className={`absolute inset-0 bg-cover bg-center transition-opacity duration-2000 ease-in-out ${
              i === bgIndex ? "opacity-40" : "opacity-0"
            }`}
            style={{ backgroundImage: `url('${img}')` }}
          />
        ))}
        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-black/60" />
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-0 right-0 -mt-20 -mr-20 w-96 h-96 bg-[#e67e22] opacity-10 rounded-full blur-[100px] animate-pulse z-1" />
      <div className="absolute bottom-0 left-0 -mb-20 -ml-20 w-96 h-96 bg-secondary opacity-20 rounded-full blur-[100px] animate-pulse z-1" />
      
      <div className="container-custom relative z-10">
        <div className="text-center mb-20 space-y-4">
          <span className="text-[#e67e22] font-black tracking-[0.3em] uppercase text-sm flex justify-center items-center gap-3 reveal">
            <span className="w-12 h-[1px] bg-[#e67e22]" />
            Testimonials
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black mb-4 tracking-tight leading-tight reveal">
            Stories From Our <span className="text-[#e67e22] italic font-serif">Travelers</span>
          </h2>
          <div className="flex justify-center gap-1 reveal">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-6 h-6 fill-[#e67e22] text-[#e67e22]" />
            ))}
          </div>
        </div>

        <div className="max-w-4xl mx-auto relative px-4 md:px-12">
          {/* Navigation Buttons */}
          <button 
            onClick={prevSlide}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-20 w-12 h-12 flex items-center justify-center rounded-full bg-white/5 border border-white/10 hover:bg-[#e67e22] hover:border-[#e67e22] transition-all duration-300 hidden md:flex"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          
          <button 
            onClick={nextSlide}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-20 w-12 h-12 flex items-center justify-center rounded-full bg-white/5 border border-white/10 hover:bg-[#e67e22] hover:border-[#e67e22] transition-all duration-300 hidden md:flex"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          <div className="relative h-[600px] md:h-[500px] overflow-hidden">
            {testimonials.map((t, index) => (
              <div 
                key={index} 
                className={`absolute inset-0 transition-all duration-700 ease-in-out transform ${
                  index === activeIndex 
                    ? "translate-x-0 opacity-100" 
                    : index < activeIndex 
                      ? "-translate-x-full opacity-0" 
                      : "translate-x-full opacity-0"
                }`}
              >
                <div className="bg-white/5 backdrop-blur-xl p-8 md:p-16 rounded-[2.5rem] border border-white/10 relative group shadow-2xl h-full">
                  <Quote className="absolute top-8 right-8 md:top-12 md:right-12 w-16 h-16 md:w-24 md:h-24 text-white/5" />
                  
                  <div className="flex gap-1 mb-8">
                    {[...Array(t.rating)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 fill-[#e67e22] text-[#e67e22]" />
                    ))}
                  </div>
                  
                  <p className="text-2xl md:text-3xl lg:text-4xl italic text-gray-100 mb-12 leading-relaxed font-serif">
                    "{t.content}"
                  </p>
                  
                  <div className="flex items-center gap-6 mt-auto">
                    <div className="w-16 h-16 md:w-20 md:h-20 bg-gradient-to-br from-[#e67e22] to-orange-400 rounded-2xl flex items-center justify-center font-black text-2xl md:text-3xl text-white shadow-2xl rotate-3">
                      {t.name.charAt(0)}
                    </div>
                    <div>
                      <p className="font-black text-2xl md:text-3xl text-white">{t.name}</p>
                      <p className="text-[#e67e22] text-sm font-black uppercase tracking-[0.2em] mt-1">{t.role}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination Dots */}
          <div className="flex justify-center gap-3 mt-12">
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => {
                  setIsExiting(true)
                  setTimeout(() => {
                    setActiveIndex(i)
                    setIsExiting(false)
                  }, 500)
                }}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  i === activeIndex ? "bg-[#e67e22] w-8" : "bg-white/20 hover:bg-white/40"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

