import Carousel from "react-multi-carousel";
import { Link } from "react-router-dom";
import Meta from "antd/es/card/Meta";
import { Card, Divider, Image, Typography } from "antd";
import styles from "./FeaturesProduct.module.css";

const FeaturesProduct = () => {
  const products = [
    {
      _id: 1,
      name: "Nón da",
      img: "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png",
    },
    {
      _id: 2,
      name: "Nón da",
      img: "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png",
    },
    {
      _id: 3,
      name: "Nón da",
      img: "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png",
    },
    {
      _id: 4,
      name: "Nón da",
      img: "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png",
    },
    {
      _id: 5,
      name: "Nón da",
      img: "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png",
    },
    {
      _id: 6,
      name: "Nón da",
      img: "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png",
    },
    {
      _id: 7,
      name: "Nón da",
      img: "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png",
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
    <div>
      <Typography.Title style={{ textAlign: "center", width: "100%" }}> Sản phẩm nổi bật</Typography.Title>

      <Carousel responsive={responsive}>
        {products.map((item) => (
          <Link key={item._id} to={"product/" + item._id}>
            <Card className={styles.cardContainer} hoverable>
              <Image className={styles.img} preview={false} src={item.img} />
              <Meta title="Europe Street beat" description="100.000đ" />
            </Card>
          </Link>
        ))}
      </Carousel>
      <Divider />
    </div>
  );
};
export default FeaturesProduct;
