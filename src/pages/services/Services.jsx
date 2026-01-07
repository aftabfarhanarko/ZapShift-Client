import React from "react";
import { motion } from "framer-motion";
import {
  Truck,
  Clock,
  Globe,
  Package,
  ShieldCheck,
  MapPin,
  Warehouse,
  Headset,
  RefreshCcw,
  Plane,
  CreditCard,
  FileCheck,
} from "lucide-react";

const ServicesPage = () => {
  const features = [
    {
      icon: Truck,
      title: "Express Delivery",
      desc: "Lightning-fast delivery services for your urgent parcels within city limits.",
    },
    {
      icon: Clock,
      title: "Same Day Delivery",
      desc: "Get your packages delivered on the very same day with our priority service.",
    },
    {
      icon: Globe,
      title: "International Shipping",
      desc: "Seamless cross-border logistics solutions reaching over 200 countries worldwide.",
    },
    {
      icon: Warehouse,
      title: "Warehousing Solutions",
      desc: "Secure storage facilities with inventory management for your business needs.",
    },
    {
      icon: MapPin,
      title: "Real-time Tracking",
      desc: "Monitor your shipment's journey live with our advanced GPS tracking system.",
    },
    {
      icon: ShieldCheck,
      title: "Secure Packaging",
      desc: "Professional packaging services to ensure your items remain safe and intact.",
    },
    {
      icon: Package,
      title: "Bulk Shipping",
      desc: "Cost-effective logistics solutions for large volume commercial shipments.",
    },
    {
      icon: Plane,
      title: "Air Freight",
      desc: "Fastest mode of transport for time-sensitive international cargo.",
    },
    {
      icon: FileCheck,
      title: "Customs Clearance",
      desc: "Hassle-free handling of all documentation and customs procedures.",
    },
    {
      icon: CreditCard,
      title: "Cash on Delivery",
      desc: "Secure payment collection upon delivery to build trust with your customers.",
    },
    {
      icon: RefreshCcw,
      title: "Returns Management",
      desc: "Efficient reverse logistics for handling product returns and exchanges.",
    },
    {
      icon: Headset,
      title: "24/7 Support",
      desc: "Round-the-clock customer service to assist you with any shipping queries.",
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.9 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { type: "spring", stiffness: 50, damping: 15 },
    },
  };

  return (
    <div className="min-h-screen bg-gray-50 py-20 relative overflow-hidden">
      {/* Animation Feature 1: Floating Background Orbs */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <motion.div
          animate={{ x: [0, 100, 0], y: [0, -50, 0], opacity: [0.3, 0.6, 0.3] }}
          transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
          className="absolute top-10 left-10 w-96 h-96 bg-[#B8E55C]/10 rounded-full blur-3xl"
        />
        <motion.div
          animate={{ x: [0, -100, 0], y: [0, 50, 0], opacity: [0.3, 0.6, 0.3] }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute bottom-10 right-10 w-[500px] h-[500px] bg-[#03373D]/5 rounded-full blur-3xl"
        />
      </div>

      {/* Header Section */}
      <div className="container mx-auto px-4 mb-20 text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="max-w-3xl mx-auto"
        >
          {/* Animation Feature 2: Pulse Effect on Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#B8E55C]/10 border border-[#B8E55C]/20 mb-6">
            <span className="w-2 h-2 rounded-full bg-[#03373D] animate-ping" />
            <span className="w-2 h-2 rounded-full bg-[#03373D] absolute" />
            <span className="text-[#03373D] font-bold text-sm uppercase tracking-wider ml-2">
              Our Comprehensive Services
            </span>
          </div>
          
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#1F1F1F] mb-6 leading-tight">
            Logistics Solutions for <br />
            {/* Animation Feature 3: Gradient Text Animation */}
            <motion.span 
              animate={{ backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] }}
              transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
              className="text-transparent bg-clip-text bg-gradient-to-r from-[#03373D] via-[#045d66] to-[#03373D] bg-[length:200%_auto]"
            >
              Every Business Need
            </motion.span>
          </h1>
          
          <p className="text-lg text-gray-600 leading-relaxed">
            From local deliveries to global shipping, we provide tailored solutions
            to streamline your supply chain and grow your business.
          </p>
        </motion.div>
      </div>

      {/* Features Grid */}
      <div className="container mx-auto px-4 relative z-10 mb-24">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 lg:gap-8"
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{ 
                y: -12, 
                boxShadow: "0 20px 40px -5px rgba(0, 0, 0, 0.1)" 
              }}
              className="group bg-white rounded-2xl p-8 shadow-lg transition-all duration-300 border border-gray-100 relative overflow-hidden"
            >
              {/* Animation Feature 4: Hover Gradient Reveal */}
              <div className="absolute inset-0 bg-gradient-to-br from-[#B8E55C]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              <div className="relative z-10">
                {/* Icon Container */}
                <motion.div 
                  className="w-14 h-14 rounded-2xl bg-[#f0fdf4] flex items-center justify-center mb-6 group-hover:bg-[#03373D] transition-colors duration-300"
                  whileHover={{ rotate: 360, scale: 1.1 }}
                  transition={{ duration: 0.5 }}
                >
                  {/* Animation Feature 5: Icon Rotation & Color Swap */}
                  <feature.icon className="w-7 h-7 text-[#03373D] group-hover:text-[#B8E55C] transition-colors duration-300" />
                </motion.div>

                {/* Content */}
                <h3 className="text-xl font-bold text-[#1F1F1F] mb-3 group-hover:text-[#03373D] transition-colors duration-300">
                  {feature.title}
                </h3>
                <p className="text-gray-500 leading-relaxed text-sm group-hover:text-gray-600 transition-colors duration-300">
                  {feature.desc}
                </p>
              </div>

              {/* Animation Feature 6: Corner Decoration Scale */}
              <div className="absolute top-0 right-0 w-24 h-24 bg-[#B8E55C]/10 rounded-bl-full -mr-12 -mt-12 transition-transform duration-500 group-hover:scale-150 origin-top-right" />
              
              {/* Animation Feature 7: Bottom Border Slide */}
              <div className="absolute bottom-0 left-0 w-0 h-1 bg-[#03373D] group-hover:w-full transition-all duration-500 ease-out" />
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* New Section: Smart Digital Features (Different Layout & Type) */}
      <div className="relative w-full bg-[#03373D] py-20 overflow-hidden">
        {/* Decorative Elements */}
        <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-[#B8E55C]/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-white/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />

        <div className="container mx-auto px-4 relative z-10">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-12 mb-16">
            <div className="lg:w-1/2">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="inline-block px-4 py-1 bg-[#B8E55C] text-[#03373D] font-bold text-sm rounded-full mb-4"
              >
                SMART TECHNOLOGY
              </motion.div>
              <motion.h2 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-3xl md:text-4xl font-bold text-white mb-6"
              >
                Digital Logistics Ecosystem
              </motion.h2>
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="text-gray-300 text-lg leading-relaxed"
              >
                We combine physical logistics with cutting-edge technology to provide 
                complete visibility and control over your supply chain. Experience 
                the future of shipping.
              </motion.p>
            </div>
            
            <div className="lg:w-1/2 flex gap-4">
              <div className="grid grid-cols-2 gap-4 w-full">
                {[
                  { title: "AI Routing", value: "30% Faster" },
                  { title: "Paperless", value: "100% Digital" },
                  { title: "Tracking", value: "Real-Time" },
                  { title: "Support", value: "AI Bot + Human" }
                ].map((stat, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="bg-white/10 backdrop-blur-sm p-6 rounded-xl border border-white/10 text-center hover:bg-white/20 transition-colors"
                  >
                    <div className="text-[#B8E55C] font-bold text-xl mb-1">{stat.value}</div>
                    <div className="text-gray-300 text-sm">{stat.title}</div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Smart Mobile App",
                desc: "Track shipments, book pickups, and manage payments all from your pocket.",
                color: "from-blue-500 to-cyan-500"
              },
              {
                title: "Instant API Integration",
                desc: "Seamlessly connect your e-commerce store for automated shipping orders.",
                color: "from-purple-500 to-pink-500"
              },
              {
                title: "Predictive Analytics",
                desc: "Get insights on delivery times and optimize your inventory planning.",
                color: "from-[#B8E55C] to-green-500"
              }
            ].map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 + (idx * 0.2) }}
                className="bg-[#0B0B0B]/50 p-8 rounded-2xl border border-white/5 hover:border-[#B8E55C]/30 transition-all group"
              >
                <div className={`w-12 h-12 rounded-lg bg-gradient-to-r ${item.color} mb-6 flex items-center justify-center opacity-80 group-hover:opacity-100 transition-opacity`}>
                   <div className="w-6 h-6 bg-white/20 rounded-md" />
                </div>
                <h3 className="text-xl font-bold text-white mb-3 group-hover:text-[#B8E55C] transition-colors">{item.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServicesPage;
