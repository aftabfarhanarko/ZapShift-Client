import React, { useState } from "react";
import { Link, NavLink } from "react-router";
import Logo from "../Shared/Logo";
import useAuth from "../Hook/useAuth";
import { HiOutlineMenuAlt1 } from "react-icons/hi";
import { CgClose } from "react-icons/cg";
import { MdOutlineArrowOutward } from "react-icons/md";

const Navbar = () => {
  const { user, userLogOut } = useAuth();
  const [hide, setHide] = useState(true);

  return (
    <>
      <div className="sticky top-0 z-50 bg-white/70 backdrop-blur-md shadow-sm md:rounded-xl">
        <div className="navbar w-11/12 mx-auto py-4">
          <div className="navbar-start">
            <Logo></Logo>
          </div>
          <div className="navbar-center hidden lg:flex">
            <ul className="menu-horizontal px-1 font-medium text-[#1F1F1F] flex gap-6 list-none text-[15px]">
              <li>
                <NavLink to="/" className=" transition-colors hover:text-secondary">
                  Services
                </NavLink>
              </li>
              <li>
                <NavLink to="about" className=" transition-colors hover:text-secondary">
                  About Us
                </NavLink>
              </li>
              <li>
                <NavLink to="/mapcover" className=" transition-colors hover:text-secondary">
                  Coverage
                </NavLink>
              </li>

              <li>
                <NavLink to="/raider" className=" transition-colors hover:text-secondary">
                  Apply Rider
                </NavLink>
              </li>
              {user && (
                <>
                  <li>
                    <NavLink to="/send_parcel" className=" transition-colors hover:text-secondary">
                      Send Parcel
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to="/dasbord" className=" transition-colors hover:text-secondary">
                      Dasbord
                    </NavLink>
                  </li>
                </>
              )}
            </ul>
          </div>

          <div className="navbar-end">
            <div className=" hidden md:block  ">
              {user ? (
                <div className="  flex gap-3 items-center">
                  <div className="">
                    <img
                      className=" w-8 md:w-13 h-8 md:h-13 rounded-full border border-base-300 shadow-sm"
                      src={user?.photoURL}
                    ></img>
                  </div>
                  <Link>
                    {" "}
                    <button
                      onClick={() => userLogOut()}
                      className="
                   px-5 py-2 rounded-full font-semibold
                   bg-primary text-secondary
                   hover:brightness-105 transform transition-all duration-300 ease-out hover:shadow-xl
                   hover:-translate-y-0.5 active:scale-95 focus:outline-none
                  "
                    >
                      Logout
                    </button>
                  </Link>
                  <button
                    className="w-9 h-9 md:w-11 md:h-11 -ml-2.5 rounded-full bg-black flex items-center justify-center 
                           hover:bg-gray-800 transition transform hover:-translate-y-0.5"
                  >
                    <MdOutlineArrowOutward className="w-4 h-4 md:w-5 md:h-5 text-white" />
                  </button>
                </div>
              ) : (
                <div className="flex gap-3">
                  <Link to="/login">
                    {" "}
                    <button
                      className="
                 px-5 py-2 rounded-full font-semibold
                 bg-white text-secondary border border-base-300
                 transition-all duration-300 ease-out hover:bg-base-100 hover:shadow-xl hover:-translate-y-0.5 active:scale-95
                  "
                    >
                      Login
                    </button>
                  </Link>
                  <Link to="/register">
                    {" "}
                    <button
                      className="
                   px-5 py-2 rounded-full font-semibold
                   bg-primary text-secondary
                   hover:brightness-105 transform transition-all duration-300 ease-out hover:shadow-xl
                   hover:-translate-y-0.5 active:scale-95 focus:outline-none
                  "
                    >
                      Register
                    </button>
                  </Link>
                  <button
                    className="w-9 h-9 md:w-11 md:h-11 -ml-2.5 rounded-full bg-black flex items-center justify-center 
                           hover:bg-gray-800 transition transform hover:-translate-y-0.5"
                  >
                    <MdOutlineArrowOutward className="w-4 h-4 md:w-5 md:h-5 text-white" />
                  </button>
                </div>
              )}
            </div>

            <div onClick={() => setHide(!hide)} className=" block md:hidden">
              {hide ? (
                <HiOutlineMenuAlt1 className=" w-7 h-7 transition duration-500 ease-in-out" />
              ) : (
                <CgClose className=" w-7 h-7 transition duration-500 ease-in-out" />
              )}
            </div>
          </div>
        </div>
      </div>

      {hide ? (
        ""
      ) : (
        <div className="md:hidden w-11/12 mx-auto mt-2 z-40">
          <div className="rounded-xl border border-base-300 bg-white/95 backdrop-blur-md shadow p-4">
            <div className="flex justify-end">
              <button
                onClick={() => setHide(true)}
                className="w-9 h-9 rounded-full bg-black text-white flex items-center justify-center"
              >
                <CgClose className="w-5 h-5" />
              </button>
            </div>
            <ul className="font-medium text-[#1F1F1F] text-[16px] flex flex-col gap-3 mt-2">
              <li>
                <NavLink onClick={() => setHide(true)} to="/" className="block px-4 py-3 rounded-lg bg-base-100 hover:bg-primary hover:text-secondary transition">
                  Services
                </NavLink>
              </li>
              <li>
                <NavLink onClick={() => setHide(true)} to="about" className="block px-4 py-3 rounded-lg bg-base-100 hover:bg-primary hover:text-secondary transition">
                  About Us
                </NavLink>
              </li>
              <li>
                <NavLink onClick={() => setHide(true)} to="/mapcover" className="block px-4 py-3 rounded-lg bg-base-100 hover:bg-primary hover:text-secondary transition">
                  Coverage
                </NavLink>
              </li>
              <li>
                <NavLink onClick={() => setHide(true)} to="/raider" className="block px-4 py-3 rounded-lg bg-base-100 hover:bg-primary hover:text-secondary transition">
                  Apply Rider
                </NavLink>
              </li>
              {user && (
                <>
                  <li>
                    <NavLink onClick={() => setHide(true)} to="/send_parcel" className="block px-4 py-3 rounded-lg bg-base-100 hover:bg-primary hover:text-secondary transition">
                      Send Parcel
                    </NavLink>
                  </li>
                  <li>
                    <NavLink onClick={() => setHide(true)} to="/dasbord" className="block px-4 py-3 rounded-lg bg-base-100 hover:bg-primary hover:text-secondary transition">
                      Dasbord
                    </NavLink>
                  </li>
                </>
              )}
            </ul>
            <div className="mt-4 flex items-center gap-3">
              {user ? (
                <>
                  <img className="w-10 h-10 rounded-full object-cover border border-base-300" src={user?.photoURL} alt="" />
                  <button
                    onClick={() => {
                      userLogOut();
                      setHide(true);
                    }}
                    className="px-5 py-2 rounded-full font-semibold bg-primary text-secondary hover:brightness-105 transition hover:shadow"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link to="/login" onClick={() => setHide(true)}>
                    <button className="px-5 py-2 rounded-full font-semibold bg-white text-secondary border border-base-300 hover:bg-base-100 transition">
                      Login
                    </button>
                  </Link>
                  <Link to="/register" onClick={() => setHide(true)}>
                    <button className="px-5 py-2 rounded-full font-semibold bg-primary text-secondary hover:brightness-105 transition">
                      Register
                    </button>
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
