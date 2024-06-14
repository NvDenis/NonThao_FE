import { Col, Image, Pagination, Row, Segmented } from "antd";
import Card from "antd/es/card/Card";
import Meta from "antd/es/card/Meta";
import { Link } from "react-router-dom";
import Filter from "../../components/Filter";
import Carousel from "react-multi-carousel";
import styles from "./CategoryDetail.module.css";

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
];

const CategoryDetail = () => {
  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: 5,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 4,
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
      <Row gutter={18} style={{ marginBottom: "10px" }}>
        <Col span={6}>
          <Filter />
        </Col>
        <Col span={16}>
          <Card bordered={false}>
            <Segmented
              style={{ marginBottom: "10px" }}
              options={["Phổ biến", "Hàng mới", "Giá thấp đến cao", "Giá cao đến thấp"]}
            />
            <Carousel responsive={responsive}>
              {products.map((item) => (
                <Link key={item._id} to={"/product/" + item._id}>
                  <Card hoverable className={styles.cardContainer}>
                    <Image preview={false} src={item.img} />
                    <Meta title="Europe Street beat" description="100.000đ" />
                  </Card>
                </Link>
              ))}
            </Carousel>
            <div style={{ textAlign: "right" }}>
              <Pagination defaultCurrent={6} total={40} />
            </div>
          </Card>
        </Col>
      </Row>
    </>
  );
};
export default CategoryDetail;
