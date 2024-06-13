import Carousel from "react-multi-carousel";
import { Link } from "react-router-dom";
import Meta from "antd/es/card/Meta";
import { Card, Divider, Image, Typography } from "antd";
import nonvanh from "../../assets/images/non_vanh.jpg";
import styles from "./CategoriesProduct.module.css";

const CategoriesProduct = () => {
  const products = [
    {
      _id: 1,
      name: "Nón vành",
      img: nonvanh,
    },
    {
      _id: 2,
      name: "Nón vành",
      img: nonvanh,
    },
    {
      _id: 3,
      name: "Nón vành",
      img: nonvanh,
    },
    {
      _id: 4,
      name: "Nón vành",
      img: nonvanh,
    },
    {
      _id: 5,
      name: "Nón vành",
      img: nonvanh,
    },
    {
      _id: 6,
      name: "Nón vành",
      img: nonvanh,
    },
    {
      _id: 7,
      name: "Nón vành",
      img: nonvanh,
    },
  ];

  const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 1500 },
      items: 6,
    },
    desktop: {
      breakpoint: { max: 1500, min: 1000 },
      items: 5,
    },
    tablet: {
      breakpoint: { max: 1000, min: 575 },
      items: 3,
    },
    mobile: {
      breakpoint: { max: 575, min: 0 },
      items: 2,
    },
  };
  return (
    <>
      <Typography.Title style={{ textAlign: "center", width: "100%", marginBottom: "5px" }}>
        Sản phẩm Nón Thảo
      </Typography.Title>
      <Typography.Text className={styles.desc}>
        Chất lượng, đẳng cấp và tinh tế thể hiện ở từng sản phẩm
      </Typography.Text>
      <Carousel responsive={responsive}>
        {products.map((item) => (
          <Link key={item._id} to={"category/" + item._id}>
            <Card hoverable className={styles.cardContainer}>
              <Image className={styles.img} preview={false} src={item.img} />
              <Meta title={item.name} description="100.000đ" />
            </Card>
          </Link>
        ))}
      </Carousel>
      <Divider />
    </>
  );
};
export default CategoriesProduct;
