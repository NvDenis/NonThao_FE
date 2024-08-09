import { Button, Card, Result, Col, Row, Steps, Checkbox, Space } from "antd";
import styles from "./Order.module.css";
import { useState } from "react";
import Cart from "../../components/Cart";
import CheckoutOrder from "../../components/CheckoutOrder";
import ProductChooses from "../../components/ProductChooses";
import CheckoutPayment from "../../components/CheckoutPayment";
import { ShoppingCartOutlined, SmileOutlined, SolutionOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { checkAllProduct } from "../../redux/features/user/userSlice";

const Order = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const { user } = useSelector((state) => state.account);
  const dispatch = useDispatch();
  return (
    <>
      <Card className={styles.cardStep}>
        <Steps
          size="small"
          current={currentStep}
          items={[
            {
              title: (
                <p style={{ cursor: "pointer" }} onClick={() => setCurrentStep(0)}>
                  Giỏ hàng
                </p>
              ),
              icon: <ShoppingCartOutlined />,
            },
            {
              title: (
                <p style={{ cursor: "pointer" }} onClick={() => setCurrentStep(1)}>
                  Đặt hàng
                </p>
              ),
              icon: <SolutionOutlined />,
            },
            {
              title: (
                <p style={{ cursor: "pointer" }} onClick={() => setCurrentStep(2)}>
                  Thành công
                </p>
              ),
              icon: <SmileOutlined />,
            },
          ]}
        />
      </Card>

      <div>
        {currentStep == 2 && (
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
        <Row>
          <Col span={24}>
            {currentStep == 0 && <Cart cart={user?.cart || []} />}
            {currentStep == 1 && <ProductChooses />}
          </Col>
        </Row>
      </div>
      <div className={styles.checkOutOrder}>
        <Card className={styles.checkOutOrderCard}>
          <Checkbox onClick={() => dispatch(checkAllProduct())}>
            {user?.cart?.every((item) => item.checked) ? (
              <>Bỏ chọn tất cả sản phẩm</>
            ) : (
              <>Chọn tất cả sản phẩm</>
            )}
          </Checkbox>

          <Space>
            <Button
              type="primary"
              disabled={!user?.cart?.some((item) => item.checked)}
              className={styles.btnOrder}
              onClick={() => setCurrentStep((pre) => (pre += 1))}
            >
              Mua hàng
            </Button>
          </Space>
        </Card>
      </div>
    </>
  );
};
export default Order;
