import React, { useMemo } from "react";
import useAxiosSecoir from "../../../Hook/useAxiosSecoir";
import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../Hook/useAuth";
import { Link } from "react-router";
import { 
  CreditCard, 
  DollarSign, 
  Calendar, 
  TrendingUp, 
  TrendingDown, 
  Activity,
  Receipt,
  Wallet
} from "lucide-react";

const PaymentHiestory = () => {
  const { user } = useAuth();
  const axiosSecoir = useAxiosSecoir();
  const { data: history = [], isLoading } = useQuery({
    queryKey: ["idd", user?.email],
    queryFn: () =>
      axiosSecoir.get(`/payment?email=${user?.email}`).then((res) => res.data),
    enabled: !!user?.email,
  });

  // Calculate stats from history data
  const stats = useMemo(() => {
    if (!history.length) return null;
    
    const totalPayments = history.length;
    const totalSpent = history.reduce((acc, curr) => acc + (parseFloat(curr.amount) || 0), 0);
    const avgSpent = totalSpent / totalPayments;
    const maxSpent = Math.max(...history.map(item => parseFloat(item.amount) || 0));
    const minSpent = Math.min(...history.map(item => parseFloat(item.amount) || 0));
    
    // Sort by date to get latest
    const sortedByDate = [...history].sort((a, b) => new Date(b.paidAt) - new Date(a.paidAt));
    const latestPayment = sortedByDate[0]?.paidAt;

    return {
      totalPayments,
      totalSpent,
      avgSpent,
      maxSpent,
      minSpent,
      latestPayment
    };
  }, [history]);

  const SkeletonRow = () => (
    <tr className="animate-pulse border-b border-gray-100 dark:border-gray-800">
      <td className="p-4"><div className="h-4 w-8 bg-gray-200 dark:bg-gray-700 rounded"></div></td>
      <td className="p-4">
        <div className="space-y-2">
          <div className="h-4 w-32 bg-gray-200 dark:bg-gray-700 rounded"></div>
          <div className="h-3 w-20 bg-gray-100 dark:bg-gray-800 rounded"></div>
        </div>
      </td>
      <td className="p-4"><div className="h-4 w-40 bg-gray-200 dark:bg-gray-700 rounded"></div></td>
      <td className="p-4"><div className="h-4 w-20 bg-gray-200 dark:bg-gray-700 rounded"></div></td>
      <td className="p-4"><div className="h-4 w-24 bg-gray-200 dark:bg-gray-700 rounded"></div></td>
      <td className="p-4"><div className="h-6 w-16 bg-gray-200 dark:bg-gray-700 rounded-full"></div></td>
      <td className="p-4"><div className="h-4 w-32 bg-gray-200 dark:bg-gray-700 rounded"></div></td>
    </tr>
  );

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Header Section */}
        <div className="mb-8">
            <h1 className="text-3xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-pink-600 via-purple-600 to-blue-600 dark:from-pink-400 dark:via-purple-400 dark:to-blue-400">
                Payment History
            </h1>
            <p className="text-gray-500 dark:text-gray-400 mt-2 font-medium">
                Track all your transactions and financial activities
            </p>
        </div>

        {/* Stats Cards - 6 Features */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {/* Total Spent */}
            <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 relative overflow-hidden group hover:shadow-md transition">
                <div className="absolute right-0 top-0 h-full w-1/3 bg-gradient-to-l from-blue-50 to-transparent dark:from-blue-900/20 opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="flex items-center gap-4 relative z-10">
                    <div className="p-3 bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-xl">
                        <DollarSign size={24} />
                    </div>
                    <div>
                        <p className="text-sm text-gray-500 dark:text-gray-400 font-medium">Total Spent</p>
                        <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-100">
                            ${isLoading ? "..." : stats?.totalSpent?.toFixed(2) || "0.00"}
                        </h3>
                    </div>
                </div>
            </div>

            {/* Total Transactions */}
            <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 relative overflow-hidden group hover:shadow-md transition">
                <div className="absolute right-0 top-0 h-full w-1/3 bg-gradient-to-l from-purple-50 to-transparent dark:from-purple-900/20 opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="flex items-center gap-4 relative z-10">
                    <div className="p-3 bg-purple-50 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 rounded-xl">
                        <Receipt size={24} />
                    </div>
                    <div>
                        <p className="text-sm text-gray-500 dark:text-gray-400 font-medium">Total Transactions</p>
                        <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-100">
                            {isLoading ? "..." : stats?.totalPayments || 0}
                        </h3>
                    </div>
                </div>
            </div>

            {/* Average Spend */}
            <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 relative overflow-hidden group hover:shadow-md transition">
                <div className="absolute right-0 top-0 h-full w-1/3 bg-gradient-to-l from-green-50 to-transparent dark:from-green-900/20 opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="flex items-center gap-4 relative z-10">
                    <div className="p-3 bg-green-50 dark:bg-green-900/30 text-green-600 dark:text-green-400 rounded-xl">
                        <Activity size={24} />
                    </div>
                    <div>
                        <p className="text-sm text-gray-500 dark:text-gray-400 font-medium">Average Spend</p>
                        <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-100">
                            ${isLoading ? "..." : stats?.avgSpent?.toFixed(2) || "0.00"}
                        </h3>
                    </div>
                </div>
            </div>

            {/* Highest Transaction */}
            <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 relative overflow-hidden group hover:shadow-md transition">
                <div className="absolute right-0 top-0 h-full w-1/3 bg-gradient-to-l from-amber-50 to-transparent dark:from-amber-900/20 opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="flex items-center gap-4 relative z-10">
                    <div className="p-3 bg-amber-50 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400 rounded-xl">
                        <TrendingUp size={24} />
                    </div>
                    <div>
                        <p className="text-sm text-gray-500 dark:text-gray-400 font-medium">Highest Transaction</p>
                        <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-100">
                            ${isLoading ? "..." : stats?.maxSpent?.toFixed(2) || "0.00"}
                        </h3>
                    </div>
                </div>
            </div>

            {/* Lowest Transaction */}
            <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 relative overflow-hidden group hover:shadow-md transition">
                <div className="absolute right-0 top-0 h-full w-1/3 bg-gradient-to-l from-indigo-50 to-transparent dark:from-indigo-900/20 opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="flex items-center gap-4 relative z-10">
                    <div className="p-3 bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 rounded-xl">
                        <TrendingDown size={24} />
                    </div>
                    <div>
                        <p className="text-sm text-gray-500 dark:text-gray-400 font-medium">Lowest Transaction</p>
                        <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-100">
                            ${isLoading ? "..." : stats?.minSpent?.toFixed(2) || "0.00"}
                        </h3>
                    </div>
                </div>
            </div>

            {/* Latest Activity */}
            <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 relative overflow-hidden group hover:shadow-md transition">
                <div className="absolute right-0 top-0 h-full w-1/3 bg-gradient-to-l from-pink-50 to-transparent dark:from-pink-900/20 opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="flex items-center gap-4 relative z-10">
                    <div className="p-3 bg-pink-50 dark:bg-pink-900/30 text-pink-600 dark:text-pink-400 rounded-xl">
                        <Calendar size={24} />
                    </div>
                    <div>
                        <p className="text-sm text-gray-500 dark:text-gray-400 font-medium">Last Payment</p>
                        <h3 className="text-lg font-bold text-gray-800 dark:text-gray-100">
                            {isLoading ? "..." : stats?.latestPayment ? new Date(stats.latestPayment).toLocaleDateString() : "N/A"}
                        </h3>
                    </div>
                </div>
            </div>
        </div>

      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead className="bg-gray-50 dark:bg-gray-900 border-b border-gray-100 dark:border-gray-800">
              <tr>
                <th className="p-4 text-left font-semibold text-gray-600 dark:text-gray-300">#</th>
                <th className="p-4 text-left font-semibold text-gray-600 dark:text-gray-300">Parcel Info</th>
                <th className="p-4 text-left font-semibold text-gray-600 dark:text-gray-300">Customer Email</th>
                <th className="p-4 text-left font-semibold text-gray-600 dark:text-gray-300">Amount</th>
                <th className="p-4 text-left font-semibold text-gray-600 dark:text-gray-300">Transaction ID</th>
                <th className="p-4 text-left font-semibold text-gray-600 dark:text-gray-300">Status</th>
                <th className="p-4 text-left font-semibold text-gray-600 dark:text-gray-300">Paid At</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
              {isLoading ? (
                  <>
                    <SkeletonRow />
                    <SkeletonRow />
                    <SkeletonRow />
                    <SkeletonRow />
                    <SkeletonRow />
                  </>
              ) : (
                  history.map((item, i) => (
                    <tr
                      key={i}
                      className="hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors"
                    >
                      <td className="p-4 font-medium text-gray-500 dark:text-gray-400">{i + 1}</td>
                      <td className="p-4">
                        <div>
                          <p className="font-semibold text-gray-900 dark:text-gray-200">{item.parcelName}</p>
                          <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">ID: {item.parcelid}</p>
                        </div>
                      </td>
                      <td className="p-4 text-gray-600 dark:text-gray-300">{item.customerEmail}</td>
                      <td className="p-4 font-medium text-gray-900 dark:text-gray-200">${item.amount}</td>
                      <td className="p-4 font-mono text-xs text-blue-600 dark:text-blue-400">{item.transactionId}</td>
                      <td className="p-4">
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-semibold border
                            ${item.paymentStatus === "paid" 
                              ? "bg-green-50 text-green-700 border-green-200 dark:bg-green-900/30 dark:text-green-400 dark:border-green-800" 
                              : "bg-red-50 text-red-700 border-red-200 dark:bg-red-900/30 dark:text-red-400 dark:border-red-800"
                            }`}
                        >
                          {item.paymentStatus}
                        </span>
                      </td>
                      <td className="p-4 text-gray-600 dark:text-gray-300">
                        {new Date(item.paidAt).toLocaleString()}
                      </td>
                    </tr>
                  ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default PaymentHiestory;
