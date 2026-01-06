import React from "react";
import { Link } from "react-router";

const Card = ({ name, price, features }) => (
  <div className="bg-white rounded-2xl border border-base-300 shadow p-6">
    <h3 className="text-xl font-bold text-secondary">{name}</h3>
    <p className="mt-2 text-3xl font-extrabold text-secondary">{price}</p>
    <ul className="mt-4 space-y-2 text-mytext/80 font-medium">
      {features.map((f, i) => (
        <li key={i} className="flex items-center gap-2">
          <span className="w-2 h-2 bg-primary rounded-full"></span>
          {f}
        </li>
      ))}
    </ul>
    <Link to="/price" className="inline-block mt-6">
      <button className="px-5 py-2 rounded-full font-semibold bg-primary text-secondary hover:brightness-105 transition hover:shadow">
        See Full Pricing
      </button>
    </Link>
  </div>
);

const PricingPreview = () => {
  return (
    <div>
      <h2 className="text-3xl font-bold text-secondary text-center">Popular Plans</h2>
      <p className="text-mytext/80 font-medium text-center max-w-xl mx-auto mt-2">
        Transparent rates for standard and express deliveries with COD support.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
        <Card
          name="Standard"
          price="৳ 99+"
          features={["48–72h delivery", "Nationwide coverage", "Live tracking"]}
        />
        <Card
          name="Express"
          price="৳ 199+"
          features={["Same-day in city", "Priority handling", "Real-time updates"]}
        />
      </div>
    </div>
  );
};

export default PricingPreview;

