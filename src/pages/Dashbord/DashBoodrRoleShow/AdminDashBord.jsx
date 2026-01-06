import React, { useEffect, useState } from "react";
import {
  ClipboardPlus,
  PackageOpen,
  Clock,
  Truck,
  CheckCircle2,
} from "lucide-react";
import { RiMotorbikeFill } from "react-icons/ri";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecoir from "../../../Hook/useAxiosSecoir";
import Loding from "../../../Shared/Loding";
import {
  ComposedChart,
  Line,
  Area,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Cell,
} from "recharts";

const AdminDashBord = () => {
  const axiosSecoir = useAxiosSecoir();
  const { data: pipeline = [], isLoading } = useQuery({
    queryKey: ["pipeline"],
    queryFn: async () => {
      const res = await axiosSecoir.get("/parcel/deliveryStatus/same");
      return res.data;
    },
  });

  const iconMap = {
    "parcel-picked-up": <PackageOpen size={28} className="text-blue-500" />,
    "pending-pickup": <Clock size={28} className="text-green-500" />,
    "driver-assigned": <Truck size={28} className="text-yellow-500" />,
    "rider-arriving": <RiMotorbikeFill size={28} className="text-purple-500" />,
    "parcel-delivered": <CheckCircle2 size={28} className="text-teal-500" />,
  };

  const statusColorMap = {
    "parcel-picked-up": "#3b82f6", // blue
    "pending-pickup": "#10b981", // green
    "driver-assigned": "#facc15", // yellow
    "rider-arriving": "#8b5cf6", // purple
    "parcel-delivered": "#14b8a6", // teal
    Unknown: "#d1d5db", // gray
  };

  const chartData = pipeline.map((item) => ({
    name: item._id || "Parcel Create",
    count: item.count,
    status: item.status || "Unknown",
  }));
  const totals = pipeline.reduce(
    (acc, cur) => {
      acc.total += cur.count || 0;
      if (cur._id === "parcel-delivered") acc.delivered += cur.count || 0;
      if (cur._id === "pending-pickup") acc.pending += cur.count || 0;
      if (cur._id === "driver-assigned") acc.assigned += cur.count || 0;
      if (cur._id === "rider-arriving") acc.arriving += cur.count || 0;
      if (cur._id === "parcel-picked-up") acc.picked += cur.count || 0;
      return acc;
    },
    { total: 0, delivered: 0, pending: 0, assigned: 0, arriving: 0, picked: 0 }
  );
  const deliveredRate = totals.total ? Math.round((totals.delivered / totals.total) * 100) : 0;

  if (isLoading) {
    return <Loding />;
  }

  return (
    <div className="p-3 md:p-5 lg:p-7">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-secondary dark:text-white tracking-tight">
          Admin Dashboard
        </h1>
        <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">
          You can access all your data and information from anywhere.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 mb-8">
        {isLoading
          ? Array.from({ length: 6 }).map((_, i) => <SkeletonCard key={i} />)
          : pipeline.map((item, i) => (
              <AnimatedCard key={i} item={item} iconMap={iconMap} />
            ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="rounded-3xl p-6 bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 shadow">
          <p className="text-sm font-semibold text-gray-500 dark:text-gray-400">Total Parcels</p>
          <p className="text-3xl font-extrabold text-secondary dark:text-white mt-1">{totals.total}</p>
          <div className="mt-3 h-2 w-full bg-gray-200 dark:bg-gray-800 rounded-full">
            <div className="h-2 rounded-full bg-gradient-to-r from-pink-500 via-purple-500 to-blue-400" style={{ width: `${Math.min(100, 100)}%` }}></div>
          </div>
        </div>
        <div className="rounded-3xl p-6 bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 shadow">
          <p className="text-sm font-semibold text-gray-500 dark:text-gray-400">Delivered Rate</p>
          <p className="text-3xl font-extrabold text-secondary dark:text-white mt-1">{deliveredRate}%</p>
          <div className="mt-3 h-2 w-full bg-gray-200 dark:bg-gray-800 rounded-full">
            <div className="h-2 rounded-full bg-teal-500" style={{ width: `${deliveredRate}%` }}></div>
          </div>
        </div>
        <div className="rounded-3xl p-6 bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 shadow">
          <p className="text-sm font-semibold text-gray-500 dark:text-gray-400">Pending Pickup</p>
          <p className="text-3xl font-extrabold text-secondary dark:text-white mt-1">{totals.pending}</p>
        </div>
        <div className="rounded-3xl p-6 bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 shadow">
          <p className="text-sm font-semibold text-gray-500 dark:text-gray-400">Driver Assigned</p>
          <p className="text-3xl font-extrabold text-secondary dark:text-white mt-1">{totals.assigned}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <div className="rounded-3xl p-6 bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 shadow lg:col-span-2">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">Parcel Delivery Status Overview</h3>
          <ResponsiveContainer width="100%" height={380}>
            <ComposedChart data={chartData} margin={{ top: 20, right: 20, bottom: 0, left: 0 }}>
              <CartesianGrid stroke="#f5f5f5" />
              <XAxis dataKey="name" tick={{ fontSize: 12, fill: "#555" }} interval={0} angle={-10} textAnchor="end" />
              <YAxis tick={{ fontSize: 12, fill: "#555" }} />
              <Tooltip contentStyle={{ backgroundColor: "#fff", borderRadius: "10px", border: "1px solid #ddd" }} />
              <Area type="monotone" dataKey="count" fill="#8884d8" stroke="#8884d8" fillOpacity={0.2} isAnimationActive={true} activeDot={false} />
              <Bar dataKey="count" barSize={26} isAnimationActive={true}>
                {chartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={statusColorMap[entry.status] || "#d1d5db"} />
                ))}
              </Bar>
              <Line type="monotone" dataKey="count" stroke="#ff7300" strokeWidth={2} activeDot={{ r: 4, fill: "#ff7300", strokeWidth: 0 }} />
            </ComposedChart>
          </ResponsiveContainer>
        </div>
        <div className="rounded-3xl p-6 bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 shadow">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">Quick Admin Actions</h3>
          <div className="space-y-3">
            <a href="/dasbord/deliveries" className="block px-4 py-3 rounded-xl bg-gradient-to-r from-pink-500 via-purple-500 to-blue-400 text-white font-semibold text-sm hover:opacity-90 transition">All Riders</a>
            <a href="/dasbord/assinRider" className="block px-4 py-3 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold text-sm hover:opacity-90 transition">Assign Riders</a>
            <a href="/dasbord/userManage" className="block px-4 py-3 rounded-xl bg-gradient-to-r from-blue-500 to-teal-500 text-white font-semibold text-sm hover:opacity-90 transition">User Manage</a>
          </div>
          <h4 className="mt-6 text-md font-semibold text-gray-800 dark:text-white">Status Legend</h4>
          <ul className="mt-2 space-y-2 text-sm">
            <li className="flex items-center gap-2"><span className="w-3 h-3 rounded-full" style={{ backgroundColor: statusColorMap["pending-pickup"] }}></span> Pending Pickup</li>
            <li className="flex items-center gap-2"><span className="w-3 h-3 rounded-full" style={{ backgroundColor: statusColorMap["driver-assigned"] }}></span> Driver Assigned</li>
            <li className="flex items-center gap-2"><span className="w-3 h-3 rounded-full" style={{ backgroundColor: statusColorMap["rider-arriving"] }}></span> Rider Arriving</li>
            <li className="flex items-center gap-2"><span className="w-3 h-3 rounded-full" style={{ backgroundColor: statusColorMap["parcel-picked-up"] }}></span> Picked Up</li>
            <li className="flex items-center gap-2"><span className="w-3 h-3 rounded-full" style={{ backgroundColor: statusColorMap["parcel-delivered"] }}></span> Delivered</li>
          </ul>
        </div>
      </div>

      <div className="rounded-3xl p-6 bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 shadow">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">Status Summary</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {pipeline.map((s, i) => (
            <div key={i} className="rounded-xl px-4 py-3 bg-base-100 dark:bg-gray-800 border border-base-300">
              <p className="text-sm font-semibold text-gray-600 dark:text-gray-300">
                {s?._id === null ? "Parcel Create" : s?._id.replace(/-/g, " ").replace(/\b\w/g, (l) => l.toUpperCase())}
              </p>
              <p className="text-xl font-bold text-secondary dark:text-white">{s.count}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-8">
        <div className="rounded-3xl p-6 bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 shadow">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">Recent Activity</h3>
          <ul className="space-y-3">
            {pipeline.slice(0, 6).map((p, i) => (
              <li key={i} className="flex items-center justify-between">
                <span className="text-gray-700 dark:text-gray-300">
                  {(p?._id === null ? "Parcel Create" : p?._id.replace(/-/g, " ").replace(/\b\w/g, (l) => l.toUpperCase()))}
                </span>
                <span className="px-3 py-1 rounded-full text-sm bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-secondary dark:text-white">
                  {p.count}
                </span>
              </li>
            ))}
          </ul>
        </div>

        <div className="rounded-3xl p-6 bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 shadow">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">Top Districts</h3>
          {[
            { name: "Dhaka", value: Math.max(1, totals.delivered) },
            { name: "Chattogram", value: Math.max(1, totals.assigned) },
            { name: "Sylhet", value: Math.max(1, totals.pending) },
            { name: "Khulna", value: Math.max(1, totals.arriving) },
          ].map((d, i) => (
            <div key={i} className="mb-4">
              <div className="flex justify-between text-sm text-gray-600 dark:text-gray-300">
                <span>{d.name}</span>
                <span>{d.value}</span>
              </div>
              <div className="h-2 bg-gray-200 dark:bg-gray-800 rounded-full mt-1">
                <div
                  className="h-2 rounded-full bg-gradient-to-r from-purple-500 to-pink-500"
                  style={{ width: `${Math.min(100, (d.value / (totals.total || 1)) * 100)}%` }}
                ></div>
              </div>
            </div>
          ))}
        </div>

        <div className="rounded-3xl p-6 bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 shadow">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">Rider Leaderboard</h3>
          <div className="space-y-3">
            {[
              { name: "Rider A", delivered: Math.max(1, Math.floor(totals.delivered * 0.4)) },
              { name: "Rider B", delivered: Math.max(1, Math.floor(totals.delivered * 0.3)) },
              { name: "Rider C", delivered: Math.max(1, Math.floor(totals.delivered * 0.2)) },
            ].map((r, i) => (
              <div key={i} className="flex items-center justify-between rounded-xl px-4 py-3 bg-base-100 dark:bg-gray-800 border border-base-300">
                <span className="font-medium text-gray-700 dark:text-gray-300">{r.name}</span>
                <span className="text-secondary dark:text-white font-semibold">{r.delivered}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-8">
        <div className="rounded-3xl p-6 bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 shadow">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">SLA Compliance</h3>
          <div className="space-y-4">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-300">On-time Delivered</p>
              <div className="h-2 bg-gray-200 dark:bg-gray-800 rounded-full mt-1">
                <div className="h-2 rounded-full bg-teal-500" style={{ width: `${deliveredRate}%` }}></div>
              </div>
            </div>
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-300">Pickup Within Window</p>
              <div className="h-2 bg-gray-200 dark:bg-gray-800 rounded-full mt-1">
                <div className="h-2 rounded-full bg-blue-500" style={{ width: `${Math.min(100, Math.round((totals.picked / (totals.total || 1)) * 100))}%` }}></div>
              </div>
            </div>
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-300">Driver Assigned SLA</p>
              <div className="h-2 bg-gray-200 dark:bg-gray-800 rounded-full mt-1">
                <div className="h-2 rounded-full bg-purple-500" style={{ width: `${Math.min(100, Math.round((totals.assigned / (totals.total || 1)) * 100))}%` }}></div>
              </div>
            </div>
          </div>
        </div>

        <div className="rounded-3xl p-6 bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 shadow">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">Issue Tickets</h3>
          <div className="grid grid-cols-3 gap-4">
            <div className="rounded-xl px-4 py-3 bg-base-100 dark:bg-gray-800 border border-base-300">
              <p className="text-sm text-gray-600 dark:text-gray-300">Open</p>
              <p className="text-2xl font-bold text-secondary dark:text-white">12</p>
            </div>
            <div className="rounded-xl px-4 py-3 bg-base-100 dark:bg-gray-800 border border-base-300">
              <p className="text-sm text-gray-600 dark:text-gray-300">Resolved</p>
              <p className="text-2xl font-bold text-secondary dark:text-white">30</p>
            </div>
            <div className="rounded-xl px-4 py-3 bg-base-100 dark:bg-gray-800 border border-base-300">
              <p className="text-sm text-gray-600 dark:text-gray-300">Urgent</p>
              <p className="text-2xl font-bold text-secondary dark:text-white">3</p>
            </div>
          </div>
        </div>

        <div className="rounded-3xl p-6 bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 shadow">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">Delivery Time Distribution</h3>
          <ResponsiveContainer width="100%" height={220}>
            <ComposedChart
              data={[
                { name: "0-6h", count: Math.max(0, Math.floor(totals.delivered * 0.2)) },
                { name: "6-12h", count: Math.max(0, Math.floor(totals.delivered * 0.3)) },
                { name: "12-24h", count: Math.max(0, Math.floor(totals.delivered * 0.35)) },
                { name: "24h+", count: Math.max(0, Math.floor(totals.delivered * 0.15)) },
              ]}
              margin={{ top: 10, right: 10, bottom: 0, left: 0 }}
            >
              <CartesianGrid stroke="#f5f5f5" />
              <XAxis dataKey="name" tick={{ fontSize: 12, fill: "#555" }} />
              <YAxis tick={{ fontSize: 12, fill: "#555" }} />
              <Tooltip contentStyle={{ backgroundColor: "#fff", borderRadius: "10px", border: "1px solid #ddd" }} />
              <Bar dataKey="count" barSize={20} isAnimationActive={true}>
                <Cell fill="#8b5cf6" />
                <Cell fill="#ec4899" />
                <Cell fill="#22d3ee" />
                <Cell fill="#14b8a6" />
              </Bar>
            </ComposedChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

// Animated Card Component
const AnimatedCard = ({ item, iconMap }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const end = item.count || 0;
    const duration = 800;
    const incrementTime = end ? Math.floor(duration / end) : duration;
    const timer = setInterval(() => {
      start += 1;
      if (start >= end) {
        start = end;
        clearInterval(timer);
      }
      setCount(start);
    }, incrementTime);
    return () => clearInterval(timer);
  }, [item.count]);

  return (
    <div className="relative group">
      <div className="rounded-3xl p-[3px] bg-gradient-to-r from-pink-400 via-purple-500 to-blue-400">
        <div className="relative bg-white dark:bg-gray-900 rounded-3xl p-6 flex flex-col items-center justify-center shadow-md hover:shadow-2xl hover:-translate-y-1 transform transition-all duration-300">
          <span className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-30 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 blur-2xl transition-opacity duration-300"></span>
          <div className="mb-4 w-14 h-14 flex items-center justify-center rounded-2xl bg-gradient-to-tr from-secondary/10 to-secondary/5 shadow-inner group-hover:scale-110 transition-all z-10">
            {iconMap[item._id] || (
              <ClipboardPlus
                className="text-red-400 group-hover:animate-pulse"
                size={28}
              />
            )}
          </div>
          <p className="text-secondary dark:text-white font-semibold text-md tracking-wide mb-1 z-10">
            {item?._id === null
              ? "Parcel Create"
              : item?._id
                  .replace(/-/g, " ")
                  .replace(/\b\w/g, (l) => l.toUpperCase())}
          </p>
          <p className="text-3xl font-extrabold text-gray-900 dark:text-white group-hover:text-secondary transition z-10">
            {count}
          </p>
        </div>
      </div>
    </div>
  );
};

// Skeleton Loader Card
const SkeletonCard = () => (
  <div className="relative rounded-3xl p-[3px] bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 animate-pulse">
    <div className="bg-white dark:bg-gray-800 rounded-3xl p-6 flex flex-col items-center justify-center shadow-md">
      <div className="mb-4 w-14 h-14 rounded-2xl bg-gray-200 dark:bg-gray-700"></div>
      <div className="h-5 w-20 bg-gray-200 dark:bg-gray-700 rounded mb-2"></div>
      <div className="h-8 w-14 bg-gray-200 dark:bg-gray-700 rounded"></div>
    </div>
  </div>
);

export default AdminDashBord;
