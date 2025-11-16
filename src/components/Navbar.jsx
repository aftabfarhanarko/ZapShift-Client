import React from "react";
import { NavLink } from "react-router";
import Logo from "../Shared/Logo";

const Navbar = () => {
  return (
    <div className="bg-base-100 shadow-sm rounded-xl ">
      <div className="navbar  w-11/12 mx-auto py-5">
        <div className="navbar-start">
          <Logo></Logo>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className=" menu-horizontal px-1 font-semibold text-[#1F1F1F] flex gap-8 list-none text-lg ">
            <li>
              <NavLink to="/" className=" ">
                Services
              </NavLink>
            </li>
           
            <li>
              <NavLink to="wqd" className="">
                Pricing
              </NavLink>
            </li>
            <li>
              <NavLink to="wd" className=" ">
                Be a Rider
              </NavLink>
            </li>
            <li>
              <NavLink to="about" className=" ">
             About Us
              </NavLink>
            </li>
             <li>
              <NavLink to="/mapcover" className="">
                Coverage
              </NavLink>
            </li>
          </ul>
        </div>

        <div className="navbar-end">
          <div className="flex">
            <div className="flex items-center gap-4">
              {/* Sign In Button */}
              <button
                className="px-5.5 py-2 rounded-xl border border-gray-300 text-gray-700 font-semibold 
                     bg-white hover:bg-primary hover:text-black hover:outline-none transition"
              >
                Sign In
              </button>

              {/* Sign Up Button */}
              <button
                className="px-5.5 py-2 rounded-xl border border-gray-300 text-gray-700 font-semibold 
                     bg-white hover:bg-primary hover:text-black hover:outline-none transition"
              >
                Sign Up
              </button>
            </div>

            {/* Black Arrow Button */}
            <button
              className="w-11 h-11 rounded-full bg-black flex items-center justify-center 
             hover:bg-gray-800 transition transform hover:-translate-y-0.5"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-5 h-5 text-white "
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2.5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M5 12h12m-4-4 4 4-4 4"
                />
              </svg>
            </button>
          </div>

          {/* <div className=" hidden md:block  ">
            {user ? (
              <div className=" dropdown dropdown-end">
                <div tabIndex={0} role="button" className=" m-1">
                  <div className="hidden  md:block ">
                    <div className="">
                      <img
                        className=" w-7 md:w-13 rounded-full"
                        src={user.photoURL}
                      ></img>
                    </div>
                  </div>
                </div>
                <ul
                  tabIndex="-1"
                  className="  dropdown-content z-5 menu bg-base-100 rounded-box mt-5  w-42 p-4 shadow-sm"
                >
                  {user && (
                    <div className="flex items-center flex-col gap-3">
                      <input
                        onChange={(e) => handleTheme(e.target.checked)}
                        type="checkbox"
                        defaultChecked={
                          localStorage.getItem("theme") === "dark"
                        }
                        className="toggle"
                      />

                      <button
                        onClick={handelLogOut}
                        className="px-6 py-2 
                 text-white font-medium bg-gradient-to-r from-orange-500 to-orange-600  rounded-md  shadow-lg 
                   transform transition-all duration-300 ease-out hover:from-orange-600 hover:to-orange-700 hover:shadow-xl 
                     hover:scale-105 active:scale-95 
                      focus:outline-none focus:ring-4 focus:ring-orange-300"
                      >
                        Logout
                      </button>
                    </div>
                  )}
                </ul>
              </div>
            ) : (
              <div className="flex gap-3">
                <Link to="/login">
                  {" "}
                  <button
                    className="
                 px-6 py-2 
  text-orange-500 font-medium 
  bg-white 
  outline
  rounded-md 
  transition-all duration-300 ease-out 
  bg-gradient-to-r  hover:from-orange-500 hover:to-orange-400 
  hover:text-white 
  hover:shadow-xl 
  hover:scale-105 
  active:scale-95 
  focus:outline-none focus:ring-4 focus:ring-orange-300
                  
                  
                  "
                  >
                    Login
                  </button>
                </Link>
                <Link to="/register">
                  {" "}
                  <button
                    className="
                   px-6 py-2 
  text-white font-medium  rounded-md
  bg-gradient-to-r from-orange-400 to-orange-500  hover:from-orange-500 hover:to-orange-400 
  transform transition-all  duration-300 ease-out  hover:shadow-xl 
  hover:scale-105 active:scale-95 
  focus:outline-none focus:ring-4 focus:ring-orange-300
                  "
                  >
                    Register
                  </button>
                </Link>
              </div>
            )}
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
{
  /* {user && (
              <li>
                <NavLink to="/accecptjob">In Progress</NavLink>
              </li>
            )}
            {user && (
              <li>
                <NavLink to="/myAddjobs">Posted Jobs</NavLink>
              </li>
            )} */
}
