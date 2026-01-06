import React, { useState } from "react";
import { useNavigate } from "react-router";
import { Search } from "lucide-react";

const TrackSearch = () => {
  const [id, setId] = useState("");
  const navigate = useNavigate();
  const onSubmit = (e) => {
    e.preventDefault();
    if (id?.trim()) {
      navigate(`/track-parcel/${id.trim()}`);
    }
  };
  return (
    <div id="track" className="border p-6 md:p-10 bg-white rounded-2xl border-base-300 shadow">
      <h2 className="text-3xl font-bold text-secondary text-center">Track Your Parcel</h2>
      <p className="text-mytext/80 font-medium text-center max-w-xl mx-auto mt-2">
        Enter your tracking ID to view real‑time status updates.
      </p>
      <form onSubmit={onSubmit} className="mt-6 flex flex-col md:flex-row gap-3 items-center justify-center">
        <input
          value={id}
          onChange={(e) => setId(e.target.value)}
          placeholder="Enter tracking ID"
          className="w-full md:w-2/3 px-4 py-3 rounded-xl border border-base-300 focus:outline-none focus:ring-2 focus:ring-primary"
        />
        <button
          type="submit"
          className="px-5 py-3 rounded-xl font-semibold bg-primary text-secondary hover:brightness-105 transition flex items-center gap-2"
        >
          <Search className="w-5 h-5" />
          Track
        </button>
      </form>
    </div>
  );
};

export default TrackSearch;

