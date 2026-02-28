export interface DestinationSection {
  id: string;
  title: string;
  description: string;
  image: string;
  features: string[];
}

export interface Destination {
  slug: string;
  name: string;
  description: string;
  shortDescription: string;
  imageUrl: string;
  heroImage: string;
  sections: DestinationSection[];
}

export const destinations: Destination[] = [
  {
    slug: "nairobi",
    name: "Nairobi",
    description: "The only city in the world with a National Park. Witness lions, rhinos, and giraffes against a backdrop of city skyscrapers. Explore vibrant markets, historical museums, and a rich urban heartbeat.",
    shortDescription: "The City in the Sun: Where wildlife meets the skyline.",
    imageUrl: "https://images.unsplash.com/photo-1580193813605-a5c78b4ee01a?auto=format&fit=crop&w=500",
    heroImage: "https://images.unsplash.com/photo-1580193813605-a5c78b4ee01a?auto=format&fit=crop&w=1600",
    sections: [
      {
        id: "safaris",
        title: "Nairobi Safaris",
        description: "Experience the unique harmony of wildlife and urban life. Visit the Nairobi National Park for a morning game drive, follow it up with feeding giraffes at the Giraffe Centre.",
        image: "https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&w=800",
        features: ["Nairobi National Park", "David Sheldrick Elephant Orphanage", "Giraffe Centre"]
      },
      {
        id: "mamba-village",
        title: "Mamba Village",
        description: "Discover East Africa's largest crocodile farm. A thrilling experience for families and reptile enthusiasts alike.",
        image: "https://images.unsplash.com/photo-1590422955030-9759bd6398b3?auto=format&fit=crop&w=800",
        features: ["Crocodile Feeding", "Boat Rides", "Ostrich Park"]
      },
      {
        id: "snake-park",
        title: "Snake Park & Aquarium",
        description: "Learn about Kenya's fascinating reptiles and colorful aquatic life in this educational and slightly daring excursion.",
        image: "https://images.unsplash.com/photo-1545239351-ef35f43d514b?auto=format&fit=crop&w=800",
        features: ["Venomous & Non-venomous Snakes", "Freshwater Aquarium", "Reptile Breeding"]
      },
      {
        id: "ghetto-tours",
        title: "Community (Ghetto) Tours",
        description: "Walk through the resilient communities of Nairobi with local guides to see the incredible creativity and empowerment projects in Kibera.",
        image: "https://images.unsplash.com/photo-1489749798305-4fea3ae63d43?auto=format&fit=crop&w=800",
        features: ["Kibera Guided Walks", "Women's Empowerment Projects", "Local Artisans"]
      },
      {
        id: "museums",
        title: "National Museums",
        description: "Dive deep into Kenya's heritage, from prehistoric fossils to the colonial era and the struggle for independence.",
        image: "https://images.unsplash.com/photo-1554907984-15263bfd63bd?auto=format&fit=crop&w=800",
        features: ["Nairobi National Museum", "Karen Blixen Museum", "Kenya Railway Museum"]
      }
    ]
  },
  {
    slug: "maasai-mara",
    name: "Maasai Mara",
    description: "Africa's most famous wildlife destination. Witness the Great Migration and the iconic Big Five in their natural habitat.",
    shortDescription: "The Great Wild: Witness the Eighth Wonder of the World.",
    imageUrl: "https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?auto=format&fit=crop&w=500",
    heroImage: "https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?auto=format&fit=crop&w=1600",
    sections: [
      {
        id: "game-drives",
        title: "Iconic Game Drives",
        description: "Traverse the vast golden plains in search of lions, leopards, elephants, and more.",
        image: "https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&w=800",
        features: ["Big Five Tracking", "Sunrise Safaris", "Professional Guides"]
      },
      {
        id: "migration",
        title: "The Great Migration",
        description: "Be a witness to the spectacular crossing of millions of wildebeest and zebras.",
        image: "https://images.unsplash.com/photo-1534177714502-0ee466d71314?auto=format&fit=crop&w=800",
        features: ["Mara River Crossing", "Breathtaking Views", "Seasonal Spectacle"]
      }
    ]
  },
  {
    slug: "naivasha",
    name: "Naivasha",
    description: "A freshwater lake in the Great Rift Valley, surrounded by volcanic craters and home to hippos and diverse birdlife.",
    shortDescription: "Rift Valley Serenity: Freshwater lakes and volcanic craters.",
    imageUrl: "https://images.unsplash.com/photo-1590422955030-9759bd6398b3?auto=format&fit=crop&w=500",
    heroImage: "https://images.unsplash.com/photo-1590422955030-9759bd6398b3?auto=format&fit=crop&w=1600",
    sections: [
      {
        id: "boat-safaris",
        title: "Lake Boat Safaris",
        description: "Get up close with hippos and see eagles dive for fish on the tranquil waters of Lake Naivasha.",
        image: "https://images.unsplash.com/photo-1590422955030-9759bd6398b3?auto=format&fit=crop&w=800",
        features: ["Hippo Watching", "Bird Photography", "Crescent Island Walk"]
      },
      {
        id: "hells-gate",
        title: "Hell's Gate National Park",
        description: "The only park where you can bike and hike among zebras and giraffes. Feel the geothermal power.",
        image: "https://images.unsplash.com/photo-1545239351-ef35f43d514b?auto=format&fit=crop&w=800",
        features: ["Biking with Wildlife", "Rock Climbing", "Natural Hot Springs"]
      }
    ]
  },
  {
    slug: "mombasa",
    name: "Mombasa",
    description: "An ancient island city on the Indian Ocean, blending Swahili culture with pristine white-sand beaches.",
    shortDescription: "The Swahili Coast: White sands and turquoise waters.",
    imageUrl: "https://images.unsplash.com/photo-1585123334904-845d60e97b29?auto=format&fit=crop&w=500",
    heroImage: "https://images.unsplash.com/photo-1585123334904-845d60e97b29?auto=format&fit=crop&w=1600",
    sections: [
      {
        id: "old-town",
        title: "Mombasa Old Town",
        description: "Walk through narrow streets filled with historical architecture, spice markets, and the historic Fort Jesus.",
        image: "https://images.unsplash.com/photo-1489749798305-4fea3ae63d43?auto=format&fit=crop&w=800",
        features: ["Fort Jesus (UNESCO)", "Ancient Architecture", "Authentic Spices"]
      },
      {
        id: "beaches",
        title: "North Coast Beaches",
        description: "Relax on the silver sands of Nyali and Bamburi, or dive into the Mombasa Marine National Park.",
        image: "https://images.unsplash.com/photo-1554907984-15263bfd63bd?auto=format&fit=crop&w=800",
        features: ["Water Sports", "Snorkeling", "Luxury Resorts"]
      }
    ]
  },
  {
    slug: "amboseli",
    name: "Amboseli",
    description: "Known for its large elephant herds and views of immense Mount Kilimanjaro across the border in Tanzania.",
    shortDescription: "Home of the African Elephant: Stunning views of Mount Kilimanjaro.",
    imageUrl: "https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&w=500",
    heroImage: "https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&w=1600",
    sections: [
      {
        id: "elephants",
        title: "Elephant Paradise",
        description: "Observe majestic elephant families against the snow-capped peak of Kilimanjaro.",
        image: "https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&w=800",
        features: ["Elephant Tracking", "Observation Hill", "Kilimanjaro Views"]
      }
    ]
  },
  {
    slug: "diani-beach",
    name: "Diani Beach",
    description: "Consistently voted one of Africa's best beaches. Turquoise waters, coral reefs, and monkeys in the coastal forests.",
    shortDescription: "Tropical Paradise: Crystal-clear waters and world-class diving.",
    imageUrl: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=500",
    heroImage: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1600",
    sections: [
      {
        id: "water-activities",
        title: "Ocean Adventures",
        description: "From kite surfing to diving with whale sharks, Diani is a playground for water lovers.",
        image: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=800",
        features: ["Scuba Diving", "Kite Surfing", "Traditional Dhow Tours"]
      }
    ]
  },
  {
    slug: "tsavo",
    name: "Tsavo",
    description: "Kenya's largest wildlife sanctuary. Famous for its red-skinned elephants, diverse landscapes, and the Mzima Springs.",
    shortDescription: "The Red Elephants: One of the world's largest game reserves.",
    imageUrl: "https://images.unsplash.com/photo-1519066629447-267fffa62d4b?auto=format&fit=crop&w=500",
    heroImage: "https://images.unsplash.com/photo-1519066629447-267fffa62d4b?auto=format&fit=crop&w=1600",
    sections: [
      {
        id: "mzima-springs",
        title: "Mzima Springs",
        description: "A natural marvel where millions of gallons of crystal clear water emerge from the volcanic rocks.",
        image: "https://images.unsplash.com/photo-1519066629447-267fffa62d4b?auto=format&fit=crop&w=800",
        features: ["Underwater Hippo View", "Lush Oasis", "Volcanic Landscapes"]
      }
    ]
  },
  {
    slug: "lamu-island",
    name: "Lamu Island",
    description: "A UNESCO World Heritage site and a place of quiet historical beauty. No cars, just donkeys and dhows.",
    shortDescription: "Cultural Heritage: A UNESCO World Heritage Site with Swahili architecture.",
    imageUrl: "https://images.unsplash.com/photo-1585123334904-845d60e97b29?auto=format&fit=crop&w=500",
    heroImage: "https://images.unsplash.com/photo-1585123334904-845d60e97b29?auto=format&fit=crop&w=1600",
    sections: [
      {
        id: "swahili-culture",
        title: "Traditional Living",
        description: "Experience the slow pace of life in Lamu Town and Shela Village, where every corner tells a story.",
        image: "https://images.unsplash.com/photo-1585123334904-845d60e97b29?auto=format&fit=crop&w=800",
        features: ["Donkey Transports", "Historical Stone Houses", "Peaceful Atmosphere"]
      }
    ]
  }
];
