import React from "react";
import { Link } from "react-router";
import { Send, Search, UserPlus, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

const ActionCard = ({ icon: Icon, title, desc, to, href, delay }) => {
  const content = (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
      whileHover={{ y: -5 }}
      className="group bg-white rounded-3xl p-6 h-full shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 relative overflow-hidden"
    >
      <div className="absolute top-0 right-0 w-24 h-24 bg-[#B8E55C]/10 rounded-bl-full -mr-4 -mt-4 transition-transform group-hover:scale-110" />

      <div className="relative z-10">
        <div className="w-14 h-14 rounded-2xl bg-[#03373D] flex items-center justify-center mb-6 group-hover:bg-[#B8E55C] transition-colors duration-300 shadow-md">
          <Icon className="w-7 h-7 text-white group-hover:text-[#03373D] transition-colors duration-300" />
        </div>

        <h3 className="text-xl font-bold text-[#03373D] mb-2">{title}</h3>
        <p className="text-gray-500 text-sm mb-4 leading-relaxed">{desc}</p>

        <div className="flex items-center text-[#03373D] font-semibold text-sm group-hover:text-[#03373D]/80">
          Get Started{" "}
          <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
        </div>
      </div>
    </motion.div>
  );

  if (to) {
    return (
      <Link to={to} className="block h-full">
        {content}
      </Link>
    );
  }
  return (
    <a href={href} className="block h-full">
      {content}
    </a>
  );
};

const QuickActions = () => {
  return (
    <div className="container mx-auto px-4 relative z-30">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <ActionCard
          icon={Send}
          title="Send Parcel"
          desc="Experience hassle-free shipping with our secure and fast delivery network."
          to="/send_parcel"
          delay={0}
        />
        <ActionCard
          icon={Search}
          title="Track Parcel"
          desc="Real-time updates on your package location with our advanced tracking system."
          href="#track"
          delay={0.1}
        />
        <ActionCard
          icon={UserPlus}
          title="Join as Rider"
          desc="Become a partner in our delivery network and earn competitive rates."
          to="/raider"
          delay={0.2}
        />
      </div>
    </div>
  );
};

export default QuickActions;
