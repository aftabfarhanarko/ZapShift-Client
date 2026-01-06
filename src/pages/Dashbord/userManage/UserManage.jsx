import React, { useState } from "react";
import useAxiosSecoir from "../../../Hook/useAxiosSecoir";
import { useQuery } from "@tanstack/react-query";
import { FaUserShield, FaUserTimes } from "react-icons/fa";
import Swal from "sweetalert2";
import { MdOutlineDeleteOutline } from "react-icons/md";
import { FaArrowLeftLong, FaArrowRightLong } from "react-icons/fa6";
import { IoIosSearch } from "react-icons/io";
import { Users, ShieldCheck, BarChart3, Download, Filter } from "lucide-react";
import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";

const SkeletonRow = () => (
  <tr className="animate-pulse">
    {Array.from({ length: 7 }).map((_, i) => (
      <td key={i} className="p-4">
        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded-full w-full"></div>
      </td>
    ))}
  </tr>
);

const UserManage = () => {
  const axiosSecoir = useAxiosSecoir();
  const [searchNow, setSearchNow] = useState("");
  const [roleFilter, setRoleFilter] = useState("All Roles");
  const [statusFilter, setStatusFilter] = useState("All Status");

  // pasitions
  const [page, setPage] = useState(1);
  const [allUser, setAllUser] = useState(0);
  const limit = 8;
  const skip = (page - 1) * limit;
  const totalPage = Math.ceil(allUser / limit);

  const { refetch, data, isLoading } = useQuery({
    queryKey: ["users", page],
    queryFn: async () => {
      const res = await axiosSecoir.get(
        `/users?searchText=${searchNow}&limit=${limit}&skip=${skip}`
      );
      setAllUser(res.data.total);
      return res.data;
    },
  });

  const handelUpdeat = (user) => {
    const roleInfo = { role: "admin" };
    axiosSecoir.patch(`users/${user._id}/role`, roleInfo).then(() => refetch());
    Swal.fire({
      icon: "success",
      title: `Admin Added: ${user.displayName}`,
      confirmButtonText: "OK",
      customClass: {
        popup: "rounded-2xl shadow-xl",
        title: "text-lg font-bold",
        confirmButton:
          "bg-gradient-to-r from-pink-500 via-purple-500 to-blue-400 text-white font-semibold px-6 py-2 rounded-xl",
      },
      buttonsStyling: false,
    });
  };

  const handelremovedAdmin = (user) => {
    const roleInfo = { role: "user" };
    Swal.fire({
      icon: "success",
      title: `Admin Removed: ${user.displayName}`,
      confirmButtonText: "OK",
      customClass: {
        popup: "rounded-2xl shadow-xl",
        title: "text-lg font-bold",
        confirmButton:
          "bg-gradient-to-r from-pink-500 via-purple-500 to-blue-400 text-white font-semibold px-6 py-2 rounded-xl",
      },
      buttonsStyling: false,
    }).then(() =>
      axiosSecoir
        .patch(`users/${user._id}/role`, roleInfo)
        .then(() => refetch())
    );
  };

  const handelDeletUser = (id) => {
    Swal.fire({
      title: "Confirm Deletion",
      text: "This action cannot be undone.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, Delete",
      cancelButtonText: "Cancel",
      customClass: {
        popup: "rounded-2xl shadow-xl",
        confirmButton:
          "bg-gradient-to-r from-pink-500 via-purple-500 to-blue-400 text-white font-semibold px-6 py-2 rounded-xl",
        cancelButton:
          "bg-gray-400 hover:bg-gray-500 text-white font-semibold px-6 py-2 rounded-xl",
      },
      buttonsStyling: false,
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecoir.delete(`user/${id}`).then(() => refetch());
      }
    });
  };
  const users = (data?.result || []);
  const filteredUsers = users.filter((u) => {
    const roleMatch = roleFilter === "All Roles" ? true : u.role === roleFilter.toLowerCase();
    const statusMatch = true;
    return roleMatch && statusMatch;
  });
  const roleCounts = {
    admin: filteredUsers.filter((u) => u.role === "admin").length,
    rider: filteredUsers.filter((u) => u.role === "rider").length,
    user: filteredUsers.filter((u) => u.role === "user").length,
  };
  const weeklyData = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"].map((d) => ({
    name: d,
    count: filteredUsers.reduce((acc, cur) => {
      const dt = cur?.creatWb ? new Date(cur.creatWb) : null;
      if (!dt || isNaN(dt.getTime())) return acc;
      return acc + (["Sun","Mon","Tue","Wed","Thu","Fri","Sat"][dt.getDay()] === d ? 1 : 0);
    }, 0),
  }));

  // console.log(searchNow);

  return (
    <div className="py-6 md:py-10 px-2 md:px-15">
      {/* Header + Search */}
      <div className="md:flex justify-between items-center mb-6 gap-4">
        <h1 className="text-2xl md:text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-pink-500 via-purple-500 to-blue-400">
          All Users: {filteredUsers.length || 0}
        </h1>

        <label className="relative mt-3 md:mt-0 max-w-md w-full">
          <input
            type="search"
            name="text"
            onChange={(e) => setSearchNow(e.target.value)}
            placeholder="Search users..."
            className="w-full px-12 py-3 rounded-xl border border-gray-200 shadow-sm focus:ring-2 focus:ring-pink-500 focus:border-pink-500 outline-none text-white placeholder-gray-400 bg-transparent"
          />

          <button
            type="submit"
            className="absolute left-4 top-1/2 -translate-y-1/2 text-white hover:opacity-90 transition"
          >
            <IoIosSearch className="w-5 h-5" />
          </button>
        </label>
      </div>

      {/* Header Summary */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <div className="rounded-xl px-4 py-3 bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 shadow flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Users className="w-5 h-5 text-purple-500" />
            <span className="text-sm text-gray-700 dark:text-gray-300">Total</span>
          </div>
          <span className="text-secondary dark:text-white font-semibold">{filteredUsers.length}</span>
        </div>
        <div className="rounded-xl px-4 py-3 bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 shadow flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-purple-500" />
            <span className="text-sm text-gray-700 dark:text-gray-300">Admins</span>
          </div>
          <span className="text-secondary dark:text-white font-semibold">{roleCounts.admin}</span>
        </div>
        <div className="rounded-xl px-4 py-3 bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 shadow flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-5 h-5 rounded-full bg-red-100 text-red-600 flex items-center justify-center text-xs">R</span>
            <span className="text-sm text-gray-700 dark:text-gray-300">Riders</span>
          </div>
          <span className="text-secondary dark:text-white font-semibold">{roleCounts.rider}</span>
        </div>
        <div className="rounded-xl px-4 py-3 bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 shadow flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-5 h-5 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center text-xs">U</span>
            <span className="text-sm text-gray-700 dark:text-gray-300">Users</span>
          </div>
          <span className="text-secondary dark:text-white font-semibold">{roleCounts.user}</span>
        </div>
      </div>

      {/* Charts and Tools */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        <div className="rounded-2xl p-6 bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 shadow lg:col-span-2">
          <div className="flex items-center gap-2 mb-3">
            <BarChart3 className="w-5 h-5 text-purple-500" />
            <p className="text-lg font-semibold text-gray-800 dark:text-white">Role Distribution</p>
          </div>
          <ResponsiveContainer width="100%" height={260}>
            <PieChart>
              <Pie
                data={[
                  { name: "Admin", value: roleCounts.admin },
                  { name: "Rider", value: roleCounts.rider },
                  { name: "User", value: roleCounts.user },
                ]}
                dataKey="value"
                cx="50%"
                cy="50%"
                outerRadius={100}
                label
              >
                <Cell fill="#8b5cf6" />
                <Cell fill="#ef4444" />
                <Cell fill="#3b82f6" />
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="rounded-2xl p-6 bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 shadow">
          <p className="text-lg font-semibold text-gray-800 dark:text-white mb-3">Quick Filters</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <select className="select select-bordered w-full" value={roleFilter} onChange={(e) => setRoleFilter(e.target.value)}>
              <option>All Roles</option>
              <option>Admin</option>
              <option>Rider</option>
              <option>User</option>
            </select>
            <select className="select select-bordered w-full" value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
              <option>All Status</option>
              <option>Active</option>
              <option>Inactive</option>
            </select>
          </div>
          <button className="btn btn-sm mt-4">
            <Filter className="w-4 h-4 mr-2" /> Apply
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        <div className="rounded-2xl p-6 bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 shadow lg:col-span-2">
          <p className="text-lg font-semibold text-gray-800 dark:text-white mb-3">Activity Trend</p>
          <ResponsiveContainer width="100%" height={240}>
            <BarChart
              data={weeklyData}
            >
              <CartesianGrid stroke="#f5f5f5" />
              <XAxis dataKey="name" stroke="#aaa" />
              <YAxis stroke="#aaa" />
              <Tooltip />
              <Bar dataKey="count" barSize={22} fill="#8b5cf6" />
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className="rounded-2xl p-6 bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 shadow">
          <p className="text-lg font-semibold text-gray-800 dark:text-white mb-3">Export</p>
          <div className="grid grid-cols-3 gap-3">
            <button className="btn btn-primary"><Download className="w-4 h-4 mr-2" /> CSV</button>
            <button className="btn btn-primary"><Download className="w-4 h-4 mr-2" /> XLSX</button>
            <button className="btn btn-primary"><Download className="w-4 h-4 mr-2" /> PDF</button>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto  dark:bg-gray-900 rounded-2xl shadow-md border border-gray-200 dark:border-gray-700">
        <table className="min-w-full text-sm">
          <thead className=" dark:bg-gray-800 text-left text-gray-700 dark:text-gray-200">
            <tr>
              <th className="p-4 font-semibold">Srl</th>
              <th className="p-4 font-semibold">User</th>
              <th className="p-4 font-semibold">Email</th>
              <th className="p-4 font-semibold">Joined</th>
              <th className="p-4 font-semibold">Role</th>
              <th className="p-4 font-semibold">Admin Action</th>
              <th className="p-4 font-semibold">Action</th>
            </tr>
          </thead>
          <tbody>
            {isLoading
              ? Array.from({ length: 8 }).map((_, i) => <SkeletonRow key={i} />)
              : data.result?.map((user, i) => (
                  <tr
                    key={i}
                    className="border-b border-gray-200 dark:border-gray-700 hover:to-blue-50 dark:hover:bg-gray-800 transition"
                  >
                    <td className="p-4 font-medium text-white">{i + 1}</td>
                    <td className="p-4 flex items-center gap-3">
                      <img
                        src={user.photoURL}
                        className="w-13 h-13 rounded-full border-2 border-gradient-to-r from-pink-500 via-purple-500 to-blue-400"
                      />
                      <span className="font-semibold text-gray-900 dark:text-gray-200">
                        {user.displayName}
                      </span>
                    </td>
                    <td className="p-4 px-14 md:px-4 text-gray-800 dark:text-gray-300">
                      {user.email}
                    </td>
                    <td className="p-4 text-gray-700 dark:text-gray-400">
                      {new Date(user.creatWb).toLocaleDateString()}
                    </td>
                    <td className="p-4">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold ${
                          user.role === "admin"
                            ? "bg-gradient-to-r from-pink-500 via-purple-500 to-blue-400 text-white"
                            : user.role === "rider"
                            ? "bg-red-100 text-red-600"
                            : "bg-blue-100 text-blue-700"
                        }`}
                      >
                        {user.role}
                      </span>
                    </td>
                    <td className="p-4">
                      {user.role === "rider" ? (
                        <span className="text-red-600 font-semibold">
                          Not Update
                        </span>
                      ) : user.role === "admin" ? (
                        <button
                          onClick={() => handelremovedAdmin(user)}
                          className="flex items-center justify-center w-10 h-10 rounded-lg bg-red-100 text-red-600 hover:bg-red-600 hover:text-white shadow-sm transition"
                        >
                          <FaUserTimes />
                        </button>
                      ) : (
                        <button
                          onClick={() => handelUpdeat(user)}
                          className="flex items-center justify-center w-10 h-10 rounded-lg bg-gradient-to-r from-pink-500 via-purple-500 to-blue-400 text-white hover:opacity-90 shadow-sm transition"
                        >
                          <FaUserShield />
                        </button>
                      )}
                    </td>
                    <td className="p-4">
                      <button
                        onClick={() => handelDeletUser(user._id)}
                        className="flex items-center gap-2 px-3 py-1 rounded-lg bg-white border border-red-300 text-red-600 hover:bg-red-50 shadow transition"
                      >
                        Delete <MdOutlineDeleteOutline />
                      </button>
                    </td>
                  </tr>
                ))}
          </tbody>
        </table>

        {/* Pagination */}
        <div className="flex justify-between items-center px-6 py-4 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700 rounded-b-2xl">
          <button
            disabled={page === 1}
            onClick={() => setPage(page - 1)}
            className={`flex items-center gap-2 px-4 py-1 rounded-lg font-medium transition ${
              page === 1
                ? "text-gray-400 cursor-not-allowed"
                : "bg-gradient-to-r from-pink-500 via-purple-500 to-blue-400 text-white hover:opacity-90"
            }`}
          >
            <FaArrowLeftLong /> Previous
          </button>

          <div className="flex gap-2">
            {Array.from({ length: totalPage }).map((_, i) => (
              <button
                key={i}
                onClick={() => setPage(i + 1)}
                className={`w-8 h-8 flex items-center justify-center rounded-full text-sm font-semibold transition ${
                  page === i + 1
                    ? "bg-gradient-to-r from-pink-500 via-purple-500 to-blue-400 text-white"
                    : "bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gradient-to-r hover:from-pink-50 hover:via-purple-50 hover:to-blue-50"
                }`}
              >
                {i + 1}
              </button>
            ))}
          </div>

          <button
            disabled={page === totalPage}
            onClick={() => setPage(page + 1)}
            className={`flex items-center gap-2 px-4 py-1 rounded-lg font-medium transition ${
              page === totalPage
                ? "text-gray-400 cursor-not-allowed"
                : "bg-gradient-to-r from-pink-500 via-purple-500 to-blue-400 text-white hover:opacity-90"
            }`}
          >
            Next <FaArrowRightLong />
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserManage;
