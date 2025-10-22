export default function Logo() {
    return (
    <div className="flex items-center space-x-2 cursor-pointer">
            <img
              src="/logo.png"
              alt="Logo"
              className="h-10 w-10 object-contain"
            />
            <span className="text-2xl md:block sm:hidden hidden font-bold text-blue-600">ShopEase</span>
          </div>
          )
}