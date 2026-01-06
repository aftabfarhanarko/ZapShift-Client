import React from "react";

const ReviewCard = ({ data }) => {
  const {
    userName,
    user_photoURL,
    ratings,
    review,
    user_email,
    pick_up_email,
    delivery_email,
    parcel_id,
    date,
  } = data;
  return (
    <div className="max-w-2xl w-full bg-white border border-gray-100 rounded-3xl p-7 shadow-lg transition-all duration-300 hover:shadow-2xl hover:-translate-y-0.5">
      <div className="flex justify-between items-start">
        <div className="flex items-center gap-4">
          <img
            src={user_photoURL}
            alt={userName}
            className="w-14 h-14 rounded-full object-cover shadow-md ring-2 ring-primary/60"
          />
          <div>
            <h2 className="text-xl font-semibold text-gray-900">{userName}</h2>
            <p className="text-sm text-gray-500">{user_email}</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex gap-1">
            {[...Array(5)].map((_, index) => (
              <span
                key={index}
                className={`text-lg ${
                  index < Math.floor(ratings)
                    ? "text-yellow-400"
                    : "text-gray-300"
                }`}
              >
                ★
              </span>
            ))}
          </div>
          <span className="text-gray-700 text-sm font-semibold">
            {Number(ratings).toFixed(1)}
          </span>
        </div>
      </div>
      <p className="text-gray-700 leading-relaxed mt-4 text-[15px]">{review}</p>
      <div className="w-full h-px bg-gray-200 my-5"></div>
      <div className="bg-gray-50 p-5 rounded-2xl border border-gray-200 shadow-sm grid grid-cols-1 md:grid-cols-2 gap-3">
        <Info label="Pickup Email" value={pick_up_email} />
        <Info label="Delivery Email" value={delivery_email} />
        <Info label="Parcel ID" value={parcel_id} />
        <Info label="Date" value={new Date(date).toLocaleDateString()} />
      </div>
    </div>
  );
};

function Info({ label, value }) {
  return (
    <p className="text-sm text-gray-700 mb-1.5">
      <span className="font-semibold text-gray-900">{label}:</span>{" "}
      <span className="text-gray-600">{value}</span>
    </p>
  );
}

export default ReviewCard;
