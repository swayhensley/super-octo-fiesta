export interface BouquetPrice {
  stems: number;
  price: number;
}

export interface AddOn {
  id: string;
  name: string;
  price: number;
  description?: string;
}

export const flowerBouquetPrices: BouquetPrice[] = [
  { stems: 20, price: 700 },
  { stems: 40, price: 1200 },
  { stems: 60, price: 1700 },
  { stems: 80, price: 2200 },
  { stems: 100, price: 2700 },
  { stems: 120, price: 3200 },
  { stems: 140, price: 3700 },
  { stems: 160, price: 4200 },
  { stems: 180, price: 4700 },
  { stems: 200, price: 5200 },
];

export const addOns: AddOn[] = [
  { id: "message-card", name: "Message Card", price: 100 },
  { id: "same-day-delivery", name: "Same Day Delivery", price: 300 },
  { id: "ribbon-finish", name: "Ribbon or Aesthetic Finishing", price: 200 },
];

export const moneyBouquetRule = {
  description: "Amount Inside + 50% Styling Fee",
  stylingFeeIncludes: ["Flowers", "Wrapping", "Design", "Labour"],
};
