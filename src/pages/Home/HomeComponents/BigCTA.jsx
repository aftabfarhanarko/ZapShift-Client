import React from "react";
import { Link } from "react-router";

const BigCTA = () => {
  return (
    <div className="border relative p-8 md:p-12 rounded-2xl bg-gradient-to-r from-secondary to-[#08565f] text-white overflow-hidden">
      <div className="relative z-10">
        <h2 className="text-3xl font-bold">Ready to send your parcel?</h2>
        <p className="mt-2 max-w-xl text-white/80 font-medium">
          Create a shipment in minutes and enjoy live tracking, safe handling and fast delivery.
        </p>
        <div className="flex gap-3 mt-6">
          <Link to="/send_parcel">
            <button className="px-5 py-2 rounded-full font-semibold bg-primary text-secondary hover:brightness-105 transition hover:shadow">
              Send Parcel
            </button>
          </Link>
          <Link to="/raider">
            <button className="px-5 py-2 rounded-full font-semibold bg-white/10 border border-white/30 text-white hover:bg-white/20 transition">
              Apply as Rider
            </button>
          </Link>
        </div>
      </div>
      <div className="absolute -top-10 -right-10 w-48 h-48 rounded-full bg-white/10 blur-2xl"></div>
    </div>
  );
};

export default BigCTA;

