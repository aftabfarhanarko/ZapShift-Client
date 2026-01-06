import React from "react";
import { Link } from "react-router";
import { Send, Search, UserPlus } from "lucide-react";

const ActionCard = ({ icon, title, desc, to, href }) => {
  const content = (
    <div className="bg-white rounded-2xl border border-base-300 shadow p-6 h-full">
      {React.createElement(icon, { className: "w-10 h-10 text-secondary mb-3" })}
      <h3 className="text-lg font-semibold text-secondary">{title}</h3>
      <p className="text-mytext/80 font-medium mt-2">{desc}</p>
    </div>
  );
  if (to) {
    return (
      <Link to={to} className="block">
        {content}
      </Link>
    );
  }
  return (
    <a href={href} className="block">
      {content}
    </a>
  );
};

const QuickActions = () => {
  return (
    <div>
      <h2 className="text-3xl font-bold text-secondary text-center">Quick Actions</h2>
      <p className="text-mytext/80 font-medium text-center max-w-xl mx-auto mt-2">
        The most used actions for customers and merchants.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
        <ActionCard
          icon={Send}
          title="Send Parcel"
          desc="Create shipment in minutes."
          to="/send_parcel"
        />
        <ActionCard
          icon={Search}
          title="Track Parcel"
          desc="Find parcel status instantly."
          href="#track"
        />
        <ActionCard
          icon={UserPlus}
          title="Apply Rider"
          desc="Join as delivery rider."
          to="/raider"
        />
      </div>
    </div>
  );
};

export default QuickActions;

