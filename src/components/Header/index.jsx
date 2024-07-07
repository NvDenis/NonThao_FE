import {
  Affix,
  Avatar,
  Button,
  Col,
  Divider,
  Dropdown,
  Input,
  Menu,
  Row,
  Space,
  Typography,
  message,
} from "antd";
import styles from "./Header.module.css";
import {
  EnvironmentOutlined,
  MenuOutlined,
  PhoneOutlined,
  SearchOutlined,
  ShoppingCartOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Link, useNavigate } from "react-router-dom";
import { toggleCartDrawer, toggleMenuMobile } from "../../redux/features/toggle/toggleSlice";
import { useDispatch, useSelector } from "react-redux";

import React, { useEffect, useState } from "react";
import { callLogout } from "../../services/api";
import { logout } from "../../redux/features/user/userSlice";
const menuItem = [
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
];

const modalAuth = [
  {
    key: "1",
    label: <Link to="/login">Đăng nhập</Link>,
  },
  {
    key: "2",
    label: <Link to="/register">Đăng ký</Link>,
  },
  {
    key: "3",
    label: <span>Facebook</span>,
  },
];

const Header = () => {
  const dispatch = useDispatch();
  const [current, setCurrent] = useState("mail");
  const [isShowGroupIconFix, setIsShowGroupIconFix] = useState(false);
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.account);

  const handleLogout = async () => {
    try {
      const res = await callLogout();
      if (res?.vcode == 0) {
        dispatch(logout());
        message.success("Đăng xuất thành công");
        navigate("/");
      } else {
        message.error(res.message);
      }
    } catch (error) {
      message.error(error.message);
    }
  };

  const modalLogined = [
    {
      key: "profile",
      label: <Link to="/account">Quản lý tài khoản</Link>,
    },

    {
      key: "logout",
      label: <div onClick={() => handleLogout()}>Đăng xuất</div>,
    },

    ...(user?.role === "ADMIN"
      ? [
          {
            key: "admin",
            label: <Link to="/admin">Quản trị hệ thống</Link>,
          },
        ]
      : []),
  ];

  const onClick = (e) => {
    setCurrent(e.key);
  };

  useEffect(() => {
    document.addEventListener("scroll", () => {
      if (window.scrollY > 0) {
        setIsShowGroupIconFix(true);
      } else setIsShowGroupIconFix(false);
    });
  }, [window.scrollY]);

  return (
    <div className={styles.header}>
      <div className={styles.headerContainer}>
        <Row
          gutter={16}
          align={"middle"}
          justify={"space-between"}
          className={styles.headerWrapper}
        >
          <Col
            xl={{
              span: 6,
            }}
          >
            <Space gutter={16} className={styles.containerLeft}>
              <Link to="/">
                <Space>
                  <PhoneOutlined className={styles.icon} />
                  <Typography.Text className={styles.logo}>0366325248</Typography.Text>
                </Space>
              </Link>

              <Divider type="vertical" />
              <Link>
                <Space>
                  <EnvironmentOutlined className={styles.icon} />
                  <Typography.Text className={styles.logo}>Địa chỉ</Typography.Text>
                </Space>
              </Link>
            </Space>
          </Col>

          <Col>
            <Link to={"/"}>
              <Typography.Title>Logo</Typography.Title>
            </Link>
          </Col>

          <Col className={styles.containerRight}>
            <Space>
              <div className={styles.authDropdownContainer}>
                <Space>
                  <SearchOutlined className={styles.icon} />
                  <Typography.Text className={styles.logo}>Tìm kiếm</Typography.Text>
                  <Divider type="vertical" />
                </Space>

                <Space onClick={() => dispatch(toggleCartDrawer())}>
                  <ShoppingCartOutlined className={styles.icon} />
                  <Typography.Text className={styles.logo}>Giỏ hàng</Typography.Text>
                </Space>
                <Divider type="vertical" />
                <Dropdown
                  className={styles.authDropdown}
                  menu={{
                    items: user && user._id ? modalLogined : modalAuth,
                  }}
                  placement="bottomRight"
                  arrow
                  trigger={["click"]}
                >
                  <Space>
                    {user && user._id ? (
                      <>
                        <Avatar size="small" icon={<UserOutlined />} />
                        <Typography.Text className={styles.logo}>{user.name}</Typography.Text>
                      </>
                    ) : (
                      <>
                        <UserOutlined className={styles.icon} />
                        <Typography.Text className={styles.logo}>Tài khoản</Typography.Text>
                      </>
                    )}
                  </Space>
                </Dropdown>
              </div>
            </Space>
          </Col>
        </Row>
      </div>

      <div className={styles.headerMenu}>
        <Affix offsetTop={0}>
          <div className={styles.fixContainer}>
            <Menu
              className={styles.menuHorizontal}
              onClick={onClick}
              selectedKeys={[current]}
              mode="horizontal"
              items={menuItem}
            />

            <Space
              className={styles.groupIcon}
              style={{
                display: isShowGroupIconFix ? "flex" : "none",
              }}
            >
              <Space onClick={() => dispatch(toggleCartDrawer())}>
                <ShoppingCartOutlined className={styles.icon} />
                <Divider type="vertical" />
              </Space>

              <Dropdown
                className={styles.authDropdown}
                menu={{
                  items: user && user._id ? modalLogined : modalAuth,
                }}
                placement="bottomRight"
                arrow
                trigger={["click"]}
              >
                <Space>
                  {user && user._id ? (
                    <>
                      <Avatar size="small" icon={<UserOutlined />} />
                      <Typography.Text className={styles.logo}>{user.name}</Typography.Text>
                    </>
                  ) : (
                    <>
                      <UserOutlined className={styles.icon} />
                      <Typography.Text className={styles.logo}>Tài khoản</Typography.Text>
                    </>
                  )}
                </Space>
              </Dropdown>
            </Space>
          </div>
        </Affix>
      </div>

      <Affix className={styles.menuMobileContainer}>
        <div className={styles.menuMobileBg}>
          <Row justify={"space-between"} className={styles.menuMobile}>
            <Col>
              <div onClick={() => dispatch(toggleMenuMobile())} className={styles.toggleContainer}>
                <MenuOutlined className={styles.btnToggle} />
                <Typography.Title level={5} className={styles.titleToggle}>
                  MENU
                </Typography.Title>
              </div>
            </Col>

            <Col>
              <Space>
                <SearchOutlined className={styles.icon} />
                <Divider type="vertical" />
              </Space>

              <Space onClick={() => dispatch(toggleCartDrawer())}>
                <ShoppingCartOutlined className={styles.icon} />
              </Space>
            </Col>
          </Row>
        </div>
      </Affix>
    </div>
  );
};

export default Header;
