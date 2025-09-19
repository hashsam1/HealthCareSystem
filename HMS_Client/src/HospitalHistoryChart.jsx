import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  AreaChart,
  Area,
} from "recharts";


const data = [
  { year: "2010", patients: 500, surgeries: 120, satisfaction: 75 },
  { year: "2011", patients: 700, surgeries: 150, satisfaction: 78 },
  { year: "2012", patients: 850, surgeries: 200, satisfaction: 80 },
  { year: "2013", patients: 1000, surgeries: 180, satisfaction: 82 },
  { year: "2014", patients: 1150, surgeries: 250, satisfaction: 84 },
  { year: "2015", patients: 1300, surgeries: 280, satisfaction: 87 },
  { year: "2016", patients: 1500, surgeries: 300, satisfaction: 85 },
  { year: "2017", patients: 1700, surgeries: 350, satisfaction: 88 },
  { year: "2018", patients: 1900, surgeries: 400, satisfaction: 89 },
  { year: "2019", patients: 2100, surgeries: 450, satisfaction: 90 },
  { year: "2020", patients: 2300, surgeries: 500, satisfaction: 91 },
  { year: "2021", patients: 2500, surgeries: 600, satisfaction: 93 },
  { year: "2022", patients: 2800, surgeries: 700, satisfaction: 94 },
  { year: "2023", patients: 3100, surgeries: 850, satisfaction: 96 },
  { year: "2024", patients: 3400, surgeries: 1000, satisfaction: 97 },
];

export default function HospitalHistoryChart() {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 mt-8">
      <h2 className="text-2xl font-bold text-blue-700 dark:text-blue-400 mb-2">
        Our Growth Over the Years
      </h2>
      <p className="text-gray-600 dark:text-gray-300 mb-6">
        Here’s why our hospital is among the best: consistent patient growth, 
        rising number of successful surgeries, and ever-improving patient satisfaction.
      </p>

      <div className="w-full h-96">
        <ResponsiveContainer>
          <AreaChart data={data}>
            <defs>
              <linearGradient id="patientsColor" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8}/>
                <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
              </linearGradient>
              <linearGradient id="surgeryColor" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#f97316" stopOpacity={0.8}/>
                <stop offset="95%" stopColor="#f97316" stopOpacity={0}/>
              </linearGradient>
              <linearGradient id="satisfactionColor" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#22c55e" stopOpacity={0.8}/>
                <stop offset="95%" stopColor="#22c55e" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
            <XAxis dataKey="year" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Area
              type="monotone"
              dataKey="patients"
              stroke="#3b82f6"
              fillOpacity={1}
              fill="url(#patientsColor)"
            />
            <Area
              type="monotone"
              dataKey="surgeries"
              stroke="#f97316"
              fillOpacity={1}
              fill="url(#surgeryColor)"
            />
            <Area
              type="monotone"
              dataKey="satisfaction"
              stroke="#22c55e"
              fillOpacity={1}
              fill="url(#satisfactionColor)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
