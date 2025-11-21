import React, { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router";
import useAxiosSecoir from "../../../Hook/useAxiosSecoir";
import { ArrowRight, CheckCircle2, Download } from "lucide-react";
import { motion } from "framer-motion";
import Loding from "../../../Shared/Loding";

const SuccessPage = () => {
  const [searchParems] = useSearchParams();
  const [loding, setLoding] = useState(false);
  const axiosSecoir = useAxiosSecoir();
  const [allId, setAllId] = useState({});
  const sectionsId = searchParems.get("session_id");
  console.log(sectionsId);

  useEffect(() => {
    setLoding(true);
    if (sectionsId) {
      axiosSecoir
        .patch(`/success-payment?session_id=${sectionsId}`)
        .then((res) => {
          console.log(res.data);
          setAllId({
            trakingId: res.data.trakingId,
            transactionId: res.data.transactionId,
          });
          setLoding(false);
        });
    }
  }, [sectionsId, axiosSecoir]);

  if (loding) {
    return <Loding></Loding>;
  }

  return (
    <div className="min-h-[80vh] flex items-center justify-center bg-gradient-to-br from-white via-slate-50 to-slate-100 p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="w-full max-w-xl bg-white rounded-3xl shadow-2xl p-8 md:p-10 border border-gray-200/80 backdrop-blur-sm"
      >
        {/* Header */}
        <div className="flex items-center gap-4">
          <div className="p-3 rounded-full bg-green-100 text-green-600 ring-2 ring-green-200/60 shadow-inner">
            <CheckCircle2 size={30} />
          </div>

          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-slate-900 tracking-tight">
              Payment Successful
            </h1>
            <p className="text-sm text-slate-500 mt-1">
              Your transaction has been completed successfully.
            </p>
          </div>
        </div>

        {/* Info Cards */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="rounded-2xl border border-gray-200 bg-slate-50 p-5 shadow-sm hover:shadow-md transition-all">
            <p className="text-xs text-slate-600 uppercase font-semibold">
              Transaction ID
            </p>
            <p className="mt-2 text-sm font-bold text-slate-900 break-all">
              {allId.transactionId}
            </p>
          </div>

          <div className="rounded-2xl border border-gray-200 bg-slate-50 p-5 shadow-sm hover:shadow-md transition-all">
            <p className="text-xs text-slate-600 uppercase font-semibold">
              Payment Status
            </p>
            <p className="mt-2 text-lg font-bold text-green-600">PAID ✔</p>
          </div>

          {/* Tracking Section */}
          <div className="md:col-span-2 rounded-2xl border border-gray-200 bg-white p-5 shadow-sm hover:shadow-md transition-all">
            <p className="text-xs text-slate-600 uppercase font-semibold">
              Tracking ID
            </p>

            <div className="mt-3 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
              <div>
                <p className="text-sm text-slate-800 font-medium">
                  Your Tracking Code:
                </p>
                <p className="text-sm font-semibold text-slate-900 mt-1 break-all">
                  {allId.trakingId}
                </p>
                <p className="text-xs text-slate-400 mt-1">
                  A receipt has been sent to your email.
                </p>
              </div>

              <div className="flex items-center gap-3">
                <button className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg border border-gray-300 text-sm font-medium text-slate-700 bg-white hover:bg-slate-50 shadow-sm transition">
                  <Download size={16} />
                  Receipt
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Buttons */}
        <div className="mt-8 flex flex-col md:flex-row items-center justify-end gap-3">
          <Link
            to={"/dasbord/myparcel"}
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-lg bg-gradient-to-r from-lime-500 to-green-600 text-white font-semibold shadow-md hover:shadow-lg hover:scale-[1.02] transition-transform"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              className="w-4 h-4"
            >
              <path d="M3 12h18M3 12l6-6M3 12l6 6" />
            </svg>
            Go to My Parcel Page
          </Link>
        </div>

        {/* Footer */}
        <div className="mt-8 text-center text-xs text-slate-400">
          <p>
            If you didn’t expect this payment, contact support at
            <span className="font-medium text-slate-600">
              {" "}
              support@yourcompany.com
            </span>
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default SuccessPage;
