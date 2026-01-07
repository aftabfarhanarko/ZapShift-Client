import React from "react";
import { motion } from "framer-motion";
import {
  Crown,
  ShieldCheck,
  Zap,
  Smartphone,
  Globe,
  Headset,
  ArrowRight,
} from "lucide-react";
import { Link } from "react-router";

const PremiumFeature = ({ icon: Icon, title, desc, delay }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5, delay }}
    className="bg-white/5 backdrop-blur-sm border border-white/10 p-6 rounded-2xl hover:bg-white/10 transition-colors duration-300 group"
  >
    <div className="w-12 h-12 bg-[#B8E55C]/20 rounded-xl flex items-center justify-center mb-4 group-hover:bg-[#B8E55C] transition-colors duration-300">
      <Icon className="w-6 h-6 text-[#B8E55C] group-hover:text-[#03373D] transition-colors duration-300" />
    </div>
    <h3 className="text-xl font-bold text-white mb-2">{title}</h3>
    <p className="text-gray-300 text-sm leading-relaxed">{desc}</p>
  </motion.div>
);

const TrackSearch = () => {
  return (
    <section className="bg-[#03373D] py-20 md:px-5 relative overflow-hidden rounded-xl mx-2 md:mx-4">
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-[#B8E55C]/5 skew-x-12 transform origin-top-right pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#B8E55C]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col lg:flex-row gap-12 items-center">
          {/* Left Side: Content */}
          <div className="lg:w-1/3 space-y-6">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#B8E55C]/20 text-[#B8E55C] font-semibold text-sm"
            >
              <Crown className="w-4 h-4" />
              Premium Service
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-4xl md:text-5xl font-bold text-white leading-tight"
            >
              Experience <br />
              <span className="text-[#B8E55C]">Next-Level</span> Delivery
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-gray-300 text-lg"
            >
              Unlock exclusive benefits designed for businesses and individuals
              who demand the best. Speed, security, and smart tracking all in
              one place.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
            >
              <Link to="/services">
                <button className="px-8 py-2 rounded-full bg-[#B8E55C] text-[#03373D] font-bold text-lg hover:bg-white transition-all duration-300 shadow-lg flex items-center gap-2 group">
                  Explore Premium
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>
              </Link>
            </motion.div>
          </div>

          {/* Right Side: Feature Grid */}
          <div className="lg:w-2/3 grid grid-cols-1 md:grid-cols-2 gap-6">
            <PremiumFeature
              icon={Zap}
              title="Super Fast Delivery"
              desc="Priority handling and routed delivery ensure your parcels reach their destination in record time."
              delay={0.2}
            />
            <PremiumFeature
              icon={ShieldCheck}
              title="Secure Protection"
              desc="Enhanced insurance coverage and tamper-proof packaging for your high-value items."
              delay={0.3}
            />
            <PremiumFeature
              icon={Smartphone}
              title="Smart Real-Time Tracking"
              desc="Live GPS tracking with instant notifications at every step of the journey."
              delay={0.4}
            />
            <PremiumFeature
              icon={Headset}
              title="24/7 Dedicated Support"
              desc="Direct access to our premium support team for instant query resolution."
              delay={0.5}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default TrackSearch;
