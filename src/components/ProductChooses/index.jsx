import { Card, Image, InputNumber, Typography } from "antd";
import styles from "./ProductChooses.module.css";
import { DeleteOutlined } from "@ant-design/icons";
import { useSelector } from "react-redux";
import formatPrice from "../../utils/formatPrice";

const onChange = (value) => {
  console.log("changed", value);
};

const ProductChooses = () => {
  let { cart } = useSelector((state) => state.account.user);

  let cartChoosed = cart.filter((item) => item.checked);

  return (
    <>
      {cartChoosed &&
        cartChoosed.map((item) => {
          return (
            <Card key={item._id} span={24} style={{ marginBottom: "10px" }}>
              <div className={styles.cardContainer}>
                <div className={styles.groupImage}>
                  <Image
                    className={styles.imageProduct}
                    src={import.meta.env.VITE_BASE_URL + "/uploads/images/hat/" + item.images[0]}
                  />
                  <Typography.Text className={styles.title}>{item.name}</Typography.Text>
                </div>
                <div className={styles.groupSum}>
                  <Typography.Text className={styles.title2}>{item.name}</Typography.Text>
                  <Typography.Text>{formatPrice(item.price)}đ </Typography.Text>
                  <Typography.Text>Số lượng: {item.quantity} </Typography.Text>
                </div>
                <Typography.Text className={styles.sumProduct}>
                  Tổng : <strong>{formatPrice(item.quantity * item.price)}đ</strong>
                </Typography.Text>
              </div>
            </Card>
          );
        })}
    </>
  );
};
export default ProductChooses;
