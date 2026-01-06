import React from "react";
import CountUp from "react-countup";

const Stat = ({ value, suffix, label }) => (
  <div className="bg-white rounded-2xl border border-base-300 shadow p-6 text-center">
    <h3 className="text-4xl font-bold text-secondary">
      <CountUp end={value} duration={2} separator="," />{suffix}
    </h3>
    <p className="mt-2 text-mytext font-medium">{label}</p>
  </div>
);

const Stats = () => {
  return (
    <div className="max-w-6xl mx-auto">
      <h2 className="text-3xl font-bold text-secondary text-center">ZapShift in Numbers</h2>
      <p className="text-mytext/80 font-medium text-center max-w-xl mx-auto mt-2">
        Fast, safe and reliable delivery across Bangladesh for customers and merchants.
      </p>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
        <Stat value={120} suffix="+" label="Districts Covered" />
        <Stat value={50000} suffix="+" label="Parcels Delivered" />
        <Stat value={3500} suffix="+" label="Active Riders" />
        <Stat value={4.8} suffix="/5" label="Customer Rating" />
      </div>
    </div>
  );
};

export default Stats;

