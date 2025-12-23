import Image, { StaticImageData } from 'next/image'
import React from 'react'

export function Offer(props:{
    src : StaticImageData,
    discount : number,
    title : string
}) {
  return (
    <div className={`w-[100%] mt-5 relative h-[300px]`}>
      
        <div className='absolute flex flex-row justify-end items-center p-16 bg-transparent w-[100%] h-[100%] z-10'>
          <div className='flex flex-col'>
             <h2>{props.title}</h2>
             <h5 className='text-white font-extralight text-xl'>Upto {`${props.discount}%`} off</h5>
             <button className='bg-red-500 text-white p-1 rounded-sm font-bold text-md'> Shop Now </button>
          </div>
         
          
        </div>
        <Image src={props.src} fill alt={props.title}  className='absolute w-auto h-[300] top-0 left-0 right-0'/>
        
    </div>
  )
}

