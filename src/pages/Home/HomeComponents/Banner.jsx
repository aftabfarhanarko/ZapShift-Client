import React from "react";
import { motion } from "framer-motion";
import { Truck, Package, MapPin, Clock, ArrowRight } from "lucide-react";
import { Link } from "react-router";

const Banner = () => {
  return (
    <div className="relative min-h-[500px] lg:min-h-[600px] bg-[#f0fdf4] overflow-hidden flex items-center">
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-1/3 h-full bg-[#dcfce7]/30 skew-x-12 transform origin-top-right" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#B8E55C]/10 rounded-full blur-3xl" />

      <div className="container mx-auto px-4 py-8 lg:py-12 grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center relative z-10">
        {/* Left Content */}
        <div className="space-y-6 lg:space-y-8 text-center lg:text-left">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#B8E55C]/20 text-[#03373D] font-semibold text-xs lg:text-sm"
          >
            <span className="w-2 h-2 rounded-full bg-[#03373D] animate-pulse" />
            #1 Trusted Delivery Partner
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-4xl md:text-5xl lg:text-7xl font-bold text-[#1F1F1F] leading-tight"
          >
            Fast, Reliable <br />
            <span className="text-[#03373D]">Delivery Solutions</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="text-base lg:text-lg text-gray-600 max-w-lg mx-auto lg:mx-0"
          >
            Experience seamless logistics with real-time tracking, secure
            handling, and lightning-fast delivery to your doorstep.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="flex flex-wrap gap-4 justify-center lg:justify-start"
          >
            <Link to="/#track">
              <button className="px-6 py-3 lg:px-8 lg:py-3 rounded-full bg-[#03373D] text-white font-bold text-base lg:text-lg hover:bg-[#B8E55C] hover:text-[#03373D] transition-all duration-300 shadow-lg hover:shadow-xl flex items-center gap-2 group">
                Track Parcel
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
            </Link>
            <Link to="/raider">
              <button className="px-6 py-3 lg:px-8 lg:py-2.5 rounded-full bg-white text-[#03373D] border-2 border-[#03373D] font-bold text-base lg:text-lg hover:bg-[#f0fdf4] transition-all duration-300">
                Apply a Rider
              </button>
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.8 }}
            className="grid grid-cols-3 gap-4 lg:gap-8 pt-6 lg:pt-8 border-t border-gray-200"
          >
            <div>
              <h3 className="text-2xl lg:text-3xl font-bold text-[#03373D]">
                500+
              </h3>
              <p className="text-xs lg:text-sm text-gray-600">Vehicles</p>
            </div>
            <div>
              <h3 className="text-2xl lg:text-3xl font-bold text-[#03373D]">
                24/7
              </h3>
              <p className="text-xs lg:text-sm text-gray-600">Support</p>
            </div>
            <div>
              <h3 className="text-2xl lg:text-3xl font-bold text-[#03373D]">
                100%
              </h3>
              <p className="text-xs lg:text-sm text-gray-600">Safe</p>
            </div>
          </motion.div>
        </div>

        {/* Right Content - Animations */}
        <div className="relative h-[400px] lg:h-[500px] flex items-center justify-center overflow-visible">
          {/* Central Circle */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{
              type: "spring",
              stiffness: 260,
              damping: 20,
              delay: 0.5,
            }}
            className="w-48 h-48 lg:w-64 lg:h-64 bg-white rounded-full shadow-2xl flex flex-col items-center justify-center relative z-20"
          >
            <div className="w-16 h-16 lg:w-20 lg:h-20 bg-[#B8E55C]/20 rounded-full flex items-center justify-center mb-2 lg:mb-4">
              <Truck className="w-8 h-8 lg:w-10 lg:h-10 text-[#03373D]" />
            </div>
            <h3 className="text-lg lg:text-xl font-bold text-[#03373D]">
              Fast Delivery
            </h3>
            <p className="text-[10px] lg:text-xs text-gray-500 text-center px-4 lg:px-6 mt-1 lg:mt-2">
              Bringing the world to your doorstep efficiently.
            </p>
          </motion.div>

          {/* Orbiting Elements */}
          <div className="absolute inset-0 flex items-center justify-center z-10">
            {/* Manual Orbiting Items with simpler rotation logic */}
            <motion.div
              className="absolute w-full h-full"
              animate={{ rotate: 360 }}
              transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
            >
              <motion.div
                className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white p-2 lg:p-3 rounded-2xl shadow-xl flex items-center gap-2 lg:gap-3 min-w-[120px] lg:min-w-[160px]"
                animate={{ rotate: -360 }}
                transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
              >
                <div className="w-8 h-8 lg:w-10 lg:h-10 rounded-full bg-orange-100 flex items-center justify-center">
                  <Package className="w-4 h-4 lg:w-5 lg:h-5 text-orange-600" />
                </div>
                <div>
                  <p className="font-bold text-xs lg:text-sm text-[#1F1F1F]">
                    Safe Box
                  </p>
                  <p className="text-[8px] lg:text-[10px] text-gray-500">
                    Always Secure
                  </p>
                </div>
              </motion.div>

              <motion.div
                className="absolute bottom-[10%] lg:bottom-[15%] right-[5%] lg:right-[15%] bg-white p-2 lg:p-3 rounded-2xl shadow-xl flex items-center gap-2 lg:gap-3 min-w-[120px] lg:min-w-[160px]"
                animate={{ rotate: -360 }}
                transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
              >
                <div className="w-8 h-8 lg:w-10 lg:h-10 rounded-full bg-blue-100 flex items-center justify-center">
                  <MapPin className="w-4 h-4 lg:w-5 lg:h-5 text-blue-600" />
                </div>
                <div>
                  <p className="font-bold text-xs lg:text-sm text-[#1F1F1F]">
                    Tracking
                  </p>
                  <p className="text-[8px] lg:text-[10px] text-gray-500">
                    Real-time GPS
                  </p>
                </div>
              </motion.div>

              <motion.div
                className="absolute bottom-[10%] lg:bottom-[15%] left-[5%] lg:left-[15%] bg-white p-2 lg:p-3 rounded-2xl shadow-xl flex items-center gap-2 lg:gap-3 min-w-[120px] lg:min-w-[160px]"
                animate={{ rotate: -360 }}
                transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
              >
                <div className="w-8 h-8 lg:w-10 lg:h-10 rounded-full bg-purple-100 flex items-center justify-center">
                  <Clock className="w-4 h-4 lg:w-5 lg:h-5 text-purple-600" />
                </div>
                <div>
                  <p className="font-bold text-xs lg:text-sm text-[#1F1F1F]">
                    On Time
                  </p>
                  <p className="text-[8px] lg:text-[10px] text-gray-500">
                    Fast Delivery
                  </p>
                </div>
              </motion.div>
            </motion.div>

            {/* Dashed Orbit Ring */}
            <div className="absolute w-[280px] h-[280px] lg:w-[450px] lg:h-[450px] rounded-full border-2 border-dashed border-[#03373D]/10" />
            <div className="absolute w-[200px] h-[200px] lg:w-[300px] lg:h-[300px] rounded-full border border-[#B8E55C]/20" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner;
