import { useEffect, useState } from "react";
import Header from "./components/Header";
import { Link, Outlet, useLocation, useParams } from "react-router-dom";
import Footer from "./components/Footer";
import styles from "./App.module.css";
import CartDrawer from "./components/CartDrawer";
import MenuMobile from "./components/MenuMobile";

const items = [
  {
    path: "/",
    title: <Link to="/">Trang chủ</Link>,
  },
  {
    path: "/product/:id",
    title: <Link to="/">Chi tiết</Link>,
  },
  {
    path: "/register",
    title: <Link to="/register">Đăng ký</Link>,
  },
  {
    path: "/login",
    title: <Link to="/login">Đăng nhập</Link>,
  },
];

function App() {
  const location = useLocation();
  const params = useParams();
  const [breadcrumbItems, setBreadcrumbItems] = useState([]);

  useEffect(() => {
    // Tính toán và cập nhật breadcrumbItems dựa trên location và params
    const pathSnippets = location.pathname.split("/").filter((i) => i);
    const newBreadcrumbItems = pathSnippets.map((_, index) => {
      const url = `/${pathSnippets.slice(0, index + 1).join("/")}`;
      const title = "a"; // Tính toán tiêu đề dựa trên url hoặc params
      return {
        path: url,
        title: <Link to={url}>{title}</Link>,
      };
    });

    // Đặt breadcrumbItems mới
    setBreadcrumbItems(newBreadcrumbItems);
  }, [location, params]);

  const itemRender = (route, params, routes, paths) => {
    const last = routes.indexOf(route) === routes.length - 1;
    return last ? <span>{route.title}</span> : <Link to={route.path}>{route.title}</Link>;
  };

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
}

export default App;
