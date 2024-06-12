import { Button, Col, Divider, Dropdown, Input, Row, Space, Typography } from "antd";
import styles from "./Header.module.css";
import Title from "antd/es/typography/Title";
import { ShoppingCartOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import { toggleCartDrawer } from "../../redux/features/toggle/toggleSlice";
import { useDispatch } from "react-redux";

const items = [
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
  return (
    <div className={styles.header}>
      <Row gutter={16} align={"middle"}>
        <Col span={6}>
          <Link to="/">
            <Title>Logo</Title>
          </Link>
        </Col>
        <Col span={12}>
          <Input placeholder="Basic usage" />
        </Col>
        <Col span={6}>
          <Space split={<Divider type="vertical" />}>
            <ShoppingCartOutlined
              style={{ fontSize: 24, cursor: "pointer" }}
              onClick={() => dispatch(toggleCartDrawer())}
            />

            <Dropdown
              menu={{
                items,
              }}
              placement="bottomRight"
              arrow
              trigger={["click"]}
            >
              <Typography.Link>Tài khoản</Typography.Link>
            </Dropdown>
          </Space>

          <Divider type="vertical" />
        </Col>
      </Row>
    </div>
  );
};
export default Header;
