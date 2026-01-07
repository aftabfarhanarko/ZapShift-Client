import React from "react";
import { motion } from "framer-motion";
import { Smartphone, Shield, Zap, BarChart3, Map, Clock } from "lucide-react";

const Features = () => {
  const features = [
    {
      id: 1,
      title: "Real-Time Tracking",
      desc: "Monitor your parcel's journey live on our interactive map with precise GPS updates.",
      icon: Map,
      color: "text-blue-500",
      bg: "bg-blue-500/10",
    },
    {
      id: 2,
      title: "Secure Dashboard",
      desc: "Manage all your shipments, payments, and history from one protected, user-friendly panel.",
      icon: Shield,
      color: "text-green-500",
      bg: "bg-green-500/10",
    },
    {
      id: 3,
      title: "Instant Booking",
      desc: "Book a pickup in under 60 seconds with our streamlined app interface.",
      icon: Zap,
      color: "text-yellow-500",
      bg: "bg-yellow-500/10",
    },
    {
      id: 4,
      title: "Smart Analytics",
      desc: "Get insights on your delivery spend and performance with detailed weekly reports.",
      icon: BarChart3,
      color: "text-purple-500",
      bg: "bg-purple-500/10",
    },
    {
      id: 5,
      title: "Mobile Optimization",
      desc: "A seamless experience across all devices, ensuring you can ship on the go.",
      icon: Smartphone,
      color: "text-pink-500",
      bg: "bg-pink-500/10",
    },
    {
      id: 6,
      title: "On-Time Guarantee",
      desc: "We prioritize punctuality with automated route optimization for faster deliveries.",
      icon: Clock,
      color: "text-orange-500",
      bg: "bg-orange-500/10",
    },
  ];

  return (
    <section className=" ">
      <div className=" px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-20">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold text-[#03373D] mb-6"
          >
            Why Choose Our App?
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-lg text-gray-500 max-w-2xl mx-auto"
          >
            Built for speed, security, and simplicity. Discover the powerful features that make us the preferred choice for modern logistics.
          </motion.p>
        </div>

        {/* Feature List (Premium Clean Design) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-20">
          {features.map((feature, index) => (
            <motion.div
              key={feature.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="flex flex-col group border p-7 border-gray-300 rounded-xl"
            >
              {/* Icon Container - Premium Floating Style */}
              <div className={`
                mb-6 w-20 h-20 rounded-[2rem] flex items-center justify-center
                ${feature.bg} 
                group-hover:bg-[#03373D] group-hover:shadow-xl group-hover:shadow-[#03373D]/20
                group-hover:-translate-y-2
                transition-all duration-500 ease-out
              `}>
                <feature.icon className={`
                  w-10 h-10 ${feature.color} 
                  group-hover:text-[#B8E55C] 
                  transition-colors duration-500
                `} />
              </div>

              {/* Text Content */}
              <div>
                <h3 className="text-2xl font-bold text-[#03373D] mb-4 group-hover:text-[#03373D] transition-colors duration-300">
                  {feature.title}
                </h3>
                <p className="text-gray-500 leading-relaxed text-lg mb-6">
                  {feature.desc}
                </p>
                
                {/* Decorative Line */}
                <div className="w-12 h-1 bg-gray-200 group-hover:w-full group-hover:bg-[#B8E55C] transition-all duration-500 ease-out" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;

