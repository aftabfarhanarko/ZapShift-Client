import React, { useRef, useState } from "react";
import { MapContainer, Marker, Popup, TileLayer, Circle, Polyline } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import {
  IoIosSearch,
  IoMdPin,
  IoMdStats,
  IoMdCheckmarkCircle,
  IoMdClose,
  IoMdLocate,
  IoMdLayers,
  IoMdNavigate,
} from "react-icons/io";
import { FaTruck, FaWarehouse, FaMapMarkedAlt, FaRoute, FaBox } from "react-icons/fa";

// Mock warehouse data for Bangladesh
const warehousesData = [
  {
    district: "Dhaka",
    latitude: 23.8103,
    longitude: 90.4125,
    status: true,
    covered_area: ["Gulshan", "Banani", "Dhanmondi", "Mirpur", "Uttara"],
    total_deliveries: 15420,
    active_vehicles: 45
  },
  {
    district: "Chittagong",
    latitude: 22.3569,
    longitude: 91.7832,
    status: true,
    covered_area: ["Agrabad", "Khulshi", "Panchlaish", "Halishahar"],
    total_deliveries: 8920,
    active_vehicles: 28
  },
  {
    district: "Sylhet",
    latitude: 24.8949,
    longitude: 91.8687,
    status: true,
    covered_area: ["Zindabazar", "Amberkhana", "Upashahar", "South Surma"],
    total_deliveries: 4560,
    active_vehicles: 18
  },
  {
    district: "Rajshahi",
    latitude: 24.3745,
    longitude: 88.6042,
    status: true,
    covered_area: ["Boalia", "Matihar", "Shah Makhdum", "Rajpara"],
    total_deliveries: 3780,
    active_vehicles: 15
  },
  {
    district: "Khulna",
    latitude: 22.8456,
    longitude: 89.5403,
    status: true,
    covered_area: ["Khulna Sadar", "Sonadanga", "Daulatpur", "Khalishpur"],
    total_deliveries: 5240,
    active_vehicles: 22
  },
  {
    district: "Rangpur",
    latitude: 25.7439,
    longitude: 89.2752,
    status: true,
    covered_area: ["Rangpur Sadar", "Mithapukur", "Pirganj", "Badarganj"],
    total_deliveries: 2890,
    active_vehicles: 12
  },
  {
    district: "Mymensingh",
    latitude: 24.7471,
    longitude: 90.4203,
    status: true,
    covered_area: ["Mymensingh Sadar", "Muktagacha", "Bhaluka", "Trishal"],
    total_deliveries: 3420,
    active_vehicles: 14
  },
  {
    district: "Barisal",
    latitude: 22.7010,
    longitude: 90.3535,
    status: false,
    covered_area: ["Barisal Sadar", "Bakerganj", "Mehendiganj", "Wazirpur"],
    total_deliveries: 1950,
    active_vehicles: 0
  },
  {
    district: "Comilla",
    latitude: 23.4607,
    longitude: 91.1809,
    status: true,
    covered_area: ["Comilla Sadar", "Daudkandi", "Burichang", "Chandina"],
    total_deliveries: 4120,
    active_vehicles: 16
  },
  {
    district: "Narayanganj",
    latitude: 23.6238,
    longitude: 90.5000,
    status: true,
    covered_area: ["Narayanganj Sadar", "Rupganj", "Sonargaon", "Bandar"],
    total_deliveries: 6780,
    active_vehicles: 25
  },
  {
    district: "Gazipur",
    latitude: 24.0022,
    longitude: 90.4264,
    status: true,
    covered_area: ["Gazipur Sadar", "Kaliakair", "Kapasia", "Sreepur"],
    total_deliveries: 5890,
    active_vehicles: 21
  },
  {
    district: "Jessore",
    latitude: 23.1667,
    longitude: 89.2167,
    status: true,
    covered_area: ["Jessore Sadar", "Jhikargachha", "Sharsha", "Manirampur"],
    total_deliveries: 3340,
    active_vehicles: 13
  },
  {
    district: "Bogra",
    latitude: 24.8465,
    longitude: 89.3770,
    status: false,
    covered_area: ["Bogra Sadar", "Sherpur", "Sonatola", "Shibganj"],
    total_deliveries: 2780,
    active_vehicles: 0
  },
  {
    district: "Dinajpur",
    latitude: 25.6217,
    longitude: 88.6354,
    status: true,
    covered_area: ["Dinajpur Sadar", "Birampur", "Parbatipur", "Chirirbandar"],
    total_deliveries: 2560,
    active_vehicles: 10
  },
  {
    district: "Cox's Bazar",
    latitude: 21.4272,
    longitude: 92.0058,
    status: true,
    covered_area: ["Cox's Bazar Sadar", "Ramu", "Teknaf", "Ukhia"],
    total_deliveries: 3920,
    active_vehicles: 15
  }
];

