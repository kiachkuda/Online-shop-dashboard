export type User = {
  id: string;
  name: string;
  email: string;
  password: string;
};

export type Customer = {
  id: string;
  name: string;
  email: string;
  image_url: string;
};

export type Shoe = {
    id:number;
    name:string;
    description:string;
    brand:string;
    gender: "Men" | 'Women' | 'Kids' | 'Unisex';
    category: string;
    price:number;
    colors:string[];
    sizes:number[];
    images:string[],
    status:'available' | 'sold'
}