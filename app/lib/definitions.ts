import { ObjectId } from "mongodb";

export type User = {
  _id: ObjectId;
  firstname?: string;
  lastname?: string;
  email?: string;
  role?: 'user' | 'admin';
  password?: string;
  verified?: boolean;
  otp?: string | null;
  otpExpiry?: Date | null;
  resetPasswordToken?: string | null;
  createdAt?: Date;
  updatedAt?: Date;
};

export type Customer = {
  _id: ObjectId;
  firstname?: string;
  lastname?: string;
  email: string;
};

export interface Product {
  id: number;
  brand: string;           
  category: string;         
  name: string;             
  description?: string;     
  color: string[];          
  size: string;             
  gender: "Male" | "Female" | "Unisex"; 
  price: number;
  sku : string;            
  discount_price: number;   
  stock_quantity: number;   
  imageUrls: string[];      
}



export type ProductTable = {
   _id:ObjectId;
    name:string;
    description:string;
    brand:string;
    gender: "Men" | 'Women' | 'Kids' | 'Unisex';
    category: string;
    price:number;
    discount:number;
    color:string[];
    sizes:string[];
    imageUrls:string[];
    available:boolean;
    createdAt: Date;
    updatedAt: Date;
}

export type ProductDetails = {
  name : string;
  description: string;
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

export type UpdateProductDetails = {
    description:string;
    price:number;
    discount:number;
    available:boolean;
    updatedAt: Date;
}

