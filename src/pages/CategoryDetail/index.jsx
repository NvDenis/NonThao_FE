import { Button, Col, Flex, Image, Pagination, Row, Segmented } from "antd";
import Card from "antd/es/card/Card";
import Meta from "antd/es/card/Meta";
import { Link } from "react-router-dom";
import Filter from "../../components/Filter";
import Carousel from "react-multi-carousel";
import styles from "./CategoryDetail.module.css";
import { ShoppingCartOutlined } from "@ant-design/icons";

const products = [
  {
    _id: 1,
    name: "Nón da",
    img: "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png",
    price: "100.000đ",
  },
  {
    _id: 2,
    name: "Nón da",
    img: "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png",
    price: "100.000đ",
  },
  {
    _id: 3,
    name: "Nón da",
    img: "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png",
    price: "100.000đ",
  },
  {
    _id: 4,
    name: "Nón da",
    img: "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png",
    price: "100.000đ",
  },
  {
    _id: 5,
    name: "Nón da",
    img: "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png",
    price: "100.000đ",
  },
  {
    _id: 6,
    name: "Nón da",
    img: "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png",
    price: "100.000đ",
  },
  {
    _id: 7,
    name: "Nón da",
    img: "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png",
    price: "100.000đ",
  },
  {
    _id: 8,
    name: "Nón da",
    img: "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png",
    price: "100.000đ",
  },
];

const CategoryDetail = () => {
  return (
    <>
      <Row gutter={18} style={{ marginBottom: "10px" }}>
        <Col span={24}>
          <Card bordered={false}>
            <div className={styles.segmentedContainer}>
              <Segmented
                style={{ marginBottom: "10px" }}
                options={["Phổ biến", "Hàng mới", "Giá thấp đến cao", "Giá cao đến thấp"]}
              />
            </div>
            <div className={styles.containerProducts}>
              {products.map((item) => (
                <Link key={item._id} to={"/product/" + item._id}>
                  <Card hoverable className={styles.cardContainer}>
                    <Image preview={false} src={item.img} />
                    <div className={styles.inforContainer}>
                      <div>
                        <h3>{item.name}</h3>
                        <p>{item.price}</p>
                      </div>
                      <div>
                        <Button type="primary">
                          <ShoppingCartOutlined />
                        </Button>
                      </div>
                    </div>
                  </Card>
                </Link>
              ))}
            </div>
            <div style={{ textAlign: "center", marginTop: "20px" }}>
              <Button type="primary">Xem thêm</Button>
            </div>
          </Card>
        </Col>
      </Row>
    </>
  );
};
export default CategoryDetail;
