import { useQuery } from "@tanstack/react-query";
import useAxiosSecoir from "../../Hook/useAxiosSecoir";
import Loding from "../../Shared/Loding";
import { MdCancel, MdCheckCircle, MdOutlineRateReview } from "react-icons/md";
import { toast } from "sonner";
import Swal from "sweetalert2";
import { useState } from "react";

const AllDrivers = () => {
  const axiosSecoir = useAxiosSecoir();
  const [modalData, setModalData] = useState([]);

  // Pagitions Add Now
  const [page, setPage] = useState(1);
  const [allRider, setAllRider] = useState(0);
  const limit = 9;
  const skip = (page - 1) * limit;
  const totalPage = Math.ceil(allRider / limit)
  const { refetch, data, isLoading } = useQuery({
    queryKey: ["test", "pending",page],
    queryFn: async () =>
      await axiosSecoir.get(`/riders?limit=${limit}&skip=${skip}`)
    .then((res) => {

      setAllRider(res.data.total)
      return res.data;
    }),
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

  const handelViewAll = (item) => {
    setModalData(item);
    document.getElementById("rider_info_modal").showModal();
  };

  const handelCloseModal = () => {
    setModalData([]);
  };

  console.log(modalData);

  if (isLoading) {
    return <Loding></Loding>;
  }

  return (
    <div>
      <div className=" p-6  ">
        <h2 className="text-2xl font-semibold mb-6 text-gray-800">
          All Rider : {data.total}
        </h2>
        <div className="">
          <div className="mt-6">
            <div className="overflow-x-auto bg-white rounded-xl shadow-lg border border-gray-100">
              <table className="min-w-full text-sm">
                <thead className="bg-gray-100 text-left text-gray-700">
                  <tr>
                    <th className="p-4 font-semibold">Srl No</th>
                    <th className="p-4 px-10 md:px-0 font-semibold">Raider</th>
                    <th className="p-4 px-7 md:px-0 font-semibold">Region</th>
                    <th className="p-4 px-10 md:px-0  font-semibold">
                      All Details
                    </th>
                    <th className="p-4 px-10 md:px-0 font-semibold">
                      Submit Date{" "}
                    </th>
                    <th className="p-4 px-5 md:px-0 font-semibold">
                      Work Status
                    </th>
                    <th className="p-4 px-5 md:px-0 font-semibold">
                      Delivery Status
                    </th>
                    <th className="p-4 font-semibold">Action</th>
                  </tr>
                </thead>

                <tbody>
                  {data.result.map((item, i) => (
                    <tr
                      key={i}
                      className="border-b border-gray-200 hover:bg-gray-50 transition"
                    >
                      {/* Serial */}
                      <td className=" pl-6 font-medium text-gray-900">
                        {i + 1}
                      </td>

                      {/* Profile Info */}
                      <td className="py-4 px-4 md:px-0">
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
                            <p className="font-semibold  text-gray-900">
                              {item.yourEmail}
                            </p>
                          </div>
                        </div>
                      </td>

                      {/* Sender Info */}
                      <td className="py-4 px-7 md:px-0">
                        <p className="font-semibold text-gray-900 text-[16px]">
                          {item.yourRegion}
                        </p>
                        <p className="font-semibold text-gray-800 text-[15px]">
                          {item.yourDistrict}
                        </p>
                      </td>

                      {/* Delivery Status */}
                      <td className="py-4 px-10 md:px-0 text-gray-800">
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
                      <td className="py-4 px-10 md:px-0 text-gray-800">
                        <p className="text-[17px] text-black">
                          {" "}
                          {new Date(item.creatAtime).toLocaleString()}
                        </p>
                      </td>

                      <td className="py-4 px-10 md:px-0 text-gray-800">
                        <p className="text-[17px] text-black">
                          {item.workStatus}
                        </p>
                      </td>

                      <td className="p-4 px-5 md:px-0 font-semibold">
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

                          {/* View */}
                          <button
                            onClick={() => handelViewAll(item)}
                            className="px-5 py-1.5 rounded-md
             text-gray-900 border border-green-300 flex items-center gap-2 font-semibold
            hover:shadow-md hover:-translate-y-[1px] transition-all duration-200"
                          >
                            View
                            <MdOutlineRateReview
                              className="text-green-600"
                              size={18}
                            />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
               

               {/* Paginations */}
               <div>
                
               </div>
            </div>
          </div>
        </div>
      </div>

      <dialog
        onClick={() => handelViewAll}
        id="rider_info_modal"
        className="modal modal-bottom sm:modal-middle"
      >
        <div
          className="
      modal-box 
      w-full 
      max-w-3xl 
      bg-white/90 
      backdrop-blur-xl 
      shadow-2xl 
      rounded-3xl 
      border border-gray-200 
      p-8
  "
        >
          <h3 className="font-bold text-2xl mb-6 text-gray-800 text-center">
            Rider Details
          </h3>

          {/* Image */}
          <div className="flex justify-center mb-6">
            <img
              src={modalData?.photo}
              alt="photo"
              className="w-36 h-36 rounded-2xl object-cover border border-base-300 shadow-lg"
            />
          </div>

          {/* Grid Data */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-gray-700">
            <div>
              <p className="text-sm text-gray-500">Name</p>
              <p className="font-semibold text-lg">{modalData?.yourName}</p>
            </div>

            <div>
              <p className="text-sm text-gray-500">Email</p>
              <p className="font-semibold text-lg">{modalData?.yourEmail}</p>
            </div>

            <div>
              <p className="text-sm text-gray-500">Phone</p>
              <p className="font-semibold text-lg">{modalData?.phoneNumber}</p>
            </div>

            <div>
              <p className="text-sm text-gray-500">District</p>
              <p className="font-semibold text-lg">{modalData?.yourDistrict}</p>
            </div>

            <div>
              <p className="text-sm text-gray-500">Region</p>
              <p className="font-semibold text-lg">{modalData?.yourRegion}</p>
            </div>

            <div>
              <p className="text-sm text-gray-500">Rider Role</p>
              <p className="font-semibold text-lg">{modalData?.roll}</p>
            </div>

            <div>
              <p className="text-sm text-gray-500">Bike Brand</p>
              <p className="font-semibold text-lg">
                {modalData?.bikeBrandModelAndYear}
              </p>
            </div>

            <div>
              <p className="text-sm text-gray-500">Registration No</p>
              <p className="font-semibold text-lg">
                {modalData?.bikeRegistrationNumber}
              </p>
            </div>

            <div>
              <p className="text-sm text-gray-500">License No</p>
              <p className="font-semibold text-lg">
                {modalData?.drivingLicenseNumber}
              </p>
            </div>

            <div>
              <p className="text-sm text-gray-500">NID No</p>
              <p className="font-semibold text-lg">{modalData?.nidNo}</p>
            </div>

            <div>
              <p className="text-sm text-gray-500">Status</p>
              <p
                className={`${
                  modalData.status === "approved"
                    ? "font-semibold px-3 py-1.5 bg-green-100 text-green-700 rounded-xl inline-block"
                    : modalData.status === "rejected" &&
                      "font-semibold px-3 py-1.5 bg-red-100 text-red-600 rounded-xl inline-block"
                } `}
              >
                {modalData?.status}
              </p>
            </div>

            <div>
              <p className="text-sm text-gray-500">Created At</p>
              <p className="font-semibold text-lg">
                {modalData?.creatAtime?.slice(0, 10)}
              </p>
            </div>

            <div className="md:col-span-2">
              <p className="text-sm text-gray-500">About</p>
              <p className="font-semibold bg-gray-50 p-4 rounded-xl border mt-1 text-lg leading-relaxed">
                {modalData?.tellUsAboutYourself}
              </p>
            </div>
          </div>

          {/* Close Button */}
          <div className="modal-action mt-6 flex">
            <form method="dialog">
              <button
                onClick={handelCloseModal}
                className="px-5 py-1.5 rounded-xl bg-gradient-to-r from-red-500 to-red-600 text-white font-semibold shadow-md hover:shadow-lg hover:scale-105 transition-all duration-300"
              >
                Close
              </button>
            </form>
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default AllDrivers;
