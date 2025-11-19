import {
  LayoutDashboard,
  Package,
  Store,
  Settings,
  Lock,
  HelpCircle,
  LogOut,
  Bell,
} from "lucide-react";
import Logo from "../Shared/Logo";
import { BsFillHouseDashFill } from "react-icons/bs";
import { Link, Outlet } from "react-router";
import { IoHomeOutline } from "react-icons/io5";
import { GoSidebarExpand } from "react-icons/go";
import { CiDeliveryTruck } from "react-icons/ci";
import { MdManageAccounts } from "react-icons/md";
import { HiHomeModern } from "react-icons/hi2";
import useAuth from "../Hook/useAuth";

const DashbordLayout = () => {
  const { user } = useAuth();
  return (
    <div className="drawer lg:drawer-open">
      <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content">
        {/* Navbar */}
        <nav className="navbar w-full bg-base-300 flex justify-between md:pr-10">
          <div className="flex items-center">
            <label
              htmlFor="my-drawer-4"
              aria-label="open sidebar"
              className="btn btn-square btn-ghost"
            >
              {/* Sidebar toggle icon */}
              <GoSidebarExpand className="w-6 h-6" />
            </label>
            <div className="px-1.5 md:px-5">
              <Logo></Logo>
            </div>
          </div>

          <div>
            <div className="w-full flex items-center justify-between px-4 py-4 gap-3">
              {/* Right Side - Profile */}
              <div className="flex items-center gap-3 cursor-pointer">
                {/* Rounded Image (replace src later) */}
                <div className="">
                  {user && (
                    <img
                      className="w-10 h-10 rounded-full object-cover"
                      src={user?.photoURL}
                      alt="profile"
                    />
                  )}
                </div>
              </div>
              {/* Left Side - Notification */}
              <div className="flex items-center gap-4">
                <div
                  className="
  w-10 h-10 
  rounded-full 
  bg-white 
  border border-gray-200 
  flex items-center justify-center
  shadow-sm
  hover:shadow-md 
  hover:border-gray-300
  transition-all duration-200
"
                >
                  <Bell className="w-5 h-5 text-gray-700" />
                </div>
              </div>
            </div>
          </div>
        </nav>
        {/* Page content here */}
        <div className="p-4">
          <Outlet></Outlet>
        </div>
      </div>

      <div className="drawer-side is-drawer-close:overflow-visible">
        <label
          htmlFor="my-drawer-4"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>
        <div className="flex min-h-full flex-col items-start bg-base-300 border-r border-gray-400 is-drawer-close:w-14 is-drawer-open:w-64">
          {/* Sidebar content here */}

          <ul className="menu w-full grow ">
            <li>
              <Link
                to="/"
                className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                data-tip="Go Home Page "
              >
                <HiHomeModern className=" w-4 md:w-5  h-5 md:h-7" />
                <span className="is-drawer-close:hidden">Go Home Page</span>
              </Link>
            </li>
            <div className="mt-">
              {/* List item */}
              <p className="py-3 border-b border-gray-300 text-secondary">
                MENU
              </p>

              <li>
                <Link
                  className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                  data-tip="Dashboard "
                >
                  {/* Home icon */}
                  <LayoutDashboard className=" w-4 md:w-5  h-5 md:h-7" />
                  <span className="is-drawer-close:hidden">Dashboard</span>
                </Link>
              </li>

              <li>
                <Link
                  to="/dasbord/myparcel"
                  className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                  data-tip="My Parcel "
                >
                  {/* Home icon */}
                  <Package className=" w-4 md:w-5  h-5 md:h-7" />
                  <span className="is-drawer-close:hidden">My Parcel</span>
                </Link>
              </li>

              <li>
                <Link
                  to="/dasbord/deliveries"
                  className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                  data-tip="All Deliveries "
                >
                  {/* Home icon */}
                  <CiDeliveryTruck className=" w-4 md:w-5  h-5 md:h-7" />
                  <span className="is-drawer-close:hidden">All Deliveries</span>
                </Link>
              </li>

              <li>
                <Link
                  to="/dasbord/ParcelDetlics"
                  className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                  data-tip="Parcel Details "
                >
                  <Store className=" w-4 md:w-5  h-5 md:h-7" />
                  <span className="is-drawer-close:hidden">Parcel Details</span>
                </Link>
              </li>

              <li>
                <Link
                  to="/dasbord/manageParcel"
                  className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                  data-tip="Manage Parcel "
                >
                  <MdManageAccounts className=" w-4 md:w-5  h-5 md:h-7" />
                  <span className="is-drawer-close:hidden">Manage Parcel</span>
                </Link>
              </li>

              {/* List item */}
              <div className=" border-t border-gray-400 mt-5 pt-3">
                <li>
                  <Link
                    className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                    data-tip="Settings"
                  >
                    {/* Settings icon */}
                    <Settings className=" w-4 md:w-5  h-5 md:h-7" />

                    <span className="is-drawer-close:hidden">Settings</span>
                  </Link>
                </li>

                <li>
                  <Link
                    className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                    data-tip="Change Password"
                  >
                    {/* Settings icon */}
                    <Lock className=" w-4 md:w-5  h-5 md:h-7" />

                    <span className="is-drawer-close:hidden">
                      {" "}
                      Change Password
                    </span>
                  </Link>
                </li>
                <li>
                  <Link
                    className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                    data-tip="Help"
                  >
                    {/* Settings icon */}
                    <HelpCircle className=" w-4 md:w-5  h-5 md:h-7" />

                    <span className="is-drawer-close:hidden">Help</span>
                  </Link>
                </li>
                <li>
                  <Link
                    className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                    data-tip="Logout"
                  >
                    {/* Settings icon */}
                    <LogOut className=" w-4 md:w-5  h-5 md:h-7" />

                    <span className="is-drawer-close:hidden">Logout</span>
                  </Link>
                </li>
              </div>
            </div>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default DashbordLayout;
