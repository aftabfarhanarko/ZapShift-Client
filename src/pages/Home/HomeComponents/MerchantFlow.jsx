import React from "react";
import { UserPlus, PackagePlus, Bike, CheckCircle } from "lucide-react";

const Step = ({ icon, title, desc }) => (
  <div className="bg-white rounded-2xl border border-base-300 shadow p-6 text-center">
    {React.createElement(icon, { className: "w-10 h-10 text-secondary mx-auto mb-3" })}
    <h3 className="text-lg font-semibold text-secondary">{title}</h3>
    <p className="text-mytext/80 font-medium mt-2">{desc}</p>
  </div>
);

const MerchantFlow = () => {
  return (
    <div>
      <h2 className="text-3xl font-bold text-secondary text-center">Merchant Flow</h2>
      <p className="text-mytext/80 font-medium text-center max-w-xl mx-auto mt-2">
        Simple steps to start shipping with ZapShift as a merchant.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-8">
        <Step icon={UserPlus} title="Register" desc="Create merchant account and verify details." />
        <Step icon={PackagePlus} title="Create Order" desc="Add parcel info and pickup address." />
        <Step icon={Bike} title="Pickup" desc="Rider collects your parcel safely." />
        <Step icon={CheckCircle} title="Delivered" desc="Customer receives on time with updates." />
      </div>
    </div>
  );
};

export default MerchantFlow;

