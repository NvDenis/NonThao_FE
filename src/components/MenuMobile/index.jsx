import { Drawer, Menu } from "antd";
import { toggleMenuMobile } from "../../redux/features/toggle/toggleSlice";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
const items = [
  {
    label: <Link to={"category/non-ket"}>NÓN KẾT</Link>,
    key: "1",
  },
  {
    label: <Link to={"category/non-da"}>NÓN DA</Link>,
    key: "2",
  },
  {
    label: <Link to={"category/non-dan-tay"}>NÓN ĐAN TAY</Link>,
    key: "3",
  },
  {
    label: <Link to={"category/non-vanh"}>NÓN VÀNH</Link>,
    key: "4",
  },
  {
    label: <Link to={"category/non-phot"}>NÓN PHỚT</Link>,
    key: "5",
  },
  {
    label: <Link to={"category/non-tre-em"}>NÓN TRẺ EM</Link>,
    key: "6",
  },
  {
    type: "divider",
  },
  {
    key: "13",
    label: <Link to="/login">Đăng nhập</Link>,
  },
  {
    key: "14",
    label: <Link to="/register">Đăng ký</Link>,
  },
];

const MenuMobile = () => {
  const { menuMobile } = useSelector((state) => state.toggle);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onClose = () => {
    dispatch(toggleMenuMobile());
  };

  const onClick = (e) => {
    // navigate("/category/1");
  };

  return (
    <Drawer placement={"left"} onClose={onClose} open={menuMobile}>
      <Menu
        onClick={onClick}
        defaultSelectedKeys={["1"]}
        defaultOpenKeys={["sub1"]}
        mode="inline"
        items={items}
      />
    </Drawer>
  );
};
export default MenuMobile;
