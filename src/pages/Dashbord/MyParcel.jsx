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

const MyParcel = () => {
  const { user } = useAuth();
  const axiosData = useAxiosSecoir();

  const { isPending, isLoading, data, refetch } = useQuery({
    queryKey: ["tododat", user?.email],
    queryFn: () =>
      axiosData.get(`parcel?email=${user?.email}`).then((respons) => {
        console.log("Task Query Data Find", respons.data.result);
        return respons.data.result;
      }),
  });

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
      <h1 className=" text-2xl font-bold mt-5  mb-10 ">
        {/* My Send Parcel : {data?.length} */}
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
                  <td className="p-4 text-gray-800">
                    <span
                      className={`px-3 py-1 rounded-xl text-xs font-medium shadow-sm
    ${
      item.deliveryStatus === "pending-pickup" &&
      "bg-yellow-50 text-yellow-700 border border-yellow-200"
    }
    ${
      item.deliveryStatus === "delivering" &&
      "bg-blue-50 text-blue-600 border border-blue-200"
    }
    ${
      item.deliveryStatus === "delivered" &&
      "bg-green-50 text-green-700 border border-green-200"
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
                      {/* <button
                        className="px-4 py-1.5 rounded-lg bg-[#e8f4ee] text-gray-800 border border-gray-200 
                             flex items-center gap-2 font-medium hover:bg-[#d9edef] hover:shadow-sm transition"
                      >
                        View <MdOutlineRateReview size={18} />
                      </button> */}

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
    </div>
  );
};

export default MyParcel;
