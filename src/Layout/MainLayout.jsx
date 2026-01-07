import React from "react";
import Navbar from "../components/Navbar";
import { Outlet } from "react-router";
import Footer from "../components/Footer";
import "../index.css";
import { Toaster } from "sonner";
const MainLayout = () => {
  return (
    <div className=" bg-base-300">
        <nav className="">
          <Navbar></Navbar>
        </nav>
      <div className=" ">
        <main>
          <Outlet></Outlet>
        </main>

        <footer>
          <Footer></Footer>
        </footer>
      </div>
      <Toaster position="top-center" />
    </div>
  );
};

export default MainLayout;
