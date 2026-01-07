import React from "react";
import { motion } from "framer-motion";
import { Map, Bell, Wallet, ShieldCheck, Magnet } from "lucide-react";

const SecondBanner = () => {
  const features = [
    {
      icon: Magnet,
      title: "Live Map Tracking",
      desc: "Watch your delivery in real-time on our interactive map interface.",
    },
    {
      icon: Bell,
      title: "Instant Alerts",
      desc: "Get push notifications for every status update, from pickup to drop-off.",
    },
    {
      icon: Wallet,
      title: "Digital Wallet",
      desc: "Seamless cashless payments and instant earnings withdrawal.",
    },
    {
      icon: ShieldCheck,
      title: "Verified Riders",
      desc: "100% background-checked delivery partners for your safety.",
    },
  ];

  return (
    <section className="">
      <div className=" px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-20">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold text-[#03373D] mb-4"
          >
            Powerful App Features
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-lg text-gray-500 max-w-2xl mx-auto"
          >
            Everything you need to manage deliveries efficiently, right at your
            fingertips.
          </motion.p>
        </div>

        {/* Features Grid - Hexagon Style */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 text-center relative z-10">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group flex flex-col items-center border md:border-0 p-6 md:p-0 border-gray-300 rounded-xl"
            >
              {/* Hexagon Container */}
              <div className="relative w-32 h-36 mb-6 flex items-center justify-center transition-transform duration-300 group-hover:scale-110">
                {/* Hexagon Shape Background */}
                <div
                  className="absolute inset-0 bg-[#B8E55C]/80 group-hover:bg-[#B8E55C] transition-colors duration-300"
                  style={{
                    clipPath:
                      "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)",
                  }}
                />

                {/* Inner Icon */}
                <feature.icon className="relative z-10 w-12 h-12 text-[#03373D] group-hover:text-[#03373D] transition-colors duration-300" />
              </div>

              <h3 className="text-xl font-bold text-[#03373D] mb-3 group-hover:text-[#B8E55C] transition-colors duration-300">
                {feature.title}
              </h3>

              <p className="text-gray-500 leading-relaxed text-sm px-4">
                {feature.desc}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Bottom Decorative Bar */}
        <div className="mt-16 relative h-16 w-full hidden md:block">
          <div
            className="absolute inset-x-0 bottom-0 h-12 bg-[#03373D]"
            style={{
              clipPath:
                "polygon(0% 100%, 100% 100%, 100% 0%, 87.5% 100%, 75% 0%, 62.5% 100%, 50% 0%, 37.5% 100%, 25% 0%, 12.5% 100%, 0% 0%)",
            }}
          ></div>
        </div>
      </div>
    </section>
  );
};

export default SecondBanner;
