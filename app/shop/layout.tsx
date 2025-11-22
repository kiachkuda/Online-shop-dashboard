import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "../globals.css";
import Header from '../ui/components/header';
import SideNav from "../ui/components/sideNav";
import { CartProvider } from "@/contexts/CartProvider";
import AuthProvider from "@/contexts/AuthProvider";
import ViewedItemsProvider from "@/contexts/ViewedItemsProvider";


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <ViewedItemsProvider>
        <AuthProvider>
        <CartProvider>
          
        <div className="flex shrink-0 items-end rounded-lg">
        <Header />
       </div>

       <div className="flex">
        
          {children}
        </div>

      </CartProvider>
      </AuthProvider>
      </ViewedItemsProvider>
      </body>
    </html>
  );
}
