"use client"

import React from 'react'
import {
  Footprints,
  Glasses,
  Briefcase,
  Shirt,
  ShoppingBasket,
  Hand,
  Venus,
  Icon,
} from "lucide-react";
import { useSearchParams, useRouter, usePathname } from 'next/navigation';

export type CategoryType = {
    name : string;
    slug : string;
    icon: string;
}


function Categories(props  : {categories : CategoryType[], handleChange  : (id : string) => void }) {

    const searchParams = useSearchParams();
    const router = useRouter();
    const pathname = usePathname();

    const selectedCategory = searchParams.get("category");
   

  return (
    <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-8 xl:grid-cols-8 gap-2 p-2 rounded-lg text-sm bg-gray-100'>
        {
            props.categories.map( (category) => {
                return (
                    <div className={`flex items-center justify-center gap-2 px-2 py-1 rounded-md cursor-pointer ${category.slug === selectedCategory ? "bg-amber-200" : "bg-gray-50"}`}
                     key={category.name}
                     onClick={() => props.handleChange(category.slug)}>
                       
                        {category.name}
                    </div>
                )
            })
        }
    </div>
  )
}

export default Categories