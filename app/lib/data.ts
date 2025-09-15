import { Shoe } from "./definitions";

export const shoesData: Shoe[] = [
  {
    id: 1,
    name: "Nike Air Max 270",
    description:"",
    brand: "Nike",
    category: "Sneakers",
    price: 120,
    gender:"Women",
    sizes: [7, 8, 9, 10, 11],
    colors: ["Black", "White"],
    status: "sold",
    images: ["/images/nike_air_max_270.jpg"]
  },
  {
    id: 2,
    name: "Adidas Ultraboost 22",
    description:"",
    brand: "Adidas",
    gender:"Unisex",
    category: "Running",
    price: 180,
    sizes: [6, 7, 8, 9, 10, 12],
    colors: ["Blue", "Gray"],
    status: "available",
    images: ["/images/adidas_ultraboost_22.jpg"]
  },
  {
    id: 3,
    name: "Puma Suede Classic",
    description:"",
    brand: "Puma",
    gender:"Men",
    category: "Casual",
    price: 70,
    sizes: [6, 7, 8, 9, 10, 11],
    colors: ["Red", "Black"],
    status: "available",
    images: ["/images/puma_suede_classic.jpg"]
  },
  {
    id: 4,
    name: "Jordan Retro 1",
    brand: "Jordan",
    description:"",
    gender:'Men',
    category: "Basketball",
    price: 200,
    sizes: [7, 8, 9, 10, 11, 12],
    colors: ["White/Black/Red"],
    images: ["/images/jordan_retro_1.jpg", "/images/jordan_retro_1.jpg"],
     status: "available",
  },
  {
    id: 5,
    name: "Converse Chuck Taylor",
    description:"",
    brand: "Converse",
    gender:"Women",
    category: "Casual",
    price: 55,
    sizes: [37, 7.5, 235],
    colors: ["White", "Black"],
    status: "available",
    images: ["/images/converse_chuck_taylor.jpg"]
  }
];