import Link from "next/link"

interface DestinationCardProps {
  name: string
  description: string
  imageUrl: string
  href: string
}

export default function DestinationCard({ name, description, imageUrl, href }: DestinationCardProps) {
  return (
    <Link href={href} className="block group reveal">
      <div className="bg-white rounded-[2rem] overflow-hidden shadow-xl shadow-black/5 border border-gray-100 hover:border-secondary/20 hover:shadow-secondary/5 transition-all duration-700 hover:-translate-y-2 h-full">
        {/* Image Container */}
        <div className="relative h-64 sm:h-56 lg:h-72 overflow-hidden">
          <div 
            className="absolute inset-0 bg-cover bg-center group-hover:scale-110 transition-transform duration-[2000ms] ease-out"
            style={{ backgroundImage: `url('${imageUrl}')` }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
        </div>
        
        {/* Content Area */}
        <div className="p-8 md:p-10">
          <h3 className="text-2xl font-black mb-3 text-gray-900 group-hover:text-secondary transition-colors tracking-tight leading-tight">
            {name}
          </h3>
          <p className="text-gray-500 text-base leading-relaxed line-clamp-2 md:line-clamp-3 font-medium">
            {description}
          </p>
          <div className="mt-8 flex items-center gap-2 text-secondary font-black text-sm uppercase tracking-wider group-hover:gap-4 transition-all overflow-hidden h-0 group-hover:h-auto opacity-0 group-hover:opacity-100 duration-500">
            Explore Destination <span className="text-xl">→</span>
          </div>
        </div>
      </div>
    </Link>
  )
}
