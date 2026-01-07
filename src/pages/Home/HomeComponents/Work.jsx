import React from "react";
import { motion } from "framer-motion";
import { CalendarCheck, Wallet, Truck, Building2, ArrowRight } from "lucide-react";

const Work = () => {
  const features = [
    {
      id: 1,
      step: "01",
      title: "Instant Booking",
      desc: "Schedule your pickup and drop-off in seconds. Our smart booking system makes it effortless.",
      icon: CalendarCheck,
    },
    {
      id: 2,
      step: "02",
      title: "Secure Payment",
      desc: "Flexible payment options including Cash on Delivery and secure online gateways.",
      icon: Wallet,
    },
    {
      id: 3,
      step: "03",
      title: "Express Logistics",
      desc: "State-of-the-art delivery hubs ensuring your parcel reaches its destination in record time.",
      icon: Truck,
    },
    {
      id: 4,
      step: "04",
      title: "Corporate Solutions",
      desc: "Tailored logistics for SMEs and large enterprises with bulk shipping needs.",
      icon: Building2,
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  return (
    <section className="  relative overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-[#B8E55C]/5 rounded-full blur-3xl" />
        <div className="absolute top-1/2 -left-24 w-72 h-72 bg-[#03373D]/5 rounded-full blur-3xl" />
      </div>

      <div className="  px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-block px-4 py-1.5 bg-white border border-gray-200 rounded-full shadow-sm mb-6"
          >
            <span className="text-[#03373D] font-bold tracking-wide uppercase text-xs">
              Simple 4-Step Process
            </span>
          </motion.div>
          <motion.h2 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-bold text-[#03373D] mb-6 leading-tight"
          >
            How We Deliver <br/> <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#03373D] to-[#B8E55C]">Excellence</span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-gray-500 text-lg md:text-xl max-w-2xl mx-auto"
          >
            From your doorstep to the final destination, we ensure every step is optimized for speed, security, and transparency.
          </motion.p>
        </div>

        {/* Features Grid */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative"
        >
           {/* Connecting Line (Desktop) */}
           <div className="hidden lg:block absolute top-12 left-0 w-full h-0.5 border-t-2 border-dashed border-gray-200 z-0" style={{ left: '12%', width: '76%' }}></div>

          {features.map((feature) => (
            <motion.div
              key={feature.id}
              variants={itemVariants}
              whileHover={{ y: -10 }}
              className="relative group"
            >
              <div className="bg-white rounded-3xl p-8 shadow-sm hover:shadow-2xl transition-all duration-300 border border-gray-100 h-full relative overflow-hidden z-10">
                {/* Large Watermark Number */}
                <span className="absolute -right-4 -top-4 text-9xl font-bold text-gray-50 opacity-50 select-none group-hover:text-[#B8E55C]/10 transition-colors duration-300">
                  {feature.step}
                </span>

                {/* Icon Circle */}
                <div className="relative w-16 h-16 rounded-2xl bg-[#03373D] flex items-center justify-center mb-8 shadow-lg group-hover:scale-110 transition-transform duration-300 z-10">
                  <feature.icon className="w-8 h-8 text-[#B8E55C]" />
                  <div className="absolute -inset-2 rounded-2xl border border-[#03373D]/10 opacity-0 group-hover:opacity-100 group-hover:scale-105 transition-all duration-300" />
                </div>

                {/* Content */}
                <div className="relative z-10">
                  <h3 className="text-xl font-bold text-[#03373D] mb-4 group-hover:text-[#03373D] transition-colors">
                    {feature.title}
                  </h3>
                  <p className="text-gray-500 leading-relaxed mb-6 text-sm">
                    {feature.desc}
                  </p>
                  
                  {/* Learn More */}
                  <div className="flex items-center text-[#03373D] font-bold text-sm group-hover:text-[#03373D] cursor-pointer mt-auto">
                    <span className="border-b-2 border-[#B8E55C]/30 group-hover:border-[#B8E55C] transition-colors pb-0.5">Learn more</span>
                    <ArrowRight className="w-4 h-4 ml-2 transform group-hover:translate-x-1 transition-transform text-[#B8E55C]" />
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Work;
