import { ArrowUturnDownIcon, ArrowUturnUpIcon, BanknotesIcon,  CurrencyDollarIcon, ShoppingBagIcon } from "@heroicons/react/16/solid";
import { UserGroupIcon } from "@heroicons/react/24/outline";
import clsx from "clsx";

export default function Summary()
{

    const summaryData = [
        {id:1, title:"Total Orders", stats:39099, percent:-34, icon:{icon:ShoppingBagIcon}},
        {id:2, title:"Total Delivered", stats:200000, percent:13, icon:{icon:CurrencyDollarIcon}},
        {id:3, title:"Total Revenue", stats:2000, percent:34, icon:{icon:BanknotesIcon}},
        {title:"Total Visitors", stats:200000, percent:5, icon:{icon:UserGroupIcon,}},

    ];

    return (
        <>
        {
            summaryData.map( (data) => {
                const Icon = data.icon.icon;
                return (
                    <div className="flex flex-col gap-1" key={data.id}>
                        {/* Top Content */}
                        <div className="flex flex-cols relative justify-between gap-5 px-8 py-6 shadow-xl bg-white rounded-md items-center ">
                            {/* Icon */}
                            
                            
                            {/* Sale Summary */}
                            <div className="flex flex-col gap-5">
                                <h4 className="text-md font-bold text-grey-600">{data.title}</h4>
                                <h3 className="text-2xl font-extrabold">{data.stats}</h3>

                                {/* Percentage Change */}
                                <div className={clsx("flex flex-row gap-2 items-end p-1 border rounded-md ", { "text-green-500 bg-black":data.percent > 0,  "text-white bg-red-300":data.percent < 0})}>
                                    <span className={clsx({ "text-green-500":data.percent > 0,  "text-red-500":data.percent < 0})}> 
                                    {data.percent<0?<ArrowUturnDownIcon className="w-6 h-6" />:<ArrowUturnUpIcon className="w-6 h-6" />}</span>
                                    {data.percent}%
                                </div>
                            </div>
            
                            

                            <div className={clsx( 
                                " absolute right-0 top-0  bg-blue-300 border border-black text-white px-4  py-2")} >
                                <Icon className="w-8 h-8" />
                            </div>
            
                        </div>
                        
                    </div>
                )
            }) 
        }
        </>
       
    )

}