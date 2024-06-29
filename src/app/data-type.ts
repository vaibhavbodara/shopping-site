export interface SignUp {
  name: string;
  email: string;
  password: string;
}

export interface Login {
  email: string;
  password: string;
}

export interface Product {
  id: number;
  name: string;
  price: string;
  color: string;
  category: string;
  description: string;
  image: string;
  quantity?: number | undefined;
  productId: number | undefined;
}

export interface Cart {
  id?: number;
  name: string;
  price: string;
  color: string;
  category: string;
  description: string;
  image: string;
  quantity?: number | undefined;
  productId: number;
  userId: number;
}

export interface PriceSummary {
  amount: number;
  discount: number;
  tax: number;
  delivery: number;
  total: number;
}
