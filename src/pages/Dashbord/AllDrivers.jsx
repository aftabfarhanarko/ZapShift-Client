import { useQuery } from "@tanstack/react-query";
import useAxiosSecoir from "../../Hook/useAxiosSecoir";
import Loding from "../../Shared/Loding";
import { MdCancel, MdCheckCircle } from "react-icons/md";
import { toast } from "sonner";
import Swal from "sweetalert2";

const AllDrivers = () => {
  const axiosSecoir = useAxiosSecoir();
  const { refetch, data, isLoading } = useQuery({
    queryKey: ["test", "pending"],
    queryFn: async () =>
      await axiosSecoir.get("/riders").then((res) => res.data),
  });

  const updeatStutaseNow = (item, status) => {
    const info = { status: status, email: item.email };

    axiosSecoir
      .patch(`/riderUb/${item._id}`, info)
      .then((res) => {
        console.log(res.data);
        refetch();
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: `Rider has been ${status}`,
          showConfirmButton: false,
          timer: 2000,
        });
      })
      .catch((err) => {
        toast.warning(err.code);
      });
  };

  const handelUpdet = (item) => {
    updeatStutaseNow(item, "approved");
  };

  const handelRegcet = (item) => {
    updeatStutaseNow(item, "rejected");
  };

  if (isLoading) {
    return <Loding></Loding>;
  }

  return (
    <div>
    <div></div>
      <div className=" p-6  ">
        <h2 className="text-2xl font-semibold mb-6 text-gray-800">
          Rider Details
        </h2>
        <div className="">
          <div className="mt-6">
            <div className="overflow-x-auto bg-white rounded-xl shadow-lg border border-gray-100">
              <table className="min-w-full text-sm">
                <thead className="bg-gray-100 text-left text-gray-700">
                  <tr>
                    <th className="p-4 font-semibold">Srl No</th>
                    <th className="p-4 font-semibold">Raider</th>
                    <th className="p-4 font-semibold">Region</th>
                    <th className="p-4 font-semibold">All Details</th>
                    <th className="p-4 font-semibold">Submit Date </th>
                    <th className="p-4 font-semibold">Delivery Status</th>
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
                      <td className=" pl-6 font-medium text-gray-900">
                        {i + 1}
                      </td>

                      {/* Profile Info */}
                      <td className="py-4">
                        <div className=" md:flex gap-2.5 items-center">
                          <img
                            src={item.photo}
                            alt={`${item.yourName}'s Photo`}
                            className="w-20 h-20 rounded-lg object-cover border border-gray-300"
                          />
                          <div>
                            <p className="font-semibold text-md md:text-lg text-gray-900">
                              {item.yourName}
                            </p>
                            <p className="font-semibold text-gray-900">
                              {item.yourEmail}
                            </p>
                          </div>
                        </div>
                      </td>

                      {/* Sender Info */}
                      <td className="py-4">
                        <p className="font-semibold text-gray-900 text-[16px]">
                          {item.yourRegion}
                        </p>
                        <p className="font-semibold text-gray-800 text-[15px]">
                          {item.yourDistrict}
                        </p>
                      </td>

                      {/* Delivery Status */}
                      <td className="py-4 text-gray-800">
                        <p className=" text-[15px] text-gray-800">
                          NidNo : {item.nidNo}
                        </p>
                        <p className=" text-[15px] text-gray-800">
                          Phone : {item.phoneNumber}
                        </p>
                        <p className=" text-[15px] text-gray-800">
                          Bike Name : {item.bikeBrandModelAndYear}
                        </p>
                      </td>

                      {/* Tracking */}
                      <td className="py-4 text-gray-800">
                        <p className="text-[17px] text-black">
                          {" "}
                          {new Date(item.creatAtime).toLocaleString()}
                        </p>
                      </td>

                      {/* Payment */}
                      <td className="p-4 font-semibold">
                        {item.status === "pending" ||
                        item.status === "rejected" ? (
                          <span className="text-red-600  px-3 py-1 rounded-full text-md font-semibold">
                            {item.status === "rejected"
                              ? "Rejected"
                              : item.status === "pending" && "pending"}
                          </span>
                        ) : (
                          <span className="text-green-600 bg-green-100 px-3 py-1 rounded-full text-xs">
                            Approved
                          </span>
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

                          {/* Approved */}
                          <button
                            onClick={() => handelUpdet(item)}
                            className="px-4 py-1.5 rounded-lg bg-white text-green-600 border border-green-300 
                                         flex items-center gap-2 font-medium hover:bg-green-50 hover:shadow-sm transition "
                          >
                            Approved <MdCheckCircle size={16} />
                          </button>

                          {/* handelRegcet */}
                          <button
                            onClick={() => handelRegcet(item)}
                            className="px-4 py-1.5 rounded-lg bg-white text-red-600 border border-red-300 
                                         flex items-center gap-2 font-medium hover:bg-red-50 hover:shadow-sm transition"
                          >
                            Reject <MdCancel size={20} />
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
      </div>
    </div>
  );
};

export default AllDrivers;
