import Carousel from "react-multi-carousel";
import { Link } from "react-router-dom";
import Meta from "antd/es/card/Meta";
import { Card, Divider, Image, Typography } from "antd";

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
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: 5,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 5,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  };
  return (
    <div>
      <Typography.Title style={{ textAlign: "center", width: "100%" }}> Sản phẩm nổi bật</Typography.Title>

      <Carousel responsive={responsive}>
        {products.map((item) => (
          <Link key={item._id} to={"product/" + item._id}>
            <Card
              hoverable
              style={{
                width: 240,
                margin: "0 0 10px 5px",
              }}
            >
              <Image width={200} preview={false} src={item.img} />
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
