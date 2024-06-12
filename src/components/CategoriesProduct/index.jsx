import Carousel from "react-multi-carousel";
import { Link } from "react-router-dom";
import Meta from "antd/es/card/Meta";
import { Card, Divider, Image, Typography } from "antd";
import nonvanh from "../../assets/images/non_vanh.jpg";

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
    <>
      <Typography.Title style={{ textAlign: "center", width: "100%", marginBottom: "5px" }}>
        Sản phẩm Nón Thảo
      </Typography.Title>
      <Typography.Text
        style={{
          textAlign: "center",
          width: "100%",
          display: "inline-block",
          fontSize: "16px",
          marginBottom: "15px",
        }}
      >
        Chất lượng, đẳng cấp và tinh tế thể hiện ở từng sản phẩm
      </Typography.Text>
      <Carousel responsive={responsive}>
        {products.map((item) => (
          <Link key={item._id} to={"category/" + item._id}>
            <Card
              hoverable
              style={{
                width: 240,
                margin: "0 0 10px 5px",
              }}
            >
              <Image width={200} preview={false} src={item.img} />
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
