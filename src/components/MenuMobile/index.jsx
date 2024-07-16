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
