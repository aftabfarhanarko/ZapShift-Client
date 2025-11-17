import React from "react";
import Logo from "../Shared/Logo";
import { FacebookIcon, LinkedinIcon, Youtube } from "lucide-react";

const Footer = () => {
  return (
    <div className="">
      <footer className="bg-black rounded-3xl p-12 md:p-16 max-w-7xl w-full shadow-2xl">
        <div className="text-center">
          {/* Logo Section */}
          <div className="mb-8">
            <div className="flex text-white items-center justify-center gap-3 mb-5">
              <Logo></Logo>
            </div>
            
            <p className="text-gray-400 text-base md:text-lg leading-relaxed max-w-2xl mx-auto px-4">
              Enjoy fast, reliable parcel delivery with real-time tracking and zero hassle. From personal packages to business shipments — we deliver on time, every time.
            </p>
          </div>

          {/* Navigation Links */}
          <nav className="flex flex-wrap justify-center gap-6 md:gap-8 mb-8">
            <a href="#services" className="text-white hover:text-lime-300 transition-colors duration-300 text-sm md:text-base">
              Services
            </a>
            <a href="#coverage" className="text-white hover:text-lime-300 transition-colors duration-300 text-sm md:text-base">
              Coverage
            </a>
            <a href="#about" className="text-white hover:text-lime-300 transition-colors duration-300 text-sm md:text-base">
              About Us
            </a>
            <a href="#pricing" className="text-white hover:text-lime-300 transition-colors duration-300 text-sm md:text-base">
              Pricing
            </a>
            <a href="#blog" className="text-white hover:text-lime-300 transition-colors duration-300 text-sm md:text-base">
              Blog
            </a>
            <a href="#contact" className="text-white hover:text-lime-300 transition-colors duration-300 text-sm md:text-base">
              Contact
            </a>
          </nav>

          {/* Social Icons */}
          <div className="flex justify-center gap-4">
            <a 
              href="#" 
              className="w-11 h-11 bg-blue-600 rounded-full flex items-center justify-center hover:-translate-y-1 transition-transform duration-300"
              aria-label="LinkedIn"
            >
              <LinkedinIcon className="w-5 h-5 text-white" />
            </a>
            
            <a 
              href="#" 
              className="w-11 h-11 bg-black border-2 border-white rounded-full flex items-center justify-center hover:-translate-y-1 transition-transform duration-300"
              aria-label="Twitter"
            >
              <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="currentColor">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
              </svg>
            </a>
            
            <a 
              href="#" 
              className="w-11 h-11 bg-blue-500 rounded-full flex items-center justify-center hover:-translate-y-1 transition-transform duration-300"
              aria-label="Facebook"
            >
              <FacebookIcon className="w-5 h-5 text-white" />
            </a>
            
            <a 
              href="#" 
              className="w-11 h-11 bg-red-600 rounded-full flex items-center justify-center hover:-translate-y-1 transition-transform duration-300"
              aria-label="YouTube"
            >
              <Youtube className="w-5 h-5 text-white" />
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
