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

export type Product = {
    _id:ObjectId;
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