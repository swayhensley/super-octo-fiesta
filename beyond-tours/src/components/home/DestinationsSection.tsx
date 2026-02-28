import DestinationCard from "@/components/shared/DestinationCard"
import { destinations } from "@/data/destinations"

export default function DestinationsSection() {
  return (
    <section id="destinations" className="py-24 md:py-36 bg-[#fdf6ec]">
      <div className="container-custom">
        <div className="text-center mb-28 space-y-6">
          <span className="text-[#e67e22] font-black tracking-[0.3em] uppercase text-xs reveal">Destinations</span>
          <h2 className="text-4xl md:text-5xl font-black text-gray-900 tracking-tight reveal">
            Where Do You Want <span className="text-[#e67e22]">to Go?</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto text-center reveal">
            Explore the most breathtaking locations across Kenya with our local expertise.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
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
    </section>
  )
}
