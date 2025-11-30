import { useQuery } from "@tanstack/react-query";
import React, { useRef, useState } from "react";
import useAxiosSecoir from "../../../Hook/useAxiosSecoir";
import Loding from "../../../Shared/Loding";
import { MdCheckCircle, MdOutlineDeleteOutline } from "react-icons/md";
import { toast } from "sonner";

const AssinRider = () => {
  const [parcelSet, setParcelSet] = useState(null);
  const axioSecore = useAxiosSecoir();
  const referen = useRef();
  const { data: parcel, isLoading } = useQuery({
    queryKey: ["parcel", "pending-pickup"],
    queryFn: async () => {
      const data = await axioSecore.get("parcel?deliveryStatus=pending-pickup");
      return data.data.result;
    },
  });

  console.log("Total Pickup Parcel", parcel);

  const { data: rider = [], refetch } = useQuery({
    queryKey: ["riders", parcelSet?.reciverDistrick, "available"],
    enabled: !!parcelSet,
    queryFn: async () => {
      const res = await axioSecore.get(
        `ridereas?status=approved&yourDistrict=${parcelSet?.reciverDistrick}&workStatus=available`
      );
      console.log(res.data);

      return res.data;
    },
  });

  console.log(rider);

  const riderAssing = (item) => {
    setParcelSet(item);
    referen.current.showModal();
    toast.success("Assing Rider");
  };

  const handelAssinRider = (ride) => {
    const riderInfo = {
      riderId: ride._id,
      riderEmail: ride.yourEmail,
      riderName: ride.yourName,
    };
    axioSecore.patch(`parcel/${parcelSet._id}`, riderInfo).then((res) => {
      if (res.data.modifiedCount) {
        referen.current.close();
        refetch();
        toast.success("Raider Assing Successfully");
      }
      // console.log(res.data);
    });
    // console.log("Assing");
  };

  if (isLoading) {
    return <Loding></Loding>;
  }
  return (
    <div className=" py-10 px-3 md:px-10">
      <h1> Assin RiderL:{parcel?.length}</h1>
      <div className="overflow-x-auto bg-white rounded-xl shadow-lg border border-gray-100">
        <table className="min-w-full text-sm">
          <thead className="bg-gray-100 text-left text-gray-700">
            <tr>
              <th className="p-4 font-semibold">Srl No</th>
              <th className="p-4 font-semibold">Parcel Name</th>
              <th className="p-4 font-semibold">Reciver Info</th>
              <th className="p-4 font-semibold">Tracking Id</th>
              <th className="p-4 font-semibold">Creat Time</th>
              <th className="p-4 font-semibold">Cost</th>
              <th className="p-4 font-semibold">Action</th>
            </tr>
          </thead>

          <tbody>
            {parcel.map((item, i) => (
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
                    {item?.reciverRegion}
                  </p>
                  <p className="text-sm text-gray-600">
                    {item?.reciverDistrick}
                  </p>
                </td>

                {/* Tracking */}
                <td className="p-4 text-gray-800">{item?.trakingId}</td>

                <td className="p-4 text-gray-800">
                  {new Date(item.creatAtime).toLocaleString()}
                </td>

                {/* Payment */}
                <td className="p-4 font-semibold">
                  <p className=" text-red-500">${item.totalCost}</p>
                </td>

                {/* Actions */}
                <td className="p-4">
                  <button
                    onClick={() => riderAssing(item)}
                    className="px-4 py-1.5 rounded-lg bg-green-50 text-green-600 border border-green-300  hover:scale-105 
                                                            flex items-center gap-2 font-medium hover:bg-green-50 hover:shadow-sm transition "
                  >
                    Find Rider <MdCheckCircle size={16} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Open the modal using document.getElementById('ID').showModal() method */}
      <dialog ref={referen} className="modal modal-bottom sm:modal-middle">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Total Riders : {rider.length}</h3>
          <table className="min-w-full text-sm mt-4">
            <thead className="bg-gray-100 text-left text-gray-700">
              <tr>
                <th className="p-4 font-semibold">Srl No</th>
                <th className="p-4 font-semibold">Rider Name</th>
                <th className="p-4 font-semibold">Rider Email</th>
                <th className="p-4 font-semibold">Action</th>
              </tr>
            </thead>

            <tbody>
              {rider.map((item, i) => (
                <tr
                  key={i}
                  className="border-b border-gray-200 hover:bg-gray-50 transition"
                >
                  {/* Serial */}
                  <td className="p-4 font-medium text-gray-900">{i + 1}</td>

                  <td className="p-4">
                    <p className="font-semibold text-gray-900">
                      {item?.yourName}
                    </p>
                    <p className="text-xs text-gray-500">{item?.parcelType}</p>
                  </td>

                  <td className="p-4">
                    <p className="font-semibold text-gray-900">
                      {item?.yourEmail}
                    </p>
                  </td>

                  <td className="p-4">
                    <button
                      onClick={() => handelAssinRider(item)}
                      className="px-4 py-1.5 rounded-lg bg-green-50 text-green-600 border border-green-300  hover:scale-105 
                                                            flex items-center gap-2 font-medium hover:bg-green-50 hover:shadow-sm transition "
                    >
                      Assign <MdCheckCircle size={16} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="modal-action">
            <form method="dialog">
              {/* if there is a button in form, it will close the modal */}
               <button className="px-3 py-1 rounded-md bg-gradient-to-r from-red-500 to-red-600 text-white font-semibold shadow-md hover:shadow-lg hover:scale-105 transition-all duration-300">
                Close
              </button>
            </form>
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default AssinRider;
