import { useQuery } from "@tanstack/react-query";
import useAxiosSecoir from "../../Hook/useAxiosSecoir";
import useAuth from "../../Hook/useAuth";
import Loding from "../../Shared/Loding";
import Parcel from "./Parcel";
import ParcelCard from "./Parcel";
import { Link } from "lucide-react";
import { FiEdit } from "react-icons/fi";
import { MdOutlineDeleteOutline, MdOutlineRateReview } from "react-icons/md";
import Swal from "sweetalert2";
import { toast } from "sonner";

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
            toast.success("Delet Now")
          })
          .catch((err) => {
            console.log(err?.code);
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

  return (
    <div>
      <h1 className=" text-2xl font-bold mt-5  mb-10">
        My Send Parcel : {data?.length}
      </h1>
      <div className=" ">
        <div className="overflow-x-auto bg-white rounded-xl shadow">
          <table className="min-w-full text-sm">
            <thead className="bg-base-300 text-left">
              <tr>
                <th className="p-4">Srl No</th>
                <th className="p-4">Parcel Info</th>
                <th className="p-4">Sender Info</th>
                <th className="p-4">Reciver Info</th>
                <th className="p-4">Tracking Number</th>
                <th className="p-4">Total Cost</th>
                <th className="p-4">Action</th>
              </tr>
            </thead>

            <tbody>
              {data.map((item, i) => (
                <tr
                  key={i}
                  className="border-b border-base-300 hover:bg-gray-100"
                >
                  {/* Parcel Info */}
                  <td className=" p-4">
                    <p className="font-medium">{i + 1}</p>
                  </td>
                  <td className="p-4">
                    <p className="font-semibold">{item.percilname}</p>
                    <p className="font-xs">{item.parcelType}</p>
                  </td>

                  {/* Recipient Info */}
                  <td className="p-4">
                    <p className="font-semibold">{item.senderRegion}</p>
                    <p className="font-medium">{item.senderdistick}</p>
                  </td>
                  {/* Recipient Info */}
                  <td className="p-4">
                    {/* <p className="font-semibold">{item.percilname}</p> */}

                    <p className="text-zinc-800 font-medium">
                      {item.reciverRegion}
                    </p>
                    <p className="text-zinc-800">{item.reciverDistrick}</p>
                  </td>

                  {/* Tracking */}
                  <td className="p-4">{item.recivercontact}</td>

                  {/* Payment */}
                  <td className="p-4 text-green-600 font-semibold">
                    ৳ {item.totalCost}{" "}
                    <span className="text-red-500">(Panding)</span>
                  </td>

                  {/* Action */}
                  <td className="p-4 flex gap-3 items-center">
                    <div className="flex items-center gap-3">
                      {/* View Button */}
                      <button
                        className="px-4 py-1.5 rounded-xl bg-[#e8f4ee] text-zinc-800 border border-zinc-200 
                     flex items-center gap-2 font-semibold shadow-sm
                     hover:bg-[#d9edef] hover:shadow transition-all"
                      >
                        View <MdOutlineRateReview size={18} />
                      </button>

                      {/* Edit Button */}
                      <button
                        className="px-4 py-1.5 rounded-xl bg-white text-secondary-600 border border-primary 
                     flex items-center gap-2 font-semibold shadow-sm
                     hover:bg-blue-50 hover:shadow transition-all"
                      >
                        Edit <FiEdit size={16} />
                      </button>

                      {/* Delete Button */}
                      <button
                        onClick={() => handelDelet(item._id)}
                        className="px-4 py-1.5 rounded-xl bg-white text-red-600 border border-red-300 
                     flex items-center gap-2 font-semibold shadow-sm
                     hover:bg-red-50 hover:shadow transition-all"
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
