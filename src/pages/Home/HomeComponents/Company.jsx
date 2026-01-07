import React from "react";
import one2 from "../../../assets/brands/amazon_vector.png";
import one3 from "../../../assets/brands/casio.png";
import one4 from "../../../assets/brands/moonstar.png";
import one5 from "../../../assets/brands/randstad.png";
import one6 from "../../../assets/brands/star.png";
import one7 from "../../../assets/brands/start_people.png";
import Marquee from "react-fast-marquee";

const Company = () => {
  const brands = [one2, one3, one4, one5, one6, one7];

  return (
    <div className="py-16">
      <div className="container mx-auto px-4 text-center">
        <span className="text-secondary font-bold tracking-wider uppercase text-sm opacity-60">
          Trusted Partners
        </span>
        <h2 className="text-2xl md:text-3xl font-bold text-secondary mt-3 mb-10">
          We've helped thousands of sales teams
        </h2>

        <div className="relative">
          {/* Gradient Edges for Smooth Fade */}
          <div className="absolute left-0 top-0 bottom-0 w-20  to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-20  to-transparent z-10 pointer-events-none" />

          <Marquee
            className="flex items-center py-4"
            speed={40}
            gradient={false}
            pauseOnHover={true}
          >
            {brands.map((brand, index) => (
              <div 
                key={index} 
                className="mx-12 opacity-50 hover:opacity-100 transition-opacity duration-300 cursor-pointer grayscale hover:grayscale-0"
              >
                <img 
                  src={brand} 
                  alt={`Brand ${index + 1}`} 
                  className="h-8 md:h-10 w-auto object-contain"
                />
              </div>
            ))}
            {/* Duplicate for seamless loop if needed, though Marquee handles it */}
            {brands.map((brand, index) => (
              <div 
                key={`dup-${index}`} 
                className="mx-12 opacity-50 hover:opacity-100 transition-opacity duration-300 cursor-pointer grayscale hover:grayscale-0"
              >
                <img 
                  src={brand} 
                  alt={`Brand ${index + 1}`} 
                  className="h-8 md:h-10 w-auto object-contain"
                />
              </div>
            ))}
          </Marquee>
        </div>
      </div>
    </div>
  );
};

export default Company;
