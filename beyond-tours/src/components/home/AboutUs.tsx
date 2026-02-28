import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function AboutUs() {
  return (
    <section id="about-us" className="pt-24 md:pt-32 pb-36 md:pb-52 bg-white overflow-hidden">
      <div className="container-custom">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          {/* Image Side */}
          <div className="relative group order-2 lg:order-1">
            <div className="relative reveal-left">
              <div className="absolute -top-6 -left-6 w-32 h-32 bg-[#e67e22]/10 rounded-full blur-2xl" />
              <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-secondary/10 rounded-full blur-2xl" />
              
              <div className="relative aspect-[4/5] md:aspect-[3/4] rounded-[3rem] overflow-hidden shadow-2xl transition-all duration-700 group-hover:shadow-orange-500/10">
                <div 
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-[2000ms] group-hover:scale-110"
                  style={{ 
                    backgroundImage: "url('https://images.unsplash.com/photo-1523805009345-7448845a9e53?auto=format&fit=crop&w=1600&q=80')" 
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-60" />
              </div>

              {/* Overlapping Secondary Image */}
              <div className="absolute -bottom-12 -right-8 w-2/5 aspect-square rounded-[2rem] overflow-hidden shadow-2xl border-4 border-white hidden md:block reveal-right transition-transform duration-700 group-hover:-translate-x-4">
                <div 
                  className="absolute inset-0 bg-cover bg-center"
                  style={{ 
                    backgroundImage: "url('https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&w=800&q=80')" 
                  }}
                />
              </div>
              
              {/* Float Badge */}
              <div className="absolute -top-10 -right-10 hidden md:block animate-bounce-slow reveal transition-all duration-700 group-hover:translate-y-4">
                <div className="bg-white/80 backdrop-blur-2xl p-8 rounded-[2rem] shadow-2xl border border-white/40 ring-1 ring-black/5">
                  <p className="text-[#e67e22] text-5xl font-black mb-1">10+</p>
                  <p className="text-gray-900 font-extrabold uppercase tracking-widest text-[10px] leading-tight">Years of <br />Expertise</p>
                </div>
              </div>
            </div>
          </div>

          {/* Text Side */}
          <div className="space-y-8 order-1 lg:order-2 reveal-right">
            <div className="space-y-4">
              <span className="text-secondary font-black tracking-[0.2em] uppercase text-sm flex items-center gap-3">
                <span className="w-12 h-[2px] bg-secondary" />
                Our Story
              </span>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-gray-900 leading-[1.2] tracking-tight">
                Crafting <span className="text-[#e67e22] italic font-serif">Unforgettable</span> <br />
                Experiences
              </h2>
            </div>
            
            <div className="space-y-6">
              <p className="text-xl text-gray-600 leading-relaxed font-medium">
                Beyond Tours was born from a passion for the untamed beauty and rich cultural heritage of Kenya. We believe that travel should be more than just a destination; it should be a transformative journey.
              </p>
              <p className="text-lg text-gray-500 leading-relaxed">
                From the crimson sunsets of the Maasai Mara to the turquoise waters of the Swahili Coast, our team of local experts is dedicated to curating authentic adventures that go beyond the ordinary. We prioritize sustainable travel and meaningful encounters that support local communities.
              </p>
            </div>

            <div className="pt-6 reveal">
              <Link href="/contact" className="inline-block">
                <Button size="xl" className="bg-secondary hover:bg-secondary/90 text-white rounded-full px-10 transition-all shadow-xl hover:shadow-secondary/20 group">
                  Learn More About Us
                  <span className="ml-2 group-hover:translate-x-1 transition-transform">→</span>
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

