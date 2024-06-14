import { Card, Checkbox, Image, InputNumber, Typography } from "antd";
import styles from "./Cart.module.css";
import { DeleteOutlined } from "@ant-design/icons";

const onChange = (value) => {
  console.log("changed", value);
};

const Cart = ({ cart }) => {
  return (
    <>
      {cart &&
        cart.map((item) => {
          return (
            <Card key={item._id} span={24} style={{ marginBottom: "10px" }}>
              <div className={styles.cardContainer}>
                <div className={styles.groupImage}>
                  <Checkbox className={styles.checkBox} />
                  <Image className={styles.imageProduct} src={item.img} />
                  <Typography.Text className={styles.title}>{item.name}</Typography.Text>
                </div>
                <div className={styles.groupSum}>
                  <Typography.Text className={styles.title2}>{item.name}</Typography.Text>
                  <Typography.Text>{item.price} </Typography.Text>
                  <InputNumber
                    className={styles.quantityInput}
                    min={1}
                    max={10}
                    defaultValue={item.quantity}
                    onChange={onChange}
                  />
                </div>
                <Typography.Text className={styles.sumProduct}>Tổng : {item.quantity * item.price} </Typography.Text>
                <DeleteOutlined className={styles.deleteIcon} />
              </div>
            </Card>
          );
        })}
    </>
  );
};
export default Cart;
