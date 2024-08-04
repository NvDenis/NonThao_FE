import { Button, Col, Flex, Image, Pagination, Row, Segmented } from "antd";
import Card from "antd/es/card/Card";
import { Link, useLocation } from "react-router-dom";
import styles from "./CategoryDetail.module.css";
import { ShoppingCartOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import { callGetDetailCategory, callGetProductByCategory } from "../../services/api";

const CategoryDetail = () => {
  const [detailCategory, setDetailCategory] = useState(null);
  const [products, setProducts] = useState([]);
  const link = useLocation();
  const getDetailCategory = async () => {
    try {
      const res = await callGetDetailCategory(link.pathname.split("/")[2]);
      if (res.vcode == 0) {
        setDetailCategory(res.data);
        getProductByCategory(res.data._id);
      } else {
        console.error("error", res.message);
      }
    } catch (error) {
      console.error("error", error.message);
    }
  };

  const getProductByCategory = async (id) => {
    try {
      const res = await callGetProductByCategory(id);
      if (res.vcode == 0) {
        setProducts(res.data);
      } else {
        console.error("error", res.message);
      }
    } catch (error) {
      console.error("error", error.message);
    }
  };

  useEffect(() => {
    getDetailCategory();
  }, [link]);

  return (
    <Row gutter={[16, 16]} style={{ marginBottom: "10px" }}>
      <Col span={24}>
        <Card>
          <Image
            height={300}
            preview={false}
            src={
              import.meta.env.VITE_BASE_URL + "/uploads/images/category/" + detailCategory?.banner
            }
            style={{ objectFit: "cover" }}
            width={"100%"}
          />
        </Card>
      </Col>
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
              <Link key={item._id} to={"/product/" + item.link}>
                <Card hoverable className={styles.cardContainer}>
                  <Image
                    preview={false}
                    src={
                      import.meta.env.VITE_BASE_URL +
                      "/uploads/images/hat/" +
                      item.units?.[0].images?.[0]
                    }
                    height={300}
                    width={"100%"}
                  />
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
  );
};
export default CategoryDetail;
