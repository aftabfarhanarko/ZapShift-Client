import React from "react";
import { 
  FileText, 
  GlassWater, 
  Boxes, 
  Utensils, 
  Monitor, 
  Pill, 
  Shirt, 
  Gift,
  ArrowRight
} from "lucide-react";
import { motion } from "framer-motion";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 100
    }
  }
};

const TypeCard = ({ icon, title, desc }) => (
  <motion.div 
    variants={itemVariants}
    whileHover={{ y: -5 }}
    className="group relative bg-base-100 rounded-3xl p-6 border border-base-200 shadow-sm hover:shadow-2xl transition-all duration-500 overflow-hidden"
  >
    {/* Gradient Overlay on Hover */}
    <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
    
    <div className="relative z-10">
      <div className="w-16 h-16 rounded-2xl bg-base-200/50 flex items-center justify-center mb-6 group-hover:bg-primary group-hover:text-white transition-colors duration-300">
        {React.createElement(icon, { className: "w-8 h-8 text-primary group-hover:text-white transition-colors duration-300" })}
      </div>
      
      <h3 className="text-2xl font-bold text-secondary mb-3 group-hover:text-primary transition-colors duration-300">
        {title}
      </h3>
      
      <p className="text-secondary/70 text-sm leading-relaxed mb-4 font-medium">
        {desc}
      </p>

      <div className="flex items-center text-primary font-semibold text-sm opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
        <span>Learn more</span>
        <ArrowRight className="w-4 h-4 ml-2" />
      </div>
    </div>
  </motion.div>
);

const ParcelTypes = () => {
  const types = [
    { icon: FileText, title: "Documents", desc: "Secure delivery for contracts, official papers, and certificates." },
    { icon: Monitor, title: "Electronics", desc: "Safe handling for gadgets, computers, and appliances." },
    { icon: GlassWater, title: "Fragile Items", desc: "Extra care for glassware, ceramics, and delicate instruments." },
    { icon: Utensils, title: "Food & Groceries", desc: "Fast delivery for cooked meals, fresh produce, and perishables." },
    { icon: Pill, title: "Medicines", desc: "Priority delivery for pharmaceuticals and healthcare essentials." },
    { icon: Shirt, title: "Clothing", desc: "Clean handling for fashion items, textiles, and accessories." },
    { icon: Gift, title: "Gifts", desc: "Special handling for wrapped presents and seasonal surprises." },
    { icon: Boxes, title: "Bulk & Heavy", desc: "Logistics for furniture, large equipment, and multiple packages." },
  ];

  return (
    <div className="py-24  rounded-xl relative overflow-hidden">
      {/* Background Decorative Elements */}
      <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-primary/5 rounded-full blur-3xl -z-10" />
      <div className="absolute bottom-0 left-0 w-1/4 h-1/4 bg-secondary/5 rounded-full blur-3xl -z-10" />

      <div className="container mx-auto px-4">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-primary font-bold tracking-wider uppercase text-sm bg-primary/10 px-4 py-2 rounded-full">
            What We Carry
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-secondary mt-6 mb-6">
            Parcel Types We Handle
          </h2>
          <p className="text-secondary/80 font-medium max-w-2xl mx-auto text-lg leading-relaxed">
            From important documents to heavy furniture, we have specialized handling procedures for every category to ensure safe and timely delivery.
          </p>
        </motion.div>
        
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {types.map((type, index) => (
            <TypeCard 
              key={index}
              icon={type.icon} 
              title={type.title} 
              desc={type.desc} 
            />
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default ParcelTypes;

