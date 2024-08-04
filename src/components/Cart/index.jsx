import { Card, Checkbox, Image, InputNumber, message, Typography } from "antd";
import styles from "./Cart.module.css";
import { DeleteOutlined } from "@ant-design/icons";
import formatPrice from "../../utils/formatPrice";
import { callUpdateCartItem } from "../../services/api";
import { useDispatch } from "react-redux";
import { updateCart } from "../../redux/features/user/userSlice";

const Cart = ({ cart }) => {
  const dispatch = useDispatch();
  const onChange = async (e, item) => {
    try {
      const res = await callUpdateCartItem(item._id, { quantity: Number(e.target.value) });
      if (res.vcode == 0) {
        dispatch(updateCart({ _id: item._id, quantity: Number(e.target.value) }));
      }
    } catch (error) {
      console.error(error.message);
    }
  };
  return (
    <>
      {cart &&
        cart.map((item) => {
          return (
            <Card key={item._id} span={24} style={{ marginBottom: "10px" }}>
              <div className={styles.cardContainer}>
                <div className={styles.groupImage}>
                  <Checkbox className={styles.checkBox} />
                  <Image
                    className={styles.imageProduct}
                    src={import.meta.env.VITE_BASE_URL + "/uploads/images/hat/" + item.images[0]}
                  />
                  <Typography.Text className={styles.title}>{item.name}</Typography.Text>
                </div>
                <div className={styles.groupSum}>
                  <Typography.Text className={styles.title2}>{item.name}</Typography.Text>
                  <Typography.Text>{formatPrice(item.price.toString())}đ </Typography.Text>
                  <InputNumber
                    className={styles.quantityInput}
                    min={1}
                    max={10}
                    defaultValue={item.quantity}
                    onBlur={(value) => onChange(value, item)}
                  />
                </div>
                <Typography.Text className={styles.sumProduct}>
                  Tổng : {formatPrice((item.quantity * item.price).toString())}đ
                </Typography.Text>
                <DeleteOutlined className={styles.deleteIcon} />
              </div>
            </Card>
          );
        })}
    </>
  );
};
export default Cart;
