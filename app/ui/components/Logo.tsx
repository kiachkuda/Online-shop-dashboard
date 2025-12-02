import Link from "next/link"
import Image from "next/image"
export default function Logo() {
    return (
    <div className="flex items-center space-x-2 cursor-pointer">
           <Link href="/" className="flex gap-2">
           <div className="relative">
            <Image
              src="/logo.png"
              alt="Logo"
              width={100}
              height={100}
              className="h-10 w-10 object-contain"
            />
           </div>
            
            <span className="text-2xl md:block sm:hidden hidden font-bold text-blue-600">
              ShopEase
            </span></Link>
           
          </div>
          )
}