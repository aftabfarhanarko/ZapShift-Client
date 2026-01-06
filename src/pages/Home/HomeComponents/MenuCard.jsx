import React, { use } from "react";

import top from "../../../assets/customer-top.png";
import ReviewCard from "./ReviewCard";

const MenuCard = ({ reivewPromis }) => {
  const reviews = use(reivewPromis);
  const display = reviews.slice(0, 3);

  return (
    <div className="max-w-6xl mx-auto">
      <img src={top} className="mx-auto my-8"></img>

      <h1 className="text-3xl font-bold text-secondary  text-center">
        What our customers are sayings
      </h1>
      <p className="text-thried max-w-[420px] mx-auto mt-2  text-center font-medium">
        Enhance posture, mobility, and well-being effortlessly with Posture Pro.
        Achieve proper alignment, reduce pain, and strengthen your body with
        ease!
      </p>
      <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {display.map((review) => (
          <ReviewCard key={review.id} data={review} />
        ))}
      </div>

    </div>
  );
};

export default MenuCard;
