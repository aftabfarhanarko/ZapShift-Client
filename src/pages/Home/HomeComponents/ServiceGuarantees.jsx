import React from "react";
import { ShieldCheck, Timer, Eye } from "lucide-react";

const Guarantee = ({ icon, title, desc }) => (
  <div className="bg-white rounded-2xl border border-base-300 shadow p-6">
    {React.createElement(icon, { className: "w-10 h-10 text-secondary mb-3" })}
    <h3 className="text-lg font-semibold text-secondary">{title}</h3>
    <p className="text-mytext/80 font-medium mt-2">{desc}</p>
  </div>
);

const ServiceGuarantees = () => {
  return (
    <div>
      <h2 className="text-3xl font-bold text-secondary text-center">Service Guarantees</h2>
      <p className="text-mytext/80 font-medium text-center max-w-xl mx-auto mt-2">
        Commitments that make deliveries safe, on-time and transparent.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
        <Guarantee icon={Timer} title="On-time Delivery" desc="Reliable service windows for standard and express." />
        <Guarantee icon={ShieldCheck} title="Safe Handling" desc="Secure pickup, transport and drop-off." />
        <Guarantee icon={Eye} title="Full Transparency" desc="Real-time updates and clear statuses." />
      </div>
    </div>
  );
};

export default ServiceGuarantees;

