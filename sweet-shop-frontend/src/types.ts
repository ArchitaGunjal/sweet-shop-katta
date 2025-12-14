export interface Sweet {
  id: number;
  name: string;
  category: string;
  price: number;
  quantity: number;
  image?: string;
}

export interface User {
  id: number;
  email: string;
  role: 'admin' | 'user';
}