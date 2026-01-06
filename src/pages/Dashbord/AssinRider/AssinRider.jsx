import { useQuery } from "@tanstack/react-query";
import React, { useRef, useState } from "react";
import useAxiosSecoir from "../../../Hook/useAxiosSecoir";
import Loding from "../../../Shared/Loding";
import { MdCheckCircle } from "react-icons/md";
import { toast } from "sonner";
import { Link } from "react-router";
import { TrendingUp, Users, MapPin, Timer, Layers, ShieldCheck } from "lucide-react";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";

const AssinRider = () => {
  const [parcelSet, setParcelSet] = useState(null);
  const axioSecore = useAxiosSecoir();
  const referen = useRef();

  const { data: parcel, isLoading,refetch } = useQuery({
    queryKey: ["parcel", "pending-pickup"],
    queryFn: async () => {
      const data = await axioSecore.get("parcel?deliveryStatus=pending-pickup");
      return data.data.result;
    },
  });

  const { data: rider = []  } = useQuery({
    queryKey: ["riders", parcelSet?.reciverDistrick, "available"],
    enabled: !!parcelSet,
    queryFn: async () => {
      const res = await axioSecore.get(
        `ridereas?status=approved&yourDistrict=${parcelSet?.reciverDistrick}&workStatus=available`
      );
      return res.data;
    },
  });

  const riderAssing = (item) => {
    setParcelSet(item);
    referen.current.showModal();
    // refetch();
    toast.success("Assign Rider");
  };

  const handelAssinRider = (ride) => {
    const riderInfo = {
      riderId: ride._id,
      riderEmail: ride.yourEmail,
      riderName: ride.yourName,
      trakingId: parcelSet.trakingId,
    };
    axioSecore.patch(`parcel/${parcelSet._id}`, riderInfo).then((res) => {
      refetch();
      if (res.data.modifiedCount) {
        referen.current.close();
        refetch()
        toast.success("Rider Assigned Successfully");
      }
    });
  };

  if (isLoading) {
    return <Loding />;
  }

  return (
    <div className="p-3 md:p-5 lg:p-7">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-pink-500 via-purple-500 to-blue-400">
            Assign Rider
          </h1>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
            Pending parcels: <span className="font-semibold">{parcel?.length || 0}</span> · Riders available: <span className="font-semibold">{rider?.length || 0}</span>
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Link to="/dasbord/deliveries" className="btn btn-sm md:btn-md bg-gradient-to-r from-pink-500 via-purple-500 to-blue-400 text-white">
            All Riders
          </Link>
          <Link to="/dasbord/userManage" className="btn btn-sm md:btn-md bg-gradient-to-r from-purple-500 to-pink-500 text-white">
            User Manage
          </Link>
          <Link to="/dasbord/reports" className="btn btn-sm md:btn-md bg-gradient-to-r from-blue-500 to-teal-500 text-white">
            Reports
          </Link>
        </div>
      </div>

      <div className="mt-4 rounded-2xl p-4 bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="rounded-xl px-4 py-3 bg-base-100 dark:bg-gray-800 border border-base-300 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Layers className="w-4 h-4 text-purple-500" />
              <span className="text-sm text-gray-700 dark:text-gray-300">Pending</span>
            </div>
            <span className="text-secondary dark:text-white font-semibold">{parcel?.length || 0}</span>
          </div>
          <div className="rounded-xl px-4 py-3 bg-base-100 dark:bg-gray-800 border border-base-300 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Users className="w-4 h-4 text-purple-500" />
              <span className="text-sm text-gray-700 dark:text-gray-300">Available</span>
            </div>
            <span className="text-secondary dark:text-white font-semibold">{rider?.length || 0}</span>
          </div>
          <div className="rounded-xl px-4 py-3 bg-base-100 dark:bg-gray-800 border border-base-300 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Timer className="w-4 h-4 text-purple-500" />
              <span className="text-sm text-gray-700 dark:text-gray-300">Avg Assign</span>
            </div>
            <span className="text-secondary dark:text-white font-semibold">—</span>
          </div>
          <div className="rounded-xl px-4 py-3 bg-base-100 dark:bg-gray-800 border border-base-300 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-purple-500" />
              <span className="text-sm text-gray-700 dark:text-gray-300">Districts</span>
            </div>
            <span className="text-secondary dark:text-white font-semibold">
              {Array.from(new Set(parcel?.map((p) => p?.reciverDistrick))).length}
            </span>
          </div>
        </div>
      </div>

      {/* Parcel Table */}
      <div className="overflow-x-auto mt-5 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700 bg-white dark:bg-gray-900">
        <table className="min-w-full text-sm">
          <thead className="bg-gradient-to-r from-pink-50 via-purple-50 to-blue-50 dark:from-gray-800 dark:via-gray-800 dark:to-gray-900 text-gray-700 dark:text-gray-200">
            <tr>
              <th className=" font-semibold">Srl No</th>
              <th className="py-4 font-semibold">Parcel Name</th>
              <th className="py-4 font-semibold">Receiver Info</th>
              <th className="py-4 font-semibold">Tracking Id</th>
              <th className="py-4 font-semibold">Created Time</th>
              <th className="py-4 font-semibold">Cost</th>
              <th className="py-4 font-semibold">Action</th>
            </tr>
          </thead>
          <tbody>
            {parcel.map((item, i) => (
              <tr
                key={i}
                className="border-b border-gray-200 dark:border-gray-700 hover:bg-gradient-to-r hover:from-pink-50 hover:via-purple-50 hover:to-blue-50 dark:hover:from-gray-800 dark:hover:via-gray-800 dark:hover:to-gray-900 transition"
              >
                <td className="p-4  font-medium text-gray-900 dark:text-gray-200">
                  {i + 1}
                </td>
                <td className="p-4">
                  <p className="font-semibold text-gray-900 dark:text-gray-200">
                    {item?.percilname}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    {item?.parcelType}
                  </p>
                </td>
                <td className="p-4">
                  <p className="font-semibold text-gray-900 dark:text-gray-200">
                    {item?.reciverRegion}
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {item?.reciverDistrick}
                  </p>
                </td>
                <td className="p-4 text-gray-800 dark:text-gray-200">
                  {item?.trakingId}
                </td>
                <td className="p-4 text-gray-800 dark:text-gray-200">
                  {new Date(item.creatAtime).toLocaleString()}
                </td>
                <td className="p-4 font-semibold text-red-500 dark:text-red-400">
                  ${item.totalCost}
                </td>
                <td className="p-4">
                  <button
                    onClick={() => riderAssing(item)}
                    className="px-4 py-1.5 rounded-lg bg-gradient-to-r from-pink-500 via-purple-500 to-blue-400 text-white hover:opacity-90 hover:scale-105 flex items-center gap-2 font-medium shadow-md hover:shadow-lg transition-all duration-200"
                  >
                    Find Rider <MdCheckCircle size={16} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-8">
        <div className="rounded-2xl p-6 bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 shadow">
          <div className="flex items-center gap-2">
            <Layers className="w-5 h-5 text-purple-500" />
            <p className="font-semibold text-gray-800 dark:text-white">Pending Parcels</p>
          </div>
          <p className="text-3xl font-bold mt-2 text-secondary dark:text-white">{parcel?.length || 0}</p>
        </div>
        <div className="rounded-2xl p-6 bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 shadow">
          <div className="flex items-center gap-2">
            <Users className="w-5 h-5 text-purple-500" />
            <p className="font-semibold text-gray-800 dark:text-white">Riders Available</p>
          </div>
          <p className="text-3xl font-bold mt-2 text-secondary dark:text-white">{rider?.length || 0}</p>
        </div>
        <div className="rounded-2xl p-6 bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 shadow">
          <div className="flex items-center gap-2">
            <Timer className="w-5 h-5 text-purple-500" />
            <p className="font-semibold text-gray-800 dark:text-white">Avg Assign Time</p>
          </div>
          <p className="text-3xl font-bold mt-2 text-secondary dark:text-white">—</p>
        </div>
        <div className="rounded-2xl p-6 bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 shadow">
          <div className="flex items-center gap-2">
            <MapPin className="w-5 h-5 text-purple-500" />
            <p className="font-semibold text-gray-800 dark:text-white">Unique Districts</p>
          </div>
          <p className="text-3xl font-bold mt-2 text-secondary dark:text-white">
            {Array.from(new Set(parcel?.map((p) => p?.reciverDistrick))).length}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-8">
        <div className="rounded-3xl p-6 bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 shadow lg:col-span-2">
          <div className="flex items-center gap-2 mb-4">
            <TrendingUp className="w-5 h-5 text-purple-500" />
            <p className="text-lg font-semibold text-gray-800 dark:text-white">Parcels by District</p>
          </div>
          <ResponsiveContainer width="100%" height={280}>
            <BarChart
              data={Object.entries(
                parcel.reduce((acc, cur) => {
                  const d = cur?.reciverDistrick || "Unknown";
                  acc[d] = (acc[d] || 0) + 1;
                  return acc;
                }, {})
              ).map(([name, count]) => ({ name, count }))}
              margin={{ top: 10, right: 10, bottom: 0, left: 0 }}
            >
              <CartesianGrid stroke="#f5f5f5" />
              <XAxis dataKey="name" tick={{ fontSize: 12, fill: "#555" }} />
              <YAxis tick={{ fontSize: 12, fill: "#555" }} />
              <Tooltip contentStyle={{ backgroundColor: "#fff", borderRadius: "10px", border: "1px solid #ddd" }} />
              <Bar dataKey="count" barSize={24} isAnimationActive={true} fill="#8b5cf6" />
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className="rounded-3xl p-6 bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 shadow">
          <p className="text-lg font-semibold text-gray-800 dark:text-white mb-3">Assignment Guidelines</p>
          <ul className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
            <li>Prefer local district riders for faster pickup.</li>
            <li>Balance workload across available riders.</li>
            <li>Respect SLA windows for pickup and delivery.</li>
            <li>Confirm rider availability before assigning.</li>
          </ul>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-8">
        <div className="rounded-3xl p-6 bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 shadow">
          <p className="text-lg font-semibold text-gray-800 dark:text-white mb-3">Quick Filters</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <select className="select select-bordered w-full">
              <option>All Districts</option>
              {Array.from(new Set(parcel?.map((p) => p?.reciverDistrick))).map((d) => (
                <option key={d}>{d}</option>
              ))}
            </select>
            <select className="select select-bordered w-full">
              <option>Availability</option>
              <option>Available</option>
              <option>Busy</option>
            </select>
          </div>
        </div>

        <div className="rounded-3xl p-6 bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 shadow">
          <p className="text-lg font-semibold text-gray-800 dark:text-white mb-3">SLA Compliance</p>
          <div className="space-y-4">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-300">Pickup Window</p>
              <div className="h-2 bg-gray-200 dark:bg-gray-800 rounded-full mt-1">
                <div className="h-2 rounded-full bg-purple-500" style={{ width: "80%" }}></div>
              </div>
            </div>
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-300">Delivery Window</p>
              <div className="h-2 bg-gray-200 dark:bg-gray-800 rounded-full mt-1">
                <div className="h-2 rounded-full bg-pink-500" style={{ width: "75%" }}></div>
              </div>
            </div>
            <div className="flex items-center gap-2 mt-2">
              <ShieldCheck className="w-4 h-4 text-teal-500" />
              <span className="text-sm text-gray-600 dark:text-gray-300">Adhering to service levels</span>
            </div>
          </div>
        </div>

        <div className="rounded-3xl p-6 bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 shadow">
          <p className="text-lg font-semibold text-gray-800 dark:text-white mb-3">Recent Parcels</p>
          <ul className="space-y-3">
            {parcel.slice(0, 6).map((p, i) => (
              <li key={i} className="flex items-center justify-between rounded-xl px-4 py-3 bg-base-100 dark:bg-gray-800 border border-base-300">
                <span className="text-sm text-gray-700 dark:text-gray-300">{p?.trakingId}</span>
                <span className="text-xs rounded-full px-2 py-1 bg-gray-100 dark:bg-gray-700 text-secondary dark:text-white">
                  {p?.reciverDistrick}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Modal */}
      <dialog ref={referen} className="modal modal-bottom sm:modal-middle">
        <div className="modal-box bg-white dark:bg-gray-900">
          <h3 className="font-bold text-lg bg-clip-text text-transparent bg-gradient-to-r from-pink-500 via-purple-500 to-blue-400">
            Total Riders: {rider.length}
          </h3>

          <table className="min-w-full text-sm mt-4">
            <thead className="bg-gradient-to-r from-pink-50 via-purple-50 to-blue-50 dark:from-gray-800 dark:via-gray-800 dark:to-gray-900 text-gray-700 dark:text-gray-200">
              <tr>
                <th className="p-4 font-semibold">Srl No</th>
                <th className="p-4 font-semibold">Rider Name</th>
                <th className="p-4 font-semibold">Rider Email</th>
                <th className="p-4 font-semibold">Action</th>
              </tr>
            </thead>
            <tbody>
              {rider.map((item, i) => (
                <tr
                  key={i}
                  className="border-b border-gray-200 dark:border-gray-700 hover:bg-gradient-to-r hover:from-pink-50 hover:via-purple-50 hover:to-blue-50 dark:hover:from-gray-800 dark:hover:via-gray-800 dark:hover:to-gray-900 transition"
                >
                  <td className="p-4 font-medium text-gray-900 dark:text-gray-200">
                    {i + 1}
                  </td>
                  <td className="p-4">
                    <p className="font-semibold text-gray-900 dark:text-gray-200">
                      {item?.yourName}
                    </p>
                  </td>
                  <td className="p-4">
                    <p className="font-semibold text-gray-900 dark:text-gray-200">
                      {item?.yourEmail}
                    </p>
                  </td>
                  <td className="p-4">
                    <button
                      onClick={() => handelAssinRider(item)}
                      className="px-4 py-1.5 rounded-lg bg-gradient-to-r from-pink-500 via-purple-500 to-blue-400 text-white hover:opacity-90 flex items-center gap-2 font-medium shadow-md hover:shadow-lg hover:scale-105 transition-all duration-200"
                    >
                      Assign <MdCheckCircle size={16} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="modal-action">
            <form method="dialog">
              <button className="px-3 py-1 rounded-md bg-gradient-to-r from-pink-500 via-purple-500 to-blue-400 text-white hover:opacity-90 font-semibold shadow-md hover:shadow-lg hover:scale-105 transition-all duration-300">
                Close
              </button>
            </form>
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default AssinRider;
