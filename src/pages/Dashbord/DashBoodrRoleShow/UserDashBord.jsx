import React from "react";
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
  const { data , isLoading:newLode} = useQuery({
    queryKey: ["usercreatParcel"],
    queryFn: async () => {
      const res = await axiosSecoir.get(
        `/totaluser/parcel?email=${user.email}`
      );
      // console.log(res.data);
      return res.data;
    },
  });
  const { data: delivered , isLoading} = useQuery({
    queryKey: ["deliveryStatus"],
    queryFn: async () => {
      const res = await axiosSecoir.get(
        `/totalDelivery/deliveryStatus?deliveryStatus=parcel-delivered&email=${user.email}`
      );
      // console.log(res.data);
      return res.data;
    },
  });


  if(isLoading || newLode){
    return <Loding></Loding>
  }
  return (
    <div className="space-y-8 p-3 md:p-5 lg:p-7">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-semibold text-gray-800 dark:text-gray-200">
            User Dashboard
          </h1>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
            Parcels: <span className="font-semibold">{data?.length || 0}</span> · Delivered: <span className="font-semibold">{delivered?.length || 0}</span>
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Link to="/send_parcel" className="btn btn-sm md:btn-md bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500 text-white">Send Parcel</Link>
          <Link to="/dasbord/myparcel" className="btn btn-sm md:btn-md bg-pink-500 text-white">My Parcels</Link>
          <Link to="/dasbord/paymentHiestory" className="btn btn-sm md:btn-md bg-blue-600 text-white">Payments</Link>
        </div>
      </div>

      <div className="rounded-2xl p-4 bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800">
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
              <Clock className="w-4 h-4 text-purple-500" />
              <span className="text-sm text-gray-700 dark:text-gray-300">In Progress</span>
            </div>
            <span className="text-secondary dark:text-white font-semibold">—</span>
          </div>
          <div className="rounded-xl px-4 py-3 bg-base-100 dark:bg-gray-800 border border-base-300 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-purple-500" />
              <span className="text-sm text-gray-700 dark:text-gray-300">Regions</span>
            </div>
            <span className="text-secondary dark:text-white font-semibold">
              {Array.from(new Set((data || []).map((p) => p?.reciverDistrick))).length}
            </span>
          </div>
          <div className="rounded-xl px-4 py-3 bg-base-100 dark:bg-gray-800 border border-base-300 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Heart className="w-4 h-4 text-purple-500" />
              <span className="text-sm text-gray-700 dark:text-gray-300">Rewards</span>
            </div>
            <span className="text-secondary dark:text-white font-semibold">Gold</span>
          </div>
        </div>
      </div>

      {/* PROFILE */}
      <Card className="rounded-2xl shadow-lg dark:bg-gray-900">
        <CardContent className="p-6 flex items-center gap-6">
          <div className="w-15 h-15 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center shadow-lg">
            {user.photoURL ? (
              <img
                src={user.photoURL}
                className=" rounded-full w-15 h-15 "
              ></img>
            ) : (
              <User size={40} className="text-white" />
            )}
          </div>

          <div>
            <h2 className="text-xl font-semibold dark:text-white">
              {user.displayName}
            </h2>
            <p className="text-gray-600 dark:text-gray-300">{user.email}</p>
            <p className="text-gray-500 dark:text-gray-400 text-sm">
              {new Date(user.creatWb).toLocaleDateString()}
            </p>
          </div>
        </CardContent>
      </Card>

      {/* STATS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="shadow-md border-l-4 border-purple-500 dark:bg-gray-900">
          <CardContent className="p-5">
            <p className="text-gray-500 dark:text-gray-300">
              Total Create Parcel
            </p>
            <h1 className="text-3xl font-bold mt-1 dark:text-white">
              {data?.length}
            </h1>
          </CardContent>
        </Card>

        <Card className="shadow-md border-l-4 border-pink-500 dark:bg-gray-900">
          <CardContent className="p-5">
            <p className="text-gray-500 dark:text-gray-300">Pending</p>
            <h1 className="text-3xl font-bold mt-1 dark:text-white">03</h1>
          </CardContent>
        </Card>

        <Card className="shadow-md border-l-4 border-blue-500 dark:bg-gray-900">
          <CardContent className="p-5">
            <p className="text-gray-500 dark:text-gray-300">Delivered</p>
            <h1 className="text-3xl font-bold mt-1 dark:text-white">
              {delivered?.length}
            </h1>
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
