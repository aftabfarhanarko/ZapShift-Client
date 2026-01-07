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
    <section className="py-14 relative overflow-hidden rounded-xl bg-gray-900">
      {/* Abstract Background Shapes */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] bg-[#B8E55C]/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[600px] h-[600px] bg-[#03373D]/40 rounded-full blur-[120px]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center mb-20">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#B8E55C]/10 border border-[#B8E55C]/20 mb-4"
          >
            <ShieldCheck className="w-4 h-4 text-[#B8E55C]" />
            <span className="text-[#B8E55C] font-bold tracking-wide uppercase text-xs">
              World-Class Services
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight"
          >
            Logistics Solutions <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#B8E55C] to-emerald-400">
              Tailored for You
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-gray-400 max-w-2xl mx-auto text-lg"
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
              {/* Card Container (Glassmorphism) */}
              <div className="relative h-full bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 hover:bg-white/10 hover:border-[#B8E55C]/30 transition-all duration-500 overflow-hidden">
                {/* Hover Glow Effect */}
                <div className="absolute -top-24 -right-24 w-48 h-48 bg-[#B8E55C]/20 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                {/* Icon & Price Row */}
                <div className="flex justify-between items-start mb-8 relative z-10">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#03373D] to-[#044e54] flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-500 border border-white/5">
                    <service.icon className="w-8 h-8 text-[#B8E55C]" />
                  </div>
                  <span className="px-4 py-1.5 bg-[#B8E55C] text-[#03373D] text-xs font-bold rounded-full shadow-lg shadow-[#B8E55C]/20">
                    {service.price}
                  </span>
                </div>

                {/* Content */}
                <div className="relative z-10">
                  <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-[#B8E55C] transition-colors duration-300">
                    {service.title}
                  </h3>
                  <p className="text-gray-400 mb-8 leading-relaxed h-16">
                    {service.desc}
                  </p>

                  {/* Action Button */}
                  <button className="w-full py-3 rounded-xl bg-white/5 hover:bg-[#B8E55C] border border-white/10 hover:border-[#B8E55C] flex items-center justify-center gap-2 group/btn transition-all duration-300">
                    <span className="text-sm font-bold text-white group-hover/btn:text-[#03373D]">
                      Learn More
                    </span>
                    <ArrowRight className="w-4 h-4 text-white group-hover/btn:text-[#03373D] transform group-hover/btn:translate-x-1 transition-transform duration-300" />
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
