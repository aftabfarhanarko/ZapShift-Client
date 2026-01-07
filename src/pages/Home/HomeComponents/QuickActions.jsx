import React from "react";
import { Link } from "react-router";
import { Package, Search, Clock, Calculator, Bike, Headphones, ArrowRight, ChevronRight, ChevronLeft } from "lucide-react";
import { motion } from "framer-motion";

const FeatureItem = ({ icon: Icon, title, desc, to, href, delay }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
      className="flex flex-col items-center text-center group"
    >
      {/* Icon Box */}
      <div className="w-24 h-24 bg-white rounded-3xl shadow-lg shadow-gray-200/50 border-2 border-gray-100 group-hover:border-[#B8E55C] flex items-center justify-center mb-6 group-hover:shadow-xl group-hover:scale-105 transition-all duration-300">
        <Icon className="w-10 h-10 text-[#03373D] group-hover:text-[#B8E55C] transition-colors duration-300" />
      </div>

      {/* Content */}
      <h3 className="text-xl font-bold text-[#03373D] mb-3">{title}</h3>
      <p className="text-gray-500 text-sm mb-4 leading-relaxed max-w-xs mx-auto">
        {desc}
      </p>

      {/* Link */}
      <div className="flex items-center text-[#B8E55C] font-bold text-sm cursor-pointer hover:text-[#03373D] transition-colors">
        Read More <ArrowRight className="w-4 h-4 ml-1" />
      </div>
    </motion.div>
  );
};

const QuickActions = () => {
  return (
    <div className="container mx-auto px-4 relative z-30 py-16">
      {/* Header */}
      <div className="text-center mb-16 relative">
        <motion.h2 
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="text-4xl md:text-5xl font-bold text-[#03373D] mb-4"
        >
          Easy-to-use solution with <br /> powerful features.
        </motion.h2>
        
        {/* Decorative Element (Simulating the box character) */}
        <motion.div 
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          className="hidden lg:block absolute top-0 right-10 -mt-8"
        >
           <Package className="w-24 h-24 text-[#B8E55C] opacity-80 rotate-12" strokeWidth={1.5} />
        </motion.div>
      </div>

      {/* Grid Content */}
      <div className="relative">
        {/* Navigation Buttons (Visual only as per design) */}
        <button className="hidden md:flex absolute top-1/2 -left-4 -translate-y-1/2 w-10 h-10 bg-white border border-[#B8E55C] text-[#B8E55C] rounded-lg items-center justify-center hover:bg-[#B8E55C] hover:text-[#03373D] transition-colors z-10">
          <ChevronLeft size={24} />
        </button>
        <button className="hidden md:flex absolute top-1/2 -right-4 -translate-y-1/2 w-10 h-10 bg-white border border-[#B8E55C] text-[#B8E55C] rounded-lg items-center justify-center hover:bg-[#B8E55C] hover:text-[#03373D] transition-colors z-10">
          <ChevronRight size={24} />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12 px-4 md:px-12">
          <FeatureItem
            icon={Package}
            title="Scan & ship products"
            desc="Consectetur adipiscing experience sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
            to="/send_parcel"
            delay={0}
          />
          <FeatureItem
            icon={Search}
            title="Auto label generation"
            desc="Experience sed do eiusmod tempor incididunt ut labore et dolore magna aliqua auto box selection."
            href="#track"
            delay={0.1}
          />
          <FeatureItem
            icon={Clock}
            title="Auto print"
            desc="Labore et dolore magna aliqua Consectetur adipiscing experience sed do eiusmod tempor incididunt ut."
            to="/my-parcels"
            delay={0.2}
          />
          <FeatureItem
            icon={Calculator}
            title="Cost Calculator"
            desc="Estimate shipping costs based on weight, dimensions, and destination instantly."
            to="/calculator"
            delay={0.3}
          />
          <FeatureItem
            icon={Bike}
            title="Join as Rider"
            desc="Become a delivery partner and earn competitive rates on your own schedule."
            to="/raider"
            delay={0.4}
          />
          <FeatureItem
            icon={Headphones}
            title="Support Center"
            desc="Get 24/7 assistance for any delivery-related queries or issues you may have."
            to="/support"
            delay={0.5}
          />
        </div>
      </div>

     
    </div>
  );
};

export default QuickActions;
