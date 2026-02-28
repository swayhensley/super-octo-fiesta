import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"

import { packages } from "@/data/packages"

export default function PackagesPage() {
  return (
    <div className="pt-32 pb-24 md:pt-48 md:pb-40 bg-[#f5f5f5]">
      <div className="container-custom">
        <div className="text-center mb-20 space-y-4">
          <span className="text-[#e67e22] font-black tracking-[0.3em] uppercase text-xs reveal">Our Packages</span>
          <h1 className="text-5xl md:text-7xl font-black text-gray-900 tracking-tight reveal">
            Handpicked <span className="text-[#e67e22]">Adventures</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed font-medium reveal">
            Choose from our carefully crafted tour packages designed to give you 
            the best Kenya experience.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {packages.map((pkg) => (
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

        <div className="mt-24 text-center bg-secondary text-white p-12 md:p-24 rounded-[3rem] shadow-2xl relative overflow-hidden group reveal">
          <div className="absolute inset-0 bg-gradient-to-r from-secondary to-[#e67e22]/20 opacity-50 transition-opacity group-hover:opacity-70" />
          <div className="relative z-10 space-y-8">
            <h2 className="text-4xl md:text-6xl font-black tracking-tight">Need a Custom <br/><span className="text-[#e67e22] italic font-serif">Itinerary?</span></h2>
            <p className="text-lg text-white/70 max-w-2xl mx-auto font-medium leading-relaxed
             m-auto">
              Don't see exactly what you're looking for? We specialize in creating 
              one-of-a-kind travel experiences tailored specifically to you.
            </p>
            <Link href="/contact" className="inline-block">
              <Button size="xl" className="bg-white text-secondary hover:bg-[#e67e22] hover:text-white rounded-full font-black px-16 py-8 shadow-2xl transition-all hover:-translate-y-1 active:scale-95 text-xl">
                Request Custom Package
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
