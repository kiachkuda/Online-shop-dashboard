import { ShoppingBagIcon, DocumentDuplicateIcon, CurrencyEuroIcon, ArrowsUpDownIcon, ArrowDownRightIcon } from "@heroicons/react/24/outline"
import Summary from "../ui/dashboard/summary"

export default function Page() {
    return <div className="grid grid-cols-2 md:grid-cols-2 gap-2">
        {/* Main Page  */}
       <Summary />
    </div>
}