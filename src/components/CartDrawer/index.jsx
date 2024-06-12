import { Drawer } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { toggleCartDrawer } from "../../redux/features/toggle/toggleSlice";

const CartDrawer = ({ open, onClose }) => {
  const { cartDrawer } = useSelector((state) => state.toggle);
  const dispatch = useDispatch();

  return (
    <Drawer onClose={() => dispatch(toggleCartDrawer())} open={cartDrawer}>
      <p>Some contents...</p>
      <p>Some contents...</p>
      <p>Some contents...</p>
    </Drawer>
  );
};
export default CartDrawer;
