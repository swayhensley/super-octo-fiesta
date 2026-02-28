import { ShieldCheck, Compass, Users, HeartHandshake } from "lucide-react"

const benefits = [
  {
    icon: <Compass className="w-12 h-12" />,
    title: "Expert Local Guides",
    description: "Our guides are born and raised in Kenya, offering deep insights and hidden gems you won't find in guidebooks."
  },
  {
    icon: <Users className="w-12 h-12" />,
    title: "Tailored Itineraries",
    description: "No two travelers are the same. We create custom journeys that match your interests, budget, and pace."
  },
  {
    icon: <ShieldCheck className="w-12 h-12" />,
    title: "Safe & Reliable",
    description: "Your safety is our priority. We use well-maintained vehicles and reputable accommodations for a worry-free trip."
  },
  {
    icon: <HeartHandshake className="w-12 h-12" />,
    title: "Sustainable Travel",
    description: "We are committed to preserving Kenya's wildlife and supporting the communities that make this land special."
  }
]

export default function WhyChooseUs() {
  return (
    <section id="why-choose-us" className="py-24 md:py-36 bg-[#1e3a1e] relative overflow-hidden">
      <div className="container-custom">
        <div className="text-center mb-20 space-y-4">
          <span className="text-orange-400 font-black tracking-[0.2em] uppercase text-sm flex justify-center items-center gap-3 reveal">
            <span className="w-12 h-[1px] bg-orange-400" />
            Why Beyond Tours?
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-white tracking-tight leading-tight reveal">
            Expertise You Can <span className="text-orange-400 italic font-serif">Trust</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed font-medium reveal">
            We go above and beyond to ensure your Kenyan adventure is nothing short of extraordinary.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {benefits.map((benefit, index) => (
            <div key={index} className="flex flex-col items-center text-center p-10 rounded-[2.5rem] transition-all duration-700 bg-white/10 backdrop-blur-sm hover:bg-white/15 group border border-white/10 hover:border-orange-400/40 hover:-translate-y-2 reveal">
              <div className="mb-8 p-6 bg-orange-400/20 rounded-3xl group-hover:bg-orange-400 text-orange-400 group-hover:text-white transition-all duration-500 transform group-hover:rotate-6">
                {benefit.icon}
              </div>
              <h3 className="text-2xl font-black mb-4 text-white group-hover:text-orange-400 transition-colors duration-500 tracking-tight">{benefit.title}</h3>
              <p className="text-gray-300 leading-relaxed font-medium text-[15px]">
                {benefit.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

