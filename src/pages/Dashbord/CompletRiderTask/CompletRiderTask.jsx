import React, { useState } from "react";
import useAuth from "../../../Hook/useAuth";
import useAxiosSecoir from "../../../Hook/useAxiosSecoir";
import { useQuery } from "@tanstack/react-query";
import Loding from "../../../Shared/Loding";
import {
  Download,
  Search,
  Filter,
  CheckCircle,
  DollarSign,
  Package,
  TrendingUp,
  MapPin,
  AlertCircle,
} from "lucide-react";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  PieChart,
  Pie,
  Cell,
  Legend,
  AreaChart,
  Area,
} from "recharts";

const CompletRiderTask = () => {
  const { user } = useAuth();
  const axiosSecore = useAxiosSecoir();
  const [searchTerm, setSearchTerm] = useState("");
  const [filterDistrict, setFilterDistrict] = useState("All");

  const {
    data: parcel = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["parcel", user.email, "driver-assigned"],
    queryFn: async () => {
      const res = await axiosSecore.get(
        `parcel/rider?riderEmail=${user.email}&deliveryStatus=parcel-delivered`
      );
      return res.data;
    },
  });

  const handelCalculateCost = (items) => {
    if (items.senderdistick === items.reciverDistrick) {
      return items.totalCost * 0.6;
    } else {
      return items.totalCost * 0.8;
    }
  };

  // Derived Data
  const filteredParcels = parcel.filter((item) => {
    const matchesSearch =
      item.percilname?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.parcelType?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDistrict =
      filterDistrict === "All" || item.reciverDistrick === filterDistrict;
    return matchesSearch && matchesDistrict;
  });

  const totalEarnings = parcel.reduce(
    (acc, curr) => acc + handelCalculateCost(curr),
    0
  );
  const totalParcels = parcel.length;
  const uniqueDistricts = [...new Set(parcel.map((p) => p.reciverDistrick))];
  const avgEarnings = totalParcels > 0 ? totalEarnings / totalParcels : 0;

  // Chart Data
  const districtData = Object.entries(
    parcel.reduce((acc, cur) => {
      const d = cur.reciverDistrick || "Unknown";
      acc[d] = (acc[d] || 0) + 1;
      return acc;
    }, {})
  ).map(([name, count]) => ({ name, count }));

  const earningsData = parcel.map((item, index) => ({
    name: `Task ${index + 1}`,
    amount: handelCalculateCost(item),
    cost: item.totalCost,
  }));

  const COLORS = ["#8b5cf6", "#ec4899", "#06b6d4", "#f59e0b", "#10b981"];

  const handleExport = () => {
    const csvContent =
      "data:text/csv;charset=utf-8," +
      ["Parcel Name,Type,Weight,Sender District,Receiver District,Cost,Earnings"].join(",") +
      "\n" +
      parcel
        .map((row) =>
          [
            row.percilname,
            row.parcelType,
            row.weight,
            row.senderdistick,
            row.reciverDistrick,
            row.totalCost,
            handelCalculateCost(row),
          ].join(",")
        )
        .join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "completed_tasks.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const SkeletonRow = () => (
    <tr className="animate-pulse border-b border-gray-100 dark:border-gray-800">
      <td className="p-4">
        <div className="h-4 w-8 bg-gray-200 dark:bg-gray-700 rounded"></div>
      </td>
      <td className="p-4">
        <div className="space-y-2">
          <div className="h-4 w-32 bg-gray-200 dark:bg-gray-700 rounded"></div>
          <div className="h-3 w-24 bg-gray-100 dark:bg-gray-800 rounded"></div>
        </div>
      </td>
      <td className="p-4">
        <div className="space-y-2">
          <div className="h-3 w-24 bg-gray-200 dark:bg-gray-700 rounded"></div>
          <div className="h-3 w-20 bg-gray-100 dark:bg-gray-800 rounded"></div>
        </div>
      </td>
      <td className="p-4">
        <div className="h-4 w-16 bg-gray-200 dark:bg-gray-700 rounded"></div>
      </td>
      <td className="p-4">
        <div className="h-6 w-20 bg-gray-200 dark:bg-gray-700 rounded-lg"></div>
      </td>
      <td className="p-4">
        <div className="h-8 w-24 bg-gray-200 dark:bg-gray-700 rounded-lg"></div>
      </td>
    </tr>
  );

  return (
    <div className="p-3 md:p-5 lg:p-7 space-y-8">
      {/* 1. Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-secondary dark:text-white">
            Completed Deliveries
          </h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            Track your delivery history and earnings performance.
          </p>
        </div>
        <button
          onClick={handleExport}
          className="flex items-center gap-2 px-5 py-2.5 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 border border-gray-200 dark:border-gray-700 rounded-xl hover:shadow-md transition font-medium"
        >
          <Download size={18} /> Export History
        </button>
      </div>

      {/* 2. KPI Cards Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-gradient-to-br from-green-500 to-emerald-600 rounded-3xl p-6 text-white shadow-lg shadow-green-200 dark:shadow-none">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-white/20 flex items-center justify-center">
              <CheckCircle size={24} className="text-white" />
            </div>
            <div>
              <p className="text-green-100 text-sm font-medium">Total Delivered</p>
              <h3 className="text-3xl font-bold">{totalParcels}</h3>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-900 rounded-3xl p-6 border border-gray-100 dark:border-gray-800 shadow-sm">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-blue-50 dark:bg-gray-800 flex items-center justify-center">
              <DollarSign size={24} className="text-blue-500" />
            </div>
            <div>
              <p className="text-gray-500 dark:text-gray-400 text-sm font-medium">
                Total Earnings
              </p>
              <h3 className="text-2xl font-bold text-secondary dark:text-white">
                ${totalEarnings.toFixed(2)}
              </h3>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-900 rounded-3xl p-6 border border-gray-100 dark:border-gray-800 shadow-sm">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-purple-50 dark:bg-gray-800 flex items-center justify-center">
              <TrendingUp size={24} className="text-purple-500" />
            </div>
            <div>
              <p className="text-gray-500 dark:text-gray-400 text-sm font-medium">
                Avg. Per Delivery
              </p>
              <h3 className="text-2xl font-bold text-secondary dark:text-white">
                ${avgEarnings.toFixed(2)}
              </h3>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-900 rounded-3xl p-6 border border-gray-100 dark:border-gray-800 shadow-sm">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-orange-50 dark:bg-gray-800 flex items-center justify-center">
              <MapPin size={24} className="text-orange-500" />
            </div>
            <div>
              <p className="text-gray-500 dark:text-gray-400 text-sm font-medium">
                Coverage Area
              </p>
              <h3 className="text-2xl font-bold text-secondary dark:text-white">
                {uniqueDistricts.length} <span className="text-sm font-normal text-gray-400">Districts</span>
              </h3>
            </div>
          </div>
        </div>
      </div>

      {/* 3. Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white dark:bg-gray-900 p-6 rounded-3xl shadow-sm border border-gray-100 dark:border-gray-800">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">
            Earnings Overview
          </h3>
          <ResponsiveContainer width="100%" height={280}>
            <AreaChart data={earningsData}>
              <defs>
                <linearGradient id="colorEarnings" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#eee" />
              <XAxis dataKey="name" tick={{ fill: "#888", fontSize: 10 }} />
              <YAxis tick={{ fill: "#888", fontSize: 12 }} />
              <Tooltip
                contentStyle={{
                  borderRadius: "12px",
                  border: "none",
                  boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
                }}
              />
              <Area
                type="monotone"
                dataKey="amount"
                stroke="#8b5cf6"
                fillOpacity={1}
                fill="url(#colorEarnings)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white dark:bg-gray-900 p-6 rounded-3xl shadow-sm border border-gray-100 dark:border-gray-800">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">
            Delivery Districts
          </h3>
          <ResponsiveContainer width="100%" height={280}>
            <PieChart>
              <Pie
                data={districtData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={80}
                paddingAngle={5}
                dataKey="count"
              >
                {districtData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* 4. Filter Section */}
      <div className="bg-white dark:bg-gray-900 rounded-3xl shadow-sm border border-gray-100 dark:border-gray-800 overflow-hidden">
        <div className="p-6 border-b border-gray-100 dark:border-gray-800 flex flex-col md:flex-row gap-4 justify-between items-center">
          <div className="relative w-full md:w-96">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search by name or type..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-gray-50 dark:bg-gray-800 border-none focus:ring-2 focus:ring-blue-500/20 text-gray-700 dark:text-gray-200 outline-none transition"
            />
          </div>
          
          <div className="flex items-center gap-3 w-full md:w-auto">
            <Filter size={20} className="text-gray-400" />
            <select
              value={filterDistrict}
              onChange={(e) => setFilterDistrict(e.target.value)}
              className="flex-1 md:w-48 py-2.5 px-4 rounded-xl bg-gray-50 dark:bg-gray-800 border-none text-gray-700 dark:text-gray-200 outline-none cursor-pointer focus:ring-2 focus:ring-blue-500/20"
            >
              <option value="All">All Districts</option>
              {uniqueDistricts.map((d) => (
                <option key={d} value={d}>
                  {d}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* 5. Data Table Section */}
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead className="bg-gray-50 dark:bg-gray-800 text-gray-500 dark:text-gray-400 font-medium">
              <tr>
                <th className="p-4 text-left">#</th>
                <th className="p-4 text-left">Parcel Info</th>
                <th className="p-4 text-left">Route</th>
                <th className="p-4 text-left">Costs</th>
                <th className="p-4 text-left">Your Earnings</th>
                <th className="p-4 text-left">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
              {isLoading ? (
                Array.from({ length: 5 }).map((_, i) => <SkeletonRow key={i} />)
              ) : filteredParcels.length > 0 ? (
                filteredParcels.map((item, i) => (
                  <tr
                    key={i}
                    className="hover:bg-gray-50 dark:hover:bg-gray-800/50 transition duration-200"
                  >
                    <td className="p-4 text-gray-500 dark:text-gray-400">{i + 1}</td>
                    
                    <td className="p-4">
                      <div className="font-semibold text-gray-900 dark:text-white">
                        {item.percilname}
                      </div>
                      <div className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                        {item.parcelType} • {item.weight}kg
                      </div>
                    </td>

                    <td className="p-4">
                      <div className="flex flex-col gap-1">
                        <span className="flex items-center gap-1.5 text-xs text-gray-500 dark:text-gray-400">
                          <span className="w-1.5 h-1.5 rounded-full bg-orange-400"></span>
                          From: {item.senderdistick}
                        </span>
                        <span className="flex items-center gap-1.5 text-xs text-gray-900 dark:text-gray-300 font-medium">
                          <span className="w-1.5 h-1.5 rounded-full bg-green-500"></span>
                          To: {item.reciverDistrick}
                        </span>
                      </div>
                    </td>

                    <td className="p-4">
                      <span className="text-gray-900 dark:text-gray-200 font-medium">
                        ${item.totalCost}
                      </span>
                    </td>

                    <td className="p-4">
                      <span className="inline-flex items-center px-2.5 py-1 rounded-lg bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400 font-bold text-sm">
                        ${handelCalculateCost(item).toFixed(2)}
                      </span>
                    </td>

                    <td className="p-4">
                      <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold rounded-lg shadow-sm transition">
                        Cash Out
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="p-8 text-center text-gray-500 dark:text-gray-400">
                    <div className="flex flex-col items-center justify-center gap-2">
                      <AlertCircle size={32} className="text-gray-300 dark:text-gray-600" />
                      <p>No completed tasks found.</p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default CompletRiderTask;
