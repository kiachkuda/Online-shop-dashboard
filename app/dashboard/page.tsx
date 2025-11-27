"use client"
import Summary from "../ui/dashboard/summary"
import LineChart from "../ui/dashboard/charts/Linechart"
import BarChart from "../ui/dashboard/charts/BarChart"

export default function Page() {
    return <div className="grid grid-cols-2 md:grid-cols-2 gap-2">
        {/* Main Page  */}
       <Summary />
       <div className="w-full  col-span-2  flex md:flex-row flex-col  gap-2">
       <LineChart />
       <BarChart />
       </div>
    </div>
}