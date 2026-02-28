"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Calendar, Users, MapPin } from "lucide-react";

function BookingForm() {
  const searchParams = useSearchParams();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    destination: "",
    travelDate: "",
    guests: "1",
    duration: "",
    packageType: "",
    specialRequests: "",
  });

  useEffect(() => {
    const dest = searchParams.get("dest");
    const type = searchParams.get("type");
    const item = searchParams.get("item");
    const stems = searchParams.get("stems");

    if (dest || type) {
      setFormData((prev) => ({
        ...prev,
        destination: dest || prev.destination,
        packageType: type || prev.packageType,
      }));
    }
  }, [searchParams]);


  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Booking submitted:", formData);
    alert("Thank you for your booking! We'll contact you shortly to confirm your reservation.");
    setFormData({
      name: "",
      email: "",
      phone: "",
      destination: "",
      travelDate: "",
      guests: "1",
      duration: "",
      packageType: "",
      specialRequests: "",
    });
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="pt-32 pb-24 md:pt-48 md:pb-64 bg-[#f5f5f5]">
      <div className="container-custom">
        <div className="text-center mb-20 space-y-4">
          <span className="text-[#e67e22] font-black tracking-[0.3em] uppercase text-xs reveal">
            Booking Request
          </span>
          <h1 className="text-5xl md:text-7xl font-black text-gray-900 tracking-tight reveal">
            Book Your <span className="text-[#e67e22]">Adventure</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed font-medium reveal m-auto">
            Ready to explore Kenya? Fill out the form below and our team will craft the perfect journey for you.
          </p>
        </div>

        <div className="max-w-5xl mx-auto reveal space-y-4">
          <Card className="border-none shadow-2xl rounded-[2.5rem] overflow-hidden">
            <CardHeader className="bg-gray-900 text-white p-10 md:p-14 text-center">
              <CardTitle className="text-3xl md:text-4xl font-black mb-2">
                Detailed Itinerary Request
              </CardTitle>
              <CardDescription className="text-gray-400 text-lg">
                Provide your travel details and we'll handle the rest
              </CardDescription>
            </CardHeader>
            <CardContent className="p-8 md:p-16">
              <form onSubmit={handleSubmit} className="space-y-12">
                {/* Personal Information */}
                <div className="space-y-8">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center text-[#e67e22] font-bold text-lg">1</div>
                    <h3 className="text-2xl font-black text-gray-900">Personal Information</h3>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-2">
                      <label htmlFor="name" className="text-sm font-bold text-gray-700 ml-1 uppercase tracking-wider">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="w-full px-6 py-4 bg-gray-50 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-[#e67e22] focus:bg-white focus:border-transparent outline-none transition-all placeholder:text-gray-400"
                        placeholder="John Doe"
                      />
                    </div>

                    <div className="space-y-2">
                      <label htmlFor="email" className="text-sm font-bold text-gray-700 ml-1 uppercase tracking-wider">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="w-full px-6 py-4 bg-gray-50 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-[#e67e22] focus:bg-white focus:border-transparent outline-none transition-all placeholder:text-gray-400"
                        placeholder="john@example.com"
                      />
                    </div>

                    <div className="space-y-2">
                      <label htmlFor="phone" className="text-sm font-bold text-gray-700 ml-1 uppercase tracking-wider">
                        Phone Number *
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        required
                        className="w-full px-6 py-4 bg-gray-50 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-[#e67e22] focus:bg-white focus:border-transparent outline-none transition-all placeholder:text-gray-400"
                        placeholder="+254 700 000 000"
                      />
                    </div>

                    <div className="space-y-2">
                      <label htmlFor="guests" className="text-sm font-bold text-gray-700 ml-1 uppercase tracking-wider">
                        Number of Guests *
                      </label>
                      <select
                        id="guests"
                        name="guests"
                        value={formData.guests}
                        onChange={handleChange}
                        required
                        className="w-full px-6 py-4 bg-gray-50 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-[#e67e22] focus:bg-white focus:border-transparent outline-none transition-all appearance-none cursor-pointer"
                      >
                        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
                          <option key={num} value={num}>
                            {num} {num === 1 ? "Guest" : "Guests"}
                          </option>
                        ))}
                        <option value="10+">10+ Guests</option>
                      </select>
                    </div>
                  </div>
                </div>

                {/* Trip Details */}
                <div className="space-y-8">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center text-[#e67e22] font-bold text-lg">2</div>
                    <h3 className="text-2xl font-black text-gray-900">Trip Details</h3>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-2">
                      <label htmlFor="destination" className="text-sm font-bold text-gray-700 ml-1 uppercase tracking-wider">
                        Preferred Destination *
                      </label>
                      <select
                        id="destination"
                        name="destination"
                        value={formData.destination}
                        onChange={handleChange}
                        required
                        className="w-full px-6 py-4 bg-gray-50 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-[#e67e22] focus:bg-white focus:border-transparent outline-none transition-all appearance-none cursor-pointer"
                      >
                        <option value="">Select a destination</option>
                        <option value="maasai-mara">Maasai Mara</option>
                        <option value="nairobi">Nairobi</option>
                        <option value="mombasa">Mombasa</option>
                        <option value="naivasha">Naivasha</option>
                        <option value="amboseli">Amboseli</option>
                        <option value="diani-beach">Diani Beach</option>
                        <option value="tsavo">Tsavo</option>
                        <option value="lamu">Lamu Island</option>
                        <option value="custom">Custom/Multiple</option>
                      </select>
                    </div>

                    <div className="space-y-2">
                      <label htmlFor="packageType" className="text-sm font-bold text-gray-700 ml-1 uppercase tracking-wider">
                        Package Type *
                      </label>
                      <select
                        id="packageType"
                        name="packageType"
                        value={formData.packageType}
                        onChange={handleChange}
                        required
                        className="w-full px-6 py-4 bg-gray-50 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-[#e67e22] focus:bg-white focus:border-transparent outline-none transition-all appearance-none cursor-pointer"
                      >
                        <option value="">Select package type</option>
                        <option value="safari">Wildlife Safari</option>
                        <option value="beach">Beach Getaway</option>
                        <option value="city">City Tour</option>
                        <option value="adventure">Adventure Package</option>
                        <option value="cultural">Cultural Experience</option>
                        <option value="custom">Custom Package</option>
                      </select>
                    </div>

                    <div className="space-y-2">
                      <label htmlFor="travelDate" className="text-sm font-bold text-gray-700 ml-1 uppercase tracking-wider">
                        Planned Travel Date *
                      </label>
                      <input
                        type="date"
                        id="travelDate"
                        name="travelDate"
                        value={formData.travelDate}
                        onChange={handleChange}
                        required
                        min={new Date().toISOString().split("T")[0]}
                        className="w-full px-6 py-4 bg-gray-50 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-[#e67e22] focus:bg-white focus:border-transparent outline-none transition-all"
                      />
                    </div>

                    <div className="space-y-2">
                      <label htmlFor="duration" className="text-sm font-bold text-gray-700 ml-1 uppercase tracking-wider">
                        Duration *
                      </label>
                      <select
                        id="duration"
                        name="duration"
                        value={formData.duration}
                        onChange={handleChange}
                        required
                        className="w-full px-6 py-4 bg-gray-50 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-[#e67e22] focus:bg-white focus:border-transparent outline-none transition-all appearance-none cursor-pointer"
                      >
                        <option value="">Select duration</option>
                        <option value="1">1 Day</option>
                        <option value="2">2 Days</option>
                        <option value="3">3 Days</option>
                        <option value="5">5 Days</option>
                        <option value="7">7 Days</option>
                        <option value="10">10 Days</option>
                        <option value="14">14 Days</option>
                        <option value="custom">Custom Duration</option>
                      </select>
                    </div>
                  </div>
                </div>

                {/* Special Requests */}
                <div className="space-y-4">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center text-[#e67e22] font-bold text-lg">3</div>
                    <h3 className="text-2xl font-black text-gray-900">Custom Preferences</h3>
                  </div>
                  <textarea
                    id="specialRequests"
                    name="specialRequests"
                    value={formData.specialRequests}
                    onChange={handleChange}
                    rows={4}
                    className="w-full px-6 py-5 bg-gray-50 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-[#e67e22] focus:bg-white focus:border-transparent outline-none transition-all resize-none placeholder:text-gray-400"
                    placeholder="Briefly describe any special requests, dietary needs, or specific activities you'd like to include..."
                  />
                </div>

                <div className="pt-6">
                  <Button
                    type="submit"
                    size="xl"
                    className="w-full bg-[#e67e22] hover:bg-[#d67219] text-white font-black rounded-2xl shadow-2xl shadow-orange-200 transition-all hover:-translate-y-1 active:scale-[0.98] leading-none"
                  >
                    Submit Booking Request
                  </Button>
                  <p className="mt-6 text-sm text-gray-500 text-center font-medium">
                    * No payment required at this stage. Our experts will contact you with a personalized quote.
                  </p>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

export default function BookNowPage() {
  return (
    <Suspense
      fallback={
        <div className="py-20 text-center">Loading booking form...</div>
      }
    >
      <BookingForm />
    </Suspense>
  );
}
