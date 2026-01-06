import React from "react";
import { Wallet, Trophy, MapPin, CalendarClock } from "lucide-react";

const Item = ({ icon, title, desc }) => (
  <div className="group bg-white rounded-2xl border border-base-300 shadow p-6">
    {React.createElement(icon, { className: "w-10 h-10 text-secondary mb-3" })}
    <h3 className="text-lg font-semibold text-secondary">{title}</h3>
    <p className="text-mytext/80 font-medium mt-2">{desc}</p>
  </div>
);

const RiderBenefits = () => {
  return (
    <div>
      <h2 className="text-3xl font-bold text-secondary text-center">Rider Benefits</h2>
      <p className="text-mytext/80 font-medium text-center max-w-xl mx-auto mt-2">
        Earn more with flexible schedules and reliable payouts.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-8">
        <Item icon={Wallet} title="Weekly Payouts" desc="Fast and transparent payments." />
        <Item icon={Trophy} title="Bonuses" desc="Performance and referral incentives." />
        <Item icon={MapPin} title="Preferred Zones" desc="Choose areas you like to deliver." />
        <Item icon={CalendarClock} title="Flexible Hours" desc="Work when it suits you." />
      </div>
    </div>
  );
};

export default RiderBenefits;

