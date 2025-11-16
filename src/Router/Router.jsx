import { createBrowserRouter } from "react-router";
import MainLayout from "../Layout/MainLayout";
import Home from "../pages/Home/Home";
import Loding from "../Shared/Loding";
import MapCover from "../pages/MapCover";
import About from "../pages/About";

export const router = createBrowserRouter([
    {
        path:"/",
        hydrateFallbackElement:<Loding></Loding>,
        element:<MainLayout></MainLayout>,
        children:[
            {
                index:true,
                element:<Home></Home>
            },
            {
                path:"/mapcover",
                element:<MapCover></MapCover>
            },
            {
                path:"/about",
                element:<About></About>
            }
        ]
    }
])
