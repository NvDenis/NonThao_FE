import { Drawer, Menu } from "antd";
import { toggleMenuMobile } from "../../redux/features/toggle/toggleSlice";
import { useDispatch, useSelector } from "react-redux";
import { AppstoreOutlined, MailOutlined, SettingOutlined } from "@ant-design/icons";
import { Link, useNavigate } from "react-router-dom";
const items = [
  {
    key: "sub1",
    icon: <MailOutlined />,
    label: "Navigation Two",
  },
  {
    key: "sub2",
    label: "Navigation Two",
    icon: <AppstoreOutlined />,
  },

  {
    key: "sub4",
    label: "Navigation Three",
    icon: <SettingOutlined />,
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
      <Menu onClick={onClick} defaultSelectedKeys={["1"]} defaultOpenKeys={["sub1"]} mode="inline" items={items} />
    </Drawer>
  );
};
export default MenuMobile;
