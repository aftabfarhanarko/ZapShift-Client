import React from "react";
import { FileText, GlassWater, Boxes, Utensils } from "lucide-react";

const TypeCard = ({ icon, title, desc }) => (
  <div className="bg-white rounded-2xl border border-base-300 shadow p-6">
    {React.createElement(icon, { className: "w-10 h-10 text-secondary mb-3" })}
    <h3 className="text-lg font-semibold text-secondary">{title}</h3>
    <p className="text-mytext/80 font-medium mt-2">{desc}</p>
  </div>
);

const ParcelTypes = () => {
  return (
    <div>
      <h2 className="text-3xl font-bold text-secondary text-center">Parcel Types</h2>
      <p className="text-mytext/80 font-medium text-center max-w-xl mx-auto mt-2">
        Supported categories for safe and compliant delivery.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-8">
        <TypeCard icon={FileText} title="Documents" desc="Secure and time-sensitive papers." />
        <TypeCard icon={GlassWater} title="Fragile" desc="Careful handling for delicate items." />
        <TypeCard icon={Boxes} title="Bulk" desc="Large shipments and multiple packages." />
        <TypeCard icon={Utensils} title="Food" desc="Quick delivery for eatables." />
      </div>
    </div>
  );
};

export default ParcelTypes;

