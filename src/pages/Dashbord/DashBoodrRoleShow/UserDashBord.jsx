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

const spendingData = [
  { month: "Jan", amount: 500 },
  { month: "Feb", amount: 300 },
  { month: "Mar", amount: 650 },
  { month: "Apr", amount: 400 },
  { month: "May", amount: 850 },
];

const UserDashBord = () => {
  return (
    <div className="space-y-8">
      {/* TITLE */}
      <h1 className="text-3xl font-semibold text-gray-800 dark:text-gray-200 mb-6">
        User Dashboard
      </h1>

      {/* PROFILE */}
      <Card className="rounded-2xl shadow-lg dark:bg-gray-900">
        <CardContent className="p-6 flex items-center gap-6">
          <div className="w-20 h-20 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center shadow-lg">
            <User size={40} className="text-white" />
          </div>

          <div>
            <h2 className="text-xl font-semibold dark:text-white">
              Aftab Farhan Arko
            </h2>
            <p className="text-gray-600 dark:text-gray-300">
              arkofarhan@gmail.com
            </p>
            <p className="text-gray-500 dark:text-gray-400 text-sm">
              Joined: Jan 2024
            </p>
          </div>
        </CardContent>
      </Card>

      {/* STATS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="shadow-md border-l-4 border-purple-500 dark:bg-gray-900">
          <CardContent className="p-5">
            <p className="text-gray-500 dark:text-gray-300">Total Orders</p>
            <h1 className="text-3xl font-bold mt-1 dark:text-white">12</h1>
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
            <p className="text-gray-500 dark:text-gray-300">Cancelled</p>
            <h1 className="text-3xl font-bold mt-1 dark:text-white">01</h1>
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

      {/* COUPON WIDGET */}
      <Card className="rounded-2xl shadow-md dark:bg-gray-900 bg-gradient-to-r from-purple-500 to-pink-500 text-white">
        <CardContent className="p-6 flex justify-between items-center">
          <div>
            <h2 className="text-xl font-bold">20% OFF Coupon</h2>
            <p className="opacity-80">Valid for your next 2 deliveries</p>
          </div>
          <Ticket size={40} className="opacity-90" />
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

      {/* REORDER HISTORY */}
      <Card className="rounded-2xl shadow-md dark:bg-gray-900">
        <CardContent className="p-6">
          <h2 className="text-xl font-semibold mb-3 dark:text-white">
            Reorder History
          </h2>

          <div className="space-y-3">
            {["Laptop Charger", "Gift Box", "Documents"].map((item, i) => (
              <div
                key={i}
                className="p-4 border rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 cursor-pointer"
              >
                <p className="font-medium dark:text-white">{item}</p>
                <p className="text-gray-500 dark:text-gray-400 text-sm">
                  Last ordered: 2 weeks ago
                </p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* QUICK ACTIONS */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <button className="bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500 text-white py-3 rounded-xl shadow hover:opacity-90 transition-all">
          Track Parcel
        </button>
        <button className="bg-purple-500 text-white py-3 rounded-xl shadow hover:bg-purple-600">
          Book Delivery
        </button>
        <button className="bg-pink-500 text-white py-3 rounded-xl shadow hover:bg-pink-600">
          Update Profile
        </button>
        <button className="bg-gray-800 text-white py-3 rounded-xl shadow hover:bg-gray-700 dark:bg-gray-700 dark:hover:bg-gray-600">
          Help Center
        </button>
      </div>
    </div>
  );
};

export default UserDashBord;
