import Carousel from "react-multi-carousel";
import { Link } from "react-router-dom";
import Meta from "antd/es/card/Meta";
import { Card, Divider, Image, Typography } from "antd";
import styles from "./CategoriesProduct.module.css";
import { useSelector } from "react-redux";

const CategoriesProduct = () => {
  const { categories } = useSelector((state) => state.commonData);
  const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 1500 },
      items: 5,
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
        {categories &&
          categories.map((item) => (
            <Link key={item._id} to={"category/" + item.link}>
              <Card hoverable className={styles.cardContainer}>
                <Image
                  className={styles.img}
                  preview={false}
                  src={import.meta.env.VITE_BASE_URL + "/uploads/images/category/" + item.thumb}
                />
                <Typography.Title level={4}>{item.name}</Typography.Title>
              </Card>
            </Link>
          ))}
      </Carousel>
      <Divider />
    </>
  );
};
export default CategoriesProduct;
