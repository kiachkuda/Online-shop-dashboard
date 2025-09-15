import { ArrowUturnDownIcon, ArrowUturnUpIcon, BanknotesIcon,  CurrencyDollarIcon, ShoppingBagIcon } from "@heroicons/react/16/solid";
import { UserGroupIcon } from "@heroicons/react/24/outline";
import clsx from "clsx";

export default function Summary()
{

    const summaryData = [
        {id:1, title:"Total Sales", stats:39099, percent:-34, icon:{icon:ShoppingBagIcon}, color:"bg-blue-800"},
        {id:2, title:"Total Income", stats:200000, percent:13, icon:{icon:CurrencyDollarIcon}, color:"bg-green-800"},
        {id:3, title:"Total Orders", stats:2000, percent:34, icon:{icon:BanknotesIcon}, color:"bg-yellow-800"},
        {title:"Total Visitors", stats:200000, percent:5, icon:{icon:UserGroupIcon,}, color:"bg-purple-800", id:4},

    ];

    return (
        <>
        {
            summaryData.map( (data) => {
                const Icon = data.icon.icon;
                return (
                    <div className="flex flex-col gap-1" key={data.id}>
                        {/* Top Content */}
                        <div className="flex flex-cols  justify-between gap-5 px-8 py-6 shadow-xl bg-white rounded-md items-center ">
                            {/* Icon */}
                            <div className={clsx(data.color, 
                                "border-r-3 rounded-b-3xl border-l-3 border-t-1 bg-blue-800 text-white border-gray-200 px-4 rounded-md py-2")} >
                                <Icon className="w-8 h-8" />
                            </div>
                            
                            {/* Sale Summary */}
                            <div className="flex flex-col">
                                <h4 className="text-sm text-grey-600">{data.title}</h4>
                                <h3 className="text-2xl font-extrabold">{data.stats}</h3>
                            </div>
            
                            {/* Percentage Change */}
                            <div className={clsx("flex flex-row gap-5 items-end justify-end ml-5", { "text-green-500":data.percent > 0,  "text-red-500":data.percent < 0})}>
                                <span className={clsx({ "text-green-500":data.percent > 0,  "text-red-500":data.percent < 0})}> 
                                {data.percent<0?<ArrowUturnDownIcon className="w-6 h-6" />:<ArrowUturnUpIcon className="w-6 h-6" />}</span>
                                {data.percent}%
                            </div>
            
                        </div>
                        {/* Graph representation */}
                        <div className=""></div>
                    </div>
                )
            }) 
        }
        </>
       
    )

}