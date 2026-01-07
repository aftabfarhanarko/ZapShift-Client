"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import CountUp from "react-countup";
import { 
  Truck, 
  Globe, 
  Clock, 
  ShieldCheck, 
  Headset, 
  Leaf, 
  Award, 
  Users, 
  TrendingUp, 
  CheckCircle2 
} from "lucide-react";
import SetPlaces from "./SetPlaces";

const tabs = [
  { id: "story", label: "Our Story" },
  { id: "mission", label: "Our Mission" },
  { id: "vision", label: "Our Vision" },
];

const content = {
  story: {
    title: "From a Question to a Revolution",
    text: [
      "ZapShift began with a simple but powerful question: How can delivery be made faster, smoother, and more predictable for everyone?",
      "From day one, we saw the challenges people faced—slow delivery, missing parcels, unclear tracking, and inconsistent service. What started as a small idea turned into a strong vision to change the logistics experience in Bangladesh.",
      "In the early days, we operated with a minimal team, a handful of routes, and a belief that technology could transform the delivery landscape. We listened closely to customers, understood their daily struggles, and shaped our system around real needs.",
      "Today, we stand as a reliable partner for delivery needs across the country, but our story is just beginning. We are writing new chapters every day alongside the customers we serve."
    ],
    image: "https://i.ibb.co.com/Z1M6n0pH/image.png"
  },
  mission: {
    title: "Smarter, Faster, Easier",
    text: [
      "Our mission is simple yet powerful: to make delivery services smarter, faster, and easier for everyone. We believe logistics shouldn’t be complicated—it should be seamless, reliable, and accessible.",
      "ZapShift is committed to creating a delivery ecosystem that blends technology with human care. We aim to offer accurate tracking, clear communication, and dependable service across all districts.",
      "Our goal is to eliminate uncertainty from the delivery process and give customers full control. Every system we build is designed to reduce delays, increase transparency, and improve efficiency."
    ],
    image: "https://i.ibb.co.com/3m37hHbS/image.png"
  },
  vision: {
    title: "Building the Future of Logistics",
    text: [
      "We dream of a Bangladesh where logistics is stress-free, fast, and transparent. With every update and innovation, we take one more step toward that future.",
      "Beyond logistics, ZapShift represents innovation, responsibility, and long-term ambition. We are continuously exploring new ways to enhance the delivery experience through smart tools, automation, and advanced analytics.",
      "Our long-term plans include expanding into rural areas to improve accessibility, empowering individuals, and strengthening business operations across the nation."
    ],
    image: "https://i.ibb.co.com/9kd6gtfh/image.png"
  }
};

// Updated stats to be numeric for CountUp
const stats = [
  { label: "Parcels Delivered", value: 5000000, suffix: "+", icon: PackageIcon },
  { label: "Happy Clients", value: 120000, suffix: "+", icon: Users },
  { label: "Countries Served", value: 200, suffix: "+", icon: Globe },
  { label: "On-Time Rate", value: 99.8, suffix: "%", decimals: 1, icon: Clock },
];

function PackageIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M16.5 9.4 7.5 4.21" />
      <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
      <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
      <line x1="12" x2="12" y1="22.08" y2="12" />
    </svg>
  );
}

