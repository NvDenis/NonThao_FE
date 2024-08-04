import { Drawer, Menu, message, Typography } from "antd";
import {
  toggleMenuMobile,
  toggleModalLogin,
  toggleModalRegister,
} from "../../redux/features/toggle/toggleSlice";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { callLogout } from "../../services/api";
import { logout } from "../../redux/features/user/userSlice";

const MenuMobile = () => {
  const { menuMobile } = useSelector((state) => state.toggle);
  const { categories } = useSelector((state) => state.commonData);
  const { user } = useSelector((state) => state.account);
  const dispatch = useDispatch();

  const handleLogout = async () => {
    try {
      const res = await callLogout();
      if (res?.vcode == 0) {
        dispatch(logout());
        message.success(res.message);
      } else {
        message.error(res.message);
      }
    } catch (error) {
      message.error(error.message);
    }
  };

  const items = [
    ...categories.map((item) => {
      return {
        label: <Link to={`category/${item.link}`}>{item.name.toUpperCase()}</Link>,
        key: item._id,
      };
    }),
    {
      type: "divider",
    },
    ...(user
      ? [
          {
            key: "14",
            label: <div onClick={() => handleLogout()}>ĐĂNG XUẤT</div>,
          },
        ]
      : [
          {
            key: "13",
            label: <div onClick={() => dispatch(toggleModalLogin())}>ĐĂNG NHẬP</div>,
          },
          {
            key: "14",
            label: <div onClick={() => dispatch(toggleModalRegister())}>ĐĂNG KÝ</div>,
          },
        ]),
  ];

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
