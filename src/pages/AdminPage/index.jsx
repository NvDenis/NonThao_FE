import { useEffect, useState } from "react";
import { Link, Outlet } from "react-router-dom";
import { DesktopOutlined, FileOutlined, TeamOutlined, UserOutlined } from "@ant-design/icons";
import {
  Avatar,
  Breadcrumb,
  Card,
  Col,
  Dropdown,
  Layout,
  Menu,
  message,
  Row,
  Space,
  theme,
  Typography,
} from "antd";
import { useDispatch, useSelector } from "react-redux";
import styles from "./AdminPage.module.css";
import { callLogout } from "../../services/api";
import { logout } from "../../redux/features/user/userSlice";
const { Header, Content, Footer, Sider } = Layout;

function getItem(label, key, icon, children) {
  return {
    key,
    icon,
    children,
    label,
  };
}

const items = [
  getItem(<Link to={"/admin"}>Tổng quan</Link>, "1", <DesktopOutlined />),
  getItem("Sản phẩm", "sub1", <UserOutlined />, [
    getItem(<Link to={"/admin/product"}>Quản lý sản phẩm</Link>, "2"),
  ]),
  getItem("Danh mục", "3", <TeamOutlined />, [
    getItem(<Link to={"/admin/category"}>Quản lý danh mục</Link>, "4"),
  ]),
  getItem("Đơn hàng", "5", <TeamOutlined />, [
    getItem(<Link to={"/admin/order"}>Quản lý đơn hàng</Link>, "6"),
  ]),
  getItem("Files", "9", <FileOutlined />),
];

const AdminPage = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [currentStage, setCurrentStage] = useState();
  const { user } = useSelector((state) => state.account);
  const dispatch = useDispatch();
  const handleLogout = async () => {
    try {
      const res = await callLogout();
      if (res?.vcode == 0) {
        dispatch(logout());
        message.success(res.message);
        navigate("/");
      } else {
        message.error(res.message);
      }
    } catch (error) {
      message.error(error.message);
    }
  };
  const popoverItems = [
    {
      key: "profile",
      label: <Link to="/account">Quản lý tài khoản</Link>,
    },
    {
      key: "logout",
      label: <div onClick={() => handleLogout()}>Đăng xuất</div>,
    },
  ];

  console.log("user", user);

  return (
    <Layout
      style={{
        minHeight: "100vh",
      }}
    >
      {!currentStage && (
        <>
          <Sider
            className={styles.sidebar}
            collapsible
            collapsed={collapsed}
            onCollapse={(value) => setCollapsed(value)}
          >
            <div className="demo-logo-vertical" />
            <Menu theme="dark" defaultSelectedKeys={["1"]} mode="inline" items={items} />
          </Sider>
          <Layout className={styles.layout}>
            <Header className={styles.headerContainer}>
              <div style={{ display: "flex", justifyContent: "flex-end", alignItems: "center" }}>
                <Avatar size="large" icon={<UserOutlined />} style={{ marginRight: "20px" }} />
                <Dropdown
                  menu={{
                    items: popoverItems,
                  }}
                  arrow
                  trigger={["click"]}
                >
                  <p style={{ margin: 0 }}>{user.name}</p>
                </Dropdown>
              </div>
            </Header>
            <Content className={styles.contentContainer}>
              <Outlet />
            </Content>
            <Footer className={styles.footerContainer}>
              Ant Design ©{new Date().getFullYear()} Created by Ant UED
            </Footer>
          </Layout>
        </>
      )}

      {currentStage == "management" && (
        <div className={styles.managementContainer}>
          <Card className={styles.cartItem}>
            <Link to={"/admin/product"} onClick={() => setCurrentStage()}>
              <Typography.Title>Sản phẩm</Typography.Title>
            </Link>
          </Card>
          <Card>
            <Typography.Title>Hóa đơn</Typography.Title>
          </Card>
        </div>
      )}

      <nav className={styles.nav}>
        <div className={styles.navList}>
          <Link to="/">Trang chủ</Link>
          <Typography.Link to="/admin" onClick={() => setCurrentStage()}>
            Tổng quan
          </Typography.Link>
          <Typography.Link to="/admin" onClick={() => setCurrentStage("management")}>
            Quản lý
          </Typography.Link>
          <Typography.Link to="/admin" onClick={() => setCurrentStage("settings")}>
            Cài đặt
          </Typography.Link>
        </div>
      </nav>
    </Layout>
  );
};
export default AdminPage;
