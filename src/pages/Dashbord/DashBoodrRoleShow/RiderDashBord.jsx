import { useQuery } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import useAxiosSecoir from "../../../Hook/useAxiosSecoir";
import useAuth from "../../../Hook/useAuth";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Cell,
  PieChart,
  Pie,
} from "recharts";
import Loding from "../../../Shared/Loding";

const RiderDashBord = () => {
  const axiosSecoir = useAxiosSecoir();
  const { user } = useAuth();

  const { data: delivered = [], isLoading } = useQuery({
    queryKey: ["riderDailyDelivered", user.email],
    queryFn: async () => {
      const res = await axiosSecoir.get(
        `/ridersar/delivery-per-day?email=${user.email}`
      );
      return res.data;
    },
  });

  const chartData =
    delivered?.map((item) => ({
      date: new Date(item._id).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
      }),
      delivered: item.deliveredCount,
    })) || [];

  const { data: deliveredList = [], isLoading: deliveredListLoading } = useQuery({
    queryKey: ["riderDeliveredList", user.email],
    queryFn: async () => {
      const res = await axiosSecoir.get(
        `parcel/rider?riderEmail=${user.email}&deliveryStatus=parcel-delivered`
      );
      return res.data;
    },
  });

  const { data: assignedList = [], isLoading: assignedListLoading } = useQuery({
    queryKey: ["riderAssignedList", user.email],
    queryFn: async () => {
      const res = await axiosSecoir.get(
        `parcel/rider?riderEmail=${user.email}&deliveryStatus=driver-assigned`
      );
      return res.data;
    },
  });

  const now = new Date();
  const isSameDay = (a, b) =>
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate();

  const todayDelivered =
    delivered?.reduce((acc, cur) => {
      const d = new Date(cur._id);
      return acc + (isSameDay(d, now) ? cur.deliveredCount || 0 : 0);
    }, 0) || 0;

  const withinDays = (d, days) => {
    const diff = (now - d) / (1000 * 60 * 60 * 24);
    return diff <= days;
  };

  const last7DaysDelivered =
    delivered?.reduce((acc, cur) => {
      const d = new Date(cur._id);
      return acc + (withinDays(d, 7) ? cur.deliveredCount || 0 : 0);
    }, 0) || 0;

  const last30DaysDelivered =
    delivered?.reduce((acc, cur) => {
      const d = new Date(cur._id);
      return acc + (withinDays(d, 30) ? cur.deliveredCount || 0 : 0);
    }, 0) || 0;

  const completionRate =
    (deliveredList.length / Math.max(deliveredList.length + assignedList.length, 1)) *
    100;

  const colors = ["#6366F1", "#EC4899", "#10B981", "#F59E0B", "#3B82F6"];

  if (isLoading || deliveredListLoading || assignedListLoading) {
    return <Loding></Loding>;
  }

  return (
    <div className="p-3 md:p-5 lg:p-7">
      <div className="mb-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <h1 className="text-3xl font-bold text-secondary dark:text-white">
          Rider Dashboard
        </h1>
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => {
              const rows = deliveredList.map((p) => ({
                TrackingID: p.trakingId,
                Name: p.parcelName,
                District: p.reciverDistrick,
                Weight: p.weight,
                Status: p.deliveryStatus,
                CreatedAt: p.creatAtime,
              }));
              const headers = Object.keys(rows[0] || {});
              const csv = [
                headers.join(","),
                ...rows.map((r) => headers.map((h) => `${String(r[h] ?? "").replace(/,/g, " ")}`).join(",")),
              ].join("\n");
              const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
              const url = URL.createObjectURL(blob);
              const a = document.createElement("a");
              a.href = url;
              a.download = `rider-delivered-${new Date().toISOString().slice(0, 10)}.csv`;
              a.click();
              URL.revokeObjectURL(url);
            }}
            className="px-4 py-2 rounded-xl bg-gradient-to-r from-pink-500 via-purple-500 to-blue-400 text-white font-semibold hover:opacity-90 transition"
          >
            Export Delivered CSV
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mb-8">
        <div className="rounded-3xl p-6 bg-white dark:bg-gray-900 shadow border border-gray-100 dark:border-gray-800">
          <p className="text-sm text-gray-500 dark:text-gray-400">Today Delivered</p>
          <p className="text-3xl font-bold text-secondary dark:text-white mt-1">{todayDelivered}</p>
        </div>
        <div className="rounded-3xl p-6 bg-white dark:bg-gray-900 shadow border border-gray-100 dark:border-gray-800">
          <p className="text-sm text-gray-500 dark:text-gray-400">Last 7 Days</p>
          <p className="text-3xl font-bold text-secondary dark:text-white mt-1">{last7DaysDelivered}</p>
        </div>
        <div className="rounded-3xl p-6 bg-white dark:bg-gray-900 shadow border border-gray-100 dark:border-gray-800">
          <p className="text-sm text-gray-500 dark:text-gray-400">Last 30 Days</p>
          <p className="text-3xl font-bold text-secondary dark:text-white mt-1">{last30DaysDelivered}</p>
        </div>
        <div className="rounded-3xl p-6 bg-white dark:bg-gray-900 shadow border border-gray-100 dark:border-gray-800">
          <p className="text-sm text-gray-500 dark:text-gray-400">Completion Rate</p>
          <p className="text-3xl font-bold text-secondary dark:text-white mt-1">{Math.round(completionRate)}%</p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-10">
        {delivered?.map((item, i) => (
          <DailyDeliveryCard key={i} item={item} />
        ))}
      </div>

      <div className="bg-white dark:bg-gray-900 p-6 rounded-3xl shadow border border-gray-100 dark:border-gray-800">
        <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">
          Daily Delivery Overview
        </h2>

        <ResponsiveContainer width="100%" height={380}>
          <BarChart
            data={chartData}
            margin={{ top: 10, right: 20, bottom: 20 }}
          >
            <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />

            <Bar dataKey="delivered" barSize={38} radius={[10, 10, 0, 0]}>
              {chartData.map((entry, index) => (
                <Cell
                  key={index}
                  fill={colors[index % colors.length]}
                  className="cursor-pointer hover:opacity-80 transition"
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-8">
        <div className="rounded-3xl p-6 bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 shadow">
          <p className="text-lg font-semibold text-gray-800 dark:text-white mb-4">Status Composition</p>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={[
                  { name: "Assigned", value: assignedList.length },
                  { name: "Delivered", value: deliveredList.length },
                ]}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={85}
                dataKey="value"
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
              >
                {[assignedList.length, deliveredList.length].map((_, i) => (
                  <Cell key={i} fill={colors[i % colors.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="rounded-3xl p-6 bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 shadow lg:col-span-2">
          <p className="text-lg font-semibold text-gray-800 dark:text-white mb-4">Delivered by District</p>
          <ResponsiveContainer width="100%" height={280}>
            <BarChart
              data={Object.entries(
                deliveredList.reduce((acc, cur) => {
                  const d = cur?.reciverDistrick || "Unknown";
                  acc[d] = (acc[d] || 0) + 1;
                  return acc;
                }, {})
              )
                .map(([name, count]) => ({ name, count }))
                .sort((a, b) => b.count - a.count)}
              margin={{ top: 10, right: 20, bottom: 20 }}
            >
              <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="count" barSize={28} radius={[10, 10, 0, 0]} fill="#8b5cf6" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">
        <div className="rounded-3xl p-6 bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 shadow">
          <p className="text-lg font-semibold text-gray-800 dark:text-white mb-4">Assigned Deliveries</p>
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm">
              <thead className="dark:bg-gray-800 text-left text-gray-700 dark:text-gray-200">
                <tr>
                  <th className="p-3 font-semibold">Tracking</th>
                  <th className="p-3 font-semibold">Name</th>
                  <th className="p-3 font-semibold">District</th>
                  <th className="p-3 font-semibold">Weight</th>
                </tr>
              </thead>
              <tbody>
                {assignedList.slice(0, 6).map((p, i) => (
                  <tr key={i} className="border-b border-gray-200 dark:border-gray-700">
                    <td className="p-3 text-gray-800 dark:text-gray-300">{p.trakingId}</td>
                    <td className="p-3 text-gray-800 dark:text-gray-300">{p.parcelName}</td>
                    <td className="p-3 text-gray-800 dark:text-gray-300">{p.reciverDistrick}</td>
                    <td className="p-3 text-gray-800 dark:text-gray-300">{p.weight}</td>
                  </tr>
                ))}
                {assignedList.length === 0 && (
                  <tr>
                    <td className="p-3 text-gray-500 dark:text-gray-400" colSpan={4}>No assigned deliveries</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        <div className="rounded-3xl p-6 bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 shadow">
          <p className="text-lg font-semibold text-gray-800 dark:text-white mb-4">Recent Delivered</p>
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm">
              <thead className="dark:bg-gray-800 text-left text-gray-700 dark:text-gray-200">
                <tr>
                  <th className="p-3 font-semibold">Tracking</th>
                  <th className="p-3 font-semibold">Name</th>
                  <th className="p-3 font-semibold">District</th>
                  <th className="p-3 font-semibold">Weight</th>
                </tr>
              </thead>
              <tbody>
                {deliveredList.slice(0, 6).map((p, i) => (
                  <tr key={i} className="border-b border-gray-200 dark:border-gray-700">
                    <td className="p-3 text-gray-800 dark:text-gray-300">{p.trakingId}</td>
                    <td className="p-3 text-gray-800 dark:text-gray-300">{p.parcelName}</td>
                    <td className="p-3 text-gray-800 dark:text-gray-300">{p.reciverDistrick}</td>
                    <td className="p-3 text-gray-800 dark:text-gray-300">{p.weight}</td>
                  </tr>
                ))}
                {deliveredList.length === 0 && (
                  <tr>
                    <td className="p-3 text-gray-500 dark:text-gray-400" colSpan={4}>No delivered parcels</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

const DailyDeliveryCard = ({ item }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const end = item.deliveredCount;
    const duration = 700;
    const step = end ? Math.floor(duration / end) : duration;

    const timer = setInterval(() => {
      start += 1;
      if (start >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(start);
      }
    }, step);

    return () => clearInterval(timer);
  }, [item.deliveredCount]);

  return (
    <div className="relative group">
      <div className="rounded-3xl p-[3px] bg-gradient-to-r from-blue-400 via-purple-500 to-pink-400">
        <div className="bg-white dark:bg-gray-900 rounded-3xl p-6 shadow text-center">
          <p className="text-gray-400 dark:text-gray-500 text-sm">
            {new Date(item._id).toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
              year: "numeric",
            })}
          </p>

          <p className="text-4xl font-bold text-secondary dark:text-white mt-2">
            {count}
          </p>

          <p className="text-xs text-gray-500 mt-1">Delivered Parcels</p>
        </div>
      </div>
    </div>
  );
};

export default RiderDashBord;
