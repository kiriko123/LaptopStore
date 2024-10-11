import React, { useEffect, useState } from 'react';
import { createBrowserRouter, Outlet, RouterProvider, useNavigate } from "react-router-dom";
import NotFound from "./components/NotFound/index.jsx";
import './App.css'
import { useDispatch, useSelector } from "react-redux";
import { callFetchAccount, callRegister } from "./services/api.js";
import { doGetAccountAction } from "./redux/account/accountSlice.js";
import Footer from "./components/Footer/index.jsx";
import Home from "./components/Home/index.jsx";
import Loading from "./components/Loading/index.jsx";
import LayoutAdmin from "./components/Admin/LayoutAdmin.jsx";
import ProtectedRoute from "./components/ProtectedRoute/index.jsx";
import AdminPage from "./pages/admin/index.jsx";
import ManageUserPage from "./pages/admin/user/index.jsx";
import Auth from "./pages/auth/index.jsx";
import Slider from "./components/Slider/slider.jsx";

import ForgotPage from "./pages/forgot/forgot.jsx";
// import ViewOrder from "./components/Order/ViewOrder.jsx";
import SliderCRUD from "./components/Account/SliderCRUD.jsx"; // Thêm import cho SliderCRUD
import ManageBrandPage from './pages/admin/brand/index.jsx';
import ManageCategoryPage from "./pages/admin/category/index.jsx";
import ViewOrder from "./components/Order/ViewOrder.jsx";
import ManageProductPage from "./pages/admin/product/index.jsx";
import Navbar from "./components/Header/navbar.jsx";



const Layout = () => {
    return (
        <div className="layout-app">
            <Navbar />
            <Outlet />
            <Footer />
        </div>
    )
}

export default function App() {


    const dispatch = useDispatch();
    const isLoading = useSelector(state => state.account.isLoading)

    const getAccount = async () => {
        if (window.location.pathname === "/auth"
            || window.location.pathname === "/forgot"

        ) {
            return;
        }
        const res = await callFetchAccount();
        console.log('this is r', res.statusCode);

        if (res && res.statusCode === 200) {
            //console.log('chahahahaha');
            dispatch(doGetAccountAction(res))
        }
    }
    useEffect(() => {
        getAccount();
    }, []);

    const router = createBrowserRouter([
        {
            path: '/',
            element: <Layout />,
            errorElement: <NotFound />,
            children: [
                {
                    index: true,
                    element: <Home />,
                },
                {
                    path: "/order",
                    element: <ViewOrder/>
                }
            ]

        },
        {
            path: "/auth",
            element: <Auth />,
        },
        {
            path: "/forgot",
            element: <ForgotPage />,
        },
        {
            path: "/admin",
            element: <ProtectedRoute><LayoutAdmin /></ProtectedRoute>,
            errorElement: <NotFound />,
            children: [
                {
                    index: true,
                    element:
                        <AdminPage />
                },
                {
                    path: "user",
                    element:
                        <ManageUserPage />
                },
                {

                    path: "slider",
                    element: <SliderCRUD />,
                },
                {
                    path: "brand",
                    element:
                        <ManageBrandPage/>
                },
                  {
                    path: "category",
                    element:
                        <ManageCategoryPage/>
                },
                {
                    path: "product",
                    element: <ManageProductPage/>,
                }

            ]
        },
    ])

    return (
        <>
            {
                !isLoading
                    || window.location.pathname === '/auth'
                    || window.location.pathname === '/forgot'
                    || window.location.pathname === '/'
                    ? <RouterProvider router={router} />
                    :
                    <Loading />
            }
        </>
    );
}
