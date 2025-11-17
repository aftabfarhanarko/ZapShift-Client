import React from "react";
import { useForm } from "react-hook-form";

const SendPricel = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const subMiteFrom = (data) => {
    console.log("Submite Producat", data);
    
  };

  return (
    <div>
      <form
        onSubmit={handleSubmit(subMiteFrom)}
        className="w-full max-w-6xl mx-auto bg-white p-8 md:p-12 rounded-xl shadow-sm my-20"
      >
        {/* Title */}
        <h1 className="text-3xl font-bold  text-secondary mb-8">Add Parcel</h1>

        <div className="border-t pt-6">
          {/* Section Title */}
          <h2 className="text-2xl font-semibold text-secondary  mb-6">
            Enter your parcel details
          </h2>
          {/* Document Type */}
          <div className="flex items-center gap-6 mb-6">
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="radio" value="document" {...register("type1")} />
              <span className="text-md font-semibold">Document</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="radio" value="non-document" {...register("type2")} />
              <span className="text-md font-semibold">Not-Document</span>
            </label>
          </div>

          {/* Parcel Inputs */}
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-gray-900 font-medium mb-2 text-sm sm:text-base">
                Parcel Name
              </label>
              <input
                type="text"
                {...register("percilname", { required: true })}
                placeholder="Select percilname"
                className="w-full px-4 py-2 md:py-2 border border-black/50 placeholder:text-black/90 rounded-lg focus:outline-none focus:ring-2 focus:ring-lime-400 focus:border-transparent text-sm md:text-base"
              />
              {errors.percilname?.type === "required" && (
                <p className="text-red-500 text-xs font-semibold mt-1">
                  Please Fillup Producat Name
                </p>
              )}
            </div>

            <div>
              <label className="block text-gray-900 font-medium mb-2 text-sm sm:text-base">
                Parcel Weight (KG)
              </label>
              <input
                type="number"
                name="number"
                {...register("weight", { required: true })}
                placeholder="Parcel Weight (KG)"
                className="w-full px-4 py-2 border border-black/50 placeholder:text-black/90 rounded-lg focus:outline-none focus:ring-2 focus:ring-lime-400 focus:border-transparent text-sm md:text-base"
              />
              {errors.weight?.type === "required" && (
                <p className="text-red-500 text-xs font-semibold mt-1">
                  Please Provied Producat Weight
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Sender + Receiver */}
        <div className="grid md:grid-cols-2 gap-10 mt-10  ">
          {/* Sender */}
          <div className=" border-t md:border-0 pt-4 md:pt-0 border-b pb-4  md:pb-0 border-base-300">
            <h3 className="font-semibold text-lg text-secondary mb-3">
              Sender Details
            </h3>
            <div className=" space-y-5 mt-4 md:mt-7">
              {/* Name & Age Row */}

              <div>
                <label className="block text-gray-900 font-medium mb-2 text-sm sm:text-base">
                  Sender Name
                </label>
                <input
                  type="text"
                  {...register("name", { required: true })}
                  placeholder="Sender Name"
                  className="w-full px-4 py-2.5 md:py-3 border  rounded-lg focus:outline-none focus:ring-2 focus:ring-lime-400 focus:border-transparent text-sm  border-black/50 placeholder:text-black/90  md:text-base"
                />
                {errors.name?.type === "required" && (
                  <p className="text-red-500 text-xs font-semibold mt-1">
                    Please Fillup Name
                  </p>
                )}
              </div>

              <div>
                <label className="block text-gray-900 font-medium mb-2 text-sm sm:text-base">
                 Sender Address
                </label>
                <input
                  type="text"
                  {...register("addrss", { required: true })}
                  placeholder="sender addrss"
                  className="w-full px-4 py-2.5 md:py-3 border border-black/50 placeholder:text-black/90 rounded-lg focus:outline-none focus:ring-2 focus:ring-lime-400 focus:border-transparent text-sm md:text-base"
                />
                {errors.addrss?.type === "required" && (
                  <p className="text-red-500 text-xs font-semibold mt-1">
                    Please Provied Sender Addrss
                  </p>
                )}
              </div>

              <div>
                <label className="block text-gray-900 font-medium mb-2 text-sm sm:text-base">
                  Sender Phone No
                </label>
                <input
                  type="tel"
                  name="contact"
                  {...register("contact", { required: true })}
                  placeholder="Sender Phone No"
                  className="w-full px-4 py-2.5 md:py-3 border border-black/50 placeholder:text-black/90 rounded-lg focus:outline-none focus:ring-2 focus:ring-lime-400 focus:border-transparent text-sm md:text-base"
                />
                {errors.contact?.type === "required" && (
                  <p className="text-red-500 text-xs font-semibold mt-1">
                    Please Provied Sender Phone No
                  </p>
                )}
              </div>

              <div>
                <label className="block text-gray-900 font-medium mb-2 text-sm sm:text-base">
                  Sender District
                </label>
                <select
                  name="city"
                  {...register("city", { required: true })}
                  className="w-full px-4 py-2.5 md:py-3 border border-black/50 placeholder:text-black/90 rounded-lg focus:outline-none focus:ring-2 focus:ring-lime-400 focus:border-transparent text-sm text-gray-500 md:text-base "
                >
                  <option value="">Select Sender District</option>
                  <option value="dhaka">Dhaka</option>
                  <option value="chittagong">Chittagong</option>
                  <option value="rajshahi">Rajshahi</option>
                  <option value="khulna">Khulna</option>
                  <option value="sylhet">Sylhet</option>
                  <option value="rangpur">Rangpur</option>
                  <option value="barisal">Barisal</option>
                  <option value="mymensingh">Mymensingh</option>
                </select>
                {errors.city?.type === "required" && (
                  <p className="text-red-500 text-xs font-semibold mt-1">
                    Fillup Your City
                  </p>
                )}
              </div>

              {/* Pickup Instruction */}
              <div>
                <label className="block text-gray-900 font-medium mb-2 text-sm sm:text-base">
                  Pickup Instruction
                </label>
                <div className="w-full ">
                  <textarea
                    {...register("pickup", { required: true })}
                    placeholder="Pickup Instruction"
                    className="w-full px-4 py-2.5 md:py-3 border border-black/50 placeholder:text-black/90 rounded-lg 
               focus:outline-none focus:ring-2 focus:ring-lime-400 
               focus:border-transparent text-sm md:text-base"
                  ></textarea>
                </div>
                {errors.pickup?.type === "required" && (
                  <p className="text-red-500 text-xs font-semibold mt-1">
                    Please Provied Pickup Instruction
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Receiver */}
          <div className=" mt-10 md:mt-0 border-t md:border-0 pt-4 md:pt-0 border-b pb-4  md:pb-0 border-base-300">
            <h3 className="font-semibold text-lg text-secondary mb-3">
              Receiver Details
            </h3>
            <div className=" space-y-5 mt-4 md:mt-7">
              {/* Name & Age Row */}

              <div>
                <label className="block text-gray-900 font-medium mb-2 text-sm sm:text-base">
                  Receiver Name
                </label>
                <input
                  type="text"
                  {...register("recivername", { required: true })}
                  placeholder="Receiver Name"
                  className="w-full px-4 py-2.5 md:py-3 border border-black/50 placeholder:text-black/90 rounded-lg focus:outline-none focus:ring-2 focus:ring-lime-400 focus:border-transparent text-sm md:text-base"
                />
                {errors.recivername?.type === "required" && (
                  <p className="text-red-500 text-xs font-semibold mt-1">
                    Please Reciver Name Provied
                  </p>
                )}
              </div>

              <div>
                <label className="block text-gray-900 font-medium mb-2 text-sm sm:text-base">
                  Receiver Address
                </label>
                <input
                  type="text"
                  {...register("reciveraddrss", { required: true })}
                  placeholder="Receiver Address"
                  className="w-full px-4 py-2.5 md:py-3 border border-black/50 placeholder:text-black/90 rounded-lg focus:outline-none focus:ring-2 focus:ring-lime-400 focus:border-transparent text-sm md:text-base"
                />
                {errors.reciveraddrss?.type === "required" && (
                  <p className="text-red-500 text-xs font-semibold mt-1">
                    Provied Reciver Addrss
                  </p>
                )}
              </div>

              <div>
                <label className="block text-gray-900 font-medium mb-2 text-sm sm:text-base">
                  Receiver Phone No
                </label>
                <input
                  type="tel"
                  {...register("recivercontact", { required: true })}
                  placeholder="Receiver Phone No"
                  className="w-full px-4 py-2.5 md:py-3 border border-black/50 placeholder:text-black/90 rounded-lg focus:outline-none focus:ring-2 focus:ring-lime-400 focus:border-transparent text-sm md:text-base"
                />
                {errors.recivercontact?.type === "required" && (
                  <p className="text-red-500 text-xs font-semibold mt-1">
                    Receiver Phone No
                  </p>
                )}
              </div>

              <div>
                <label className="block text-gray-900 font-medium mb-2 text-sm sm:text-base">
                  Reciver District
                </label>
                <select
                  {...register("recivercity", { required: true })}
                  className="w-full px-4 py-2.5 md:py-3 border border-black/50 placeholder:text-black/90 text-gray-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-lime-400 focus:border-transparent text-sm md:text-base "
                >
                  <option value="">Select Reciver District</option>
                  <option value="dhaka">Dhaka</option>
                  <option value="chittagong">Chittagong</option>
                  <option value="rajshahi">Rajshahi</option>
                  <option value="khulna">Khulna</option>
                  <option value="sylhet">Sylhet</option>
                  <option value="rangpur">Rangpur</option>
                  <option value="barisal">Barisal</option>
                  <option value="mymensingh">Mymensingh</option>
                </select>
                {errors.recivercity?.type === "required" && (
                  <p className="text-red-500 text-xs font-semibold mt-1">
                    Reciver City
                  </p>
                )}
              </div>

              {/* Pickup Instruction */}
              <div>
                <label className="block text-gray-900 font-medium mb-2 text-sm sm:text-base">
                  Delivery instruction
                </label>
                <div className="w-full ">
                  <textarea
                    {...register("delivery", { required: true })}
                    placeholder="Delivery instruction"
                    className="w-full px-4 py-2.5 md:py-3 border border-black/50 placeholder:text-black/90 rounded-lg 
               focus:outline-none focus:ring-2 focus:ring-lime-400 
               focus:border-transparent text-sm md:text-base"
                  ></textarea>
                </div>
                {errors.delivery?.type === "required" && (
                  <p className="text-red-500 text-xs font-semibold mt-1">
                    Provied Delivery instruction
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>

        <p className="text-lg font-semibold text-secondary  mt-4">
          * Pickup Time 4pm–7pm Approx.
        </p>

        {/* Buttons */}
        <div className="flex gap-4 mt-8">
          <button className="btn bg-[#B7E651] border-none px-10 shadow hover:bg-[#A3D33F]">
            Proceed to Confirm Booking
          </button>
        </div>
      </form>
    </div>
  );
};

export default SendPricel;
