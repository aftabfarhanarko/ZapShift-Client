import React, { useState } from "react";
import { Link, NavLink } from "react-router";
// import logo from "../assets/logo.png";
import logo from "/nnewcopy.png";
import useAuth from "../Hook/useAuth";
import { HiOutlineMenuAlt1 } from "react-icons/hi";
import { CgClose } from "react-icons/cg";
import { MdOutlineArrowOutward } from "react-icons/md";

const Navbar = () => {
  const { user, userLogOut } = useAuth();
  const [hide, setHide] = useState(true);

  return (
    <>
      <div className="fixed top-0 left-0 w-full z-50 bg-white/80 backdrop-blur-lg border-b border-slate-100 shadow-sm transition-all duration-300">
        <div className="navbar max-w-[95%] w-11/12 mx-auto py-4">
          <div className="navbar-start">
            <Link to="/">
              <img src={logo} alt="Logo" className="h-10 w-auto object-contain hover:scale-105 transition-transform duration-300" />
            </Link>
          </div>
          <div className="navbar-center hidden lg:flex">
            <ul className="menu-horizontal px-1 font-medium text-[#1F1F1F] flex gap-1 list-none text-[15px]">
              <li>
                <NavLink 
                  to="/" 
                  className={({ isActive }) => 
                    `px-4 py-2 rounded-full transition-all duration-300 hover:bg-primary hover:text-secondary ${isActive ? 'bg-primary text-secondary font-bold shadow-md' : ''}`
                  }
                >
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink 
                  to="/services" 
                  className={({ isActive }) => 
                    `px-4 py-2 rounded-full transition-all duration-300 hover:bg-primary hover:text-secondary ${isActive ? 'bg-primary text-secondary font-bold shadow-md' : ''}`
                  }
                >
                  Services
                </NavLink>
              </li>

              <li>
                <NavLink 
                  to="about" 
                  className={({ isActive }) => 
                    `px-4 py-2 rounded-full transition-all duration-300 hover:bg-primary hover:text-secondary ${isActive ? 'bg-primary text-secondary font-bold shadow-md' : ''}`
                  }
                >
                  About Us
                </NavLink>
              </li>
              {/* <li>
                <NavLink 
                  to="/mapcover" 
                  className={({ isActive }) => 
                    `px-4 py-2 rounded-full transition-all duration-300 hover:bg-primary hover:text-secondary ${isActive ? 'bg-primary text-secondary font-bold shadow-md' : ''}`
                  }
                >
                  Coverage
                </NavLink>
              </li> */}

              <li>
                <NavLink 
                  to="/raider" 
                  className={({ isActive }) => 
                    `px-4 py-2 rounded-full transition-all duration-300 hover:bg-primary hover:text-secondary ${isActive ? 'bg-primary text-secondary font-bold shadow-md' : ''}`
                  }
                >
                  Apply Rider
                </NavLink>
              </li>
              {user && (
                <>
                  <li>
                    <NavLink 
                      to="/send_parcel" 
                      className={({ isActive }) => 
                        `px-4 py-2 rounded-full transition-all duration-300 hover:bg-primary hover:text-secondary ${isActive ? 'bg-primary text-secondary font-bold shadow-md' : ''}`
                      }
                    >
                      Send Parcel
                    </NavLink>
                  </li>
                  <li>
                    <NavLink 
                      to="/dasbord" 
                      className={({ isActive }) => 
                        `px-4 py-2 rounded-full transition-all duration-300 hover:bg-primary hover:text-secondary ${isActive ? 'bg-primary text-secondary font-bold shadow-md' : ''}`
                      }
                    >
                      Dashboard
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
                  <div className="relative group">
                    <img
                      className="w-10 h-10 rounded-full border-2 border-secondary shadow-md object-cover cursor-pointer transition-transform transform group-hover:scale-105"
                      src={user?.photoURL}
                      alt="Profile"
                    ></img>
                    <div className="absolute bottom-0 right-0 w-3 h-3 bg-primary border-2 border-white rounded-full"></div>
                  </div>
                  <Link>
                    {" "}
                    <button
                      onClick={() => userLogOut()}
                      className="
                   px-6 py-2.5 rounded-full font-bold text-sm
                   bg-secondary text-white
                   hover:bg-primary hover:text-secondary
                   hover:shadow-lg
                   transform transition-all duration-300 ease-out
                   hover:-translate-y-0.5 active:scale-95 focus:outline-none
                  "
                    >
                      Logout
                    </button>
                  </Link>
                </div>
              ) : (
                <div className="flex gap-3">
                  <Link to="/login">
                    {" "}
                    <button
                      className="
                 px-6 py-2.5 rounded-full font-bold text-sm
                 bg-white text-secondary border-2 border-secondary
                 transition-all duration-300 ease-out 
                 hover:bg-secondary hover:text-white
                 hover:shadow-md hover:-translate-y-0.5 active:scale-95
                  "
                    >
                      Login
                    </button>
                  </Link>
                  <Link to="/register">
                    {" "}
                    <button
                      className="
                   px-6 py-2.5 rounded-full font-bold text-sm
                   bg-secondary text-white border-2 border-secondary
                   hover:bg-primary hover:text-secondary hover:border-primary
                   hover:shadow-lg
                   transform transition-all duration-300 ease-out
                   hover:-translate-y-0.5 active:scale-95 focus:outline-none
                  "
                    >
                      Register
                    </button>
                  </Link>
                </div>
              )}
            </div>

            <div onClick={() => setHide(!hide)} className=" block lg:hidden">
              <button className="p-2 rounded-full hover:bg-slate-100 transition-colors">
                {hide ? (
                  <HiOutlineMenuAlt1 className="w-6 h-6 text-secondary" />
                ) : (
                  <CgClose className="w-6 h-6 text-secondary" />
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      {hide ? (
        ""
      ) : (
        <div className="lg:hidden fixed inset-0 z-40 bg-black/20 backdrop-blur-sm" onClick={() => setHide(true)}>
          <div 
            className="absolute top-0 left-0 right-0 bg-white shadow-xl rounded-b-2xl p-4 transform transition-all duration-300 ease-out"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center mb-6 px-2">
              <span className="text-lg font-bold text-secondary">Menu</span>
              <button
                onClick={() => setHide(true)}
                className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center hover:bg-slate-200 transition-colors"
              >
                <CgClose className="w-5 h-5 text-secondary" />
              </button>
            </div>
            <ul className="flex flex-col gap-2">
              <li>
                <NavLink 
                  onClick={() => setHide(true)} 
                  to="/" 
                  className={({ isActive }) => 
                    `block px-4 py-3 rounded-xl transition-all duration-200 ${
                      isActive 
                        ? 'bg-primary text-secondary font-bold shadow-sm' 
                        : 'hover:bg-slate-50 text-[#1F1F1F] font-medium'
                    }`
                  }
                >
                  Services
                </NavLink>
              </li>
              <li>
                <NavLink 
                  onClick={() => setHide(true)} 
                  to="about" 
                  className={({ isActive }) => 
                    `block px-4 py-3 rounded-xl transition-all duration-200 ${
                      isActive 
                        ? 'bg-primary text-secondary font-bold shadow-sm' 
                        : 'hover:bg-slate-50 text-[#1F1F1F] font-medium'
                    }`
                  }
                >
                  About Us
                </NavLink>
              </li>
              <li>
                <NavLink 
                  onClick={() => setHide(true)} 
                  to="/raider" 
                  className={({ isActive }) => 
                    `block px-4 py-3 rounded-xl transition-all duration-200 ${
                      isActive 
                        ? 'bg-primary text-secondary font-bold shadow-sm' 
                        : 'hover:bg-slate-50 text-[#1F1F1F] font-medium'
                    }`
                  }
                >
                  Apply Rider
                </NavLink>
              </li>
              {user && (
                <>
                  <li>
                    <NavLink 
                      onClick={() => setHide(true)} 
                      to="/send_parcel" 
                      className={({ isActive }) => 
                        `block px-4 py-3 rounded-xl transition-all duration-200 ${
                          isActive 
                            ? 'bg-primary text-secondary font-bold shadow-sm' 
                            : 'hover:bg-slate-50 text-[#1F1F1F] font-medium'
                        }`
                      }
                    >
                      Send Parcel
                    </NavLink>
                  </li>
                  <li>
                    <NavLink 
                      onClick={() => setHide(true)} 
                      to="/dasbord" 
                      className={({ isActive }) => 
                        `block px-4 py-3 rounded-xl transition-all duration-200 ${
                          isActive 
                            ? 'bg-primary text-secondary font-bold shadow-sm' 
                            : 'hover:bg-slate-50 text-[#1F1F1F] font-medium'
                        }`
                      }
                    >
                      Dashboard
                    </NavLink>
                  </li>
                </>
              )}
            </ul>
            <div className="mt-6 pt-6 border-t border-slate-100 flex flex-col gap-3 md:hidden">
              {user ? (
                <div className="flex items-center justify-between px-2">
                  <div className="flex items-center gap-3">
                    <img className="w-10 h-10 rounded-full object-cover border-2 border-secondary shadow-sm" src={user?.photoURL} alt="" />
                    <span className="font-medium text-secondary">{user.displayName || 'User'}</span>
                  </div>
                  <button
                    onClick={() => {
                      userLogOut();
                      setHide(true);
                    }}
                    className="px-5 py-2 rounded-full font-bold text-sm bg-secondary text-white hover:bg-primary hover:text-secondary transition"
                  >
                    Logout
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-2 gap-3">
                  <Link to="/login" onClick={() => setHide(true)} className="w-full">
                    <button className="w-full px-5 py-3 rounded-xl font-bold bg-white text-secondary border-2 border-secondary hover:bg-secondary hover:text-white transition">
                      Login
                    </button>
                  </Link>
                  <Link to="/register" onClick={() => setHide(true)} className="w-full">
                    <button className="w-full px-5 py-3 rounded-xl font-bold bg-secondary text-white hover:bg-primary hover:text-secondary transition">
                      Register
                    </button>
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
