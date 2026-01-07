import React from "react";
import { motion } from "framer-motion";
import {
  Truck,
  Globe,
  Package,
  Banknote,
  Building2,
  RotateCcw,
  ArrowRight,
  ShieldCheck,
} from "lucide-react";

const OurServices = () => {
  const services = [
    {
      id: 1,
      title: "Express & Standard",
      desc: "Fast delivery within 24–72 hours across major cities. Express 4-6 hour options available.",
      price: "Starts from ৳60",
      icon: Truck,
      delay: 0.1,
    },
    {
      id: 2,
      title: "Nationwide Delivery",
      desc: "Home delivery to every district in Bangladesh within 48–72 hours.",
      price: "Starts from ৳100",
      icon: Globe,
      delay: 0.2,
    },
    {
      id: 3,
      title: "Fulfillment Solution",
      desc: "Complete inventory management, packaging, and order processing support.",
      price: "Custom Pricing",
      icon: Package,
      delay: 0.3,
    },
    {
      id: 4,
      title: "Cash on Delivery",
      desc: "100% secure cash collection from your customers anywhere in Bangladesh.",
      price: "1% COD Charge",
      icon: Banknote,
      delay: 0.4,
    },
    {
      id: 5,
      title: "Corporate Logistics",
      desc: "Tailored warehousing and supply chain solutions for large enterprises.",
      price: "Contract Based",
      icon: Building2,
      delay: 0.5,
    },
    {
      id: 6,
      title: "Parcel Return",
      desc: "Hassle-free reverse logistics for customer returns and exchanges.",
      price: "Low Return Fee",
      icon: RotateCcw,
      delay: 0.6,
    },
  ];

  return (
    <section className="py-20 relative  overflow-hidden">
      <div className=" px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 border border-blue-100 mb-6"
          >
            <ShieldCheck className="w-4 h-4 text-[#0EA5E9]" />
            <span className="text-[#0EA5E9] font-bold tracking-wide uppercase text-xs">
              World-Class Services
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight"
          >
            Logistics Solutions <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0EA5E9] to-blue-600">
              Tailored for You
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-gray-600 max-w-2xl mx-auto text-lg"
          >
            Experience the next generation of parcel delivery with our premium,
            secure, and lightning-fast services.
          </motion.p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: service.delay }}
              whileHover={{ y: -8 }}
              className="group relative"
            >
              {/* Card Container */}
              <div className="relative h-full bg-white rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-500 border border-gray-100 overflow-hidden">
                {/* Hover Glow Effect */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-blue-50 rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                {/* Icon & Price Row */}
                <div className="flex justify-between items-start mb-8 relative z-10">
                  <div className="w-16 h-16 rounded-2xl bg-blue-50 flex items-center justify-center group-hover:bg-[#0EA5E9] transition-colors duration-500">
                    <service.icon className="w-8 h-8 text-[#0EA5E9] group-hover:text-white transition-colors duration-500" />
                  </div>
                  <span className="px-4 py-1.5 bg-gray-900 text-white text-xs font-bold rounded-full">
                    {service.price}
                  </span>
                </div>

                {/* Content */}
                <div className="relative z-10">
                  <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-[#0EA5E9] transition-colors duration-300">
                    {service.title}
                  </h3>
                  <p className="text-gray-500 mb-8 leading-relaxed min-h-[48px]">
                    {service.desc}
                  </p>

                  {/* Action Button */}
                  <button className="w-full py-3 rounded-xl bg-gray-50 hover:bg-[#0EA5E9] text-gray-900 hover:text-white font-bold text-sm flex items-center justify-center gap-2 transition-all duration-300">
                    <span>Learn More</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default OurServices;
