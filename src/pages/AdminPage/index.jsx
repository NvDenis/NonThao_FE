import { useEffect, useState } from "react";
import { Link, Outlet } from "react-router-dom";
import { DesktopOutlined, FileOutlined, TeamOutlined, UserOutlined } from "@ant-design/icons";
import { Breadcrumb, Card, Col, Layout, Menu, Row, theme, Typography } from "antd";
import { useDispatch } from "react-redux";
import styles from "./AdminPage.module.css";
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
  getItem(<Link to={"/admin"}>Tổng quan</Link>, "2", <DesktopOutlined />),
  getItem("Sản phẩm", "sub1", <UserOutlined />, [
    getItem(<Link to={"/admin/product"}>Quản lý sản phẩm</Link>, "3"),
    getItem("Bill", "4"),
    getItem("Alex", "5"),
  ]),
  getItem("Đơn hàng", "sub2", <TeamOutlined />, [
    getItem(<Link to={"/admin/order"}>Quản lý đơn hàng</Link>, "6"),
    getItem("Team 2", "8"),
  ]),
  getItem("Files", "9", <FileOutlined />),
];

const AdminPage = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [currentStage, setCurrentStage] = useState();

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
            <Header className={styles.headerContainer} />
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
