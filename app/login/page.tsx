import LoginForm from "@/app/ui/login-form"
import { ShoppingBagIcon, DocumentDuplicateIcon, CurrencyEuroIcon, ArrowsUpDownIcon, ArrowDownRightIcon } from "@heroicons/react/24/outline"


export default function Page() {
    return <div className="flex flex-col flex-shrink py-5 justify-center align-center items-center">
      <h2 className="text-2xl font-bold mb-8">Welcome Back Admin</h2>
      <LoginForm />
    </div>
}