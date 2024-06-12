import { Button, Col, ColorPicker, InputNumber, Rate, Row, Space } from "antd";
import ImageGallery from "react-image-gallery";
import styles from "./ProductDetail.module.css";
import Title from "antd/es/typography/Title";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

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
  const navigate = useNavigate();

  const handleAddToCart = () => {
    if (user) {
      // TODO: Add to cart
    } else {
      // navigate to login page
      navigate("/login");
    }

    console.log("user", user);
  };

  return (
    <Row gutter={32} className={styles.container}>
      <Col span={12}>
        <ImageGallery items={images} />
      </Col>
      <Col span={12}>
        <Row gutter={[16, 16]}>
          <Col span={24}>
            <p>Danh mục: Nón kết</p>
          </Col>
          <Col span={24}>
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <Rate disabled defaultValue={2} />
              <span>Đã bán: 26</span>
            </div>
          </Col>
          <Col span={24}>
            <h1>Nón da</h1>
          </Col>

          <Col span={24}>
            <p>Màu sắc:</p>
            <div style={{ display: "flex", gap: "16px", marginTop: "5px" }}>
              <ColorPicker defaultValue="#1677ff" open={false} />
              <ColorPicker defaultValue="#000000" open={false} />
              <ColorPicker defaultValue="#f1f2f3f4" open={false} />
            </div>
          </Col>

          <Col span={24}>
            <Title>100.000 đ</Title>
          </Col>

          <Col span={24}>
            <InputNumber addonBefore="-" addonAfter="+" defaultValue={1} min={1} />
          </Col>
          <Col span={24}>
            <Space gutter={16}>
              <Button onClick={handleAddToCart}> Thêm vào giỏ hàng</Button>
              <Button type="primary">Mua ngay</Button>
            </Space>
          </Col>
        </Row>
      </Col>
    </Row>
  );
};
export default ProductDetail;
