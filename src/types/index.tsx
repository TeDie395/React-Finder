export interface Flat {
    id: string;
    title: string;
    description: string;
    city: string;
    price: number;
    area: number;
    bedrooms: number;
    bathrooms: number;
    isFavorite: boolean;
    imageUrl: string;
    owner: {
      id: string;
      fullName: string;
      email: string;
    };
  }
  
  export interface User {
    id: string;
    fullName: string;
    email: string;
    role: 'user' | 'admin';
  }
  
  export interface FilterOptions {
    city: string;
    priceRange: {
      max: number;
    };
    areaRange: {
      max: number;
    };
  }