export default function About() {
  const [activeTab, setActiveTab] = useState("story");

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-[#03373D] py-20 lg:py-32">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-96 h-96 bg-[#B8E55C] rounded-full blur-[100px] -translate-x-1/2 -translate-y-1/2"></div>
          <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-white rounded-full blur-[120px] translate-x-1/3 translate-y-1/3"></div>
        </div>
        
        <div className="container mx-auto px-4 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="inline-block py-1 px-3 rounded-full bg-[#B8E55C]/10 border border-[#B8E55C]/20 text-[#B8E55C] font-semibold text-sm mb-6">
              Who We Are
            </span>
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
              We Deliver More Than <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#B8E55C] to-emerald-400">
                Just Parcels
              </span>
            </h1>
            <p className="text-gray-300 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
              ZapShift is redefining logistics with heart, intelligence, and reliability. 
              We are building the future of delivery, one package at a time.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Stats Section with CountUp */}
      <section className="py-10 -mt-16 relative z-20 container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-white p-6 rounded-2xl shadow-xl border-b-4 border-[#B8E55C] flex flex-col items-center text-center hover:-translate-y-1 transition-transform duration-300"
            >
              <div className="w-12 h-12 rounded-full bg-[#f0fdf4] flex items-center justify-center mb-3">
                <stat.icon className="w-6 h-6 text-[#03373D]" />
              </div>
              <h3 className="text-3xl font-bold text-[#1F1F1F] mb-1">
                <CountUp
                  end={stat.value}
                  duration={2.5}
                  separator=","
                  decimals={stat.decimals || 0}
                  suffix={stat.suffix}
                  enableScrollSpy
                  scrollSpyOnce
                />
              </h3>
              <p className="text-sm text-gray-500 font-medium uppercase tracking-wider">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Main Content (Tabs) */}
      <section className="py-20 container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Side: Dynamic Image */}
          <div className="lg:col-span-5 relative h-full min-h-[500px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.05 }}
                transition={{ duration: 0.5 }}
                className="relative rounded-3xl overflow-hidden shadow-2xl h-full w-full bg-gray-100"
              >
                <img 
                  src={content[activeTab].image} 
                  alt={content[activeTab].title}
                  className="w-full h-full object-cover absolute inset-0"
                />
                
                {/* Overlay for depth */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#03373D]/80 via-transparent to-transparent"></div>
                
                {/* Floating Badge */}
                <div className="absolute bottom-8 left-8 right-8">
                  <div className="bg-white/10 backdrop-blur-md border border-white/20 p-6 rounded-2xl">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-10 h-10 rounded-full bg-[#B8E55C] flex items-center justify-center">
                        <TrendingUp className="w-5 h-5 text-[#03373D]" />
                      </div>
                      <span className="text-white font-bold text-lg">Growth & Impact</span>
                    </div>
                    <p className="text-gray-200 text-sm">
                      "Success for ZapShift is not just today’s achievements but tomorrow’s potential."
                    </p>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Right Side: Tabs & Content */}
          <div className="lg:col-span-7">
            <div className="flex flex-wrap gap-4 mb-10 border-b border-gray-200 pb-2">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`pb-4 text-lg font-bold transition-all relative px-2 ${
                    activeTab === tab.id
                      ? "text-[#03373D]"
                      : "text-gray-400 hover:text-gray-600"
                  }`}
                >
                  {tab.label}
                  {activeTab === tab.id && (
                    <motion.div
                      layoutId="activeTab"
                      className="absolute bottom-0 left-0 right-0 h-1 bg-[#B8E55C] rounded-full"
                    />
                  )}
                </button>
              ))}
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
              >
                <h3 className="text-3xl font-bold text-[#1F1F1F] mb-6">
                  {content[activeTab].title}
                </h3>
                <div className="space-y-4 text-gray-600 leading-relaxed text-lg">
                  {content[activeTab].text.map((paragraph, idx) => (
                    <p key={idx}>{paragraph}</p>
                  ))}
                </div>
                
                <div className="mt-8 pt-8 border-t border-gray-100 flex items-center gap-4">
                  <div className="flex -space-x-3">
                    {[1, 2, 3, 4].map((i) => (
                      <div key={i} className="w-10 h-10 rounded-full bg-gray-200 border-2 border-white flex items-center justify-center text-xs font-bold text-gray-500">
                        <Users size={14} />
                      </div>
                    ))}
                  </div>
                  <div>
                    <p className="text-sm font-bold text-[#1F1F1F]">Trust by 500+ Businesses</p>
                    <p className="text-xs text-gray-500">Join the revolution today</p>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* 6 Key Features Section */}
      <section className="py-20 bg-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-gray-50 rounded-full -translate-y-1/2 translate-x-1/2"></div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-[#1F1F1F] mb-4">
              Why We Are Different
            </h2>
            <p className="text-gray-600 text-lg">
              We combine decades of experience with cutting-edge technology to bring you 
              a logistics experience like no other.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: Globe,
                title: "Global Network",
                desc: "Seamless cross-border logistics reaching over 200 countries with ease and compliance."
              },
              {
                icon: Clock,
                title: "Real-Time Tracking",
                desc: "Monitor your shipment's journey live with our advanced GPS tracking system 24/7."
              },
              {
                icon: ShieldCheck,
                title: "Secure Handling",
                desc: "Your items are safe in our certified warehouses with professional inventory management."
              },
              {
                icon: Truck,
                title: "Express Delivery",
                desc: "Lightning-fast shipping options for your urgent parcels within city limits."
              },
              {
                icon: Headset,
                title: "24/7 Support",
                desc: "Our dedicated support team is always available to assist you with any queries."
              },
              {
                icon: Leaf,
                title: "Eco-Friendly",
                desc: "Committed to sustainable logistics with optimized routes to reduce carbon footprint."
              }
            ].map((feature, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="group p-8 rounded-2xl bg-gray-50 hover:bg-white border border-gray-100 hover:border-[#B8E55C]/30 hover:shadow-xl transition-all duration-300"
              >
                <div className="w-14 h-14 bg-white rounded-xl shadow-sm flex items-center justify-center mb-6 group-hover:bg-[#B8E55C] transition-colors duration-300">
                  <feature.icon className="w-7 h-7 text-[#03373D] group-hover:text-white transition-colors duration-300" />
                </div>
                <h3 className="text-xl font-bold text-[#1F1F1F] mb-3 group-hover:text-[#03373D] transition-colors">
                  {feature.title}
                </h3>
                <p className="text-gray-500 leading-relaxed group-hover:text-gray-600">
                  {feature.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      

      <section className=" py-20 bg-white relative overflow-hidden">
        <SetPlaces />

      </section>
    </div>
  );
}
