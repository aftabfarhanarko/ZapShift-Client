import React from "react";
import { Smartphone, Apple } from "lucide-react";

const AppDownload = () => {
  return (
    <div className="border p-6 md:p-10 bg-white rounded-2xl border-base-300 shadow flex flex-col md:flex-row items-center gap-6">
      <div className="flex-1">
        <h2 className="text-3xl font-bold text-secondary">Get the ZapShift App</h2>
        <p className="text-mytext/80 font-medium mt-2">
          Track parcels, manage orders and receive updates instantly on mobile.
        </p>
        <div className="flex gap-3 mt-5">
          <button className="px-5 py-2 rounded-full font-semibold bg-primary text-secondary hover:brightness-105 transition hover:shadow flex items-center gap-2">
            <Smartphone className="w-5 h-5" />
            Android
          </button>
          <button className="px-5 py-2 rounded-full font-semibold bg-white border border-base-300 text-secondary hover:bg-base-100 transition flex items-center gap-2">
            <Apple className="w-5 h-5" />
            iOS
          </button>
        </div>
      </div>
      <div className="flex items-center justify-center w-24 h-24 rounded-2xl bg-secondary/10 border border-base-300">
        <Smartphone className="w-12 h-12 text-secondary" />
      </div>
    </div>
  );
};

export default AppDownload;

