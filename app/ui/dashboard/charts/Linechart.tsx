"use client";
import React from "react";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from "chart.js";
// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);
const LineChart = () => {
   const data = {
       labels: ["January", "February", "March", "April", "May"],
       datasets: [
           {
               label: "Sales",
               data: [10, 20, 30, 40, 50],
               borderColor: "#42A5F5",
               backgroundColor: "#90CAF9",
           },
       ],
   };
   const options = {
       responsive: true,
       plugins: {
           legend: { position: "top" },
           title: { display: true, text: "Monthly Sales" },
       },
   };
   return( 
   <div className='p-2 w-full shadow-lg border rounded-lg'>
      <h1>Line Chart</h1>
      <Line data={data}  />;
    </div>
   )
};
export default LineChart;