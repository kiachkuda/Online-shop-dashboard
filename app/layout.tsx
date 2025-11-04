import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from './ui/components/header';
import SideNav from "./ui/components/sideNav";
import { CartProvider } from "@/context/CartProvider";


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <CartProvider>
          
        <div className="flex shrink-0 items-end rounded-lg">
        <Header />
       </div>

       <div className="flex">
          <SideNav />
          {children}
        </div>

      </CartProvider>
      </body>
    </html>
  );
}
