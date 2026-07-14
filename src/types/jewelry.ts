export interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  rating: number;
  reviews: number;
  description: string;
  gemstone: string;
  metal: string;
  image: string;
  secondaryImage: string;
  tag: string;
  sku: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface ShippingDetails {
  fullName: string;
  email: string;
  address: string;
  city: string;
  zip: string;
  phone: string;
}
