import { useEffect, useState } from "react";
import Header from "./components/Header";
import { Outlet } from "react-router-dom";
import Footer from "./components/Footer";
import styles from "./App.module.css";
import CartDrawer from "./components/CartDrawer";
import MenuMobile from "./components/MenuMobile";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/Home/index.jsx";
import Order from "./pages/Order/index.jsx";
import NotFound from "./components/NotFound/index.jsx";
import ProductDetail from "./pages/ProductDetail/index.jsx";
import Login from "./pages/Login/index.jsx";
import Register from "./pages/Register/index.jsx";
import CategoryDetail from "./pages/CategoryDetail/index.jsx";
import Account from "./pages/Account/index.jsx";
import AuthRoute from "./pages/AuthRoute/index.jsx";
import { message } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { callFetchAccount } from "./services/api.js";
import { setCredentials } from "./redux/features/user/userSlice.js";
import Loader from "./components/Loader/index.jsx";
import { setLoading } from "../src/redux/features/user/userSlice.js";
import AdminPage from "./pages/AdminPage/index.jsx";
import AdminRoute from "./components/AdminRoute/index.jsx";
import ProductManagement from "./pages/ProductManagement/index.jsx";
import Dashboard from "./components/Dashboard/index.jsx";

const LayOut = () => {
  return (
    <>
      <Header />
      <main className={styles.mainBody}>
        <div className={styles.container}>
          <Outlet></Outlet>
        </div>
      </main>
      <Footer />
      <CartDrawer />
      <MenuMobile />
    </>
  );
};

function App() {
  const accessToken = localStorage.getItem("accessToken");
  const dispatch = useDispatch();
  const { isLoading } = useSelector((state) => state.account);

  const handleFetchAccount = async () => {
    try {
      const res = await callFetchAccount();
      if (res && res.vcode === 0) {
        dispatch(setCredentials(res.data));
      } else {
        message.error(res?.message || "Đã xảy ra lỗi");
      }
    } catch (error) {
      console.error("Error fetching account:", error);
    } finally {
      dispatch(setLoading(false));
    }
  };

  useEffect(() => {
    if (accessToken) {
      handleFetchAccount();
    } else {
      dispatch(setLoading(false));
    }
  }, []);

  const router = createBrowserRouter([
    {
      path: "/",
      element: <LayOut />,
      children: [
        {
          path: "/",
          element: <Home />,
          index: true,
        },
        {
          path: "/order",
          element: <Order />,
        },
        {
          path: "/product/:id",
          element: <ProductDetail />,
        },
        {
          path: "/category/:id",
          element: <CategoryDetail />,
        },
        {
          path: "/account",
          element: (
            <AuthRoute>
              <Account />
            </AuthRoute>
          ),
        },
        {
          path: "/login",
          element: <Login />,
        },
        {
          path: "/register",
          element: <Register />,
        },
      ],
    },
    {
      path: "/admin",
      element: (
        <AdminRoute>
          <AdminPage />
        </AdminRoute>
      ),
      children: [
        {
          index: true,
          element: <Dashboard />,
        },
        {
          path: "product",
          element: <ProductManagement />,
        },
      ],
    },
    {
      path: "*",
      element: <NotFound />,
    },
  ]);

  return <>{isLoading ? <Loader /> : <RouterProvider router={router} />}</>;
}

export default App;
