import { Card, Image, InputNumber, Typography } from "antd";
import styles from "./ProductChooses.module.css";
import { DeleteOutlined } from "@ant-design/icons";

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
            <Card span={24} style={{ marginBottom: "10px" }}>
              <div className={styles.cardContainer}>
                <div className={styles.groupImage}>
                  <Image className={styles.imageProduct} src={item.img} />
                  <Typography.Text className={styles.title}>{item.name}</Typography.Text>
                </div>
                <div className={styles.groupSum}>
                  <Typography.Text className={styles.title2}>{item.name}</Typography.Text>
                  <Typography.Text>{item.price} </Typography.Text>
                  <Typography.Text>Số lượng: {item.quantity} </Typography.Text>
                </div>
                <Typography.Text className={styles.sumProduct}>Tổng : {item.quantity * item.price} </Typography.Text>
              </div>
            </Card>
          );
        })}
    </>
  );
};
export default ProductChooses;
