import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function Hero() {
  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Background with Zoom Animation */}
      <div 
        className="absolute inset-0 bg-cover bg-center transition-transform duration-[10000ms] scale-100 hover:scale-110"
        style={{
          backgroundImage: "linear-gradient(rgba(0, 0, 0, 0.45), rgba(0, 0, 0, 0.45)), url('https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&w=1600&q=80')"
        }}
      />

      <div className="container-custom relative z-10 text-left text-white">
        <div className="max-w-4xl space-y-8 animate-in fade-in slide-in-from-bottom-12 duration-1000">
          <div className="space-y-4">
            <span className="inline-block text-[#e67e22] font-extrabold uppercase tracking-[0.3em] text-sm md:text-base animate-pulse reveal">
              Experience the Wild
            </span>
            <h1 className="text-5xl sm:text-7xl md:text-8xl font-black leading-[1.1] tracking-tight text-left reveal">
            Kenya, Beyond the <br />
              <span className="text-white/90 italic font-serif">Horizon</span>
            </h1>
          </div>
          
          <p className="text-xl md:text-2xl text-white/80 max-w-2xl leading-relaxed font-sans font-medium text-left reveal">
            Discover the magic of Kenya through authentic safaris, coastal escapes, and unforgettable urban adventures.
          </p>

          <div className="flex flex-col sm:flex-row gap-6 justify-start items-center pt-8">
            <Link href="/destinations" className="w-full sm:w-auto">
              <Button 
                size="xl"
                className="w-full bg-[#e67e22] hover:bg-white hover:text-[#e67e22] text-white font-black rounded-full px-12 transition-all duration-300 transform hover:scale-105 shadow-2xl hover:shadow-orange-500/20"
              >
                Start Your Journey
              </Button>
            </Link>
            <Link href="/contact" className="w-full sm:w-auto">
              <Button 
                size="xl"
                variant="outline"
                className="w-full bg-white/5 backdrop-blur-md text-white border-2 border-white/30 hover:bg-white hover:text-[#1a1a1a] hover:border-white font-black rounded-full px-12 transition-all duration-300 transform hover:scale-105"
              >
                Custom Trip
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Bottom Gradient for smoother transition */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
    </section>
  )
}

