import { Button, Col, ColorPicker, InputNumber, message, Rate, Row, Space } from "antd";
import ImageGallery from "react-image-gallery";
import styles from "./ProductDetail.module.css";
import Title from "antd/es/typography/Title";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { MinusOutlined, PlusOutlined, ShoppingCartOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import { callAddToCart, callGetProductByLink } from "../../services/api";
import { toggleModalLogin } from "../../redux/features/toggle/toggleSlice";
import { addToCart, updateCart } from "../../redux/features/user/userSlice";

const ProductDetail = () => {
  const { user } = useSelector((state) => state.account);
  const dispatch = useDispatch();
  const [product, setProduct] = useState({});
  const navigate = useNavigate();
  const { link } = useParams();
  const [quantity, setQuantity] = useState(1);
  const [unitActive, setUnitActive] = useState();
  const key = "updatable";
  const [messageApi, contextHolder] = message.useMessage();

  const handleAddToCart = async () => {
    if (!user) {
      dispatch(toggleModalLogin());
    } else {
      try {
        messageApi.open({
          key,
          type: "loading",
          content: "Loading...",
          duration: 0,
        });
        const data = {
          product: product._id,
          name: product.name,
          quantity: quantity,
          images: unitActive.images,
          color: unitActive.color,
          price: unitActive.price,
        };

        const res = await callAddToCart(data);
        if (res.vcode == 0) {
          setTimeout(() => {
            dispatch(updateCart(res.data));
            messageApi.open({
              key,
              type: "success",
              content: res.message,
              duration: 2,
            });
          }, 1000);
        } else message.error(res.message);
      } catch (error) {
        console.error("error", error.message);
      }
    }
  };

  const handleActiveUnit = (unit) => {
    setUnitActive(unit);
  };

  useEffect(() => {
    const getProductByLink = async () => {
      try {
        const res = await callGetProductByLink(link);
        console.log("check res", res);
        if (res.vcode == 0) {
          setProduct(res.data);
          setUnitActive(res.data.units[0]);
        }
      } catch (error) {
        console.error("error", error.message);
      }
    };

    getProductByLink();
  }, [link]);

  return (
    <Row gutter={32} className={styles.container}>
      {contextHolder}
      {unitActive && (
        <>
          <Col
            lg={{
              span: 24,
            }}
            xl={{
              span: 12,
            }}
          >
            <ImageGallery
              items={unitActive?.images.map((item) => {
                return {
                  thumbnail: import.meta.env.VITE_BASE_URL + "/uploads/images/hat/" + item,
                  original: import.meta.env.VITE_BASE_URL + "/uploads/images/hat/" + item,
                };
              })}
              showPlayButton={false}
            />
          </Col>
          <Col
            lg={{
              span: 24,
            }}
            xl={{
              span: 12,
            }}
          >
            <Row gutter={[16, 16]}>
              <Col span={24}>
                <p>
                  Danh mục: <strong>{product.id_category.name}</strong>
                </p>
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
                        border: unit.color == unitActive?.color ? "2px solid #1677ff" : "none",
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
                <Title>{unitActive?.price}đ</Title>
              </Col>

              <Col span={24}>
                <InputNumber
                  value={quantity}
                  addonBefore={
                    <MinusOutlined
                      style={{
                        cursor: "pointer",
                        padding: "10px",
                      }}
                      onClick={() => setQuantity(quantity - 1)}
                    />
                  }
                  addonAfter={
                    <PlusOutlined
                      style={{
                        cursor: "pointer",
                        padding: "10px",
                      }}
                      onClick={() => setQuantity(quantity + 1)}
                    />
                  }
                  controls={false}
                  defaultValue={1}
                  min={1}
                />
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
        </>
      )}
    </Row>
  );
};
export default ProductDetail;
