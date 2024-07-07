import { Button, Drawer, Image, InputNumber } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { toggleCartDrawer } from "../../redux/features/toggle/toggleSlice";
import { Link } from "react-router-dom";
import { DeleteOutlined } from "@ant-design/icons";
import CartItemDrawer from "../CartItemDrawer";

const CartDrawer = () => {
  const { cartDrawer } = useSelector((state) => state.toggle);
  const { user } = useSelector((state) => state.account);
  const dispatch = useDispatch();

  return (
    <Drawer onClose={() => dispatch(toggleCartDrawer())} open={cartDrawer}>
      {user && user.cart.length > 0 ? (
        <>
          {user.cart.map((item) => {
            return <CartItemDrawer key={item._id} item={item} />;
          })}
        </>
      ) : (
        <p style={{ textAlign: "center" }}>Giỏ hàng của bạn đang trống</p>
      )}
    </Drawer>
  );
};
export default CartDrawer;
