import React from "react";
import { Link } from "react-router";
import { Map as MapIcon } from "lucide-react";

const CoverageTeaser = () => {
  return (
    <div className="border p-6 md:p-10 bg-white rounded-2xl border-base-300 shadow flex flex-col md:flex-row items-center gap-6">
      <div className="flex-1">
        <h2 className="text-2xl md:text-3xl font-bold text-secondary">We Deliver Everywhere</h2>
        <p className="text-mytext/80 font-medium mt-2">
          From Dhaka to district towns—ZapShift brings reliable home delivery to your customers.
        </p>
        <Link to="/mapcover" className="inline-block mt-5">
          <button className="px-5 py-2 rounded-full font-semibold bg-primary text-secondary hover:brightness-105 transition hover:shadow">
            See Coverage Map
          </button>
        </Link>
      </div>
      <div className="flex items-center justify-center w-24 h-24 rounded-2xl bg-secondary/10 border border-base-300">
        <MapIcon className="w-12 h-12 text-secondary" />
      </div>
    </div>
  );
};

export default CoverageTeaser;

