import React from "react";
import { BarChart3, FileText, CalendarDays } from "lucide-react";

const Stat = ({ icon, title, value, hint }) => (
  <div className="bg-white dark:bg-gray-900 p-6 rounded-2xl shadow border border-gray-100 dark:border-gray-800">
    <div className="flex items-center gap-3">
      {icon && <span className="text-purple-500">{React.createElement(icon, { className: "w-6 h-6" })}</span>}
      <p className="text-gray-700 dark:text-gray-200 font-semibold">{title}</p>
    </div>
    <h3 className="mt-4 text-3xl font-bold text-secondary dark:text-white">{value}</h3>
    {hint && <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">{hint}</p>}
  </div>
);

const Reports = () => {
  return (
    <div className="p-3 md:p-5 lg:p-7">
      <h1 className="text-3xl font-bold text-secondary dark:text-white tracking-tight">Reports</h1>
      <p className="text-mytext/80 dark:text-gray-400 font-medium mt-1">Overview of key delivery metrics.</p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
        <Stat icon={BarChart3} title="Delivered Today" value="—" hint="Real-time updates" />
        <Stat icon={FileText} title="Open Tickets" value="—" hint="Support status" />
        <Stat icon={CalendarDays} title="Monthly Parcels" value="—" hint="Last 30 days" />
      </div>
    </div>
  );
};

export default Reports;

