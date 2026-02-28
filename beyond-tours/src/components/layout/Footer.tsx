import Link from "next/link"
import { Instagram, MessageCircle, Facebook, Mail, MapPin, Phone } from "lucide-react"

export default function Footer() {
  return (
    <footer className="bg-secondary text-white pt-5 pb-12 overflow-hidden relative mt-5 border-t-4 border-[#e67e22]">
      
      <div className="container-custom relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 mb-20">
          {/* Company Info */}
          <div className="space-y-8">
            <Link href="/" className="text-3xl font-black tracking-tighter text-white block">
              BEYOND <span className="text-[#e67e22]">TOURS</span>
            </Link>
            <p className="text-gray-400 leading-relaxed font-medium">
              Crafting authentic Kenyan journeys that go beyond the ordinary. 
              Join us for safaris and urban adventures.
            </p>
            <div className="flex gap-4">
              <Link href="https://instagram.com" className="w-12 h-12 flex items-center justify-center bg-white/5 rounded-2xl hover:bg-[#e67e22] hover:-translate-y-1 transition-all duration-300 text-white/70 hover:text-white border border-white/10">
                <Instagram size={20} />
              </Link>
              <Link href="https://wa.me/254745087969" className="w-12 h-12 flex items-center justify-center bg-white/5 rounded-2xl hover:bg-[#e67e22] hover:-translate-y-1 transition-all duration-300 text-white/70 hover:text-white border border-white/10">
                <MessageCircle size={20} />
              </Link>
              <Link href="https://facebook.com" className="w-12 h-12 flex items-center justify-center bg-white/5 rounded-2xl hover:bg-[#e67e22] hover:-translate-y-1 transition-all duration-300 text-white/70 hover:text-white border border-white/10">
                <Facebook size={20} />
              </Link>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-8">
            <h4 className="text-xl font-black tracking-tight text-white flex items-center gap-3">
              <span className="w-8 h-[2px] bg-[#e67e22]" />
              Quick Links
            </h4>
            <ul className="space-y-4 text-gray-400 font-medium">
              <li><Link href="/#about-us" className="hover:text-[#e67e22] transition-colors flex items-center gap-2 group"><span className="w-1.5 h-1.5 rounded-full bg-white/20 group-hover:bg-[#e67e22] transition-colors" /> About Us</Link></li>
              <li><Link href="/destinations" className="hover:text-[#e67e22] transition-colors flex items-center gap-2 group"><span className="w-1.5 h-1.5 rounded-full bg-white/20 group-hover:bg-[#e67e22] transition-colors" /> Destinations</Link></li>
              <li><Link href="/#packages" className="hover:text-[#e67e22] transition-colors flex items-center gap-2 group"><span className="w-1.5 h-1.5 rounded-full bg-white/20 group-hover:bg-[#e67e22] transition-colors" /> Tour Packages</Link></li>
              <li><Link href="/book-now" className="hover:text-[#e67e22] transition-colors flex items-center gap-2 group"><span className="w-1.5 h-1.5 rounded-full bg-white/20 group-hover:bg-[#e67e22] transition-colors" /> Book a Trip</Link></li>
            </ul>
          </div>

          {/* Contact Details */}
          <div className="space-y-8">
            <h4 className="text-xl font-black tracking-tight text-white flex items-center gap-3">
              <span className="w-8 h-[2px] bg-[#e67e22]" />
              Contact Us
            </h4>
            <ul className="space-y-6 text-gray-400 font-medium">
              <li className="flex items-start gap-4 group">
                <div className="p-3 bg-white/5 rounded-xl text-[#e67e22] group-hover:bg-[#e67e22] group-hover:text-white transition-all">
                  <MapPin size={18} />
                </div>
                <span className="pt-1">Nairobi, Kenya</span>
              </li>
              <li className="flex items-start gap-4 group text-nowrap">
                <div className="p-3 bg-white/5 rounded-xl text-[#e67e22] group-hover:bg-[#e67e22] group-hover:text-white transition-all">
                  <Phone size={18} />
                </div>
                <span className="pt-1">+254 745 087 969</span>
              </li>
              <li className="flex items-start gap-4 group text-nowrap">
                <div className="p-3 bg-white/5 rounded-xl text-[#e67e22] group-hover:bg-[#e67e22] group-hover:text-white transition-all">
                  <Phone size={18} />
                </div>
                <span className="pt-1">+254 700 364 908</span>
              </li>
              <li className="flex items-start gap-4 group">
                <div className="p-3 bg-white/5 rounded-xl text-[#e67e22] group-hover:bg-[#e67e22] group-hover:text-white transition-all">
                  <Mail size={18} />
                </div>
                <span className="pt-1 truncate">hensleyomondi@gmail.com</span>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div className="space-y-8">
            <h4 className="text-xl font-black tracking-tight text-white flex items-center gap-3">
              <span className="w-8 h-[2px] bg-[#e67e22]" />
              Newsletter
            </h4>
            <p className="text-gray-400 font-medium leading-relaxed">
              Subscribe to get latest travel updates and special offers.
            </p>
            <div className="flex flex-col gap-3">
              <input 
                type="email" 
                placeholder="Your email address" 
                className="bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-sm focus:outline-none focus:border-[#e67e22] transition-all w-full"
              />
              <button className="bg-[#e67e22] hover:bg-[#d67219] text-white font-black py-4 px-8 rounded-2xl transition-all active:scale-[0.98] shadow-2xl shadow-orange-500/10">
                Subscribe
              </button>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6 text-sm text-gray-500 font-medium">
          <p>© {new Date().getFullYear()} Beyond Tours. Crafted with passion by <span className="text-white">Josephine Njunge</span>.</p>
          <div className="flex gap-8">
            <Link href="#" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link href="#" className="hover:text-white transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}

