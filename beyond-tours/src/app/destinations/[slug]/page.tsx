import { MapPin, ArrowLeft, Clock, Tag } from "lucide-react"
import Link from "next/link"
import { notFound } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { destinations } from "@/data/destinations"
import { packages } from "@/data/packages"

export default async function DestinationDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const destination = destinations.find(d => d.slug === slug)

  if (!destination) {
    notFound()
  }

  return (
    <main className="bg-white">
      {/* Hero Section */}
      <section className="relative h-[70vh] flex items-center justify-center overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 scale-105"
          style={{ backgroundImage: `linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url('${destination.heroImage}')` }}
        />
        <div className="container-custom relative z-10 text-center text-white space-y-6">
          <Link href="/#destinations" className="inline-flex items-center gap-2 text-white/80 hover:text-white transition-colors font-bold uppercase tracking-widest text-sm mb-4">
            <ArrowLeft size={16} />
            Back to Destinations
          </Link>
          <h1 className="text-6xl md:text-8xl font-black mb-6 tracking-tight animate-fade-in-up">
            {destination.name}
          </h1>
          <p className="text-xl md:text-2xl max-w-3xl mx-auto font-medium text-white/90 leading-relaxed">
            {destination.description}
          </p>
        </div>
      </section>

      {/* Navigation */}
      <div className="sticky top-20 z-40 bg-white/90 backdrop-blur-md border-b border-gray-100 hidden md:block shadow-sm">
        <div className="container-custom flex justify-center gap-12 py-5">
          {destination.sections.map(s => (
            <a key={s.id} href={`#${s.id}`} className="text-xs font-black uppercase tracking-[0.2em] text-gray-400 hover:text-[#e67e22] transition-colors">
              {s.title}
            </a>
          ))}
        </div>
      </div>

      {/* Sections */}
      <div className="py-24 space-y-40">
        {destination.sections.map((section, index) => (
          <section key={section.id} id={section.id} className="container-custom scroll-mt-40">
            <div className={`grid lg:grid-cols-2 gap-20 items-center ${index % 2 === 1 ? 'lg:flex-row-reverse' : ''}`}>
              <div className={`${index % 2 === 1 ? 'lg:order-2 reveal-right' : 'reveal-left'}`}>
                <div className="relative">
                  <div 
                    className="aspect-[4/5] rounded-[3rem] bg-cover bg-center shadow-2xl relative overflow-hidden group"
                    style={{ backgroundImage: `url('${section.image}')` }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  </div>
                  {/* Decorative element */}
                  <div className={`absolute -bottom-10 -right-10 w-40 h-40 bg-secondary/5 rounded-full -z-10 blur-3xl`} />
                  <div className={`absolute -top-10 -left-10 w-40 h-40 bg-[#e67e22]/5 rounded-full -z-10 blur-3xl`} />
                </div>
              </div>
              
              <div className={`space-y-10 ${index % 2 === 1 ? 'lg:order-1 reveal-left' : 'reveal-right'}`}>
                <div className="space-y-6">
                  <div className="flex items-center gap-4">
                    <span className="w-12 h-[2px] bg-[#e67e22]" />
                    <span className="text-[#e67e22] font-black tracking-[0.3em] uppercase text-xs">Destination Highlight</span>
                  </div>
                  <h2 className="text-4xl md:text-6xl font-black text-gray-900 leading-[1.1] tracking-tight">
                    {section.title}
                  </h2>
                </div>
                
                <p className="text-xl text-gray-600 leading-relaxed font-medium">
                  {section.description}
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-8">
                  {section.features.map(f => (
                    <div key={f} className="flex items-center gap-4 text-gray-800 font-bold group">
                      <div className="w-8 h-8 rounded-full bg-secondary/5 flex items-center justify-center text-[#e67e22] group-hover:bg-[#e67e22] group-hover:text-white transition-all duration-300">
                        <Star size={14} />
                      </div>
                      <span className="text-lg">{f}</span>
                    </div>
                  ))}
                </div>

                <div className="pt-10">
                  <Link href={`/book-now?dest=${destination.slug}&type=safari`}>
                    <Button className="bg-secondary hover:bg-[#e67e22] text-white px-12 py-8 rounded-full font-black text-xl transition-all shadow-2xl shadow-secondary/20 active:scale-95">
                      Explore This Experience
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </section>
        ))}
      </div>

      {/* Packages Section */}
      {packages.filter(pkg => pkg.destination === destination.slug).length > 0 && (
        <section className="py-24 bg-gray-50/50">
          <div className="container-custom">
            <div className="text-center mb-16 space-y-4">
              <span className="text-secondary font-black tracking-[0.3em] uppercase text-xs">Featured Tours</span>
              <h2 className="text-4xl md:text-5xl font-black text-gray-900 tracking-tight">
                Packages in <span className="text-[#e67e22]">{destination.name}</span>
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
              {packages
                .filter(pkg => pkg.destination === destination.slug)
                .map((pkg) => (
                  <Link key={pkg.id} href={`/book-now?dest=${pkg.destination}&type=${pkg.type}`} className="block group reveal">
                    <Card className="flex flex-col h-full border-none shadow-xl hover:shadow-2xl transition-all duration-500 rounded-[2rem] overflow-hidden hover:-translate-y-2 bg-white ring-1 ring-black/5">
                      <div className="relative h-64 overflow-hidden">
                        <div 
                          className="absolute inset-0 bg-cover bg-center group-hover:scale-110 transition-transform duration-1000"
                          style={{ backgroundImage: `url('${pkg.image}')` }}
                        />
                        <div className="absolute inset-0 bg-black/20" />
                        <div className="absolute bottom-6 left-6 bg-white/95 backdrop-blur-md px-4 py-2 rounded-full text-sm font-black text-[#e67e22]">
                          {pkg.price}
                        </div>
                      </div>
                      
                      <CardHeader className="pt-8 pb-4 px-8">
                        <CardTitle className="text-2xl font-black text-gray-900 group-hover:text-secondary transition-colors">{pkg.name}</CardTitle>
                        <CardDescription className="text-sm font-black text-secondary uppercase tracking-widest mt-1">{pkg.duration}</CardDescription>
                      </CardHeader>
                      <CardContent className="flex-grow pb-8 px-8">
                        <p className="mb-6 text-gray-600 leading-relaxed font-medium">{pkg.description}</p>
                        <div className="space-y-4 bg-gray-50/50 p-6 rounded-2xl border border-gray-100">
                          <p className="font-black text-gray-900 text-xs uppercase tracking-widest flex items-center gap-2">
                            <span className="w-8 h-[1px] bg-[#e67e22]"></span>
                            Includes
                          </p>
                          <ul className="grid grid-cols-1 gap-2">
                            {pkg.highlights.map((highlight, index) => (
                              <li key={index} className="text-sm text-gray-600 flex items-center gap-3 font-medium">
                                <span className="text-[#e67e22] font-bold">✓</span>
                                {highlight}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </CardContent>
                      <CardFooter className="pt-0 pb-10 px-8">
                        <Button className="w-full bg-[#1a1a1a] group-hover:bg-secondary text-white font-black rounded-2xl py-7 transition-all shadow-xl group-hover:shadow-secondary/20 active:scale-[0.98]">
                          Book This Adventure
                        </Button>
                      </CardFooter>
                    </Card>
                  </Link>
                ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="bg-secondary text-white py-32 mt-24 reveal">
        <div className="container-custom">
          <div className="text-center space-y-12 max-w-4xl mx-auto">
            <h2 className="text-5xl md:text-7xl font-black tracking-tighter">
              Start Your Tour in <br/>
              <span className="text-[#e67e22] italic font-serif ">{destination.name}</span> Today
            </h2>
            <p className="text-xl md:text-2xl text-white/70 font-medium leading-relaxed">
              Don't just travel. Experience Kenya through the eyes of those who call it home. Custom itineraries available for all destinations.
            </p>
            <div className="flex flex-col sm:flex-row gap-8 justify-center pt-8">
              <Link href="/contact">
                <Button variant="outline" className="border-2 border-white/20 text-white hover:bg-white hover:text-secondary px-16 py-8 rounded-full font-black text-xl transition-all">
                  Talk to an Expert
                </Button>
              </Link>
              <Link href={`/book-now?dest=${destination.slug}&type=safari`}>
                <Button className="bg-[#e67e22] hover:bg-white hover:text-secondary text-white px-16 py-8 rounded-full font-black text-xl shadow-2xl shadow-orange-500/10 transition-all">
                  Book Your Trip
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}

// Generate static and dynamic segments
export async function generateStaticParams() {
  return destinations.map((d) => ({
    slug: d.slug,
  }))
}

const Star = ({ size, className }: { size?: number, className?: string }) => (
  <svg 
    width={size || 24} 
    height={size || 24} 
    viewBox="0 0 24 24" 
    fill="currentColor" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
  </svg>
)
