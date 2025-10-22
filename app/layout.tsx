import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from './ui/components/header';
import SideNav from "./ui/components/sideNav";


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <div className="flex shrink-0 items-end rounded-lg">
        <Header />
       </div>
       <div className="flex">
          <SideNav />
        {children}
        </div>
        
      </body>
    </html>
  );
}
