import React from "react";
import { useForm, useWatch } from "react-hook-form";
import { useLoaderData, useNavigate } from "react-router";
import Swal from "sweetalert2";
import useAxiosSecoir from "../../Hook/useAxiosSecoir";
import useAuth from "../../Hook/useAuth";
import { toast } from "sonner";
import { motion } from "framer-motion";
import {
  Package,
  FileText,
  Box,
  User,
  Mail,
  Phone,
  MapPin,
  Truck,
  Scale,
  Send,
  Info,
  ArrowRight,
  Map,
} from "lucide-react";

const SendPricel = () => {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const naviget = useNavigate();
  const axiosApi = useAxiosSecoir();
  const { user } = useAuth();
  const serviceCenters = useLoaderData();

  const regionsert = serviceCenters.map((r) => r.region);
  const regionsDuplicate = [...new Set(regionsert)];
  const senderRegion = useWatch({ control, name: "senderRegion" });

  const reciverRegion = useWatch({ control, name: "reciverRegion" });

  const districtsByRegion = (region) => {
    const regionDistricts = serviceCenters.filter((d) => d.region === region);
    const districts = regionDistricts.map((d) => d.district);

    return districts;
  };

  const subMiteFrom = (data) => {
    // console.log("Submite Producat", data);
    const isDocument = data.parcelType === "document";
    const isSameDistrict = data.senderdistick === data.reciverDistrick;
    const parcilWight = parseFloat(data.weight);
    let cost = 0;
    if (isDocument) {
      cost = isSameDistrict ? 60 : 80;
    } else {
      if (parcilWight < 3) {
        cost = isSameDistrict ? 110 : 150;
      } else {
        const minCharge = isSameDistrict ? 110 : 150;
        const extraWeight = parcilWight - 3;
        const extraCharge = isSameDistrict
          ? extraWeight * 40
          : extraWeight * 40 + 40;
        cost = minCharge + extraCharge;
      }
    }

    data.totalCost = cost; // total delivery cost saved Database
    Swal.fire({
      title: "Confirm Delivery Cost",
      text: `Total delivery charge will be ${cost} taka. Do you want to continue?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, Confirm",
      cancelButtonText: "No, Cancel",

      customClass: {
        popup: "rounded-2xl shadow-xl",
        title: "text-lg font-semibold text-gray-800",
        htmlContainer: "text-gray-600",
        actions: "flex gap-3 justify-end",
        confirmButton:
          "bg-[#03373D] hover:bg-[#022c30] text-white font-semibold px-6 py-2 rounded-xl",
        cancelButton:
          "bg-red-500 hover:bg-red-600 text-white font-semibold px-6 py-2 rounded-xl",
      },

      buttonsStyling: false,
      backdrop: `rgba(0,0,0,0.45)`,
    }).then((result) => {
      if (result.isConfirmed) {
        axiosApi.post("parcel", data).then(() => {
          // console.log("After Data Send DB ", res.data);
          naviget("/dasbord/myparcel");
          toast.success("Your Parcel Creat Successfully");
        });
        Swal.fire({
          icon: "success",
          title: "Parcel Successfully Created",
          text: "Your parcel has been added and is now ready for processing.",
          confirmButtonText: "OK",
          customClass: {
            popup: "rounded-2xl shadow-lg",
            title: "text-lg font-bold text-green-700",
            htmlContainer: "text-gray-700",
            confirmButton:
              "bg-green-600 hover:bg-green-700 text-white font-semibold px-6 py-2 rounded-xl",
          },
          buttonsStyling: false,
        });
      }
    });

    // console.log("cost", cost);
  };

  const InputField = ({ label, icon: Icon, error, ...props }) => (
    <div className="relative">
      <label className="block text-gray-700 font-medium mb-2 text-sm ml-1">
        {label}
      </label>
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
          {Icon && <Icon size={18} />}
        </div>
        <input
          {...props}
          className={`w-full pl-10 pr-4 py-3 border ${
            error ? "border-red-500 bg-red-50" : "border-gray-200 bg-gray-50"
          } rounded-xl focus:outline-none focus:ring-2 focus:ring-[#B8E55C] focus:border-transparent transition-all duration-200 text-sm`}
        />
      </div>
      {error && (
        <p className="text-red-500 text-xs font-semibold mt-1 ml-1 flex items-center gap-1">
          <Info size={12} /> {label} is required
        </p>
      )}
    </div>
  );

  const SelectField = ({ label, icon: Icon, options, error, ...props }) => (
    <div className="relative">
      <label className="block text-gray-700 font-medium mb-2 text-sm ml-1">
        {label}
      </label>
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
          {Icon && <Icon size={18} />}
        </div>
        <select
          {...props}
          className={`w-full pl-10 pr-10 py-3 border ${
            error ? "border-red-500 bg-red-50" : "border-gray-200 bg-gray-50"
          } rounded-xl focus:outline-none focus:ring-2 focus:ring-[#B8E55C] focus:border-transparent transition-all duration-200 text-sm appearance-none`}
        >
          {props.children}
        </select>
        <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none text-gray-400">
          <ArrowRight className="rotate-90" size={16} />
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen mt-16 bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-6xl mx-auto"
      >
        {/* Header */}
        <div className="text-center mb-10">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="w-16 h-16 bg-[#B8E55C] rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg shadow-[#B8E55C]/20"
          >
            <Truck className="text-[#03373D]" size={32} />
          </motion.div>
          <h1 className="text-3xl md:text-4xl font-bold text-[#03373D] mb-2">
            Book Your Shipment
          </h1>
          <p className="text-gray-500">
            Fast, secure, and reliable delivery services
          </p>
        </div>

        <form
          onSubmit={handleSubmit(subMiteFrom)}
          className="bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100"
        >
          {/* Parcel Type Selection */}
          <div className="bg-[#03373D] p-8 text-white">
            <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
              <Package className="text-[#B8E55C]" />
              Select Parcel Type
            </h2>
            <div className="flex flex-col sm:flex-row gap-4">
              <label className="flex-1 cursor-pointer group">
                <input
                  type="radio"
                  {...register("parcelType")}
                  value="document"
                  className="peer sr-only"
                  defaultChecked
                />
                <div className="flex items-center gap-4 p-4 rounded-xl bg-white/5 border border-white/10 peer-checked:bg-[#B8E55C] peer-checked:text-[#03373D] transition-all hover:bg-white/10">
                  <div className="p-2 rounded-lg bg-white/10 peer-checked:bg-black/10">
                    <FileText size={24} />
                  </div>
                  <div>
                    <span className="block font-semibold">Document</span>
                    <span className="text-xs opacity-70 group-hover:opacity-100">
                      Letters, Files, Papers
                    </span>
                  </div>
                </div>
              </label>

              <label className="flex-1 cursor-pointer group">
                <input
                  type="radio"
                  {...register("parcelType")}
                  value="non-document"
                  className="peer sr-only"
                />
                <div className="flex items-center gap-4 p-4 rounded-xl bg-white/5 border border-white/10 peer-checked:bg-[#B8E55C] peer-checked:text-[#03373D] transition-all hover:bg-white/10">
                  <div className="p-2 rounded-lg bg-white/10 peer-checked:bg-black/10">
                    <Box size={24} />
                  </div>
                  <div>
                    <span className="block font-semibold">Non-Document</span>
                    <span className="text-xs opacity-70 group-hover:opacity-100">
                      Boxes, Items, Heavy Goods
                    </span>
                  </div>
                </div>
              </label>
            </div>
          </div>

          <div className="p-8 md:p-12">
            {/* Parcel Details */}
            <div className="mb-12">
              <h3 className="text-lg font-semibold text-[#03373D] mb-6 flex items-center gap-2 border-b border-gray-100 pb-2">
                <Info size={20} className="text-[#B8E55C]" />
                Parcel Details
              </h3>
              <div className="grid md:grid-cols-2 gap-6">
                <InputField
                  label="Parcel Name"
                  icon={Package}
                  placeholder="e.g. Electronics, Gift Box"
                  {...register("percilname", { required: true })}
                  error={errors.percilname}
                />
                <InputField
                  label="Weight (KG)"
                  icon={Scale}
                  type="number"
                  placeholder="e.g. 2.5"
                  {...register("weight", { required: true })}
                  error={errors.weight}
                />
              </div>
            </div>

            <div className="grid lg:grid-cols-2 gap-12">
              {/* Sender Section */}
              <div className="bg-gray-50/50 p-6 rounded-2xl border border-gray-100">
                <h3 className="text-lg font-semibold text-[#03373D] mb-6 flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-[#03373D]/5 flex items-center justify-center text-[#03373D]">
                    <User size={18} />
                  </div>
                  Sender Details
                </h3>
                <div className="space-y-4">
                  <InputField
                    label="Full Name"
                    icon={User}
                    defaultValue={user.displayName}
                    {...register("name", { required: true })}
                    error={errors.name}
                  />
                  <InputField
                    label="Email Address"
                    icon={Mail}
                    defaultValue={user.email}
                    readOnly
                    {...register("senderemail", { required: true })}
                    error={errors.senderemail}
                  />
                  <InputField
                    label="Phone Number"
                    icon={Phone}
                    placeholder="e.g. +880 1XXX..."
                    {...register("contact", { required: true })}
                    error={errors.contact}
                  />
                  <SelectField
                    label="Region"
                    icon={Map}
                    {...register("senderRegion")}
                    defaultValue="Pick a Sender region"
                  >
                    <option disabled>Pick a Sender region</option>
                    {regionsDuplicate.map((one, i) => (
                      <option value={one} key={i}>
                        {one}
                      </option>
                    ))}
                  </SelectField>
                  <SelectField
                    label="District"
                    icon={MapPin}
                    {...register("senderdistick", { required: true })}
                    defaultValue=" Select Sender District"
                  >
                    <option disabled> Select Sender District</option>
                    {districtsByRegion(senderRegion).map((d, i) => (
                      <option value={d} key={i}>
                        {d}
                      </option>
                    ))}
                  </SelectField>
                  <InputField
                    label="Address"
                    icon={MapPin}
                    placeholder="House, Road, Area"
                    {...register("addrss", { required: true })}
                    error={errors.addrss}
                  />
                  <div className="relative">
                    <label className="block text-gray-700 font-medium mb-2 text-sm ml-1">
                      Pickup Instructions
                    </label>
                    <textarea
                      {...register("pickup", { required: true })}
                      className={`w-full p-4 border ${
                        errors.pickup
                          ? "border-red-500 bg-red-50"
                          : "border-gray-200 bg-gray-50"
                      } rounded-xl focus:outline-none focus:ring-2 focus:ring-[#B8E55C] focus:border-transparent transition-all duration-200 text-sm h-32 resize-none`}
                      placeholder="Any specific instructions for pickup..."
                    ></textarea>
                  </div>
                </div>
              </div>

              {/* Receiver Section */}
              <div className="bg-gray-50/50 p-6 rounded-2xl border border-gray-100">
                <h3 className="text-lg font-semibold text-[#03373D] mb-6 flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-[#B8E55C]/20 flex items-center justify-center text-[#03373D]">
                    <User size={18} />
                  </div>
                  Receiver Details
                </h3>
                <div className="space-y-4">
                  <InputField
                    label="Receiver Name"
                    icon={User}
                    placeholder="Full Name"
                    {...register("recivername", { required: true })}
                    error={errors.recivername}
                  />
                  <InputField
                    label="Receiver Email"
                    icon={Mail}
                    placeholder="Email Address"
                    {...register("reciveremail", { required: true })}
                    error={errors.reciveremail}
                  />
                  <InputField
                    label="Receiver Phone"
                    icon={Phone}
                    placeholder="Phone Number"
                    {...register("recivercontact", { required: true })}
                    error={errors.recivercontact}
                  />
                  <SelectField
                    label="Region"
                    icon={Map}
                    {...register("reciverRegion")}
                    defaultValue="Pick a region"
                  >
                    <option disabled>Pick a region</option>
                    {regionsDuplicate.map((one, i) => (
                      <option value={one} key={i}>
                        {one}
                      </option>
                    ))}
                  </SelectField>
                  <SelectField
                    label="District"
                    icon={MapPin}
                    {...register("reciverDistrick")}
                    defaultValue=" Select Reciver District"
                  >
                    <option disabled> Select Reciver District</option>
                    {districtsByRegion(reciverRegion).map((d, i) => (
                      <option value={d} key={i}>
                        {d}
                      </option>
                    ))}
                  </SelectField>
                  <InputField
                    label="Address"
                    icon={MapPin}
                    placeholder="House, Road, Area"
                    {...register("reciveraddrss", { required: true })}
                    error={errors.reciveraddrss}
                  />
                  <div className="relative">
                    <label className="block text-gray-700 font-medium mb-2 text-sm ml-1">
                      Delivery Instructions
                    </label>
                    <textarea
                      {...register("delivery", { required: true })}
                      className={`w-full p-4 border ${
                        errors.delivery
                          ? "border-red-500 bg-red-50"
                          : "border-gray-200 bg-gray-50"
                      } rounded-xl focus:outline-none focus:ring-2 focus:ring-[#B8E55C] focus:border-transparent transition-all duration-200 text-sm h-32 resize-none`}
                      placeholder="Any specific instructions for delivery..."
                    ></textarea>
                  </div>
                </div>
              </div>
            </div>

            {/* Footer / Submit */}
            <div className="mt-12 pt-8 border-t border-gray-100 flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="flex items-center gap-3 text-gray-500 bg-blue-50 px-4 py-2 rounded-lg border border-blue-100">
                <Info size={18} className="text-blue-500" />
                <span className="text-sm font-medium">
                  Pickup Time: 4:00 PM – 7:00 PM (Approx)
                </span>
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full md:w-auto bg-[#B8E55C] text-[#03373D] px-10 py-4 rounded-xl font-bold shadow-lg shadow-[#B8E55C]/20 hover:shadow-xl hover:bg-[#a3d33f] transition-all flex items-center justify-center gap-3 text-lg"
              >
                Proceed to Confirm
                <Send size={20} />
              </motion.button>
            </div>
          </div>
        </form>
      </motion.div>
    </div>
  );
};

export default SendPricel;
