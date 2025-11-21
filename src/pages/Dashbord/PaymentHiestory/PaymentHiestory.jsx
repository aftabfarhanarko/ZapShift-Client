import React from "react";
import useAxiosSecoir from "../../../Hook/useAxiosSecoir";
import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../Hook/useAuth";
import Loding from "../../../Shared/Loding";

const PaymentHiestory = () => {
  const { user } = useAuth();
  const axiosSecoir = useAxiosSecoir();
  const { data: history = [], isLoading } = useQuery({
    queryKey: ["idd", user?.email],
    queryFn: () =>
      axiosSecoir.get(`/payment?email=${user?.email}`).then((res) => {
        return res?.data;
      }),
  });

  //   console.log(data);

  if (isLoading) {
    return <Loding></Loding>;
  }
  return (
    <div className="md:p-9">
      
      <h2 className="text-3xl font-semibold text-secondary">Total Payment Hiestory : {history.length}</h2>

      <div className="mt-8">
        <div className="bg-white shadow-lg rounded-xl overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead className="bg-gray-100 text-gray-700 text-left">
              <tr>
                <th className="p-4 font-semibold">Srl</th>
                <th className="p-4 font-semibold">Parcel Info</th>
                <th className="p-4 font-semibold">Customer Email</th>
                <th className="p-4 font-semibold">Amount</th>
                <th className="p-4 font-semibold">Transaction ID</th>
                <th className="p-4 font-semibold">Payment Status</th>
                <th className="p-4 font-semibold">Paid At</th>
              </tr>
            </thead>

            <tbody>
              {history?.map((item, i) => (
                <tr
                  key={i}
                  className="border-b border-gray-200 hover:bg-gray-50 transition"
                >
                  {/* Serial */}
                  <td className="p-4 font-medium text-gray-800">{i + 1}</td>

                  {/* Parcel Info */}
                  <td className="p-4">
                    <p className="font-semibold text-gray-900">
                      {item.parcelName}
                    </p>
                    <p className="text-xs text-gray-500">ID: {item.parcelid}</p>
                  </td>

                  {/* Customer Email */}
                  <td className="p-4 text-gray-700">{item.customerEmail}</td>

                  {/* Amount */}
                  <td className="p-4 font-semibold text-gray-900">
                    ${item.amount}
                  </td>

                  {/* Transaction ID */}
                  <td className="p-4 text-blue-600 font-medium">
                    {item.transactionId}
                  </td>

                  {/* Payment Status */}
                  <td className="p-4">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold 
                  ${
                    item.paymentStatus === "paid"
                      ? "bg-green-100 text-green-700"
                      : "bg-red-100 text-red-600"
                  }`}
                    >
                      {item.paymentStatus}
                    </span>
                  </td>

                  {/* Paid At */}
                  <td className="p-4 text-gray-700">
                    {new Date(item.paidAt).toLocaleString()}
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

export default PaymentHiestory;
