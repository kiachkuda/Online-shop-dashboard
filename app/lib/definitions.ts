import { ObjectId } from "mongodb";

export type User = {
  _id: string;
  name: string;
  email: string;
  image_url: string;
  password: string;
};

export type Customer = {
  _id: string;
  name: string;
  email: string;
  image_url: string;
};

export type Product = {
    _id:string;
    name:string;
    description:string;
    brand:string;
    gender: "Men" | 'Women' | 'Kids' | 'Unisex';
    category: string;
    price:number;
    discount:number;
    colors:string[];
    sizes:string[];
    images:string[];
    available:boolean;
}

export type ProductTable = {
   _id:ObjectId;
    name:string;
    description:string;
    brand:string;
    gender: "Men" | 'Women' | 'Kids' | 'Unisex';
    category: string;
    price:number;
    buyingPrice:number;
    discount:number;
    colors:string[];
    sizes:string[];
    images:string[];
    available:boolean;
    createdAt: Date;
    updatedAt: Date;
}

export type UpdateProductDetails = {
    description:string;
    price:number;
    discount:number;
    available:boolean;
    updatedAt: Date;
}