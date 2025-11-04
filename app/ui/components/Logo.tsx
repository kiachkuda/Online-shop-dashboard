import Link from "next/link"
import Image from "next/image"
export default function Logo() {
    return (
    <div className="flex items-center space-x-2 cursor-pointer">
           <Link href="/">
            <Image
              src="/logo.png"
              alt="Logo"
              width={10}
              height={10}
              className="h-10 w-10 object-contain"
            />
            <span className="text-2xl md:block sm:hidden hidden font-bold text-blue-600">ShopEase</span>
            </Link>
          </div>
          )
}