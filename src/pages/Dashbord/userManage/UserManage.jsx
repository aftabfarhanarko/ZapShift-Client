import React, { useState } from "react";
import useAxiosSecoir from "../../../Hook/useAxiosSecoir";
import { useQuery } from "@tanstack/react-query";
import { FaUserShield, FaUserTimes } from "react-icons/fa";
import Swal from "sweetalert2";
import Loding from "../../../Shared/Loding";
import { MdOutlineDeleteOutline } from "react-icons/md";

const UserManage = () => {
  const axiosSecoir = useAxiosSecoir();
  const [searchText, setSearchText] = useState("");

  const { refetch, data, isLoading } = useQuery({
    queryKey: ["users", searchText],
    queryFn: async () => {
      const res = await axiosSecoir.get(`users?searchText=${searchText}`);
      return res.data;
    },
  });

  const handelUpdeat = (user) => {
    const roleInfo = { role: "admin" };
    axiosSecoir.patch(`users/${user._id}/role`, roleInfo).then((res) => {
      console.log(res.data);
      refetch();
    });
    // if (res.data.modifiedCount) {
    Swal.fire({
      icon: "success",
      title: `Admin Added Successfully ${user.displayName}`,

      confirmButtonText: "OK",
      customClass: {
        popup: "rounded-2xl shadow-lg",
        title: "text-lg font-bold text-green-700",
        htmlContainer: "text-gray-700",
        confirmButton:
          "bg-green-600 hover:bg-green-700 text-white font-semibold px-6 py-2 rounded-xl",
      },
      buttonsStyling: false,
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: "Add Admin Role!",
          text: "You are Successfully Admin",
          icon: "success",
        });
      }
    });
    //
  };

  const handelremovedAdmin = (user) => {
    const roleInfo = { role: "user" };

    // if (res.data.modifiedCount) {
    Swal.fire({
      icon: "success",
      title: `Admin Removed ${user.displayName} `,
      confirmButtonText: "OK",
      customClass: {
        popup: "rounded-2xl shadow-lg",
        title: "text-lg font-bold text-green-700",
        htmlContainer: "text-gray-700",
        confirmButton:
          "bg-green-600 hover:bg-green-700 text-white font-semibold px-6 py-2 rounded-xl",
      },
      buttonsStyling: false,
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecoir.patch(`users/${user._id}/role`, roleInfo).then((res) => {
          console.log(res.data);
          refetch();
          Swal.fire({
            title: "Removed Admin!",
            text: "Your Role Removed has been deleted Admin to User.",
            icon: "success",
          });
        });
      }
    });
    //
  };
  const handelDeletUser = (id) => {
    console.log(id);

    Swal.fire({
      title: "Confirm User Deletion",
      text: `Are you sure you want to delete this User? This action cannot be undone.`,
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
        axiosSecoir.delete(`user/${id}`).then((res) => {
          refetch();
          console.log(res.data);
        });
        Swal.fire({
          icon: "success",
          title: "User Deleted Successfully ",
          text: "This User has been Deletd Proprely .",
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

  if (isLoading) {
    return <Loding></Loding>;
  }

  return (
    <div className=" py-6 md:py-10 px-2 md:px-15">
      <div className=" md:flex justify-between items-center">
        <h1 className=" text-3xl text-secondary font-semibold">
          All User : {data?.length}
        </h1>
        <label className="md:mt-0 mt-3 flex items-center gap-3 w-full max-w-md px-4 py-2 bg-white/70 backdrop-blur-md border  hover:border-lime-500 border-gray-200 rounded-xl shadow-sm hover:shadow-md transition-all">
          {/* Search Icon */}
          <svg
            className="h-5 w-5 text-gray-500"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
          >
            <g
              strokeLinejoin="round"
              strokeLinecap="round"
              strokeWidth="2.2"
              fill="none"
              stroke="currentColor"
            >
              <circle cx="11" cy="11" r="8"></circle>
              <path d="m21 21-4.3-4.3"></path>
            </g>
          </svg>

          {/* Input Field */}
          <input
            type="search"
            
            onChange={(e) => setSearchText(e.target.value)}
            className="grow  outline-none bg-transparent text-gray-700 placeholder-gray-400"
            placeholder="Search user..."
          />
        </label>
      </div>

      <div className="mt-6">
        <div className="overflow-x-auto bg-white rounded-xl shadow-lg border border-gray-100">
          <table className="min-w-full text-sm">
            <thead className="bg-gray-100 text-left text-gray-700">
              <tr>
                <th className="p-4 font-semibold">Srl No</th>
                <th className="p-4 font-semibold">User Info</th>
                <th className="p-4 px-10 md:px-0 font-semibold">Email</th>
                <th className="p-4 font-semibold">Account Created</th>
                <th className="p-4 font-semibold">Role</th>
                <th className="p-4 font-semibold">Admine Action</th>
                <th className="p-4 font-semibold">Action</th>
              </tr>
            </thead>

            <tbody>
              {   data?.map((item, i) => (
                <tr
                  key={i}
                  className="border-b border-gray-200 hover:bg-gray-50 transition"
                >
                  {/* Serial */}
                  <td className="p-4 font-medium text-gray-900">{i + 1}</td>

                  {/* User Info */}
                  <td className="p-4 flex items-center gap-3">
                    <img
                      src={item.photoURL}
                      alt={item.displayName}
                      className="w-10 h-10 rounded-full object-cover border-2 border-base-300"
                    />
                    <p className=" font-medium md:font-semibold text-gray-900">
                      {item.displayName}
                    </p>
                  </td>

                  {/* Email */}
                  <td className="p-4 px-10 md:px-0 text-gray-800">
                    {item.email}
                  </td>

                  {/* Created At */}
                  <td className="p-4 text-gray-700">
                    {new Date(item.creatWb).toLocaleDateString()}
                  </td>

                  {/* Role */}
                  <td className="p-4 font-semibold">
                    <span className="text-blue-600 bg-blue-100 px-3 py-1 rounded-full text-xs">
                      {item.role}
                    </span>
                  </td>

                  <td className=" p-4">
                    {item.role === "admin" ? (
                      <button
                        onClick={() => handelremovedAdmin(item)}
                        className="
    flex items-center justify-center
    w-10 h-10
    rounded-lg
    bg-red-100
    text-red-600
    hover:bg-red-600 hover:text-white
    transition-all duration-300
    shadow-sm hover:shadow-md
  "
                      >
                        <FaUserTimes className="text-lg" />
                      </button>
                    ) : (
                      <button
                        onClick={() => handelUpdeat(item)}
                        className="
    flex items-center justify-center
    w-10 h-10
    rounded-lg
    bg-green-100
    text-green-600
    hover:bg-green-600 hover:text-white
    transition-all duration-300
    shadow-sm hover:shadow-md
  "
                      >
                        <FaUserShield className="text-lg" />
                      </button>
                    )}
                  </td>

                  {/* Actions */}
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      {/* <button className="px-4 py-1.5 rounded-lg bg-white text-green-600 border border-green-300 flex items-center gap-2 font-medium hover:bg-green-50 hover:shadow-sm transition">
                        Approved
                      </button> */}

                      <button
                        onClick={() => handelDeletUser(item._id)}
                        className="px-4 py-1.5 rounded-lg bg-white text-red-600 border border-red-300 flex items-center gap-2 font-medium hover:bg-red-50 hover:shadow-sm transition "
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

export default UserManage;
