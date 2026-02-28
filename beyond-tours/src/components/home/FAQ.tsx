"use client"

import { useState } from "react"
import { Plus, Minus } from "lucide-react"

const faqs = [
  {
    question: "What is the best time to visit Kenya for a safari?",
    answer: "The best time for a safari in Kenya is during the dry season, significantly from late June to October. This period coincides with the Great Wildebeest Migration in the Maasai Mara."
  },
  {
    question: "Do I need a visa to enter Kenya?",
    answer: "Most international travelers require an Electronic Travel Authorization (eTA) to enter Kenya. You should apply for this at least 2 weeks before your travel dates."
  },
  {
    question: "Is it safe to travel to Kenya?",
    answer: "Kenya is generally safe for tourists, especially when traveling with reputable tour operators like Beyond Tours. We prioritize your safety and use well-maintained vehicles and secure accommodations."
  },
  {
    question: "What should I pack for my safari?",
    answer: "We recommend light, breathable clothing in neutral colors (khaki, beige, olive), a warm jacket for morning game drives, comfortable walking shoes, a hat, sunscreen, and polarized sunglasses."
  },
  {
    question: "Can I customize my tour itinerary?",
    answer: "Absolutely! We specialize in tailored journeys. Whether you want to add more days to a safari or combine a bush adventure with a beach escape, we can customize every detail for you."
  }
]

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  return (
    <section className="py-24 md:py-36 bg-[#fdf6ec]">
      <div className="container-custom">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24">
          <div className="reveal-left">
            <div className="space-y-4 sticky top-40">
              <span className="text-secondary font-black tracking-[0.2em] uppercase text-sm flex items-center gap-3 reveal">
                <span className="w-12 h-[2px] bg-secondary" />
                Common Questions
              </span>
              <h2 className="text-4xl md:text-5xl font-black text-gray-900 tracking-tight leading-tight reveal">
                Everything You Need to <span className="text-[#e67e22] italic font-serif">Know</span>
              </h2>
              <p className="text-xl text-gray-600 max-w-xl leading-relaxed font-medium reveal">
                Find answers to the most common questions about traveling with Beyond Tours and exploring Kenya.
              </p>
              <div className="pt-8 reveal">
                <div className="p-10 rounded-[2.5rem] bg-secondary/5 border border-secondary/10 relative overflow-hidden group">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-secondary/5 rounded-full -mr-16 -mt-16 transition-transform duration-700 group-hover:scale-150" />
                  <p className="text-gray-900 font-black text-xl mb-4 relative z-10">Still have questions?</p>
                  <p className="text-gray-600 mb-8 relative z-10 font-medium">Our travel experts are here to help you plan your perfect trip.</p>
                  <a 
                    href="/contact" 
                    className="inline-flex items-center text-secondary font-black group relative z-10 text-lg"
                  >
                    Contact our team
                    <span className="ml-2 group-hover:translate-x-2 transition-transform">→</span>
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-6 reveal-right">
            {faqs.map((faq, index) => (
              <div 
                key={index}
                className={`rounded-[2.5rem] border transition-all duration-500 overflow-hidden ${
                  openIndex === index 
                    ? "border-secondary bg-secondary/[0.03] shadow-xl shadow-secondary/5 ring-4 ring-secondary/5" 
                    : "border-gray-100 hover:border-gray-200 bg-white"
                }`}
              >
                <button
                  onClick={() => setOpenIndex(openIndex === index ? null : index)}
                  className="w-full px-10 py-8 flex justify-between items-center text-left"
                >
                  <span className={`text-xl font-black transition-colors tracking-tight ${
                    openIndex === index ? "text-secondary" : "text-gray-900"
                  }`}>
                    {faq.question}
                  </span>
                  <div className={`p-2.5 rounded-full transition-all duration-500 ${
                    openIndex === index ? "bg-secondary text-white rotate-180" : "bg-gray-50 text-gray-400 group-hover:bg-gray-100"
                  }`}>
                    {openIndex === index ? <Minus size={20} /> : <Plus size={20} />}
                  </div>
                </button>
                <div 
                  className={`transition-all duration-500 ease-in-out ${
                    openIndex === index ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"
                  }`}
                >
                  <div className="px-10 pb-10 text-lg text-gray-500 leading-relaxed font-medium max-w-2xl">
                    {faq.answer}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
