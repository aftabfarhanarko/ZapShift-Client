import React from "react";
import { Phone, MessageSquare, Mail } from "lucide-react";

const Channel = ({ icon, title, desc }) => (
  <div className="bg-white rounded-2xl border border-base-300 shadow p-6">
    {React.createElement(icon, { className: "w-10 h-10 text-secondary mb-3" })}
    <h3 className="text-lg font-semibold text-secondary">{title}</h3>
    <p className="text-mytext/80 font-medium mt-2">{desc}</p>
  </div>
);

const SupportChannels = () => {
  return (
    <div>
      <h2 className="text-3xl font-bold text-secondary text-center">Support Channels</h2>
      <p className="text-mytext/80 font-medium text-center max-w-xl mx-auto mt-2">
        We’re here to help through multiple channels.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
        <Channel icon={Phone} title="Phone" desc="24/7 call center assistance." />
        <Channel icon={MessageSquare} title="Chat" desc="Quick help via live chat." />
        <Channel icon={Mail} title="Email" desc="Detailed support and follow-ups." />
      </div>
    </div>
  );
};

export default SupportChannels;

