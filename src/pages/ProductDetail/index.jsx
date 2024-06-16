import { Button, Col, ColorPicker, InputNumber, Rate, Row, Space } from "antd";
import ImageGallery from "react-image-gallery";
import styles from "./ProductDetail.module.css";
import Title from "antd/es/typography/Title";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { BorderRightOutlined, ShoppingCartOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";

const images = [
  {
    original: "https://picsum.photos/id/1018/1000/600/",
    thumbnail: "https://picsum.photos/id/1018/250/150/",
  },
  {
    original: "https://picsum.photos/id/1015/1000/600/",
    thumbnail: "https://picsum.photos/id/1015/250/150/",
  },
  {
    original: "https://picsum.photos/id/1019/1000/600/",
    thumbnail: "https://picsum.photos/id/1019/250/150/",
  },
];

const ProductDetail = () => {
  const { user } = useSelector((state) => state.account);
  const [product, setProduct] = useState({
    _id: "1",
    name: "Nón da",
    category: "Nón kết",
    id_category: "1",
    units: [
      {
        color: "#1677ff",
        price: 100000,
        images: [
          {
            original: "https://picsum.photos/id/1018/1000/600/",
            thumbnail: "https://picsum.photos/id/1018/250/150/",
          },
        ],
      },
      {
        color: "#000000",
        price: 200000,
        images: [
          {
            original: "https://picsum.photos/id/1019/1000/600/",
            thumbnail: "https://picsum.photos/id/1019/250/150/",
          },
        ],
      },
      {
        color: "#f1f2f3f4",
        price: 300000,
        images: [
          {
            original: "https://picsum.photos/id/1019/1000/600/",
            thumbnail: "https://picsum.photos/id/1019/250/150/",
          },
        ],
      },
    ],
    rating: 2,
    sold: 26,
  });
  const navigate = useNavigate();
  const { id } = useParams();
  const [unitActive, setUnitActive] = useState({
    color: "#1677ff",
    price: 100000,
    images: [
      {
        original: "https://picsum.photos/id/1018/1000/600/",
        thumbnail: "https://picsum.photos/id/1018/250/150/",
      },
    ],
  });

  const handleAddToCart = () => {
    if (user) {
      // TODO: Add to cart
    } else {
      // navigate to login page
      navigate("/login");
    }
  };

  useEffect(() => {
    setUnitActive(product.units[0]);
  }, []);

  const handleActiveUnit = (unit) => {
    setUnitActive(unit);
  };

  return (
    <Row gutter={32} className={styles.container}>
      <Col span={12}>
        <ImageGallery items={unitActive.images} />
      </Col>
      <Col span={12}>
        <Row gutter={[16, 16]}>
          <Col span={24}>
            <p>Danh mục: {product.category}</p>
          </Col>
          <Col span={24}>
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <Rate disabled defaultValue={2} />
              <span>Đã bán: {product.sold}</span>
            </div>
          </Col>
          <Col span={24}>
            <h1>{product.name}</h1>
          </Col>

          <Col span={24}>
            <p>Màu sắc:</p>
            <div style={{ display: "flex", gap: "16px", marginTop: "5px" }}>
              {product.units.map((unit, index) => (
                <ColorPicker
                  style={{
                    border: unit.color === unitActive.color ? "2px solid #1677ff" : "none",
                  }}
                  key={index}
                  defaultValue={unit.color}
                  open={false}
                  onClick={() => handleActiveUnit(unit)}
                />
              ))}
            </div>
          </Col>

          <Col span={24}>
            <Title>{unitActive.price}đ</Title>
          </Col>

          <Col span={24}>
            <InputNumber addonBefore="-" addonAfter="+" controls={false} defaultValue={1} min={1} />
          </Col>
          <Col span={24}>
            <Space gutter={16}>
              <Button
                className={styles.btn}
                onClick={handleAddToCart}
                icon={<ShoppingCartOutlined />}
              >
                Thêm vào giỏ hàng
              </Button>
              <Button className={styles.btn} type="primary">
                Mua ngay
              </Button>
            </Space>
          </Col>
        </Row>
      </Col>
    </Row>
  );
};
export default ProductDetail;
