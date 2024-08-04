import { DeleteOutlined } from "@ant-design/icons";
import { Divider, Image, message } from "antd";
import formatPrice from "../../utils/formatPrice";
import { callRemoveCartItem } from "../../services/api";

const CartItemDrawer = ({ item }) => {
  const handleRemoveCartItem = async (id) => {
    try {
      const res = await callRemoveCartItem(id);
      if (res.vcode == 0) {
        message.success(res.message);
      } else message.error(res.message);
    } catch (error) {
      console.error("error", error.message);
    }
  };

  return (
    <>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <Image
            src={import.meta.env.VITE_BASE_URL + "/uploads/images/hat/" + item.images[0]}
            preview={false}
            height={80}
            width={80}
          />
          <div>
            <p>{item.name}</p>
            <div>
              <span>
                {item.quantity} x {formatPrice(item.price.toString())} đ
              </span>
            </div>
          </div>
        </div>
        <DeleteOutlined
          style={{ color: "red", cursor: "pointer" }}
          onClick={() => handleRemoveCartItem(item._id)}
        />
      </div>
      <Divider />
    </>
  );
};
export default CartItemDrawer;
