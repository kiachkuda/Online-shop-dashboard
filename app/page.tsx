"use client"
import Products from '@/app/ui/components/Products';
import HeroCarousel from '@/app/ui/components/HeroCarousel';
import { Suspense } from 'react';
import { Offer } from './ui/components/offer';
import BgOne from '@/public/images/594x290-2.jpg'


export default function Page() {
  return (
    <main className="flex min-h-screen flex-col p-0 sm:p-6 md:p-6 w-full bg-white">
      <HeroCarousel />
      <Suspense>
        <Products />
       
      </Suspense>
      <Offer src={BgOne} title='Furniture Sale' discount={20}  />
    </main>
  );
}
