import Image, { StaticImageData } from 'next/image'
import React from 'react'

export function Offer(props:{
    src : StaticImageData,
    discount : number,
    title : string
}) {
  return (
    <div className={`flex flex-1 justify-center mt-5 relative h-[300px]`}>
        <h1>Great Offers</h1>
        <Image src={props.src} fill alt={props.title}  className='absolute w-auto h-[300] top-0 left-0 right-0'/>
    </div>
  )
}

