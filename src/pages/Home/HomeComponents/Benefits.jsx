import React from "react";
import { ShieldCheck, Truck, Clock, CreditCard, MapPinned } from "lucide-react";

const Item = ({ icon, title, desc }) => (
  <div className="group bg-white rounded-2xl border border-base-300 shadow p-6">
    {React.createElement(icon, {
      className: "w-10 h-10 text-secondary mb-3 group-hover:scale-105 transition",
    })}
    <h3 className="text-lg font-semibold text-secondary">{title}</h3>
    <p className="text-mytext/80 font-medium mt-2">{desc}</p>
  </div>
);

const Benefits = () => {
  return (
    <div>
      <h2 className="text-3xl font-bold text-secondary text-center">Why Choose ZapShift</h2>
      <p className="text-mytext/80 font-medium text-center max-w-xl mx-auto mt-2">
        Built for merchants and customers with performance, safety and convenience in mind.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-8">
        <Item icon={ShieldCheck} title="Safe & Secure" desc="Protected handling with verified riders and tracked delivery." />
        <Item icon={Truck} title="Nationwide Coverage" desc="Deliver to any district with reliable home delivery." />
        <Item icon={Clock} title="Fast Turnaround" desc="Express options available in major cities for speed." />
        <Item icon={CreditCard} title="Cash on Delivery" desc="Flexible payment options including COD for customers." />
        <Item icon={MapPinned} title="Live Tracking" desc="Know exactly where your parcel is at all times." />
      </div>
    </div>
  );
};

export default Benefits;
