import React, { useMemo } from "react";
import { Card, CardContent } from "../../../ui/Card";
import {
  MapPin,
  Package,
  Clock,
  Mail,
  User,
  Heart,
  Star,
  Gift,
  Ticket,
  TrendingUp,
  DollarSign,
  Calendar,
  Activity,
  CheckCircle,
} from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { BarChart, Bar, CartesianGrid, PieChart, Pie, Cell } from "recharts";
import useAuth from "../../../Hook/useAuth";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecoir from "../../../Hook/useAxiosSecoir";
import { Link } from "react-router";
import Loding from "../../../Shared/Loding";

const spendingData = [
  { month: "Jan", amount: 500 },
  { month: "Feb", amount: 300 },
  { month: "Mar", amount: 650 },
  { month: "Apr", amount: 400 },
  { month: "May", amount: 850 },
];

const UserDashBord = () => {
  const { user } = useAuth();
  const axiosSecoir = useAxiosSecoir();
  const { data = [], isLoading: newLode } = useQuery({
    queryKey: ["usercreatParcel"],
    queryFn: async () => {
      const res = await axiosSecoir.get(
        `/totaluser/parcel?email=${user.email}`
      );
      // console.log(res.data);
      return res.data;
    },
  });
  const { data: delivered = [], isLoading } = useQuery({
    queryKey: ["deliveryStatus"],
    queryFn: async () => {
      const res = await axiosSecoir.get(
        `/totalDelivery/deliveryStatus?deliveryStatus=parcel-delivered&email=${user.email}`
      );
      // console.log(res.data);
      return res.data;
    },
  });

  // Derived Data Calculations
  const stats = useMemo(() => {
    if (!data.length) return {
      inProgress: 0,
      pending: 0,
      totalSpent: 0,
      avgCost: 0,
      topDistrict: "—"
    };

    const inProgress = data.filter(
      (p) => p.deliveryStatus !== "parcel-delivered" && p.deliveryStatus !== "cancelled"
    ).length;

    const pending = data.filter((p) => p.deliveryStatus === "pending-pickup").length;

    const totalSpent = data.reduce((acc, curr) => acc + (parseFloat(curr.totalCost) || 0), 0);
    
    const avgCost = totalSpent / data.length;

    // Calculate Top District
    const districtCounts = data.reduce((acc, p) => {
      const d = p.reciverDistrick || "Unknown";
      acc[d] = (acc[d] || 0) + 1;
      return acc;
    }, {});
    const topDistrict = Object.keys(districtCounts).reduce((a, b) => 
      districtCounts[a] > districtCounts[b] ? a : b, "—"
    );

    return { inProgress, pending, totalSpent, avgCost, topDistrict };
  }, [data]);


  if (isLoading || newLode) {
    return <Loding></Loding>;
  }
  return (
    <div className="space-y-8 p-3 md:p-5 lg:p-7 bg-gray-50 dark:bg-black min-h-screen">
      {/* 1. Styled Header Section */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-purple-600 via-purple-500 to-indigo-600 p-8 text-white shadow-xl">
        <div className="absolute top-0 right-0 -mt-10 -mr-10 h-64 w-64 rounded-full bg-white/10 blur-3xl"></div>
        <div className="absolute bottom-0 left-0 -mb-10 -ml-10 h-64 w-64 rounded-full bg-pink-500/20 blur-3xl"></div>
        
        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <span className="px-3 py-1 rounded-full bg-white/20 text-xs font-medium backdrop-blur-sm border border-white/10">
                {new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
              </span>
            </div>
            <h1 className="text-4xl font-bold mb-2">
              Welcome back, {user.displayName?.split(" ")[0]}! 👋
            </h1>
            <p className="text-purple-100 max-w-xl">
              Here's what's happening with your shipments today. You have <span className="font-bold text-white">{stats.inProgress}</span> parcels in progress.
            </p>
          </div>
          
          <div className="flex flex-wrap gap-3">
             <Link to="/send_parcel" className="btn bg-white text-purple-600 hover:bg-purple-50 border-none shadow-lg shadow-purple-900/20 px-6">
              <Package size={18} className="mr-2" /> Send Parcel
             </Link>
             <Link to="/dasbord/myparcel" className="btn bg-purple-700/50 text-white hover:bg-purple-700/70 border-none backdrop-blur-md">
               My Parcels
             </Link>
          </div>
        </div>
      </div>

      <div className="rounded-2xl p-4 bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 shadow-sm">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="rounded-xl px-4 py-3 bg-base-100 dark:bg-gray-800 border border-base-300 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Package className="w-4 h-4 text-purple-500" />
              <span className="text-sm text-gray-700 dark:text-gray-300">Total</span>
            </div>
            <span className="text-secondary dark:text-white font-semibold">{data?.length || 0}</span>
          </div>
          <div className="rounded-xl px-4 py-3 bg-base-100 dark:bg-gray-800 border border-base-300 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Activity className="w-4 h-4 text-orange-500" />
              <span className="text-sm text-gray-700 dark:text-gray-300">In Progress</span>
            </div>
            <span className="text-secondary dark:text-white font-semibold">{stats.inProgress}</span>
          </div>
          <div className="rounded-xl px-4 py-3 bg-base-100 dark:bg-gray-800 border border-base-300 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-blue-500" />
              <span className="text-sm text-gray-700 dark:text-gray-300">Regions</span>
            </div>
            <span className="text-secondary dark:text-white font-semibold">
              {Array.from(new Set((data || []).map((p) => p?.reciverDistrick))).length}
            </span>
          </div>
          <div className="rounded-xl px-4 py-3 bg-base-100 dark:bg-gray-800 border border-base-300 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Heart className="w-4 h-4 text-pink-500" />
              <span className="text-sm text-gray-700 dark:text-gray-300">Spent</span>
            </div>
            <span className="text-secondary dark:text-white font-semibold">${stats.totalSpent.toLocaleString()}</span>
          </div>
        </div>
      </div>

      {/* PROFILE */}
      <Card className="rounded-2xl shadow-lg dark:bg-gray-900 border-none">
        <CardContent className="p-6 flex items-center gap-6">
          <div className="w-16 h-16 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center shadow-lg ring-4 ring-purple-50 dark:ring-gray-800">
            {user.photoURL ? (
              <img
                src={user.photoURL}
                className=" rounded-full w-16 h-16 object-cover"
                alt="Profile"
              ></img>
            ) : (
              <User size={40} className="text-white" />
            )}
          </div>

          <div>
            <h2 className="text-xl font-bold dark:text-white flex items-center gap-2">
              {user.displayName}
              <span className="px-2 py-0.5 rounded-full bg-yellow-100 text-yellow-700 text-xs font-medium border border-yellow-200">Gold Member</span>
            </h2>
            <p className="text-gray-600 dark:text-gray-300">{user.email}</p>
            <p className="text-gray-500 dark:text-gray-400 text-sm flex items-center gap-1 mt-1">
              <Calendar size={14} /> Joined {new Date(user.creatWb).toLocaleDateString()}
            </p>
          </div>
        </CardContent>
      </Card>

      {/* STATS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="shadow-lg border-l-4 border-purple-500 dark:bg-gray-900 hover:shadow-xl transition-shadow">
          <CardContent className="p-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-gray-500 dark:text-gray-400 font-medium mb-1">Total Parcels</p>
                <h1 className="text-4xl font-bold dark:text-white">{data?.length}</h1>
              </div>
              <div className="p-3 bg-purple-50 dark:bg-gray-800 rounded-xl">
                 <Package className="text-purple-600" size={24} />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-lg border-l-4 border-pink-500 dark:bg-gray-900 hover:shadow-xl transition-shadow">
          <CardContent className="p-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-gray-500 dark:text-gray-400 font-medium mb-1">Pending Pickup</p>
                <h1 className="text-4xl font-bold dark:text-white">{stats.pending}</h1>
              </div>
              <div className="p-3 bg-pink-50 dark:bg-gray-800 rounded-xl">
                 <Clock className="text-pink-600" size={24} />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-lg border-l-4 border-blue-500 dark:bg-gray-900 hover:shadow-xl transition-shadow">
          <CardContent className="p-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-gray-500 dark:text-gray-400 font-medium mb-1">Delivered</p>
                <h1 className="text-4xl font-bold dark:text-white">{delivered?.length}</h1>
              </div>
              <div className="p-3 bg-blue-50 dark:bg-gray-800 rounded-xl">
                 <CheckCircle className="text-blue-600" size={24} />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* NEW DYNAMIC STATS ROW */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
         <Card className="rounded-2xl shadow-md dark:bg-gray-900 bg-white">
            <CardContent className="p-6">
               <div className="flex items-center gap-4">
                  <div className="p-4 rounded-full bg-green-100 dark:bg-green-900/30 text-green-600">
                    <DollarSign size={24} />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Total Spent</p>
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                      ${stats.totalSpent.toLocaleString()}
                    </h3>
                  </div>
               </div>
            </CardContent>
         </Card>

         <Card className="rounded-2xl shadow-md dark:bg-gray-900 bg-white">
            <CardContent className="p-6">
               <div className="flex items-center gap-4">
                  <div className="p-4 rounded-full bg-orange-100 dark:bg-orange-900/30 text-orange-600">
                    <TrendingUp size={24} />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Avg. Cost / Parcel</p>
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                      ${stats.avgCost.toFixed(2)}
                    </h3>
                  </div>
               </div>
            </CardContent>
         </Card>

         <Card className="rounded-2xl shadow-md dark:bg-gray-900 bg-white">
            <CardContent className="p-6">
               <div className="flex items-center gap-4">
                  <div className="p-4 rounded-full bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600">
                    <MapPin size={24} />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Top Destination</p>
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                      {stats.topDistrict}
                    </h3>
                  </div>
               </div>
            </CardContent>
         </Card>
      </div>

      {/* USER SPENDING CHART */}
      <Card className="rounded-2xl shadow-md dark:bg-gray-900">
        <CardContent className="p-6">
          <h2 className="text-xl font-semibold mb-3 dark:text-white">
            Monthly Spending
          </h2>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={spendingData}>
              <XAxis dataKey="month" stroke="#aaa" />
              <YAxis stroke="#aaa" />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="amount"
                stroke="#a855f7"
                strokeWidth={3}
              />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="rounded-2xl shadow-md dark:bg-gray-900 lg:col-span-2">
          <CardContent className="p-6">
            <h2 className="text-xl font-semibold mb-3 dark:text-white">Deliveries by District</h2>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart
                data={Object.entries(
                  (delivered || []).reduce((acc, cur) => {
                    const d = cur?.reciverDistrick || "Unknown";
                    acc[d] = (acc[d] || 0) + 1;
                    return acc;
                  }, {})
                ).map(([name, count]) => ({ name, count }))}
              >
                <CartesianGrid stroke="#f5f5f5" />
                <XAxis dataKey="name" stroke="#aaa" />
                <YAxis stroke="#aaa" />
                <Tooltip />
                <Bar dataKey="count" barSize={22} fill="#8b5cf6" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
        <Card className="rounded-2xl shadow-md dark:bg-gray-900">
          <CardContent className="p-6">
            <h2 className="text-xl font-semibold mb-3 dark:text-white">Payment Split</h2>
            <ResponsiveContainer width="100%" height={220}>
              <PieChart>
                <Pie
                  data={[
                    { name: "COD", value: 70 },
                    { name: "Online", value: 30 },
                  ]}
                  dataKey="value"
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  label
                >
                  <Cell fill="#8b5cf6" />
                  <Cell fill="#ec4899" />
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* LOYALTY RANK */}
      <Card className="rounded-2xl shadow-md dark:bg-gray-900">
        <CardContent className="p-6 flex items-center gap-4">
          <Star size={32} className="text-yellow-400" />
          <div>
            <h2 className="text-xl font-semibold dark:text-white">
              Loyalty Rank: Gold
            </h2>
            <p className="text-gray-500 dark:text-gray-300 text-sm">
              You earned 1200 points this year 🎉
            </p>
          </div>
        </CardContent>
      </Card>

      <Card className="rounded-2xl shadow-md dark:bg-gray-900">
        <CardContent className="p-6">
          <h2 className="text-xl font-semibold mb-3 dark:text-white">Recent Parcels</h2>
          <ul className="space-y-3">
            {(data || []).slice(0, 6).map((p, i) => (
              <li key={i} className="flex items-center justify-between rounded-xl px-4 py-3 bg-base-100 dark:bg-gray-800 border border-base-300">
                <span className="text-sm text-gray-700 dark:text-gray-300">{p?.trakingId}</span>
                <span className="text-xs rounded-full px-2 py-1 bg-gray-100 dark:bg-gray-700 text-secondary dark:text-white">{p?.reciverDistrick || "—"}</span>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>

      {/* TRACKING TIMELINE */}
      <Card className="rounded-2xl shadow-md dark:bg-gray-900">
        <CardContent className="p-6">
          <h2 className="text-xl font-semibold mb-3 dark:text-white">
            Parcel Timeline
          </h2>

          <ul className="space-y-4 border-l-2 border-purple-500 pl-4">
            <li>
              <p className="font-semibold dark:text-gray-200">Delivered</p>
              <p className="text-gray-500 dark:text-gray-400 text-sm">
                Yesterday, 5 PM
              </p>
            </li>
            <li>
              <p className="font-semibold dark:text-gray-200">
                Out for Delivery
              </p>
              <p className="text-gray-500 dark:text-gray-400 text-sm">
                Yesterday, 2 PM
              </p>
            </li>
            <li>
              <p className="font-semibold dark:text-gray-200">Shipped</p>
              <p className="text-gray-500 dark:text-gray-400 text-sm">
                Tue, 11 AM
              </p>
            </li>
          </ul>
        </CardContent>
      </Card>

      {/* QUICK ACTIONS */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Link
          to="/send_parcel"
          className="bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500 
             text-white py-3 px-6 rounded-xl shadow 
             hover:opacity-90 transition-all block text-center"
        >
          Send Parcel
        </Link>
        <Link
          to="/dasbord/paymentHiestory"
          className="bg-purple-500 text-white py-3 rounded-xl shadow hover:bg-purple-600 
             hover:opacity-90 transition-all block text-center"
        >
          Payment Hiestory
        </Link>

        <Link
          to="/dasbord/myparcel"
          className="bg-pink-500 text-white py-3 rounded-xl shadow hover:bg-pink-600
             hover:opacity-90 hover:bg-pink-600 transition-all block text-center"
        >
          My All parcel
        </Link>

        <Link
          to="/mapcover"
          className="bg-lime-600 text-white py-3 rounded-xl shadow hover:bg-lime-700
             hover:opacity-90  transition-all block text-center"
        >
          All Delivery Center
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="rounded-2xl shadow-md dark:bg-gray-900">
          <CardContent className="p-6">
            <h2 className="text-xl font-semibold mb-3 dark:text-white">Support Summary</h2>
            <div className="grid grid-cols-3 gap-4">
              <div className="rounded-xl px-4 py-3 bg-base-100 dark:bg-gray-800 border border-base-300 text-center">
                <Ticket className="w-5 h-5 mx-auto text-purple-500" />
                <p className="mt-2 text-sm text-gray-700 dark:text-gray-300">Open</p>
                <p className="text-lg font-bold text-secondary dark:text-white">2</p>
              </div>
              <div className="rounded-xl px-4 py-3 bg-base-100 dark:bg-gray-800 border border-base-300 text-center">
                <Gift className="w-5 h-5 mx-auto text-purple-500" />
                <p className="mt-2 text-sm text-gray-700 dark:text-gray-300">Rewards</p>
                <p className="text-lg font-bold text-secondary dark:text-white">1200</p>
              </div>
              <div className="rounded-xl px-4 py-3 bg-base-100 dark:bg-gray-800 border border-base-300 text-center">
                <Mail className="w-5 h-5 mx-auto text-purple-500" />
                <p className="mt-2 text-sm text-gray-700 dark:text-gray-300">Messages</p>
                <p className="text-lg font-bold text-secondary dark:text-white">5</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="rounded-2xl shadow-md dark:bg-gray-900">
          <CardContent className="p-6">
            <h2 className="text-xl font-semibold mb-3 dark:text-white">Preferences</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 flex items-center justify-between">
                <span className="text-gray-800 dark:text-gray-200">Notifications</span>
                <input type="checkbox" className="toggle toggle-primary" defaultChecked />
              </div>
              <div className="p-4 rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 flex items-center justify-between">
                <span className="text-gray-800 dark:text-gray-200">Compact Mode</span>
                <input type="checkbox" className="toggle toggle-primary" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="rounded-2xl shadow-md dark:bg-gray-900">
          <CardContent className="p-6">
            <h2 className="text-xl font-semibold mb-3 dark:text-white">Export</h2>
            <div className="grid grid-cols-3 gap-3">
              <button className="btn btn-primary">CSV</button>
              <button className="btn btn-primary">XLSX</button>
              <button className="btn btn-primary">PDF</button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default UserDashBord;
