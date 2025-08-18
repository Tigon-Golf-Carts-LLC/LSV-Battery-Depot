export interface CartItemWithProduct {
  id: string;
  sessionId: string;
  productId: string;
  quantity: number;
  createdAt?: Date;
  product?: {
    id: string;
    name: string;
    price: string;
    images: string[];
    category: string;
    series: string;
    technology: string;
  };
}

export interface BatteryQuizState {
  vehicleType: string;
  voltageSystem: string;
  usage: string;
  budget: string;
  currentStep: number;
}

export interface ProductFilter {
  category?: string;
  voltage?: string;
  technology?: string;
  series?: string;
  priceRange?: [number, number];
}
