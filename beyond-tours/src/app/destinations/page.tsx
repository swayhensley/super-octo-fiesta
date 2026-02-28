import DestinationCard from "@/components/shared/DestinationCard"
import { destinations } from "@/data/destinations"

export default function DestinationsPage() {
  return (
    <div className="pt-32 pb-24 md:pt-48 md:pb-40 bg-[#f5f5f5]">
      <div className="container-custom">
        <div className="text-center mb-20 space-y-4">
          <span className="text-[#e67e22] font-black tracking-[0.3em] uppercase text-xs reveal">Our Destinations</span>
          <h1 className="text-5xl md:text-7xl font-black text-gray-900 tracking-tight reveal">
            Explore <span className="text-[#e67e22]">Kenya</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed font-medium reveal">
            Discover the diverse beauty of Kenya, from the untamed savannahs to the crystal-clear coastal waters.
          </p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-10">
          {destinations.map((destination) => (
            <DestinationCard
              key={destination.slug}
              name={destination.name}
              description={destination.shortDescription}
              imageUrl={destination.imageUrl}
              href={`/destinations/${destination.slug}`}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
