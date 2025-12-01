import { useQuery } from "@tanstack/react-query";
import useAxiosSecoir from "../../Hook/useAxiosSecoir";
import useAuth from "../../Hook/useAuth";
import Loding from "../../Shared/Loding";
import Parcel from "./Parcel";
import ParcelCard from "./Parcel";
import { FiEdit } from "react-icons/fi";
import {
  MdCheckCircle,
  MdOutlineDeleteOutline,
  MdOutlineRateReview,
} from "react-icons/md";
import Swal from "sweetalert2";
import { toast } from "sonner";
import { Link } from "react-router";
import { useRef, useState } from "react";

const MyParcel = () => {
  const { user } = useAuth();
  const axiosData = useAxiosSecoir();
  const [parcel, setParcel] = useState([]);
  const refernce = useRef();

  const { isPending, isLoading, data, refetch } = useQuery({
    queryKey: ["tododat", user?.email],
    queryFn: () =>
      axiosData.get(`parcel?email=${user?.email}`).then((respons) => {
        console.log("Task Query Data Find", respons.data.result);
        return respons.data.result;
      }),
  });

  const handelView = (item) => {
    setParcel(item);
    refernce.current.showModal();
    console.log("Detlise");
  };

  console.log(parcel);

  if (isPending) return <Loding></Loding>;
  if (isLoading) return <Loding></Loding>;

  const handelDelet = (id) => {
    Swal.fire({
      title: "Confirm Parcel Deletion",
      text: `Are you sure you want to delete this parcel? This action cannot be undone.`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, Delete",
      cancelButtonText: "No, Cancel",

      customClass: {
        popup: "rounded-2xl shadow-xl",
        title: "text-lg font-semibold text-gray-800",
        htmlContainer: "text-gray-600",
        actions: "flex gap-3 justify-end",
        confirmButton:
          "bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2 rounded-xl",
        cancelButton:
          "bg-red-500 hover:bg-red-600 text-white font-semibold px-6 py-2 rounded-xl",
      },

      buttonsStyling: false,
      backdrop: `rgba(0,0,0,0.45)`,
    }).then((result) => {
      if (result.isConfirmed) {
        axiosData
          .delete(`parcel/${id}`)
          .then((res) => {
            // task query propley refetch delet data
            refetch();
            console.log("Propley Delet Now", res);
            toast.success("Delet Now");
          })
          .catch((err) => {
            toast.warning(err?.code);
          });
        Swal.fire({
          icon: "success",
          title: "Parcel Successfully Deleted",
          text: "Your parcel has been Deletd Proprely .",
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
  };

  // payment-checkout
  const handelPayment = async (parcel) => {
    try {
      const paymentInfo = {
        totalCost: parcel?.totalCost,
        parcelid: parcel?._id,
        senderemail: parcel?.senderemail,
        percilname: parcel?.percilname,
      };
      const res = await axiosData.post("/payment-checkout", paymentInfo);
      window.location.assign(res.data.url);
    } catch (error) {
      toast.warning(error?.code);
    }
  };
  return (
    <div className=" md:p-8">
      <h1 className=" text-3xl font-semibold text-secondary ">
        My Send Parcel : {data?.length}
      </h1>
      <div className="mt-6">
        <div className="overflow-x-auto bg-white rounded-xl shadow-lg border border-gray-100">
          <table className="min-w-full text-sm">
            <thead className="bg-gray-100 text-left text-gray-700">
              <tr>
                <th className="p-4 font-semibold">Srl No</th>
                <th className="p-4 font-semibold">Parcel Info</th>
                <th className="p-4 font-semibold">Sender Info</th>
                <th className="p-4 font-semibold">Tracking Id</th>
                <th className="p-4 font-semibold">Delivery Status</th>
                <th className="p-4 font-semibold">Payment</th>
                <th className="p-4 font-semibold">Action</th>
              </tr>
            </thead>

            <tbody>
              {data.map((item, i) => (
                <tr
                  key={i}
                  className="border-b border-gray-200 hover:bg-gray-50 transition"
                >
                  {/* Serial */}
                  <td className="p-4 font-medium text-gray-900">{i + 1}</td>

                  {/* Parcel Info */}
                  <td className="p-4">
                    <p className="font-semibold text-gray-900">
                      {item?.percilname}
                    </p>
                    <p className="text-xs text-gray-500">{item?.parcelType}</p>
                  </td>

                  {/* Sender Info */}
                  <td className="p-4">
                    <p className="font-semibold text-gray-900">
                      {item?.senderRegion}
                    </p>
                    <p className="text-sm text-gray-600">
                      {item?.senderdistick}
                    </p>
                  </td>

                  {/* Tracking */}
                  <td className="p-4 text-gray-800">{item?.trakingId}</td>

                  {/* Delivery Status */}
                  <td className="p-4 md:px-4 px-8 text-gray-800">
                    <span
                      className={`px-6 py-1 rounded-xl text-xs font-medium shadow-sm
    ${
      item.deliveryStatus === "pending-pickup" &&
      "bg-yellow-50 text-yellow-600 border border-yellow-200"
    }
    ${
      item.deliveryStatus === "driver-assigned" &&
      "bg-blue-50 text-blue-600 border border-blue-200"
    }
    ${
      item.deliveryStatus === "rider-arriving" &&
      "bg-green-50 text-orange-600 border border-orange-200"
    }
    ${
      item.deliveryStatus === "parcel-picked-up" &&
      "bg-green-50 text-amber-500 border border-amber-200"
    }
    ${
      item.deliveryStatus === "parcel-delivered" &&
      "bg-green-50 text-green-700 border border-green-400"
    }
    ${
      item.deliveryStatus === "cancelled" &&
      "bg-red-50 text-red-600 border border-red-200"
    }
  `}
                    >
                      {item.deliveryStatus}
                    </span>
                  </td>

                  {/* Payment */}
                  <td className="p-4 font-semibold">
                    {item.paymentStutas === "Paid" ? (
                      <span className="text-green-600 bg-green-100 px-3 py-1 rounded-full text-xs">
                        Paid
                      </span>
                    ) : (
                      <button
                        onClick={() => handelPayment(item)}
                        className="px-5 py-1.5 bg-lime-400 text-black rounded-lg font-semibold 
                             hover:bg-lime-500 transition shadow-sm"
                      >
                        Pay
                      </button>
                    )}
                  </td>

                  {/* Actions */}
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      {/* View */}
                      <button
                        onClick={() => handelView(item)}
                        className="px-4 py-1.5 rounded-lg bg-blue-50  text-blue-800 border border-blue-300 
                             flex items-center gap-2 font-medium hover:bg-blue-100 hover:shadow-sm transition"
                      >
                        View <MdOutlineRateReview size={18} />
                      </button>

                      {/* Edit */}
                      <button
                        className="px-4 py-1.5 rounded-lg bg-white text-green-600 border border-green-300 
                                                      flex items-center gap-2 font-medium hover:bg-green-50 hover:shadow-sm transition "
                      >
                        Approved <MdCheckCircle size={16} />
                      </button>

                      {/* Delete */}
                      <button
                        onClick={() => handelDelet(item._id)}
                        className="px-4 py-1.5 rounded-lg bg-white text-red-600 border border-red-300 
                             flex items-center gap-2 font-medium hover:bg-red-50 hover:shadow-sm transition"
                      >
                        Delete <MdOutlineDeleteOutline size={20} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Open the modal using document.getElementById('ID').showModal() method */}

      <dialog ref={refernce} className="modal modal-bottom sm:modal-middle">
        <div className="modal-box">
          <div className=" p-4 md:p-5 bg-white rounded-xl shadow-lg w-full max-w-5xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-800 mb-6">
              Parcel Details
            </h2>

            {/* Sender & Receiver Info */}
            <div className="grid grid-cols-1  gap-4">
              {/* Sender Info */}
              <div className="bg-gray-100 p-5 rounded-xl">
                <h3 className="text-xl font-semibold mb-4">Sender Info</h3>

                <div className="space-y-2 text-sm">
                  <p>
                    <span className="font-semibold">Name:</span> {parcel.name}
                  </p>
                  <p>
                    <span className="font-semibold">Email:</span>{" "}
                    {parcel.senderemail}
                  </p>
                  <p>
                    <span className="font-semibold">Phone:</span>{" "}
                    {parcel.contact}
                  </p>
                  <p>
                    <span className="font-semibold">Region:</span>{" "}
                    {parcel.senderRegion}
                  </p>
                  <p>
                    <span className="font-semibold">District:</span>{" "}
                    {parcel.senderdistick}
                  </p>
                  <p>
                    <span className="font-semibold">Address:</span>{" "}
                    {parcel.addrss}
                  </p>
                  <p>
                    <span className="font-semibold">Pickup Instruction:</span>{" "}
                    {parcel.pickup}
                  </p>
                </div>
              </div>

              {/* Receiver Info */}
              <div className="bg-gray-100 p-5 rounded-xl">
                <h3 className="text-xl font-semibold mb-4">Receiver Info</h3>

                <div className="space-y-2 text-sm">
                  <p>
                    <span className="font-semibold">Name:</span>{" "}
                    {parcel.recivername}
                  </p>
                  <p>
                    <span className="font-semibold">Email:</span>{" "}
                    {parcel.reciveremail}
                  </p>
                  <p>
                    <span className="font-semibold">Phone:</span>{" "}
                    {parcel.recivercontact}
                  </p>
                  <p>
                    <span className="font-semibold">Region:</span>{" "}
                    {parcel.reciverRegion}
                  </p>
                  <p>
                    <span className="font-semibold">District:</span>{" "}
                    {parcel.reciverDistrick}
                  </p>
                  <p>
                    <span className="font-semibold">Address:</span>{" "}
                    {parcel.reciveraddrss}
                  </p>
                  <p>
                    <span className="font-semibold">Delivery Instruction:</span>{" "}
                    {parcel.delivery}
                  </p>
                </div>
              </div>
            </div>

            {/* Parcel Main Details */}
            <div className="bg-gray-100 p-5 rounded-xl mt-6">
              <h3 className="text-xl font-semibold mb-4">Parcel Details</h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <p>
                  <span className="font-semibold">Parcel Type:</span>{" "}
                  {parcel.parcelType}
                </p>

                <p>
                  <span className="font-semibold">Parcel Name:</span>{" "}
                  {parcel.percilname}
                </p>

                <p>
                  <span className="font-semibold">Weight:</span> {parcel.weight}{" "}
                  KG
                </p>

                <p>
                  <span className="font-semibold">Total Cost:</span> Tk{" "}
                  {parcel.totalCost}
                </p>

                <p>
                  <span className="font-semibold">Payment Status:</span>{" "}
                  {parcel.paymentStutas}
                </p>

                <p>
                  <span className="font-semibold">Tracking ID:</span>{" "}
                  {parcel.trakingId}
                </p>

                <p>
                  <span className="font-semibold">Created At:</span>{" "}
                  {new Date(parcel.creatAtime).toLocaleString()}
                </p>
              </div>
            </div>
          </div>

          <div className="modal-action">
            <form method="dialog">
              {/* if there is a button in form, it will close the modal */}
              <button className="px-5 py-1.5 rounded-xl bg-gradient-to-r from-red-500 to-red-600 text-white font-semibold shadow-md hover:shadow-lg hover:scale-105 transition-all duration-300">
                Close
              </button>
            </form>
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default MyParcel;
