import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import useAuth from "../../../Hook/useAuth";
import useAxiosSecoir from "../../../Hook/useAxiosSecoir";
import Loding from "../../../Shared/Loding";
import { MdCancel, MdCheckCircle } from "react-icons/md";
import { toast } from "sonner";
import Swal from "sweetalert2";
import {
  Package,
  MapPin,
  Scale,
  Filter,
  Download,
  Search,
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
} from "recharts";

const AssingDiliveryTask = () => {
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
        `parcel/rider?riderEmail=${user.email}&deliveryStatus=driver-assigned`
      );
      return res.data;
    },
  });

  // Derived Data
  const filteredParcels = parcel.filter((item) => {
    const matchesSearch =
      item.percilname?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.parcelType?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDistrict =
      filterDistrict === "All" || item.reciverDistrick === filterDistrict;
    return matchesSearch && matchesDistrict;
  });

  const totalWeight = parcel.reduce((acc, curr) => acc + (parseFloat(curr.weight) || 0), 0);
  const uniqueDistricts = [...new Set(parcel.map((p) => p.reciverDistrick))];
  
  // Chart Data
  const districtData = Object.entries(
    parcel.reduce((acc, cur) => {
      const d = cur.reciverDistrick || "Unknown";
      acc[d] = (acc[d] || 0) + 1;
      return acc;
    }, {})
  ).map(([name, count]) => ({ name, count }));

  const typeData = Object.entries(
    parcel.reduce((acc, cur) => {
      const t = cur.parcelType || "Other";
      acc[t] = (acc[t] || 0) + 1;
      return acc;
    }, {})
  ).map(([name, value]) => ({ name, value }));

  const COLORS = ["#8b5cf6", "#ec4899", "#06b6d4", "#f59e0b", "#10b981"];

  const handleExport = () => {
    const csvContent =
      "data:text/csv;charset=utf-8," +
      ["Parcel Name,Type,Weight,District,Status"].join(",") +
      "\n" +
      parcel
        .map((row) =>
          [
            row.percilname,
            row.parcelType,
            row.weight,
            row.reciverDistrick,
            row.deliveryStatus,
          ].join(",")
        )
        .join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "assigned_tasks.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handelAcceptsPsrcel = (items, status) => {
    const statusInfo = {
      deliveryStatus: status,
      riderId: items.riderId,
      trakingId: items.trakingId,
    };
    let message = `Parcel Status is updated with ${status
      .split("-")
      .join(" ")}`;
    axiosSecore.patch(`/parcel/${items._id}/status`, statusInfo).then((res) => {
      if (res.data.modifiedCount) {
        refetch();
        Swal.fire({
          icon: "success",
          title: `Rider Actions Proprely`,
          text: message,
          confirmButtonText: "OK",
          customClass: {
            popup: "rounded-2xl shadow-lg",
            title: "text-lg font-bold text-green-700",
            htmlContainer: "text-gray-700",
            confirmButton:
              "bg-green-600 hover:bg-green-700 text-white font-semibold px-6 py-2 rounded-xl",
          },
          buttonsStyling: false,
        });
      }
    });
  };

  const handelRiderRegectParcel = (item) => {
    const statusInfo = { deliveryStatus: "cancelled" };
    axiosSecore.patch(`/parcel/${item._id}/status`, statusInfo).then((res) => {
      refetch();
      toast.success("Parcel Hand Over Rider");
    });
  };

  if (isLoading) {
    return <Loding></Loding>;
  }

  return (
    <div className="p-3 md:p-5 lg:p-7">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold text-secondary dark:text-white">
            Assigned Tasks
          </h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            Manage your pending pickups and delivery schedule.
          </p>
        </div>
        <button
          onClick={handleExport}
          className="flex items-center gap-2 px-5 py-2.5 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 border border-gray-200 dark:border-gray-700 rounded-xl hover:shadow-md transition font-medium"
        >
          <Download size={18} /> Export CSV
        </button>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-3xl p-6 text-white shadow-lg shadow-blue-200 dark:shadow-none">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-white/20 flex items-center justify-center">
              <Package size={24} className="text-white" />
            </div>
            <div>
              <p className="text-blue-100 text-sm font-medium">Pending Pickups</p>
              <h3 className="text-3xl font-bold">{parcel.length}</h3>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-900 rounded-3xl p-6 border border-gray-100 dark:border-gray-800 shadow-sm">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-purple-50 dark:bg-gray-800 flex items-center justify-center">
              <Scale size={24} className="text-purple-500" />
            </div>
            <div>
              <p className="text-gray-500 dark:text-gray-400 text-sm font-medium">
                Total Weight
              </p>
              <h3 className="text-3xl font-bold text-secondary dark:text-white">
                {totalWeight} <span className="text-sm font-normal text-gray-400">kg</span>
              </h3>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-900 rounded-3xl p-6 border border-gray-100 dark:border-gray-800 shadow-sm">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-pink-50 dark:bg-gray-800 flex items-center justify-center">
              <MapPin size={24} className="text-pink-500" />
            </div>
            <div>
              <p className="text-gray-500 dark:text-gray-400 text-sm font-medium">
                Unique Districts
              </p>
              <h3 className="text-3xl font-bold text-secondary dark:text-white">
                {uniqueDistricts.length}
              </h3>
            </div>
          </div>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <div className="lg:col-span-2 bg-white dark:bg-gray-900 p-6 rounded-3xl shadow-sm border border-gray-100 dark:border-gray-800">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">
            Pickup Locations
          </h3>
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={districtData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#eee" />
              <XAxis dataKey="name" tick={{ fill: "#888", fontSize: 12 }} />
              <YAxis tick={{ fill: "#888", fontSize: 12 }} />
              <Tooltip
                contentStyle={{
                  borderRadius: "12px",
                  border: "none",
                  boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
                }}
              />
              <Bar dataKey="count" fill="#8b5cf6" radius={[6, 6, 0, 0]} barSize={40} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white dark:bg-gray-900 p-6 rounded-3xl shadow-sm border border-gray-100 dark:border-gray-800">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">
            Parcel Types
          </h3>
          <ResponsiveContainer width="100%" height={280}>
            <PieChart>
              <Pie
                data={typeData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={80}
                paddingAngle={5}
                dataKey="value"
              >
                {typeData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Filters & Table */}
      <div className="bg-white dark:bg-gray-900 rounded-3xl shadow-sm border border-gray-100 dark:border-gray-800 overflow-hidden">
        {/* Toolbar */}
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

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead className="bg-gray-50 dark:bg-gray-800 text-gray-500 dark:text-gray-400 font-medium">
              <tr>
                <th className="p-4 text-left">#</th>
                <th className="p-4 text-left">Parcel Details</th>
                <th className="p-4 text-left">Weight</th>
                <th className="p-4 text-left">Location</th>
                <th className="p-4 text-left">Status</th>
                <th className="p-4 text-left">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
              {filteredParcels.length > 0 ? (
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
                        {item.parcelType}
                      </div>
                    </td>

                    <td className="p-4">
                      <span className="px-2.5 py-1 rounded-lg bg-orange-50 dark:bg-orange-900/20 text-orange-600 dark:text-orange-400 font-medium text-xs">
                        {item.weight} kg
                      </span>
                    </td>

                    <td className="p-4">
                      <div className="text-gray-900 dark:text-gray-200 font-medium">
                        {item.reciverRegion}
                      </div>
                      <div className="text-xs text-gray-500 dark:text-gray-400">
                        {item.reciverDistrick}
                      </div>
                    </td>

                    <td className="p-4">
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 capitalize">
                        <span className="w-1.5 h-1.5 rounded-full bg-blue-500"></span>
                        {item.deliveryStatus?.replace("-", " ")}
                      </span>
                    </td>

                    <td className="p-4">
                      <div className="flex items-center gap-2">
                        {item.deliveryStatus === "driver-assigned" ? (
                          <>
                            <button
                              onClick={() =>
                                handelAcceptsPsrcel(item, "rider-arriving")
                              }
                              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-500 text-white hover:bg-emerald-600 transition shadow-sm text-xs font-medium"
                            >
                              <MdCheckCircle size={14} /> Accept
                            </button>
                            <button
                              onClick={() => handelRiderRegectParcel(item)}
                              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white border border-gray-200 dark:bg-gray-800 dark:border-gray-700 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 transition text-xs font-medium"
                            >
                              <MdCancel size={14} /> Reject
                            </button>
                          </>
                        ) : item.deliveryStatus === "parcel-picked-up" ? (
                          <button
                            onClick={() =>
                              handelAcceptsPsrcel(item, "parcel-delivered")
                            }
                            className="px-4 py-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg shadow-md hover:shadow-lg transition text-xs font-semibold"
                          >
                            Mark Delivered
                          </button>
                        ) : (
                          <button
                            onClick={() =>
                              handelAcceptsPsrcel(item, "parcel-picked-up")
                            }
                            className="px-4 py-2 bg-purple-500 text-white rounded-lg shadow-md hover:bg-purple-600 transition text-xs font-semibold"
                          >
                            Mark Pickup
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="p-8 text-center text-gray-500 dark:text-gray-400">
                    <div className="flex flex-col items-center justify-center gap-2">
                      <AlertCircle size={32} className="text-gray-300 dark:text-gray-600" />
                      <p>No tasks found matching your criteria.</p>
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

export default AssingDiliveryTask;
