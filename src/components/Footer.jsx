import React from "react";
import logo from "/loogo-8.png";
import {
  Facebook,
  Linkedin,
  Youtube,
  Twitter,
  Instagram,
  MapPin,
  Phone,
  Mail,
  ArrowRight,
} from "lucide-react";
import { Link } from "react-router";

const Footer = () => {
  return (
    <footer className="bg-[#0f172a] text-white pt-20 pb-10  relative overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-secondary/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2 pointer-events-none" />

      <div className="container mx-auto px-6 lg:px-12 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 mb-16">
          {/* Column 1: Brand & About */}
          <div className="space-y-6">
            <Link to="/" className="inline-block">
              <img
                src={logo}
                alt="Parcel Logo"
                className="h-24 w-auto object-contain"
              />
            </Link>
            <p className="text-gray-400 leading-relaxed text-sm">
              Experience the future of logistics with Parcel. We provide secure,
              fast, and reliable parcel delivery services tailored to your needs
              across the globe.
            </p>
            <div className="flex gap-4">
              {[
                { icon: Facebook, href: "#", color: "hover:bg-[#1877F2]" },
                { icon: Twitter, href: "#", color: "hover:bg-[#1DA1F2]" },
                { icon: Linkedin, href: "#", color: "hover:bg-[#0A66C2]" },
                { icon: Instagram, href: "#", color: "hover:bg-[#E4405F]" },
                { icon: Youtube, href: "#", color: "hover:bg-[#FF0000]" },
              ].map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  className={`w-10 h-10 flex items-center justify-center rounded-full bg-white/5 text-white/70 transition-all duration-300 hover:text-white hover:-translate-y-1 ${social.color}`}
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h3 className="text-lg font-bold mb-6 text-white relative inline-block after:content-[''] after:absolute after:-bottom-2 after:left-0 after:w-12 after:h-1 after:bg-primary after:rounded-full">
              Quick Links
            </h3>
            <ul className="space-y-4">
              {["Home", "Services", "Track Parcel", "Pricing", "About Us"].map(
                (item) => (
                  <li key={item}>
                    <Link
                      to="#"
                      className="text-gray-400 hover:text-primary transition-colors flex items-center gap-2 group"
                    >
                      <ArrowRight className="w-4 h-4 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                      {item}
                    </Link>
                  </li>
                )
              )}
            </ul>
          </div>

          {/* Column 3: Contact Info */}
          <div>
            <h3 className="text-lg font-bold mb-6 text-white relative inline-block after:content-[''] after:absolute after:-bottom-2 after:left-0 after:w-12 after:h-1 after:bg-primary after:rounded-full">
              Get In Touch
            </h3>
            <ul className="space-y-6">
              <li className="flex items-start gap-4 text-gray-400 group">
                <div className="p-2 rounded-lg bg-white/5 group-hover:bg-primary/20 group-hover:text-primary transition-colors">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-white font-medium mb-1">Our Location</h4>
                  <p className="text-sm">123 Rangpur, Bangladesh </p>
                </div>
              </li>
              <li className="flex items-start gap-4 text-gray-400 group">
                <div className="p-2 rounded-lg bg-white/5 group-hover:bg-primary/20 group-hover:text-primary transition-colors">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-white font-medium mb-1">Phone Number</h4>
                  <p className="text-sm">01613410880</p>
                </div>
              </li>
              <li className="flex items-start gap-4 text-gray-400 group">
                <div className="p-2 rounded-lg bg-white/5 group-hover:bg-primary/20 group-hover:text-primary transition-colors">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-white font-medium mb-1">Email Address</h4>
                  <p className="text-sm">aftabfarhan324@gmail.com</p>
                </div>
              </li>
            </ul>
          </div>

          {/* Column 4: Newsletter */}
          <div>
            <h3 className="text-lg font-bold mb-6 text-white relative inline-block after:content-[''] after:absolute after:-bottom-2 after:left-0 after:w-12 after:h-1 after:bg-primary after:rounded-full">
              Newsletter
            </h3>
            <p className="text-gray-400 text-sm mb-6 leading-relaxed">
              Subscribe to our newsletter to get the latest updates, news, and
              exclusive offers directly in your inbox.
            </p>
            <form className="space-y-3">
              <div className="relative">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 text-white placeholder:text-gray-500 focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/50 transition-all"
                />
              </div>
              <button className="w-full bg-primary hover:bg-primary/90 text-white font-bold py-3 px-6 rounded-xl transition-all shadow-lg hover:shadow-primary/25 flex items-center justify-center gap-2">
                Subscribe Now
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10 pt-8 mt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-gray-500 text-sm text-center md:text-left">
            © 2026 <span className="text-white font-semibold">Parcel</span>. All
            Rights Reserved.{" "}
            <span className="text-primary">
              Created By Aftab Farhan | React Js
            </span>
          </p>
          <div className="flex flex-wrap justify-center gap-6 text-sm text-gray-500">
            <Link to="#" className="hover:text-primary transition-colors">
              Privacy Policy
            </Link>
            <Link to="#" className="hover:text-primary transition-colors">
              Terms & Conditions
            </Link>
            <Link to="#" className="hover:text-primary transition-colors">
              Cookie Policy
            </Link>
            <Link to="#" className="hover:text-primary transition-colors">
              Sitemap
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
