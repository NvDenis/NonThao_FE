import { Button, Card, Divider } from "antd";
import styles from "./CheckoutOrder.module.css";
import { useSelector } from "react-redux";
const CheckoutOrder = ({ setCurrentStep }) => {
  const { cart } = useSelector((state) => state.account.user);

  return (
    <Card>
      <div className={styles.row}>
        <span>Tạm tính:</span>
        <span>100.000</span>
      </div>
      <Divider />

      <div className={styles.row}>
        <span>Tạm tính:</span>
        <span>100.000</span>
      </div>
      <Divider />

      <Button
        type="primary"
        disabled={!cart.some((item) => item.checked)}
        className={styles.btnOrder}
        onClick={() => setCurrentStep((pre) => (pre += 1))}
      >
        Mua hàng
      </Button>
    </Card>
  );
};
export default CheckoutOrder;
