import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { store } from "./redux/store.js";
import { Provider } from "react-redux";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/Home/index.jsx";
import Order from "./pages/Order/index.jsx";
import NotFound from "./components/NotFound/index.jsx";
import "react-multi-carousel/lib/styles.css";
import ProductDetail from "./pages/ProductDetail/index.jsx";
import "react-image-gallery/styles/css/image-gallery.css";
import Login from "./pages/Login/index.jsx";
import Register from "./pages/Register/index.jsx";
import CategoryDetail from "./pages/CategoryDetail/index.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />,
        index: true,
      },
      {
        path: "/order",
        element: <Order />,
        index: true,
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
    path: "*",
    element: <NotFound />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  // <React.StrictMode>
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>

  // </React.StrictMode>
);
