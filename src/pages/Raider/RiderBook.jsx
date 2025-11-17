import { useForm } from "react-hook-form";
import rider from "../../assets/agent-pending.png";
const RiderBook = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handelData = (data) => {
    console.log(data);
  };

  return (
    <div className="bg-white min-h-[80vh] rounded-lg my-20">
      <div className=" p-5 md:p-15 py-12 md:py-15 ">
        <div>
          <h1 className=" text-3xl font-bold text-secondary">Be a Rider</h1>
          <p className="max-w-[500px] text-md font-medium text-thried mt-2.5 text-justify">
            Enjoy fast, reliable parcel delivery with real-time tracking and
            zero hassle. From personal packages to business shipments — we
            deliver on time, every time.
          </p>
        </div>

        <div className=" flex flex-col-reverse md:flex-row  md:justify-between  md:items-center">
          {/* Form Section */}
          <div className="bg-white border  border-base-300 rounded-lg mt-10   p-6 sm:p-8 md:p-10">
            <h2 className="text-xl  font-bold text-thried mb-6 sm:mb-8">
              Tell us about yourself
            </h2>

            <form onSubmit={handleSubmit(handelData)} className="space-y-3.5">
              {/* Name & Age Row */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                <div>
                  <label className="block text-gray-900 font-medium mb-2 text-sm sm:text-base">
                    Your Name
                  </label>
                  <input
                    type="text"
                    {...register("name", { required: true })}
                    placeholder="Your Name"
                    className="w-full px-4 py-2.5 md:py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-lime-400 focus:border-transparent text-sm md:text-base"
                  />
                  {errors.name?.type === "required" && (
                    <p className="text-red-500 text-xs font-semibold mt-1">
                      Please Fillup Name
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-gray-900 font-medium mb-2 text-sm sm:text-base">
                    Yor Ageo
                  </label>
                  <input
                    type="number"
                    name="age"
                    {...register("age", { required: true })}
                    placeholder="Yor age"
                    className="w-full px-4 py-2.5 md:py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-lime-400 focus:border-transparent text-sm md:text-base"
                  />
                  {errors.age?.type === "required" && (
                    <p className="text-red-500 text-xs font-semibold mt-1">
                      Please Fillup Your Ageo
                    </p>
                  )}
                </div>
              </div>

              {/* Email & City Row */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                <div>
                  <label className="block text-gray-900 font-medium mb-2 text-sm sm:text-base">
                    Your Email
                  </label>
                  <input
                    type="email"
                    {...register("email", { required: true })}
                    placeholder="Your Email"
                    className="w-full px-4 py-2.5 md:py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-lime-400 focus:border-transparent text-sm md:text-base"
                  />
                  {errors.email?.type === "required" && (
                    <p className="text-red-500 text-xs font-semibold mt-1">
                      Fillup Your Email
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-gray-900 font-medium mb-2 text-sm sm:text-base">
                    Your City
                  </label>
                  <select
                    name="city"
                    {...register("city", { required: true })}
                    className="w-full px-4 py-2.5 md:py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-lime-400 focus:border-transparent text-sm md:text-base text-gray-500"
                  >
                    <option value="">Select your region</option>
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
              </div>

              {/* NID & Contact Row */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                <div>
                  <label className="block text-gray-900 font-medium mb-2 text-sm sm:text-base">
                    NID No
                  </label>
                  <input
                    type="number"
                    name="nid"
                    {...register("nid", { required: true })}
                    placeholder="NID"
                    className="w-full px-4 py-2.5 md:py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-lime-400 focus:border-transparent text-sm md:text-base"
                  />
                  {errors.nid?.type === "required" && (
                    <p className="text-red-500 text-xs font-semibold mt-1">
                      Please Fillup Your NID No
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-gray-900 font-medium mb-2 text-sm sm:text-base">
                    Contact
                  </label>
                  <input
                    type="tel"
                    name="contact"
                    {...register("contact", { required: true })}
                    placeholder="Contact"
                    className="w-full px-4 py-2.5 md:py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-lime-400 focus:border-transparent text-sm md:text-base"
                  />
                  {errors.contact?.type === "required" && (
                    <p className="text-red-500 text-xs font-semibold mt-1">
                      Please Provied Your Ph Number
                    </p>
                  )}
                </div>
              </div>

              {/* Wire-house Selection */}
              <div>
                <label className="block text-gray-900 font-medium mb-2 text-sm sm:text-base">
                  Which wire-house you want to work?
                </label>
                <select
                  name="house"
                  {...register("house", { required: true })}
                  className="w-full px-4 py-2.5 md:py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-lime-400 focus:border-transparent text-sm md:text-base text-gray-500"
                >
                  <option value="">Select wire-house</option>
                  <option value="dhaka-central">Dhaka Central Warehouse</option>
                  <option value="chittagong-port">
                    Chittagong Port Warehouse
                  </option>
                  <option value="sylhet-north">Sylhet North Warehouse</option>
                  <option value="rajshahi-west">Rajshahi West Warehouse</option>
                </select>
                {errors.house?.type === "required" && (
                  <p className="text-red-500 text-xs font-semibold mt-1">
                    Provied your House Sections
                  </p>
                )}
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full bg-lime-400 hover:bg-lime-500 text-gray-900 font-semibold py-2.5 md:py-3 rounded-lg transition duration-200 text-sm md:text-base shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
              >
                Submit
              </button>
            </form>
          </div>

          <div>
            <div className=" bg-base-300 h-full rounded-xl mt-7 md:mt-0">
              <img src={rider}></img>
            </div>
            <p className=" text-lg font-semibold mt-2.5 text-center text-secondary">
              Delivery Men
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RiderBook;
