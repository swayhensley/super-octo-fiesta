"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { MapPin, Phone, Mail, Instagram, MessageCircle, Facebook } from "lucide-react"
import Link from "next/link"

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: ""
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission - this would typically send to a backend
    console.log("Form submitted:", formData)
    alert("Thank you for contacting us! We'll get back to you soon.")
    setFormData({ name: "", email: "", phone: "", message: "" })
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  return (
    <div className="py-28 md:pt-40 md:pb-64 bg-gray-50/50">
      <div className="container-custom">
        <div className="text-center mb-24 space-y-4">
          <span className="text-[#e67e22] font-black tracking-[0.3em] uppercase text-xs reveal">Experience Kenya</span>
          <h1 className="text-5xl md:text-7xl font-black text-gray-900 tracking-tight reveal">
            Contact <span className="text-[#e67e22]">Us</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed font-medium reveal">
            We're here to help make your Kenya adventure truly unforgettable.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 md:gap-24 max-w-6xl mx-auto mb-20">
          {/* Contact Form */}
        <div className="reveal-left">
          <Card className="rounded-[2.5rem] shadow-2xl border-none">
          <CardHeader>
            <CardTitle className="text-2xl">Send us a Message</CardTitle>
            <CardDescription>Fill out the form below and we'll respond within 24 hours</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium mb-2">
                  Full Name *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#e67e22] focus:border-transparent outline-none"
                  placeholder="John Doe"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium mb-2">
                  Email Address *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#e67e22] focus:border-transparent outline-none"
                  placeholder="john@example.com"
                />
              </div>

              <div>
                <label htmlFor="phone" className="block text-sm font-medium mb-2">
                  Phone Number
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#e67e22] focus:border-transparent outline-none"
                  placeholder="+254 700 000 000"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium mb-2">
                  Your Message *
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={5}
                  className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#e67e22] focus:border-transparent outline-none resize-none"
                  placeholder="Tell us about your travel plans..."
                />
              </div>

              <Button 
                type="submit" 
                size="xl"
                className="w-full bg-[#e67e22] hover:bg-[#d67219] text-white font-bold shadow-xl shadow-orange-100 transition-all hover:-translate-y-1"
              >
                Send Message
              </Button>
            </form>
          </CardContent>
        </Card>
        </div>

        {/* Contact Information */}
        <div className="space-y-6 reveal-right">
          <Card className="rounded-[2.5rem] shadow-xl border-none">
            <CardHeader>
              <CardTitle className="text-2xl">Get in Touch</CardTitle>
              <CardDescription>We're available 24/7 to assist you</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-start gap-4">
                <MapPin className="w-6 h-6 text-[#e67e22] mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold mb-1">Office Location</h3>
                  <p className="text-gray-600">Nairobi, Kenya</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <Phone className="w-6 h-6 text-[#e67e22] mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold mb-1">Phone Numbers</h3>
                  <p className="text-gray-600">+254 745 087 969</p>
                  <p className="text-gray-600">+254 700 364 908</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <Mail className="w-6 h-6 text-[#e67e22] mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold mb-1">Email</h3>
                  <p className="text-gray-600">hensleyomondi@gmail.com</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="rounded-[2.5rem] shadow-xl border-none">
            <CardHeader>
              <CardTitle className="text-2xl">Follow Us</CardTitle>
              <CardDescription>Stay updated on our latest tours and offers</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex gap-6">
                <Link 
                  href="https://instagram.com" 
                  target="_blank" 
                  className="flex items-center gap-2 text-gray-700 hover:text-[#e67e22] transition-colors"
                >
                  <Instagram className="w-6 h-6" />
                  <span>Instagram</span>
                </Link>
                <Link 
                  href="https://wa.me/254745087969" 
                  target="_blank" 
                  className="flex items-center gap-2 text-gray-700 hover:text-[#e67e22] transition-colors"
                >
                  <MessageCircle className="w-6 h-6" />
                  <span>WhatsApp</span>
                </Link>
                <Link 
                  href="https://facebook.com" 
                  target="_blank" 
                  className="flex items-center gap-2 text-gray-700 hover:text-[#e67e22] transition-colors"
                >
                  <Facebook className="w-6 h-6" />
                  <span>Facebook</span>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  </div>
  )
}
