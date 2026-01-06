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
import {
  Search,
  Filter,
  Download,
  Package,
  Truck,
  CheckCircle,
  Clock,
  DollarSign,
  FileText,
  Calendar,
} from "lucide-react";
import jsPDF from "jspdf";
import "jspdf-autotable";
import Swal from "sweetalert2";
import { toast } from "sonner";
import { Link } from "react-router";
import { useRef, useState, useMemo } from "react";

const MyParcel = () => {
  const { user } = useAuth();
  const axiosData = useAxiosSecoir();
  const [parcel, setParcel] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [sortBy, setSortBy] = useState("Newest");
  const refernce = useRef();

  const { isPending, isLoading, data = [], refetch } = useQuery({
    queryKey: ["tododat", user?.email],
    queryFn: () =>
      axiosData.get(`parcel?email=${user?.email}`).then((respons) => {
        // console.log("Task Query Data Find", respons.data.result);
        return respons.data.result || [];
      }),
  });

  // Derived Data & Stats
  const { filteredData, stats } = useMemo(() => {
    let processed = [...(data || [])];

    // 1. Filter by Status
    if (statusFilter !== "All") {
      processed = processed.filter((item) => item.deliveryStatus === statusFilter);
    }

    // 2. Search
    if (searchTerm) {
      const lowerTerm = searchTerm.toLowerCase();
      processed = processed.filter(
        (item) =>
          item.percilname?.toLowerCase().includes(lowerTerm) ||
          item.parcelType?.toLowerCase().includes(lowerTerm) ||
          item.trakingId?.toLowerCase().includes(lowerTerm)
      );
    }

    // 3. Sort
    processed.sort((a, b) => {
      if (sortBy === "Newest") return new Date(b.creatAtime) - new Date(a.creatAtime);
      if (sortBy === "Oldest") return new Date(a.creatAtime) - new Date(b.creatAtime);
      if (sortBy === "PriceHigh") return b.totalCost - a.totalCost;
      if (sortBy === "PriceLow") return a.totalCost - b.totalCost;
      return 0;
    });

    // Stats Calculation
    const totalCost = (data || []).reduce((acc, curr) => acc + (parseFloat(curr.totalCost) || 0), 0);
    const deliveredCount = (data || []).filter((p) => p.deliveryStatus === "parcel-delivered").length;
    const pendingCount = (data || []).filter((p) => p.deliveryStatus === "pending-pickup").length;

    return {
      filteredData: processed,
      stats: {
        totalParcels: (data || []).length,
        totalCost,
        deliveredCount,
        pendingCount,
      },
    };
  }, [data, searchTerm, statusFilter, sortBy]);

  const handleDownloadPDF = () => {
    const doc = new jsPDF();
    doc.text("My Parcel Report", 14, 20);
    doc.setFontSize(10);
    doc.text(`Generated on: ${new Date().toLocaleDateString()}`, 14, 26);

    const tableColumn = ["Tracking ID", "Parcel Name", "Type", "Status", "Cost", "Date"];
    const tableRows = [];

    filteredData.forEach((item) => {
      const rowData = [
        item.trakingId,
        item.percilname,
        item.parcelType,
        item.deliveryStatus,
        `${item.totalCost} Tk`,
        new Date(item.creatAtime).toLocaleDateString(),
      ];
      tableRows.push(rowData);
    });

    doc.autoTable({
      startY: 30,
      head: [tableColumn],
      body: tableRows,
    });
    doc.save("my_parcels.pdf");
  };

  const SkeletonRow = () => (
    <tr className="animate-pulse border-b border-gray-100 dark:border-gray-800">
      <td className="p-4"><div className="h-4 w-8 bg-gray-200 dark:bg-gray-700 rounded"></div></td>
      <td className="p-4">
        <div className="space-y-2">
          <div className="h-4 w-32 bg-gray-200 dark:bg-gray-700 rounded"></div>
          <div className="h-3 w-20 bg-gray-100 dark:bg-gray-800 rounded"></div>
        </div>
      </td>
      <td className="p-4"><div className="h-4 w-24 bg-gray-200 dark:bg-gray-700 rounded"></div></td>
      <td className="p-4"><div className="h-4 w-20 bg-gray-200 dark:bg-gray-700 rounded"></div></td>
      <td className="p-4"><div className="h-6 w-24 bg-gray-200 dark:bg-gray-700 rounded-full"></div></td>
      <td className="p-4"><div className="h-6 w-16 bg-gray-200 dark:bg-gray-700 rounded-full"></div></td>
      <td className="p-4"><div className="h-8 w-32 bg-gray-200 dark:bg-gray-700 rounded"></div></td>
    </tr>
  );

  const handelView = (item) => {
    setParcel(item);
    refernce.current.showModal();
    // console.log("Detlise");
  };

  // console.log(parcel);


  const handelDelet = (id) => {
    Swal.fire({
      title: "Confirm Parcel Deletion",
      text: `Are you sure you want to delete this parcel? This action cannot be undone.`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, Delete",
      cancelButtonText: "No, Cancel",

      customClass: {
        popup: "rounded-2xl shadow-xl dark:bg-gray-800 dark:border dark:border-gray-700",
        title: "text-lg font-semibold text-gray-800 dark:text-gray-100",
        htmlContainer: "text-gray-600 dark:text-gray-300",
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
            // console.log("Propley Delet Now", res);
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
            popup: "rounded-2xl shadow-lg dark:bg-gray-800 dark:border dark:border-gray-700",
            title: "text-lg font-bold text-green-700 dark:text-green-400",
            htmlContainer: "text-gray-700 dark:text-gray-300",
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
        trakingId: parcel?.trakingId,
      };
      const res = await axiosData.post("/payment-checkout", paymentInfo);
      window.location.assign(res.data.url);
    } catch (error) {
      toast.warning(error?.code);
    }
  };
  return (
    <div className="container mx-auto px-4 py-8 max-w-11/12">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-end mb-8 gap-4">
        <div>
          <h1 className="text-3xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-pink-600 via-purple-600 to-blue-600 dark:from-pink-400 dark:via-purple-400 dark:to-blue-400">
            My Parcel Dashboard
          </h1>
          <p className="text-gray-500 dark:text-gray-400 mt-2 font-medium">
            Manage your shipments and track deliveries
          </p>
        </div>
        <button
          onClick={handleDownloadPDF}
          className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 font-medium"
        >
          <Download size={18} />
          Export Report
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 relative overflow-hidden group hover:shadow-md transition">
          <div className="absolute right-0 top-0 h-full w-1/3 bg-gradient-to-l from-blue-50 to-transparent dark:from-blue-900/20 opacity-0 group-hover:opacity-100 transition-opacity" />
          <div className="flex items-center gap-4 relative z-10">
            <div className="p-3 bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-xl">
              <Package size={24} />
            </div>
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400 font-medium">Total Parcels</p>
              <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-100">{stats.totalParcels}</h3>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 relative overflow-hidden group hover:shadow-md transition">
          <div className="absolute right-0 top-0 h-full w-1/3 bg-gradient-to-l from-purple-50 to-transparent dark:from-purple-900/20 opacity-0 group-hover:opacity-100 transition-opacity" />
          <div className="flex items-center gap-4 relative z-10">
            <div className="p-3 bg-purple-50 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 rounded-xl">
              <DollarSign size={24} />
            </div>
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400 font-medium">Total Spent</p>
              <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-100">{stats.totalCost} Tk</h3>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 relative overflow-hidden group hover:shadow-md transition">
          <div className="absolute right-0 top-0 h-full w-1/3 bg-gradient-to-l from-green-50 to-transparent dark:from-green-900/20 opacity-0 group-hover:opacity-100 transition-opacity" />
          <div className="flex items-center gap-4 relative z-10">
            <div className="p-3 bg-green-50 dark:bg-green-900/30 text-green-600 dark:text-green-400 rounded-xl">
              <CheckCircle size={24} />
            </div>
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400 font-medium">Delivered</p>
              <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-100">{stats.deliveredCount}</h3>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 relative overflow-hidden group hover:shadow-md transition">
          <div className="absolute right-0 top-0 h-full w-1/3 bg-gradient-to-l from-amber-50 to-transparent dark:from-amber-900/20 opacity-0 group-hover:opacity-100 transition-opacity" />
          <div className="flex items-center gap-4 relative z-10">
            <div className="p-3 bg-amber-50 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400 rounded-xl">
              <Clock size={24} />
            </div>
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400 font-medium">Pending</p>
              <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-100">{stats.pendingCount}</h3>
            </div>
          </div>
        </div>
      </div>

      {/* Toolbar */}
      <div className="bg-white dark:bg-gray-800 p-4 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 mb-6 flex flex-col lg:flex-row gap-4 items-center justify-between">
        <div className="relative w-full lg:w-96">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="Search by ID, Name, Type..."
            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 text-gray-700 dark:text-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="flex flex-wrap gap-3 w-full lg:w-auto">
          <div className="relative min-w-[140px] flex-1">
            <Filter className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <select
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 text-gray-700 dark:text-gray-200 focus:ring-2 focus:ring-blue-500 outline-none appearance-none cursor-pointer"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="All">All Status</option>
              <option value="pending-pickup">Pending</option>
              <option value="parcel-delivered">Delivered</option>
              <option value="cancelled">Cancelled</option>
              <option value="driver-assigned">Assigned</option>
            </select>
          </div>

          <div className="relative min-w-[140px] flex-1">
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
             <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m21 16-4 4-4-4"/><path d="M17 20V4"/><path d="m3 8 4-4 4 4"/><path d="M7 4v16"/></svg>
            </div>
            <select
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 text-gray-700 dark:text-gray-200 focus:ring-2 focus:ring-blue-500 outline-none appearance-none cursor-pointer"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
            >
              <option value="Newest">Newest First</option>
              <option value="Oldest">Oldest First</option>
              <option value="PriceHigh">Price: High-Low</option>
              <option value="PriceLow">Price: Low-High</option>
            </select>
          </div>
        </div>
      </div>

      {/* Table Section */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead className="bg-gray-50 dark:bg-gray-900 border-b border-gray-100 dark:border-gray-800">
              <tr>
                <th className="p-4 text-left font-semibold text-gray-600 dark:text-gray-300">#</th>
                <th className="p-4 text-left font-semibold text-gray-600 dark:text-gray-300">Parcel Details</th>
                <th className="p-4 text-left font-semibold text-gray-600 dark:text-gray-300">Sender Info</th>
                <th className="p-4 text-left font-semibold text-gray-600 dark:text-gray-300">Tracking ID</th>
                <th className="p-4 text-left font-semibold text-gray-600 dark:text-gray-300">Status</th>
                <th className="p-4 text-left font-semibold text-gray-600 dark:text-gray-300">Payment</th>
                <th className="p-4 text-left font-semibold text-gray-600 dark:text-gray-300">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
              {isLoading ? (
                 <>
                   <SkeletonRow />
                   <SkeletonRow />
                   <SkeletonRow />
                   <SkeletonRow />
                   <SkeletonRow />
                 </>
              ) : filteredData.length > 0 ? (
                filteredData.map((item, i) => (
                  <tr
                    key={item._id}
                    className="hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors"
                  >
                    <td className="p-4 font-medium text-gray-500 dark:text-gray-400">{i + 1}</td>
                    <td className="p-4">
                      <div>
                        <p className="font-semibold text-gray-900 dark:text-gray-200">{item.percilname}</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5 uppercase tracking-wide bg-gray-100 dark:bg-gray-700 px-2 py-0.5 rounded-md inline-block">
                          {item.parcelType}
                        </p>
                      </div>
                    </td>
                    <td className="p-4">
                      <div className="flex flex-col">
                        <span className="font-medium text-gray-900 dark:text-gray-200">{item.senderdistick}</span>
                        <span className="text-xs text-gray-500 dark:text-gray-400">{item.senderRegion}</span>
                      </div>
                    </td>
                    <td className="p-4">
                      <Link 
                        to={`/track-parcel/${item.trakingId}`}
                        className="font-mono text-blue-600 dark:text-blue-400 hover:underline"
                      >
                        {item.trakingId}
                      </Link>
                    </td>
                    <td className="p-4">
                       <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold border
                        ${item.deliveryStatus === "pending-pickup" && "bg-yellow-50 text-yellow-700 border-yellow-200"}
                        ${item.deliveryStatus === "driver-assigned" && "bg-blue-50 text-blue-700 border-blue-200"}
                        ${item.deliveryStatus === "rider-arriving" && "bg-indigo-50 text-indigo-700 border-indigo-200"}
                        ${item.deliveryStatus === "parcel-picked-up" && "bg-amber-50 text-amber-700 border-amber-200"}
                        ${item.deliveryStatus === "parcel-delivered" && "bg-green-50 text-green-700 border-green-200"}
                        ${item.deliveryStatus === "cancelled" && "bg-red-50 text-red-700 border-red-200"}
                      `}
                    >
                      {item.deliveryStatus?.replace("-", " ")}
                    </span>
                    </td>
                    <td className="p-4">
                      {item.paymentStutas === "Paid" ? (
                         <div className="flex items-center gap-1.5 text-green-600 bg-green-50 px-3 py-1.5 rounded-lg border border-green-100 w-fit">
                           <CheckCircle size={14} />
                           <span className="text-xs font-bold">PAID</span>
                         </div>
                      ) : (
                        <button
                          onClick={() => handelPayment(item)}
                          className="flex items-center gap-1.5 px-4 py-1.5 bg-gradient-to-r from-lime-400 to-lime-500 hover:from-lime-500 hover:to-lime-600 text-black rounded-lg font-bold text-xs shadow-sm hover:shadow transition"
                        >
                          <DollarSign size={14} />
                          PAY NOW
                        </button>
                      )}
                    </td>
                    <td className="p-4">
                       <div className="flex items-center gap-2">
                         <button
                           onClick={() => handelView(item)}
                           className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition"
                           title="View Details"
                         >
                           <MdOutlineRateReview size={20} />
                         </button>
                         <button
                           onClick={() => handelDelet(item._id)}
                           className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition"
                           title="Delete Parcel"
                         >
                           <MdOutlineDeleteOutline size={20} />
                         </button>
                       </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7" className="p-12 text-center text-gray-500 dark:text-gray-400">
                    <div className="flex flex-col items-center gap-3">
                      <Package size={48} className="text-gray-300 dark:text-gray-600" />
                      <p className="text-lg font-medium">No parcels found</p>
                      <p className="text-sm">Try adjusting your search or filters</p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal - Kept same as before but ensured styling matches */}
      <dialog ref={refernce} className="modal modal-bottom sm:modal-middle">
        <div className="modal-box bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 p-0 max-w-3xl overflow-hidden">
           {/* Modal Header */}
           <div className="bg-gray-50 dark:bg-gray-900 p-6 border-b border-gray-100 dark:border-gray-800 flex justify-between items-center">
              <h3 className="text-xl font-bold text-gray-800 dark:text-gray-100 flex items-center gap-2">
                 <Package className="text-blue-500" />
                 Parcel Details
              </h3>
              <form method="dialog">
                <button className="btn btn-sm btn-circle btn-ghost">✕</button>
              </form>
           </div>
           
           <div className="p-6 overflow-y-auto max-h-[70vh]">
              {/* Content Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                 {/* Sender */}
                 <div className="bg-gray-50 dark:bg-gray-900/50 p-5 rounded-xl border border-gray-100 dark:border-gray-700">
                    <h4 className="font-semibold text-gray-700 dark:text-gray-300 mb-4 flex items-center gap-2 border-b pb-2 dark:border-gray-700">
                       <div className="w-2 h-6 bg-blue-500 rounded-full"></div>
                       Sender Information
                    </h4>
                    <div className="space-y-3 text-sm text-gray-600 dark:text-gray-300">
                       <div className="flex justify-between"><span className="text-gray-500 dark:text-gray-400">Name:</span> <span className="font-medium text-gray-900 dark:text-gray-200">{parcel.name}</span></div>
                       <div className="flex justify-between"><span className="text-gray-500 dark:text-gray-400">Phone:</span> <span className="font-medium text-gray-900 dark:text-gray-200">{parcel.contact}</span></div>
                       <div className="flex justify-between"><span className="text-gray-500 dark:text-gray-400">Email:</span> <span className="font-medium text-gray-900 dark:text-gray-200">{parcel.senderemail}</span></div>
                       <div className="mt-2 pt-2 border-t border-dashed border-gray-200 dark:border-gray-700">
                          <p className="text-gray-500 dark:text-gray-400 text-xs mb-1">Address:</p>
                          <p className="font-medium text-gray-900 dark:text-gray-200">{parcel.addrss}, {parcel.senderdistick}</p>
                       </div>
                    </div>
                 </div>

                 {/* Receiver */}
                 <div className="bg-gray-50 dark:bg-gray-900/50 p-5 rounded-xl border border-gray-100 dark:border-gray-700">
                    <h4 className="font-semibold text-gray-700 dark:text-gray-300 mb-4 flex items-center gap-2 border-b pb-2 dark:border-gray-700">
                       <div className="w-2 h-6 bg-purple-500 rounded-full"></div>
                       Receiver Information
                    </h4>
                     <div className="space-y-3 text-sm text-gray-600 dark:text-gray-300">
                       <div className="flex justify-between"><span className="text-gray-500 dark:text-gray-400">Name:</span> <span className="font-medium text-gray-900 dark:text-gray-200">{parcel.recivername}</span></div>
                       <div className="flex justify-between"><span className="text-gray-500 dark:text-gray-400">Phone:</span> <span className="font-medium text-gray-900 dark:text-gray-200">{parcel.recivercontact}</span></div>
                       <div className="flex justify-between"><span className="text-gray-500 dark:text-gray-400">Email:</span> <span className="font-medium text-gray-900 dark:text-gray-200">{parcel.reciveremail}</span></div>
                       <div className="mt-2 pt-2 border-t border-dashed border-gray-200 dark:border-gray-700">
                          <p className="text-gray-500 dark:text-gray-400 text-xs mb-1">Address:</p>
                          <p className="font-medium text-gray-900 dark:text-gray-200">{parcel.reciveraddrss}, {parcel.reciverDistrick}</p>
                       </div>
                    </div>
                 </div>
              </div>

              {/* Shipment Details */}
               <div className="mt-6 bg-blue-50/50 dark:bg-blue-900/10 p-5 rounded-xl border border-blue-100 dark:border-blue-800">
                    <h4 className="font-semibold text-gray-700 dark:text-gray-300 mb-4 flex items-center gap-2">
                       <Truck className="text-blue-600" size={20} />
                       Shipment Details
                    </h4>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-gray-600 dark:text-gray-300">
                       <div><p className="text-gray-500 dark:text-gray-400 text-xs">Parcel Type</p><p className="font-semibold text-gray-900 dark:text-gray-200">{parcel.parcelType}</p></div>
                       <div><p className="text-gray-500 dark:text-gray-400 text-xs">Weight</p><p className="font-semibold text-gray-900 dark:text-gray-200">{parcel.weight} KG</p></div>
                       <div><p className="text-gray-500 dark:text-gray-400 text-xs">Cost</p><p className="font-semibold text-green-600 dark:text-green-400">{parcel.totalCost} Tk</p></div>
                       <div><p className="text-gray-500 dark:text-gray-400 text-xs">Status</p><p className="font-semibold capitalize text-gray-900 dark:text-gray-200">{parcel.deliveryStatus}</p></div>
                    </div>
                    <div className="mt-4 pt-3 border-t border-blue-100 dark:border-blue-800 flex flex-col md:flex-row justify-between gap-2 text-xs">
                        <p><span className="text-gray-500 dark:text-gray-400">Tracking ID:</span> <span className="font-mono font-bold text-gray-900 dark:text-gray-200">{parcel.trakingId}</span></p>
                        <p><span className="text-gray-500 dark:text-gray-400">Date:</span> <span className="font-medium text-gray-900 dark:text-gray-200">{new Date(parcel.creatAtime).toLocaleString()}</span></p>
                    </div>
               </div>
           </div>
           
           <div className="p-4 bg-gray-50 dark:bg-gray-900 border-t border-gray-100 dark:border-gray-800 flex justify-end">
              <form method="dialog">
                <button className="px-6 py-2 bg-gray-200 hover:bg-gray-300 text-gray-800 dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-gray-200 font-semibold rounded-lg transition">Close</button>
              </form>
           </div>
        </div>
      </dialog>
    </div>
  );
};

export default MyParcel;
