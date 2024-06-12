import { Card, Divider, Image, Row, Typography } from "antd";
import styles from "./Home.module.css";
import Introduce from "../../components/Introduce";
import Products from "../../components/Products";

const Home = () => {
  return (
    <>
      <Introduce />
      <Products />
    </>
  );
};
export default Home;
