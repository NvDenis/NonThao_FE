import {
  Button,
  Card,
  Result,
  Col,
  Divider,
  Image,
  InputNumber,
  Row,
  Steps,
  Typography,
} from "antd";
import styles from "./Order.module.css";
import { useState } from "react";
import Cart from "../../components/Cart";
import CheckoutOrder from "../../components/CheckoutOrder";
import ProductChooses from "../../components/ProductChooses";
import CheckoutPayment from "../../components/CheckoutPayment";
import { SmileOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const cart = [
  {
    _id: 1,
    img: "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png",
    name: "Product 1",
    price: 100000,
    quantity: 2,
  },
  {
    _id: 2,
    img: "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png",
    name: "Product 2",
    price: 200000,
    quantity: 12,
  },
];

const Order = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const { user } = useSelector((state) => state.account);
  return (
    <>
      <Card className={styles.cardStep}>
        <Steps
          size="small"
          current={currentStep}
          items={[
            {
              title: "Đơn hàng",
            },
            {
              title: "Đặt hàng",
            },
            {
              title: "Thành công",
            },
          ]}
        />
      </Card>

      <div>
        {currentStep == 3 && (
          <Result
            icon={<SmileOutlined />}
            title="Đặt hành thành công!"
            extra={
              <Link to={"/"}>
                <Button type="primary">Tiếp tục mua</Button>
              </Link>
            }
          />
        )}
        <Row
          gutter={{
            xs: 0,
            sm: 0,
            xl: 20,
          }}
        >
          <Col
            xs={{
              span: 24,
            }}
            lg={{
              span: 24,
            }}
            xl={{
              span: 16,
            }}
          >
            {currentStep == 1 && <Cart cart={user?.cart || []} />}
            {currentStep == 2 && <ProductChooses />}
          </Col>
          <Col
            xs={{
              span: 24,
            }}
            lg={{
              span: 24,
            }}
            xl={{
              span: 8,
            }}
          >
            {currentStep == 1 && <CheckoutOrder setCurrentStep={setCurrentStep} />}
            {currentStep == 2 && <CheckoutPayment setCurrentStep={setCurrentStep} />}
          </Col>
        </Row>
      </div>
    </>
  );
};
export default Order;
