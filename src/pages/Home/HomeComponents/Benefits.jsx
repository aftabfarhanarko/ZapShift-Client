import React from "react";
import { ShieldCheck, Truck, Clock, CreditCard, MapPinned } from "lucide-react";
import { motion } from "framer-motion";
import deliveryManImg from "../../../assets/big-deliveryman.png"; // Importing the image

const Benefits = () => {
  const benefitsList = [
    {
      icon: ShieldCheck,
      title: "Safe & Secure Handling",
      desc: "Every parcel is handled with care and insured against damage.",
    },
    {
      icon: Truck,
      title: "Nationwide Coverage",
      desc: "We deliver to every corner of Bangladesh, rural or urban.",
    },
    {
      icon: Clock,
      title: "Super Fast Delivery",
      desc: "Express delivery options to get your package there on time.",
    },
    {
      icon: MapPinned,
      title: "Real-Time Tracking",
      desc: "Track your shipment live from pickup to doorstep.",
    },
  ];

  return (
    <section className="py-12 md:py-20 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
          {/* Left Side - Image */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="w-full lg:w-1/2 relative order-2 lg:order-1 mt-8 lg:mt-0"
          >
            <div className="absolute inset-0 bg-[#B8E55C]/20 rounded-full blur-3xl transform -translate-x-10 translate-y-10" />
            <img
              src={deliveryManImg}
              alt="Professional Delivery Man"
              className="relative z-10 w-full max-w-sm md:max-w-md lg:max-w-lg mx-auto drop-shadow-2xl"
            />
            {/* Floating Badge */}
            <motion.div
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5, type: "spring" }}
              className="absolute bottom-4 -right-2 md:bottom-10 md:right-10 bg-white p-3 md:p-4 rounded-2xl shadow-xl z-20 border border-gray-100"
            >
              <div className="flex items-center gap-2 md:gap-3">
                <div className="bg-[#03373D] p-1.5 md:p-2 rounded-full">
                  <ShieldCheck className="text-[#B8E55C] w-5 h-5 md:w-6 md:h-6" />
                </div>
                <div>
                  <p className="text-[10px] md:text-xs text-gray-500 font-bold uppercase">
                    Trusted By
                  </p>
                  <p className="text-sm md:text-lg font-bold text-[#03373D]">
                    10k+ Users
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Right Side - Content */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="w-full lg:w-1/2 order-1 lg:order-2 text-center lg:text-left"
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#03373D] mb-4 md:mb-6 leading-tight">
              We Deliver <span className="text-[#B8E55C]">Trust</span>{" "}
              <br className="hidden md:block" />
              Not Just Packages
            </h2>
            <p className="text-base md:text-lg text-gray-500 mb-8 md:mb-10 leading-relaxed max-w-2xl mx-auto lg:mx-0">
              Experience the most reliable logistics service tailored for your
              personal and business needs. We ensure your items reach their
              destination safely and on time.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 gap-6 md:gap-8 text-left">
              {benefitsList.map((item, index) => (
                <div
                  key={index}
                  className="flex gap-4 md:gap-5 group items-start p-4 md:p-0 bg-gray-50 md:bg-transparent rounded-2xl md:rounded-none hover:bg-white md:hover:bg-transparent transition-colors md:shadow-none shadow-sm border border-gray-100 md:border-none"
                >
                  <div className="shrink-0 w-12 h-12 md:w-14 md:h-14 rounded-2xl bg-[#03373D]/5 flex items-center justify-center group-hover:bg-[#03373D] transition-colors duration-300">
                    <item.icon className="w-6 h-6 md:w-7 md:h-7 text-[#03373D] group-hover:text-[#B8E55C] transition-colors duration-300" />
                  </div>
                  <div>
                    <h3 className="text-lg md:text-xl font-bold text-[#03373D] mb-1 md:mb-2">
                      {item.title}
                    </h3>
                    <p className="text-sm md:text-base text-gray-500 leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Benefits;
