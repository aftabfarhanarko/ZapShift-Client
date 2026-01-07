import React, { useRef, useState, useEffect } from "react";
import { MapContainer, Marker, Popup, TileLayer, Circle, Polyline, Tooltip } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { Search, MapPin, Activity, CheckCircle, X, Navigation, Layers, Truck, Package, TrendingUp, Filter, RefreshCw, Download, Bell, Settings, ChevronLeft, ChevronRight, Clock, BarChart3, Star } from "lucide-react";

// Enhanced warehouse data for Bangladesh
// Data is now fetched from warehouses.json

// Custom marker icons
const createCustomIcon = (color, isActive) => {
  return L.divIcon({
    className: 'custom-marker',
    html: `
      <div style="position: relative;">
        <div style="
          background: ${isActive ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' : 'linear-gradient(135deg, #6b7280 0%, #4b5563 100%)'};
          width: 40px;
          height: 40px;
          border-radius: 50% 50% 50% 0;
          transform: rotate(-45deg);
          border: 3px solid white;
          box-shadow: 0 4px 12px rgba(0,0,0,0.3);
          display: flex;
          align-items: center;
          justify-content: center;
        ">
          <div style="transform: rotate(45deg); font-size: 18px;">
            ${isActive ? '📦' : '⚠️'}
          </div>
        </div>
        ${isActive ? `
          <div style="
            position: absolute;
            top: -8px;
            right: -8px;
            width: 16px;
            height: 16px;
            background: #10b981;
            border-radius: 50%;
            border: 2px solid white;
            animation: pulse 2s infinite;
          "></div>
        ` : ''}
      </div>
    `,
    iconSize: [40, 40],
    iconAnchor: [20, 40],
    popupAnchor: [0, -40]
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
  const [searchTerm, setSearchTerm] = useState("");
  const [notifications, setNotifications] = useState(3);
  const [animateStats, setAnimateStats] = useState(false);
  const [liveUpdate, setLiveUpdate] = useState(true);
  const [warehouses, setWarehouses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/warehouses.json")
      .then((res) => res.json())
      .then((data) => {
        const enhancedData = data.map((item, index) => ({
          ...item,
          id: index + 1,
          status: item.status === "active",
          total_deliveries: Math.floor(Math.random() * 5000) + 1000,
          active_vehicles: Math.floor(Math.random() * 30) + 5,
          pending_orders: Math.floor(Math.random() * 100) + 10,
          completed_today: Math.floor(Math.random() * 50) + 20,
          average_delivery_time: `${Math.floor(Math.random() * 30) + 30} min`,
          rating: (Math.random() * (5 - 4) + 4).toFixed(1),
          manager: `Manager ${index + 1}`
        }));
        setWarehouses(enhancedData);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching warehouse data:", err);
        setLoading(false);
      });
  }, []);

  const filteredWarehouses = warehouses?.filter((w) => {
    const matchesSearch = w.district.toLowerCase().includes(searchTerm.toLowerCase());
    if (viewMode === "active") return w.status && matchesSearch;
    if (viewMode === "inactive") return !w.status && matchesSearch;
    return matchesSearch;
  });

  const activeCount = warehouses?.filter((w) => w.status).length || 0;
  const totalDeliveries = warehouses?.reduce((acc, w) => acc + w.total_deliveries, 0) || 0;
  const totalVehicles = warehouses?.reduce((acc, w) => acc + w.active_vehicles, 0) || 0;
  const pendingOrders = warehouses?.reduce((acc, w) => acc + w.pending_orders, 0) || 0;
  const completedToday = warehouses?.reduce((acc, w) => acc + w.completed_today, 0) || 0;

  useEffect(() => {
    setAnimateStats(true);
    const timer = setTimeout(() => setAnimateStats(false), 1000);
    return () => clearTimeout(timer);
  }, [viewMode]);

  useEffect(() => {
    if (liveUpdate) {
      const interval = setInterval(() => {
        setNotifications(prev => (prev + 1) % 10);
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [liveUpdate]);

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
      setSelectedDistrict(null);
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

  const exportData = () => {
    const data = JSON.stringify(filteredWarehouses, null, 2);
    const blob = new Blob([data], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'warehouse-data.json';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="h-screen w-full bg-gradient-to-br from-slate-50 to-slate-100 flex flex-col overflow-hidden relative">
      {loading && (
        <div className="absolute inset-0 z-50 flex items-center justify-center bg-white/80 backdrop-blur-sm">
          <div className="flex flex-col items-center gap-4">
            <div className="w-12 h-12 border-4 border-purple-600 border-t-transparent rounded-full animate-spin"></div>
            <p className="text-lg font-semibold text-purple-600 animate-pulse">Loading Warehouse Data...</p>
          </div>
        </div>
      )}
      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.5; transform: scale(1.1); }
        }
        @keyframes slideIn {
          from { transform: translateY(-20px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        .animate-slide-in {
          animation: slideIn 0.5s ease-out;
        }
        .animate-fade-in {
          animation: fadeIn 0.3s ease-out;
        }
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: #f1f5f9;
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #cbd5e1;
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #94a3b8;
        }
        .glass-effect {
          background: rgba(255, 255, 255, 0.9);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.2);
        }
        .leaflet-container {
          font-family: inherit;
        }
      `}</style>

      {/* Header Section */}
      <div className="glass-effect shadow-lg p-4 z-10">
        <div className="max-w-7xl mx-auto flex items-center justify-between flex-wrap gap-4">
          <div className="flex items-center gap-4">
            <div className="bg-gradient-to-r from-purple-600 to-indigo-600 p-3 rounded-xl shadow-lg">
              <Package className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
                Smart Delivery Hub
              </h1>
              <p className="text-sm text-slate-600 flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                Real-time Network Monitoring
              </p>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <button
              onClick={() => setLiveUpdate(!liveUpdate)}
              className={`p-2 rounded-lg transition-all ${liveUpdate ? 'bg-green-100 text-green-600' : 'bg-gray-100 text-gray-600'}`}
              title="Toggle Live Updates"
            >
              <Activity className="w-5 h-5" />
            </button>
            <button
              onClick={exportData}
              className="p-2 bg-purple-100 text-purple-600 rounded-lg hover:bg-purple-200 transition-colors"
              title="Export Data"
            >
              <Download className="w-5 h-5" />
            </button>
            <button className="relative p-2 bg-orange-100 text-orange-600 rounded-lg hover:bg-orange-200 transition-colors">
              <Bell className="w-5 h-5" />
              {notifications > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center font-bold">
                  {notifications}
                </span>
              )}
            </button>
            <button
              onClick={() => setShowSidebar(!showSidebar)}
              className="p-2 bg-slate-200 rounded-lg hover:bg-slate-300 transition-colors"
            >
              {showSidebar ? <ChevronLeft className="w-5 h-5" /> : <ChevronRight className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Enhanced Stats Cards */}
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 mt-4">
          {[
            { icon: Package, label: "Total Hubs", value: warehouses?.length, color: "from-blue-500 to-cyan-500" },
            { icon: CheckCircle, label: "Active", value: activeCount, color: "from-green-500 to-emerald-500" },
            { icon: Truck, label: "Vehicles", value: totalVehicles, color: "from-purple-500 to-pink-500" },
            { icon: TrendingUp, label: "Deliveries", value: totalDeliveries.toLocaleString(), color: "from-orange-500 to-red-500" },
            { icon: Clock, label: "Pending", value: pendingOrders, color: "from-yellow-500 to-amber-500" },
            { icon: CheckCircle, label: "Today", value: completedToday, color: "from-teal-500 to-cyan-500" },
          ].map((stat, idx) => (
            <div
              key={idx}
              className={`glass-effect p-4 rounded-xl shadow-md hover:shadow-xl transition-all transform hover:scale-105 ${animateStats ? 'animate-slide-in' : ''}`}
              style={{ animationDelay: `${idx * 0.1}s` }}
            >
              <div className={`w-10 h-10 rounded-lg bg-gradient-to-r ${stat.color} flex items-center justify-center mb-2`}>
                <stat.icon className="w-5 h-5 text-white" />
              </div>
              <div className="text-xs text-slate-600 mb-1">{stat.label}</div>
              <div className="text-xl font-bold text-slate-800">{stat.value}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex overflow-hidden">
        {/* Sidebar */}
        <div
          className={`${
            showSidebar ? "w-80" : "w-0"
          } glass-effect transition-all duration-300 overflow-hidden flex flex-col border-r border-slate-200`}
        >
          <div className="p-4 space-y-4 overflow-y-auto custom-scrollbar flex-1">
            {/* Search Box */}
            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-700 flex items-center gap-2">
                <Search className="w-4 h-4" />
                Search Districts
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Type to search..."
                  className="w-full px-4 py-3 pl-10 rounded-xl border-2 border-slate-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all outline-none"
                />
                <Search className="w-5 h-5 text-slate-400 absolute left-3 top-3.5" />
              </div>
            </div>

            {/* Filter Controls */}
            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-700 flex items-center gap-2">
                <Filter className="w-4 h-4" />
                Filter Hubs
              </label>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { value: "all", label: "All", color: "blue" },
                  { value: "active", label: "Active", color: "green" },
                  { value: "inactive", label: "Inactive", color: "red" },
                ].map((filter) => (
                  <button
                    key={filter.value}
                    onClick={() => setViewMode(filter.value)}
                    className={`px-3 py-2 rounded-lg text-sm font-semibold transition-all transform hover:scale-105 ${
                      viewMode === filter.value
                        ? filter.value === 'all' ? 'bg-blue-600 text-white shadow-lg' :
                          filter.value === 'active' ? 'bg-green-600 text-white shadow-lg' :
                          'bg-red-600 text-white shadow-lg'
                        : "bg-white text-slate-700 hover:bg-slate-100 border border-slate-200"
                    }`}
                  >
                    {filter.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Map Style */}
            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-700 flex items-center gap-2">
                <Layers className="w-4 h-4" />
                Map Style
              </label>
              <div className="grid grid-cols-2 gap-2">
                {[
                  { value: "default", label: "Default" },
                  { value: "satellite", label: "Satellite" },
                  { value: "terrain", label: "Terrain" },
                  { value: "dark", label: "Dark" },
                ].map((style) => (
                  <button
                    key={style.value}
                    onClick={() => setMapStyle(style.value)}
                    className={`px-3 py-2 rounded-lg text-sm font-semibold capitalize transition-all ${
                      mapStyle === style.value
                        ? "bg-indigo-600 text-white shadow-lg"
                        : "bg-white text-slate-700 hover:bg-slate-100 border border-slate-200"
                    }`}
                  >
                    {style.label}
                  </button>
                ))}
              </div>
            </div>

            {/* View Options */}
            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-700 flex items-center gap-2">
                <Settings className="w-4 h-4" />
                Display Options
              </label>
              <div className="space-y-2 bg-white p-3 rounded-xl border border-slate-200">
                <label className="flex items-center gap-3 cursor-pointer group">
                  <input
                    type="checkbox"
                    checked={showCoverage}
                    onChange={(e) => setShowCoverage(e.target.checked)}
                    className="w-5 h-5 text-purple-600 rounded border-slate-300 focus:ring-purple-500 cursor-pointer"
                  />
                  <span className="text-sm text-slate-700 group-hover:text-purple-600 transition-colors">
                    Coverage Radius
                  </span>
                </label>
                <label className="flex items-center gap-3 cursor-pointer group">
                  <input
                    type="checkbox"
                    checked={showRoutes}
                    onChange={(e) => setShowRoutes(e.target.checked)}
                    className="w-5 h-5 text-purple-600 rounded border-slate-300 focus:ring-purple-500 cursor-pointer"
                  />
                  <span className="text-sm text-slate-700 group-hover:text-purple-600 transition-colors">
                    Delivery Routes
                  </span>
                </label>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-700">Quick Actions</label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={handleLocateMe}
                  className="flex items-center justify-center gap-2 px-3 py-2 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-lg hover:shadow-lg transition-all transform hover:scale-105"
                >
                  <Navigation className="w-4 h-4" />
                  <span className="text-sm font-semibold">Reset</span>
                </button>
                <button
                  onClick={() => {
                    setSearchTerm("");
                    setViewMode("all");
                    setSelectedDistrict(null);
                  }}
                  className="flex items-center justify-center gap-2 px-3 py-2 bg-white text-slate-700 rounded-lg hover:bg-slate-100 border border-slate-200 transition-all"
                >
                  <RefreshCw className="w-4 h-4" />
                  <span className="text-sm font-semibold">Clear</span>
                </button>
              </div>
            </div>

            {/* Hub Details */}
            {selectedDistrict && (
              <div className="space-y-2 animate-slide-in">
                <div className="flex items-center justify-between">
                  <label className="text-sm font-semibold text-slate-700 flex items-center gap-2">
                    <MapPin className="w-4 h-4" />
                    Hub Details
                  </label>
                  <button
                    onClick={() => setSelectedDistrict(null)}
                    className="p-1 hover:bg-slate-200 rounded-lg transition-colors"
                  >
                    <X className="w-4 h-4 text-slate-600" />
                  </button>
                </div>
                <div className="bg-gradient-to-br from-purple-50 to-indigo-50 p-4 rounded-xl border-2 border-purple-200 space-y-3">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-bold text-slate-800">{selectedDistrict.district}</h3>
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        selectedDistrict.status
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {selectedDistrict.status ? "● Active" : "● Inactive"}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div className="bg-white p-3 rounded-lg">
                      <div className="text-xs text-slate-600 mb-1">Manager</div>
                      <div className="text-sm font-semibold text-slate-800">{selectedDistrict.manager}</div>
                    </div>
                    <div className="bg-white p-3 rounded-lg">
                      <div className="text-xs text-slate-600 mb-1">Rating</div>
                      <div className="text-sm font-semibold text-slate-800 flex items-center gap-1">
                        <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                        {selectedDistrict.rating || 'N/A'}
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div className="bg-white p-3 rounded-lg">
                      <div className="text-xs text-slate-600 mb-1">Active Vehicles</div>
                      <div className="text-sm font-semibold text-slate-800 flex items-center gap-2">
                        <Truck className="w-4 h-4 text-purple-600" />
                        {selectedDistrict.active_vehicles || 0}
                      </div>
                    </div>
                    <div className="bg-white p-3 rounded-lg">
                      <div className="text-xs text-slate-600 mb-1">Avg Time</div>
                      <div className="text-sm font-semibold text-slate-800 flex items-center gap-2">
                        <Clock className="w-4 h-4 text-purple-600" />
                        {selectedDistrict.average_delivery_time || 'N/A'}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Map Area */}
        <div className="flex-1 relative z-0">
          <MapContainer
            center={position}
            zoom={7}
            style={{ height: "100%", width: "100%" }}
            zoomControl={false}
            ref={mapRef}
            className="z-0"
          >
            <TileLayer url={getTileLayer()} />

            {/* Coverage Areas */}
            {showCoverage && filteredWarehouses.map((w) => (
              w.status && (
                <Circle
                  key={`circle-${w.id}`}
                  center={[w.latitude, w.longitude]}
                  radius={25000}
                  pathOptions={{
                    color: '#8b5cf6',
                    fillColor: '#8b5cf6',
                    fillOpacity: 0.1,
                    weight: 1
                  }}
                />
              )
            ))}

            {/* Delivery Routes */}
            {showRoutes && (
              <Polyline 
                positions={generateRoutes()} 
                pathOptions={{ 
                  color: '#8b5cf6', 
                  weight: 3, 
                  dashArray: '10, 10', 
                  opacity: 0.6 
                }} 
              />
            )}

            {/* Warehouse Markers */}
            {filteredWarehouses.map((warehouse) => (
              <Marker
                key={warehouse.id}
                position={[warehouse.latitude, warehouse.longitude]}
                icon={createCustomIcon(null, warehouse.status)}
                eventHandlers={{
                  click: () => {
                    setSelectedDistrict(warehouse);
                    if (!showSidebar) setShowSidebar(true);
                    mapRef.current?.flyTo([warehouse.latitude, warehouse.longitude], 10, { duration: 1.5 });
                  },
                }}
              >
                <Tooltip direction="top" offset={[0, -20]} opacity={1}>
                  <div className="px-3 py-2 bg-white text-slate-800 text-xs font-semibold rounded-lg shadow-xl border border-purple-100">
                    {warehouse.district}
                    <div className="text-[10px] text-slate-500 font-normal">
                      {warehouse.status ? 'Active Hub' : 'Inactive'}
                    </div>
                  </div>
                </Tooltip>
              </Marker>
            ))}
          </MapContainer>

          {/* Map Overlay Gradient */}
          <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-slate-900/5 to-transparent z-[400] h-20" />
        </div>
      </div>
    </div>
  );
};

export default CoverageMap;