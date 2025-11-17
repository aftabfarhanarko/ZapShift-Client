import React from "react";
import { Link, NavLink } from "react-router";
import Logo from "../Shared/Logo";
import useAuth from "../Hook/useAuth";

const Navbar = () => {
  const { user, userLogOut } = useAuth();
  console.log(user);

  const LogOutNow = () => {
    userLogOut();
  };

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
              <NavLink to="/raider" className=" ">
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
          <div className=" hidden md:block  ">
            {user ? (
              <div className=" dropdown dropdown-end">
                <div tabIndex={0} role="button" className=" m-1">
                  <div className="hidden  md:block ">
                    <div className="">
                      <img
                        className=" w-8 md:w-13 h-8 md:h-13 rounded-full"
                        src={user?.photoURL}
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
                      <p className="text-md font-semibold">{user.displayName}</p>
                      {/* <input
                        onChange={(e) => handleTheme(e.target.checked)}
                        type="checkbox"
                        defaultChecked={
                          localStorage.getItem("theme") === "dark"
                        }
                        className="toggle"
                      /> */}

                      <button
                        onClick={LogOutNow}
                        className="
                   px-6 py-2 
   font-medium  rounded-md
bg-gradient-to-r from-[#b2e36d] via-[#b8e04e] to-[#bae240] 
  font-semibold
hover:from-[#bae240] hover:via-[#c5e854] hover:to-[#d0f060]  transform transition-all  duration-300 ease-out  hover:shadow-xl 
  focus:outline-none  shadow
                  "
                      >
                        LogOut
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
                 px-6 py-2  text-[#82aa09]
  bg-white  outline  rounded-md   transition-all duration-300 ease-out   bg-gradient-to-r hover:from-[#bae240] hover:via-[#c5e854] hover:to-[#d0f060]  transform transition-all  duration-300  hover:text-black hover:shadow-xl  hover:outline-none font-semibold hover:scale-100  active:scale-95  focus:outline-none                        
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
   font-medium  rounded-md
bg-gradient-to-r from-[#b2e36d] via-[#b8e04e] to-[#bae240] 
  font-semibold
hover:from-[#bae240] hover:via-[#c5e854] hover:to-[#d0f060]  transform transition-all  duration-300 ease-out  hover:shadow-xl 
  hover:scale-105 active:scale-95 
  focus:outline-none 
                  "
                  >
                    Register
                  </button>
                </Link>
              </div>
            )}
          </div>
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
