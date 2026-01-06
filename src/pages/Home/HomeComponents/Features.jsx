import React from "react";
import { MapPin, CreditCard, Timer, Globe2, ShieldCheck, Headphones } from "lucide-react";

const Feature = ({ icon, title, desc }) => (
  <div className="group bg-white rounded-2xl border border-base-300 shadow p-6">
    {React.createElement(icon, {
      className: "w-10 h-10 text-secondary mb-3 group-hover:scale-105 transition",
    })}
    <h3 className="text-lg font-semibold text-secondary">{title}</h3>
    <p className="text-mytext/80 font-medium mt-2">{desc}</p>
  </div>
);

const Features = () => {
  return (
    <div>
      <h2 className="text-3xl font-bold text-secondary text-center">Features</h2>
      <p className="text-mytext/80 font-medium text-center max-w-xl mx-auto mt-2">
        Powerful delivery features that help you ship faster and smarter.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-8">
        <Feature icon={MapPin} title="Live Tracking" desc="Track parcels in real time from pickup to delivery." />
        <Feature icon={CreditCard} title="Cash on Delivery" desc="Flexible payment with secure COD options." />
        <Feature icon={Timer} title="Express Delivery" desc="Same-day delivery available in major cities." />
        <Feature icon={Globe2} title="Nationwide Coverage" desc="Deliver anywhere across Bangladesh reliably." />
        <Feature icon={ShieldCheck} title="Secure Handling" desc="Verified riders and protected package handling." />
        <Feature icon={Headphones} title="24/7 Support" desc="Get help anytime with dedicated support." />
      </div>
    </div>
  );
};

export default Features;

