import React from "react";
import { Truck, Package, MapPin, Clock } from "lucide-react";

const Banner = () => {
  return (
    <div className="relative min-h-screen md:min-h-0 md:max-h-[800px]  mt-18  bg-gradient-to-br from-[#03373D] via-[#024850] to-[#0B0B0B] overflow-hidden">
      {/* Background Decorative Elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 sm:top-20 left-5 sm:left-10 w-48 sm:w-72 h-48 sm:h-72 bg-[#B8E55C] rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 sm:bottom-20 right-5 sm:right-10 w-64 sm:w-96 h-64 sm:h-96 bg-[#B8E55C] rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/4 sm:left-1/3 w-40 sm:w-64 h-40 sm:h-64 bg-[#B8E55C] rounded-full blur-3xl"></div>
      </div>

      {/* Grid Pattern Overlay */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="w-full h-full"
          style={{
            backgroundImage:
              "linear-gradient(#B8E55C 1px, transparent 1px), linear-gradient(90deg, #B8E55C 1px, transparent 1px)",
            backgroundSize: "50px 50px",
          }}
        ></div>
      </div>

      <div className="relative max-w-11/12  mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-20">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-6 sm:space-y-8 z-10 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 bg-[#B8E55C]/20 backdrop-blur-sm border border-[#B8E55C]/30 rounded-full px-3 sm:px-4 py-2">
              <Truck className="w-4 h-4 text-[#B8E55C]" />
              <span className="text-[#B8E55C] text-xs sm:text-sm font-medium">
                #1 Trusted Delivery Partner
              </span>
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold text-white leading-tight">
              Fast, Reliable
              <span className="block bg-gradient-to-r from-[#B8E55C] to-[#9FD147] bg-clip-text text-transparent">
                Delivery Solutions
              </span>
            </h1>

            <p className="text-base sm:text-lg lg:text-xl text-gray-300 max-w-xl mx-auto lg:mx-0">
              Experience seamless logistics with real-time tracking, secure
              handling, and lightning-fast delivery to your doorstep.
            </p>

            <div className="flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-4 justify-center lg:justify-start">
              <button className="bg-gradient-to-r from-[#B8E55C] to-[#A5D954] hover:from-[#A5D954] hover:to-[#B8E55C] text-[#0B0B0B] px-6 sm:px-8 py-3 sm:py-4 rounded-lg font-semibold shadow-lg shadow-[#B8E55C]/50 transition-all duration-300 hover:shadow-xl hover:shadow-[#B8E55C]/70 hover:scale-105">
                Track Parcel
              </button>
              <button className="bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white border border-white/30 px-6 sm:px-8 py-3 sm:py-4 rounded-lg font-semibold transition-all duration-300 hover:scale-105">
                Apply as Rider
              </button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 sm:gap-6 pt-6 sm:pt-8">
              <div className="text-center lg:text-left">
                <div className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#B8E55C]">
                  500+
                </div>
                <div className="text-gray-400 text-xs sm:text-sm">Vehicles</div>
              </div>
              <div className="text-center lg:text-left">
                <div className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#B8E55C]">
                  24/7
                </div>
                <div className="text-gray-400 text-xs sm:text-sm">Support</div>
              </div>
              <div className="text-center lg:text-left">
                <div className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#B8E55C]">
                  100%
                </div>
                <div className="text-gray-400 text-xs sm:text-sm">Safe</div>
              </div>
            </div>
          </div>

          {/* Right Content - Animated Orbit */}
          <div className="relative h-[400px] sm:h-[500px] lg:h-[600px] flex items-center justify-center mt-8 lg:mt-0">
            {/* Central Circle */}
            <div className="relative z-20 w-48 h-48 sm:w-56 sm:h-56 lg:w-64 lg:h-64 bg-gradient-to-br from-[#B8E55C] to-[#9FD147] rounded-full shadow-2xl shadow-[#B8E55C]/50 flex flex-col items-center justify-center text-center p-6 sm:p-8 border-4 border-white/20">
              <Truck className="w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 text-[#0B0B0B] mb-2 sm:mb-4 animate-bounce  duration-500" />
              <h3 className="text-xl sm:text-2xl font-bold text-[#0B0B0B] mb-1 sm:mb-2">
                Fast Delivery
              </h3>
              <p className="text-[#1F1F1F] text-xs sm:text-sm">
                Bringing the world to your doorstep efficiently.
              </p>
            </div>

            {/* Dashed Orbit Ring */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-[300px] h-[300px] sm:w-[400px] sm:h-[400px] lg:w-[500px] lg:h-[500px] rounded-full border-2 border-dashed border-[#B8E55C]/30 animate-spin-slow"></div>
            </div>

            {/* Orbiting Elements */}
            <OrbitingItem
              delay={0}
              icon={<Package className="w-5 h-5 sm:w-6 sm:h-6" />}
              title="Safe Box"
              subtitle="Always Secure"
            />
            <OrbitingItem
              delay={2.67}
              icon={<MapPin className="w-5 h-5 sm:w-6 sm:h-6" />}
              title="Tracking"
              subtitle="Real-time GPS"
            />
            <OrbitingItem
              delay={5.33}
              icon={<Clock className="w-5 h-5 sm:w-6 sm:h-6" />}
              title="On Time"
              subtitle="Fast Delivery"
            />
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes spin-slow {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
        .animate-spin-slow {
          animation: spin-slow 20s linear infinite;
        }
      `}</style>
    </div>
  );
};

const OrbitingItem = ({ delay, icon, title, subtitle }) => {
  const orbitDuration = 8; // seconds for full rotation

  return (
    <div
      className="absolute inset-0 flex items-center justify-center animate-orbit"
      style={{
        animationDelay: `${delay}s`,
        animationDuration: `${orbitDuration}s`,
      }}
    >
      <div className="w-[300px] h-[300px] sm:w-[400px] sm:h-[400px] lg:w-[500px] lg:h-[500px] relative">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2">
          <div
            className="bg-[#03373D]/80 backdrop-blur-lg border border-[#B8E55C]/30 rounded-xl sm:rounded-2xl p-3 sm:p-4 shadow-xl hover:bg-[#03373D] hover:border-[#B8E55C]/50 transition-all duration-300 hover:scale-110 animate-reverse-orbit"
            style={{
              animationDelay: `${delay}s`,
              animationDuration: `${orbitDuration}s`,
            }}
          >
            <div className="flex items-center gap-2 sm:gap-3">
              <div className="bg-gradient-to-br from-[#B8E55C] to-[#9FD147] text-[#0B0B0B] p-2 sm:p-3 rounded-lg sm:rounded-xl">
                {icon}
              </div>
              <div className="hidden sm:block">
                <div className="text-white font-semibold text-xs sm:text-sm">
                  {title}
                </div>
                <div className="text-[#B8E55C] text-[10px] sm:text-xs">
                  {subtitle}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes orbit {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
        @keyframes reverse-orbit {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(-360deg);
          }
        }
        .animate-orbit {
          animation: orbit linear infinite;
        }
        .animate-reverse-orbit {
          animation: reverse-orbit linear infinite;
        }
      `}</style>
    </div>
  );
};

export default Banner;