// Custom marker icons
const createCustomIcon = (color, isActive) => {
  return L.divIcon({
    className: 'custom-marker',
    html: `
      <div style="position: relative;">
        <div style="
          background: ${color};
          width: 32px;
          height: 32px;
          border-radius: 50% 50% 50% 0;
          transform: rotate(-45deg);
          border: 3px solid white;
          box-shadow: 0 3px 10px rgba(0,0,0,0.3);
        "></div>
        <div style="
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%) rotate(45deg);
          color: white;
          font-size: 16px;
          font-weight: bold;
        ">📦</div>
        ${isActive ? `<div style="
          position: absolute;
          top: -5px;
          right: -5px;
          width: 12px;
          height: 12px;
          background: #10b981;
          border: 2px solid white;
          border-radius: 50%;
          animation: pulse 2s infinite;
        "></div>` : ''}
      </div>
    `,
    iconSize: [32, 32],
    iconAnchor: [16, 32],
    popupAnchor: [0, -32]
  });
};

const CoverageMap = () => {
  const position = [23.685, 90.3563];
  const mapRef = useRef(null);
  const [selectedDistrict, setSelectedDistrict] = useState(null);
  const [viewMode, setViewMode] = useState("all");
  const [showCoverage, setShowCoverage] = useState(true);
  const [showRoutes, setShowRoutes] = useState(false);
  const [mapStyle, setMapStyle] = useState("default");
  const [showSidebar, setShowSidebar] = useState(true);

  const warehouses = warehousesData;

  const filteredWarehouses = warehouses?.filter((w) => {
    if (viewMode === "active") return w.status;
    if (viewMode === "inactive") return !w.status;
    return true;
  });

  const activeCount = warehouses?.filter((w) => w.status).length || 0;
  const totalAreas = warehouses?.reduce((acc, w) => acc + (w.covered_area?.length || 0), 0) || 0;
  const totalDeliveries = warehouses?.reduce((acc, w) => acc + w.total_deliveries, 0) || 0;
  const totalVehicles = warehouses?.reduce((acc, w) => acc + w.active_vehicles, 0) || 0;

  // Generate random routes between warehouses
  const generateRoutes = () => {
    const routes = [];
    for (let i = 0; i < filteredWarehouses.length - 1; i++) {
      if (filteredWarehouses[i].status && filteredWarehouses[i + 1].status) {
        routes.push([
          [filteredWarehouses[i].latitude, filteredWarehouses[i].longitude],
          [filteredWarehouses[i + 1].latitude, filteredWarehouses[i + 1].longitude]
        ]);
      }
    }
    return routes;
  };

  const handleLocateMe = () => {
    if (mapRef.current) {
      mapRef.current.flyTo(position, 7, { duration: 1.5 });
    }
  };

  const getTileLayer = () => {
    switch (mapStyle) {
      case "satellite":
        return "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}";
      case "terrain":
        return "https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png";
      case "dark":
        return "https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png";
      default:
        return "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50">
      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }
      `}</style>

      {/* Header Section */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-12 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <FaMapMarkedAlt className="text-5xl" />
              <div>
                <h1 className="text-5xl font-bold">Coverage Map</h1>
                <p className="text-blue-100 mt-2">Live Delivery Network Tracking</p>
              </div>
            </div>
            <button
              onClick={() => setShowSidebar(!showSidebar)}
              className="lg:hidden bg-white/20 p-3 rounded-lg hover:bg-white/30 transition-colors"
            >
              {showSidebar ? <IoMdClose className="text-2xl" /> : <IoMdLayers className="text-2xl" />}
            </button>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
              <div className="flex items-center gap-3">
                <FaWarehouse className="text-3xl" />
                <div>
                  <p className="text-blue-100 text-xs">Total Hubs</p>
                  <p className="text-2xl font-bold">{warehouses?.length}</p>
                </div>
              </div>
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
              <div className="flex items-center gap-3">
                <IoMdCheckmarkCircle className="text-3xl text-green-300" />
                <div>
                  <p className="text-blue-100 text-xs">Active Hubs</p>
                  <p className="text-2xl font-bold">{activeCount}</p>
                </div>
              </div>
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
              <div className="flex items-center gap-3">
                <FaBox className="text-3xl text-yellow-300" />
                <div>
                  <p className="text-blue-100 text-xs">Deliveries</p>
                  <p className="text-2xl font-bold">{totalDeliveries.toLocaleString()}</p>
                </div>
              </div>
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
              <div className="flex items-center gap-3">
                <FaTruck className="text-3xl text-orange-300" />
                <div>
                  <p className="text-blue-100 text-xs">Active Vehicles</p>
                  <p className="text-2xl font-bold">{totalVehicles}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="flex gap-4">
          {/* Sidebar Controls */}
          <div className={`${showSidebar ? 'block' : 'hidden'} lg:block w-full lg:w-80 space-y-4`}>
            {/* Search Box */}
            <div className="bg-white rounded-2xl shadow-lg p-4">
              <h3 className="font-bold text-gray-800 mb-3 flex items-center gap-2">
                <IoIosSearch className="text-xl" />
                Search District
              </h3>
              <div className="relative">
                <input
                  type="text"
                  id="searchInput"
                  placeholder="Enter district name..."
                  className="w-full px-4 py-2 pl-10 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none"
                  onKeyPress={(e) => {
                    if (e.key === "Enter") {
                      const location = e.target.value;
                      const district = warehouses?.find((d) =>
                        d.district.toLowerCase().includes(location.toLowerCase())
                      );
                      if (district) {
                        setSelectedDistrict(district);
                        if (mapRef.current) {
                          mapRef.current.flyTo([district.latitude, district.longitude], 12, { duration: 1.5 });
                        }
                      }
                    }
                  }}
                />
                <IoIosSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              </div>
            </div>

            {/* Filter Controls */}
            <div className="bg-white rounded-2xl shadow-lg p-4">
              <h3 className="font-bold text-gray-800 mb-3">Filter Hubs</h3>
              <div className="grid grid-cols-3 gap-2">
                <button
                  onClick={() => setViewMode("all")}
                  className={`px-3 py-2 rounded-lg text-sm font-semibold transition-colors ${
                    viewMode === "all" ? "bg-blue-600 text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  All
                </button>
                <button
                  onClick={() => setViewMode("active")}
                  className={`px-3 py-2 rounded-lg text-sm font-semibold transition-colors ${
                    viewMode === "active" ? "bg-green-600 text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  Active
                </button>
                <button
                  onClick={() => setViewMode("inactive")}
                  className={`px-3 py-2 rounded-lg text-sm font-semibold transition-colors ${
                    viewMode === "inactive" ? "bg-red-600 text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  Inactive
                </button>
              </div>
            </div>

            {/* Map Style */}
            <div className="bg-white rounded-2xl shadow-lg p-4">
              <h3 className="font-bold text-gray-800 mb-3 flex items-center gap-2">
                <IoMdLayers />
                Map Style
              </h3>
              <div className="grid grid-cols-2 gap-2">
                {["default", "satellite", "terrain", "dark"].map((style) => (
                  <button
                    key={style}
                    onClick={() => setMapStyle(style)}
                    className={`px-3 py-2 rounded-lg text-sm font-semibold capitalize transition-colors ${
                      mapStyle === style ? "bg-indigo-600 text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                  >
                    {style}
                  </button>
                ))}
              </div>
            </div>

            {/* View Options */}
            <div className="bg-white rounded-2xl shadow-lg p-4 space-y-3">
              <h3 className="font-bold text-gray-800 mb-3">View Options</h3>
              
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={showCoverage}
                  onChange={(e) => setShowCoverage(e.target.checked)}
                  className="w-4 h-4 text-blue-600 rounded"
                />
                <span className="text-sm font-medium text-gray-700">Coverage Radius</span>
              </label>

              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={showRoutes}
                  onChange={(e) => setShowRoutes(e.target.checked)}
                  className="w-4 h-4 text-blue-600 rounded"
                />
                <span className="text-sm font-medium text-gray-700">Delivery Routes</span>
              </label>

              <button
                onClick={handleLocateMe}
                className="w-full flex items-center justify-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors font-semibold text-sm"
              >
                <IoMdLocate className="text-lg" />
                Reset View
              </button>
            </div>

            {/* Hub Details */}
            {selectedDistrict && (
              <div className="bg-white rounded-2xl shadow-lg p-4">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-bold text-gray-800 flex items-center gap-2">
                    <IoMdStats className="text-blue-600" />
                    Hub Details
                  </h3>
                  <button
                    onClick={() => setSelectedDistrict(null)}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    <IoMdClose className="text-xl" />
                  </button>
                </div>

                <div className="space-y-3">
                  <div>
                    <p className="text-xs text-gray-500">District</p>
                    <p className="text-lg font-bold text-gray-800">{selectedDistrict.district}</p>
                  </div>

                  <div>
                    <p className="text-xs text-gray-500">Status</p>
                    <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-semibold ${
                      selectedDistrict.status ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
                    }`}>
                      {selectedDistrict.status ? "● Active" : "● Inactive"}
                    </span>
                  </div>

                  <div>
                    <p className="text-xs text-gray-500">Total Deliveries</p>
                    <p className="text-lg font-bold text-gray-800">{selectedDistrict.total_deliveries.toLocaleString()}</p>
                  </div>

                  <div>
                    <p className="text-xs text-gray-500">Active Vehicles</p>
                    <p className="text-lg font-bold text-gray-800">{selectedDistrict.active_vehicles}</p>
                  </div>

                  <div>
                    <p className="text-xs text-gray-500 mb-2">Coverage Areas</p>
                    <div className="flex flex-wrap gap-1">
                      {selectedDistrict.covered_area?.map((area, i) => (
                        <span key={i} className="bg-blue-50 text-blue-700 px-2 py-1 rounded-full text-xs font-medium">
                          {area}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Map Container */}
          <div className="flex-1">
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden" style={{ height: "700px" }}>
              <MapContainer
                center={position}
                zoom={7}
                ref={mapRef}
                style={{ height: "100%", width: "100%" }}
              >
                <TileLayer url={getTileLayer()} />
                
                {/* Delivery Routes */}
                {showRoutes && generateRoutes().map((route, idx) => (
                  <Polyline
                    key={idx}
                    positions={route}
                    color="#3b82f6"
                    weight={2}
                    opacity={0.6}
                    dashArray="10, 10"
                  />
                ))}

                {/* Warehouse Markers */}
                {filteredWarehouses?.map((center, index) => (
                  <React.Fragment key={index}>
                    <Marker
                      position={[center.latitude, center.longitude]}
                      icon={createCustomIcon(center.status ? "#3b82f6" : "#ef4444", center.status)}
                      eventHandlers={{
                        click: () => setSelectedDistrict(center),
                      }}
                    >
                      <Popup>
                        <div className="p-2 min-w-[220px]">
                          <h3 className="text-base font-bold text-gray-800 mb-2 flex items-center gap-2">
                            <IoMdPin className="text-blue-600" />
                            {center.district}
                          </h3>
                          <div className="space-y-2 text-sm">
                            <div className="flex justify-between">
                              <span className="text-gray-600">Deliveries:</span>
                              <span className="font-semibold">{center.total_deliveries.toLocaleString()}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-600">Vehicles:</span>
                              <span className="font-semibold">{center.active_vehicles}</span>
                            </div>
                            <div className={`flex items-center gap-2 font-semibold ${
                              center.status ? "text-green-600" : "text-red-600"
                            }`}>
                              {center.status ? "● Active Hub" : "● Inactive"}
                            </div>
                          </div>
                        </div>
                      </Popup>
                    </Marker>
                    
                    {/* Coverage Circle */}
                    {showCoverage && (
                      <Circle
                        center={[center.latitude, center.longitude]}
                        radius={20000}
                        pathOptions={{
                          color: center.status ? "#22c55e" : "#ef4444",
                          fillColor: center.status ? "#22c55e" : "#ef4444",
                          fillOpacity: 0.08,
                          weight: 2,
                          opacity: 0.5
                        }}
                      />
                    )}
                  </React.Fragment>
                ))}
              </MapContainer>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CoverageMap;