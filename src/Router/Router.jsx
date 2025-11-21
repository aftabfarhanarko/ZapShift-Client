import { createBrowserRouter } from "react-router";
import MainLayout from "../Layout/MainLayout";
import Home from "../pages/Home/Home";
import Loding from "../Shared/Loding";
import MapCover from "../pages/MapCover";
import About from "../pages/About";
import Error from "../Shared/Error";
import AuthLayout from "../Layout/AuthLayout";
import Login from "../Auth/Login";
import Register from "../Auth/Register";
import PriverRouter from "./PriverRouter";
import ForgetPassword from "../Auth/ForgetPassword";
import RiderBook from "../pages/Raider/RiderBook";
import Price from "../pages/Price";
import SendPricel from "../pages/SendPricel/SendPricel";
import Dashbord from "../pages/Dashbord/Dashbord";
import DashbordLayout from "../Layout/DashbordLayout";
import MyParcel from "../pages/Dashbord/MyParcel";
import AllDrivers from "../pages/Dashbord/AllDrivers";
import Payment from "../pages/Dashbord/Payment/Payment";
import SuccessPage from "../pages/Dashbord/Payment/SuccessPage";
import CancelPage from "../pages/Dashbord/Payment/CancelPage";
import ViewDetlics from "../pages/Dashbord/ViewDetlics";
import PaymentHiestory from "../pages/Dashbord/PaymentHiestory/PaymentHiestory";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout></MainLayout>,
    hydrateFallbackElement: <Loding></Loding>,
    children: [
      {
        index: true,
        element: <Home></Home>,
      },
      {
        path: "/mapcover",
        element: <MapCover></MapCover>,
      },

      {
        path: "/about",
        element: <About></About>,
      },
      {
        path: "/send_parcel",
        loader: () => fetch("warehouses.json").then((res) => res.json()),
        element: (
          <PriverRouter>
            <SendPricel></SendPricel>
          </PriverRouter>
        ),
      },
      {
        path: "/raider",
        element: (
          <PriverRouter>
            <RiderBook></RiderBook>
          </PriverRouter>
        ),
      },
      {
        path: "/price",
        element: (
          <PriverRouter>
            <Price></Price>
          </PriverRouter>
        ),
      },
      {
        path: "/*",
        element: <Error></Error>,
      },
    ],
  },
  {
    path: "/",
    element: <AuthLayout></AuthLayout>,
    hydrateFallbackElement: <Loding></Loding>,
    children: [
      {
        path: "/login",
        element: <Login></Login>,
      },
      {
        path: "/register",
        element: <Register></Register>,
      },
      {
        path: "/*",
        element: <Error></Error>,
      },
      {
        path: "/forget",
        element: <ForgetPassword></ForgetPassword>,
      },
    ],
  },
  {
    path: "/dasbord",
    element: (
      <PriverRouter>
        <DashbordLayout></DashbordLayout>
      </PriverRouter>
    ),
    children: [
      {
        index: true,
        element: <Dashbord></Dashbord>,
      },
      {
        path: "/dasbord/myparcel",
        Component: MyParcel,
      },
      {
        path: "/dasbord/deliveries",
        Component: AllDrivers,
      },
      {
        path: "/dasbord/paymentHiestory",
        Component: PaymentHiestory,
      },
      {
        path: "/dasbord/payment/:parcelId",
        Component: Payment,
      },
      {
        path: "/dasbord/success",
        Component: SuccessPage,
      },
      {
        path: "/dasbord/cancel",
        Component: CancelPage,
      },
      // {
      //   path: "/dasbord/viewDetlics/:id",
      //   Component: ViewDetlics
      // },
    ],
  },
]);
