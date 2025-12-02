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

const AdminDashBord = () => {
  const axiosSecoir = useAxiosSecoir();
  const { data: pipeline, isLoading } = useQuery({
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

  return (
    <div className="p-6">
      <div className="bg-white dark:bg-gray-900 rounded-3xl p-8 mb-6 shadow-sm border border-gray-100 dark:border-gray-800">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-secondary dark:text-white tracking-tight">
            Admin Dashboard
          </h1>
          <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">
            You can access all your data and information from anywhere.
          </p>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {isLoading
            ? Array.from({ length: 6 }).map((_, i) => <SkeletonCard key={i} />)
            : pipeline?.map((item, i) => (
                <AnimatedCard key={i} item={item} iconMap={iconMap} />
              ))}
        </div>
      </div>

    
    </div>
  );
};

// Animated Card with Gradient Border + Hover Glow + Animated Count
const AnimatedCard = ({ item, iconMap }) => {
  const [count, setCount] = useState(0);

  // Animated count
  useEffect(() => {
    let start = 0;
    const end = item.count;
    if (!end) return;
    const duration = 800;
    const incrementTime = Math.floor(duration / end);
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
      {/* Strong Gradient Border */}
      <div className="rounded-3xl p-[3px] bg-gradient-to-r from-pink-400 via-purple-500 to-blue-400">
        <div
          className="
            relative
            bg-white dark:bg-gray-900 
            rounded-3xl 
            p-6 
            flex flex-col items-center justify-center 
            shadow-md 
            hover:shadow-2xl 
            hover:-translate-y-1 
            transform 
            transition-all duration-300
          "
        >
          {/* Hover Glow */}
          <span className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-30 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 blur-2xl transition-opacity duration-300"></span>

          {/* Icon */}
          <div className="mb-4 w-14 h-14 flex items-center justify-center rounded-2xl bg-gradient-to-tr from-secondary/10 to-secondary/5 shadow-inner group-hover:scale-110 transition-all z-10">
            {iconMap[item._id] || (
              <ClipboardPlus
                className="text-red-400 group-hover:animate-pulse"
                size={28}
              />
            )}
          </div>

          {/* Title */}
          <p className="text-secondary dark:text-white font-semibold text-md tracking-wide mb-1 z-10">
            {item?._id === null
              ? "Parcel Create"
              : item?._id
                  .replace(/-/g, " ")
                  .replace(/\b\w/g, (l) => l.toUpperCase())}
          </p>

          {/* Count */}
          <p className="text-3xl font-extrabold text-gray-900 dark:text-white group-hover:text-secondary transition z-10">
            {count}
          </p>
        </div>
      </div>
    </div>
  );
};

// Skeleton Loader Card
const SkeletonCard = () => {
  return (
    <div className="relative rounded-3xl p-[3px] bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 animate-pulse">
      <div className="bg-white dark:bg-gray-800 rounded-3xl p-6 flex flex-col items-center justify-center shadow-md">
        <div className="mb-4 w-14 h-14 rounded-2xl bg-gray-200 dark:bg-gray-700"></div>
        <div className="h-5 w-20 bg-gray-200 dark:bg-gray-700 rounded mb-2"></div>
        <div className="h-8 w-14 bg-gray-200 dark:bg-gray-700 rounded"></div>
      </div>
    </div>
  );
};

export default AdminDashBord;
