import React from "react";
import {
  BarChart3,
  FileText,
  CalendarDays,
  TrendingUp,
  MapPin,
  CreditCard,
  Undo2,
  XCircle,
  CalendarRange,
  Download,
} from "lucide-react";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
} from "recharts";

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

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-8">
        <div className="rounded-3xl p-6 bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 shadow lg:col-span-2">
          <div className="flex items-center gap-2 mb-4">
            <TrendingUp className="w-5 h-5 text-purple-500" />
            <p className="text-lg font-semibold text-gray-800 dark:text-white">Monthly Trend</p>
          </div>
          <ResponsiveContainer width="100%" height={280}>
            <LineChart
              data={[
                { month: "Jan", delivered: 120, pending: 40 },
                { month: "Feb", delivered: 150, pending: 35 },
                { month: "Mar", delivered: 180, pending: 30 },
                { month: "Apr", delivered: 160, pending: 32 },
                { month: "May", delivered: 210, pending: 28 },
                { month: "Jun", delivered: 190, pending: 26 },
                { month: "Jul", delivered: 230, pending: 22 },
                { month: "Aug", delivered: 240, pending: 18 },
                { month: "Sep", delivered: 220, pending: 25 },
                { month: "Oct", delivered: 250, pending: 20 },
                { month: "Nov", delivered: 270, pending: 18 },
                { month: "Dec", delivered: 300, pending: 15 },
              ]}
              margin={{ top: 10, right: 10, bottom: 0, left: 0 }}
            >
              <CartesianGrid stroke="#f5f5f5" />
              <XAxis dataKey="month" tick={{ fontSize: 12, fill: "#555" }} />
              <YAxis tick={{ fontSize: 12, fill: "#555" }} />
              <Tooltip contentStyle={{ backgroundColor: "#fff", borderRadius: "10px", border: "1px solid #ddd" }} />
              <Line type="monotone" dataKey="delivered" stroke="#8b5cf6" strokeWidth={2} />
              <Line type="monotone" dataKey="pending" stroke="#ec4899" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>
        <div className="rounded-3xl p-6 bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 shadow">
          <div className="flex items-center gap-2 mb-4">
            <BarChart3 className="w-5 h-5 text-purple-500" />
            <p className="text-lg font-semibold text-gray-800 dark:text-white">Status Composition</p>
          </div>
          <ResponsiveContainer width="100%" height={280}>
            <PieChart>
              <Pie
                data={[
                  { name: "Delivered", value: 60 },
                  { name: "Pending", value: 20 },
                  { name: "Assigned", value: 12 },
                  { name: "Arriving", value: 8 },
                ]}
                dataKey="value"
                cx="50%"
                cy="50%"
                outerRadius={90}
                label
              >
                <Cell fill="#14b8a6" />
                <Cell fill="#f59e0b" />
                <Cell fill="#8b5cf6" />
                <Cell fill="#ec4899" />
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-8">
        <div className="rounded-3xl p-6 bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 shadow">
          <div className="flex items-center gap-2 mb-4">
            <MapPin className="w-5 h-5 text-purple-500" />
            <p className="text-lg font-semibold text-gray-800 dark:text-white">Region Performance</p>
          </div>
          <ResponsiveContainer width="100%" height={240}>
            <BarChart
              data={[
                { name: "Dhaka", delivered: 300 },
                { name: "Chattogram", delivered: 180 },
                { name: "Sylhet", delivered: 140 },
                { name: "Khulna", delivered: 120 },
                { name: "Rajshahi", delivered: 110 },
              ]}
              margin={{ top: 10, right: 10, bottom: 0, left: 0 }}
            >
              <CartesianGrid stroke="#f5f5f5" />
              <XAxis dataKey="name" tick={{ fontSize: 12, fill: "#555" }} />
              <YAxis tick={{ fontSize: 12, fill: "#555" }} />
              <Tooltip contentStyle={{ backgroundColor: "#fff", borderRadius: "10px", border: "1px solid #ddd" }} />
              <Bar dataKey="delivered" barSize={22} isAnimationActive={true}>
                <Cell fill="#8b5cf6" />
                <Cell fill="#22d3ee" />
                <Cell fill="#14b8a6" />
                <Cell fill="#f59e0b" />
                <Cell fill="#ec4899" />
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="rounded-3xl p-6 bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 shadow">
          <div className="flex items-center gap-2 mb-4">
            <CreditCard className="w-5 h-5 text-purple-500" />
            <p className="text-lg font-semibold text-gray-800 dark:text-white">Payment Breakdown</p>
          </div>
          <div className="space-y-4">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-300">Cash on Delivery</p>
              <div className="h-2 bg-gray-200 dark:bg-gray-800 rounded-full mt-1">
                <div className="h-2 rounded-full bg-purple-500" style={{ width: "70%" }}></div>
              </div>
            </div>
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-300">Online Payment</p>
              <div className="h-2 bg-gray-200 dark:bg-gray-800 rounded-full mt-1">
                <div className="h-2 rounded-full bg-pink-500" style={{ width: "30%" }}></div>
              </div>
            </div>
          </div>
        </div>

        <div className="rounded-3xl p-6 bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 shadow">
          <div className="flex items-center gap-2 mb-4">
            <Undo2 className="w-5 h-5 text-purple-500" />
            <p className="text-lg font-semibold text-gray-800 dark:text-white">Returns & Cancellations</p>
          </div>
          <ResponsiveContainer width="100%" height={240}>
            <BarChart
              data={[
                { name: "Returns", count: 12 },
                { name: "Cancellations", count: 7 },
              ]}
              margin={{ top: 10, right: 10, bottom: 0, left: 0 }}
            >
              <CartesianGrid stroke="#f5f5f5" />
              <XAxis dataKey="name" tick={{ fontSize: 12, fill: "#555" }} />
              <YAxis tick={{ fontSize: 12, fill: "#555" }} />
              <Tooltip contentStyle={{ backgroundColor: "#fff", borderRadius: "10px", border: "1px solid #ddd" }} />
              <Bar dataKey="count" barSize={22} isAnimationActive={true}>
                <Cell fill="#22d3ee" />
                <Cell fill="#ef4444" />
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-8">
        <div className="rounded-3xl p-6 bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 shadow">
          <div className="flex items-center gap-2 mb-4">
            <XCircle className="w-5 h-5 text-purple-500" />
            <p className="text-lg font-semibold text-gray-800 dark:text-white">SLA Breach Summary</p>
          </div>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600 dark:text-gray-300">Pickup Delay</span>
              <span className="text-sm font-semibold text-secondary dark:text-white">12</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600 dark:text-gray-300">Delivery Delay</span>
              <span className="text-sm font-semibold text-secondary dark:text-white">9</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600 dark:text-gray-300">Driver Assignment Delay</span>
              <span className="text-sm font-semibold text-secondary dark:text-white">7</span>
            </div>
          </div>
        </div>

        <div className="rounded-3xl p-6 bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 shadow">
          <div className="flex items-center gap-2 mb-4">
            <CalendarRange className="w-5 h-5 text-purple-500" />
            <p className="text-lg font-semibold text-gray-800 dark:text-white">Filters</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <select className="select select-bordered w-full">
              <option>Last 7 days</option>
              <option>Last 30 days</option>
              <option>Last quarter</option>
            </select>
            <select className="select select-bordered w-full">
              <option>All Regions</option>
              <option>Dhaka</option>
              <option>Chattogram</option>
              <option>Sylhet</option>
            </select>
          </div>
        </div>

        <div className="rounded-3xl p-6 bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 shadow">
          <div className="flex items-center gap-2 mb-4">
            <Download className="w-5 h-5 text-purple-500" />
            <p className="text-lg font-semibold text-gray-800 dark:text-white">Export Reports</p>
          </div>
          <div className="grid grid-cols-3 gap-3">
            <button className="btn btn-primary">CSV</button>
            <button className="btn btn-primary">XLSX</button>
            <button className="btn btn-primary">PDF</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reports;

