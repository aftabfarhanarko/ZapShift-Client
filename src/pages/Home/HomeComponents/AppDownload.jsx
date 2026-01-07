import React from "react";
import {
  Smartphone,
  Apple,
  LogIn,
  UserPlus,
  Headset,
  Map,
  ArrowRight,
  ShieldCheck,
  Zap,
} from "lucide-react";
import { motion } from "framer-motion";

const FeatureItem = ({ icon: Icon, title, desc, delay }) => (
  <motion.div
    initial={{ opacity: 0, x: 20 }}
    whileInView={{ opacity: 1, x: 0 }}
    transition={{ delay, duration: 0.5 }}
    className="flex items-start gap-4 p-4 rounded-xl bg-white/50 backdrop-blur-sm border border-base-200 hover:bg-white hover:shadow-md transition-all duration-300"
  >
    <div className="p-3 rounded-lg bg-primary/10 text-primary">
      <Icon className="w-6 h-6" />
    </div>
    <div>
      <h4 className="font-bold text-secondary text-lg">{title}</h4>
      <p className="text-secondary/70 text-sm mt-1">{desc}</p>
    </div>
  </motion.div>
);

const AppDownload = () => {
  return (
    <div className="relative overflow-hidden rounded-3xl bg-base-100 border border-base-200 hover:shadow-sm">
      {/* Decorative Background */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2 -z-10" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-secondary/5 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/2 -z-10" />

      <div className="grid lg:grid-cols-2 gap-12 p-8 md:p-16 items-center">
        {/* Left Content */}
        <div className="space-y-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="space-y-4"
          >
            <span className="px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-bold tracking-wider uppercase">
              Mobile App
            </span>
            <h2 className="text-4xl md:text-5xl font-bold text-secondary leading-tight">
              Manage Deliveries <br />
              <span className="text-primary">On The Go</span>
            </h2>
            <p className="text-lg text-secondary/70 max-w-xl">
              Get the full experience with our mobile app. Login, register,
              track shipments, and get 24/7 support right from your pocket.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="flex flex-wrap gap-4"
          >
            <button className="flex items-center gap-3 px-6 py-3 bg-secondary text-white rounded-xl font-semibold hover:bg-secondary/90 transition-all hover:-translate-y-1 shadow-lg hover:shadow-secondary/20">
              <Apple className="w-6 h-6" />
              <div className="text-left">
                <div className="text-xs opacity-80">Download on the</div>
                <div className="text-sm font-bold leading-none">App Store</div>
              </div>
            </button>
            <button className="flex items-center gap-3 px-6 py-3 bg-primary text-white rounded-xl font-semibold hover:bg-primary/90 transition-all hover:-translate-y-1 shadow-lg hover:shadow-primary/20">
              <Smartphone className="w-6 h-6" />
              <div className="text-left">
                <div className="text-xs opacity-80">Get it on</div>
                <div className="text-sm font-bold leading-none">
                  Google Play
                </div>
              </div>
            </button>
          </motion.div>

          <div className="flex items-center gap-6 pt-4 text-sm font-medium text-secondary/60">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-primary" />
              <span>Secure Login</span>
            </div>
            <div className="flex items-center gap-2">
              <Zap className="w-5 h-5 text-primary" />
              <span>Fast Setup</span>
            </div>
          </div>
        </div>

        {/* Right Content - Features Grid */}
        <div className="relative">
          <div className="grid sm:grid-cols-2 gap-4">
            <FeatureItem
              icon={LogIn}
              title="Easy Login"
              desc="Quick access with biometric and secure login options."
              delay={0.1}
            />
            <FeatureItem
              icon={UserPlus}
              title="Fast Register"
              desc="Create an account in seconds and start shipping."
              delay={0.2}
            />
            <FeatureItem
              icon={Headset}
              title="24/7 Contact"
              desc="Direct access to our support team anytime, anywhere."
              delay={0.3}
            />
            <FeatureItem
              icon={Map}
              title="Live Instructions"
              desc="Real-time tracking and delivery instructions."
              delay={0.4}
            />
          </div>

          {/* Center Phone Mockup Placeholder or Decorative Circle */}
          <div className="absolute inset-0 pointer-events-none flex items-center justify-center -z-10 opacity-10">
            <div className="w-64 h-64 rounded-full bg-primary blur-3xl" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AppDownload;
