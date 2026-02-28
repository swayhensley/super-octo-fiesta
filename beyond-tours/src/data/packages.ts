export interface Package {
  id: number;
  name: string;
  duration: string;
  price: string;
  image: string;
  description: string;
  highlights: string[];
  destination: string;
  type: string;
}

export const packages: Package[] = [
  {
    id: 1,
    name: "Maasai Mara Safari",
    duration: "3 Days, 2 Nights",
    price: "KSh 45,000",
    image: "https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&w=800",
    description: "Experience the Great Migration and witness the Big Five in their natural habitat.",
    highlights: ["Game drives", "Maasai village visit", "All meals included", "Professional guide"],
    destination: "maasai-mara",
    type: "safari"
  },
  {
    id: 2,
    name: "Coastal Escape",
    duration: "5 Days, 4 Nights",
    price: "KSh 65,000",
    image: "https://images.unsplash.com/photo-1559827260-dc66d52bef19?auto=format&fit=crop&w=800",
    description: "Relax on pristine beaches and explore the rich Swahili culture of Mombasa and Diani.",
    highlights: ["Beach resort", "Old town tour", "Water sports", "Seafood dinner"],
    destination: "mombasa",
    type: "beach"
  },
  {
    id: 3,
    name: "Nairobi City Highlights",
    duration: "1 Day",
    price: "KSh 12,000",
    image: "https://images.unsplash.com/photo-1580193813605-a5c78b4ee01a?auto=format&fit=crop&w=800",
    description: "Discover the vibrant capital city where modern life meets wildlife.",
    highlights: ["City landmarks", "Giraffe Centre", "Elephant Orphanage", "Local Lunch"],
    destination: "nairobi",
    type: "city"
  },
  {
    id: 4,
    name: "Rift Valley Adventure",
    duration: "4 Days, 3 Nights",
    price: "KSh 55,000",
    image: "/images/naivasha-hippo.jpg",
    description: "Explore the stunning Rift Valley with lakes, volcanoes, and incredible biodiversity.",
    highlights: ["Lake Naivasha boat ride", "Hell's Gate cycling", "Crescent Island walk", "Hot springs"],
    destination: "naivasha",
    type: "adventure"
  },
  {
    id: 5,
    name: "Mt. Kenya Expedition",
    duration: "7 Days, 6 Nights",
    price: "KSh 95,000",
    image: "https://images.unsplash.com/photo-1564760055775-d63b17a55c44?auto=format&fit=crop&w=800",
    description: "Challenge yourself with a trek to Africa's second-highest peak.",
    highlights: ["Professional guides", "Camping equipment", "All permits", "Summit attempt"],
    destination: "custom",
    type: "adventure"
  },
  {
    id: 6,
    name: "Amboseli Wildlife Explorer",
    duration: "3 Days, 2 Nights",
    price: "KSh 48,000",
    image: "https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&w=800",
    description: "Photograph elephants with Mt. Kilimanjaro as your backdrop.",
    highlights: ["Game drives", "Bird watching", "Sunset views", "Luxury lodge"],
    destination: "amboseli",
    type: "safari"
  },
  {
    id: 7,
    name: "Nairobi National Park Safari",
    duration: "Half Day / 6 Hours",
    price: "KSh 9,500",
    image: "https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&w=800",
    description: "A unique wildlife experience with the city skyline as your backdrop.",
    highlights: ["Game Drive", "Rhino Sanctuary", "Lions & Giraffes", "Iconic Skyline Photos"],
    destination: "nairobi",
    type: "safari"
  },
  {
    id: 8,
    name: "Mamba Village Adventure",
    duration: "3-4 Hours",
    price: "KSh 5,000",
    image: "https://images.unsplash.com/photo-1604595861111-92576ade92ad?auto=format&fit=crop&w=800",
    description: "Visit East Africa's largest crocodile farm and enjoy boat rides on the lake.",
    highlights: ["Crocodile Feeding", "Ostrich Viewing", "Boat Ride", "Nature Walk"],
    destination: "nairobi",
    type: "adventure"
  },
  {
    id: 9,
    name: "Snake Park & Museum Tour",
    duration: "4 Hours",
    price: "KSh 6,500",
    image: "https://images.unsplash.com/photo-1531333348123-cb4953909774?auto=format&fit=crop&w=800",
    description: "Educational tour of the National Museum and the fascinating Snake Park.",
    highlights: ["History & Heritage", "Reptile Exhibition", "Botanical Garden", "Art Gallery"],
    destination: "nairobi",
    type: "cultural"
  },
  {
    id: 10,
    name: "Safari Park Hotel Night",
    duration: "Evening",
    price: "KSh 8,500",
    image: "https://images.unsplash.com/photo-1544124499-58db416684aa?auto=format&fit=crop&w=800",
    description: "The ultimate African night out with Nyama Choma barbecue and spectacular dances.",
    highlights: ["Safari Cats Dancers", "Roasted Meats Buffet", "Live Music", "Lush Surroundings"],
    destination: "nairobi",
    type: "cultural"
  }
];
