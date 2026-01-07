import React from "react";
import CountUp from "react-countup";
import { motion } from "framer-motion";
import { MapPin, Box, Globe, Users } from "lucide-react";

const Stats = () => {
  const statsData = [
    {
      id: 1,
      value: 1500000,
      suffix: "+",
      label: "Total Parcels",
      subLabel: "Delivered Successfully",
      icon: Box,
    },
    {
      id: 2,
      value: 64,
      suffix: "",
      label: "All Districts",
      subLabel: "Full Bangladesh Coverage",
      icon: MapPin,
    },
    {
      id: 3,
      value: 100,
      suffix: "%",
      label: "Nationwide Reach",
      subLabel: "Remote Area Service",
      icon: Globe,
    },
    {
      id: 4,
      value: 50000,
      suffix: "+",
      label: "Happy Merchants",
      subLabel: "Growing Everyday",
      icon: Users,
    },
  ];

  return (
    <section className="py-16 relative">
      <div className=" px-4 sm:px-6 lg:px-8">
        
        {/* Header Section */}
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold text-[#03373D] mb-4"
          >
            Our Success
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-lg text-gray-500 font-medium max-w-2xl mx-auto"
          >
            Delivering excellence across the nation with speed, reliability, and trust.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {statsData.map((stat, index) => (
            <motion.div
              key={stat.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-[2.5rem] p-8 shadow-xl shadow-gray-100 border border-gray-50 text-center group hover:-translate-y-2 transition-transform duration-500"
            >
              <div className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-[#03373D]/5 flex items-center justify-center group-hover:bg-[#03373D] transition-colors duration-500">
                <stat.icon className="w-8 h-8 text-[#03373D] group-hover:text-[#B8E55C] transition-colors duration-500" />
              </div>

              <h3 className="text-4xl lg:text-5xl font-bold text-[#03373D] mb-2 font-mono tracking-tight">
                <CountUp 
                  end={stat.value} 
                  duration={2.5} 
                  separator="," 
                  enableScrollSpy={true}
                  scrollSpyOnce={true}
                />
                <span className="text-[#B8E55C] text-3xl ml-1">
                  {stat.suffix}
                </span>
              </h3>

              <p className="text-lg font-bold text-gray-800 mb-1">
                {stat.label}
              </p>

              <p className="text-sm text-gray-500 font-medium">
                {stat.subLabel}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Stats;
