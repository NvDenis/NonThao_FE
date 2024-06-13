import { Button, Col, Divider, Dropdown, Input, Row, Space, Typography } from "antd";
import styles from "./Header.module.css";
import Title from "antd/es/typography/Title";
import { MenuOutlined, SearchOutlined, ShoppingCartOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import { toggleCartDrawer, toggleMenuMobile } from "../../redux/features/toggle/toggleSlice";
import { useDispatch } from "react-redux";
const { Search } = Input;

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
      <div className={styles.headerContainer}>
        <Row gutter={16} align={"middle"} className={styles.headerWrapper}>
          <Col span={6}>
            <Link to="/">
              <Title className={styles.logo}>Logo</Title>
            </Link>
            <div onClick={() => dispatch(toggleMenuMobile())} className={styles.toggleContainer}>
              <MenuOutlined className={styles.btnToggle} />
              <Typography.Title level={5} className={styles.titleToggle}>
                MENU
              </Typography.Title>
            </div>
          </Col>
          <Col
            xl={{
              span: 12,
            }}
          >
            <Search placeholder="Nhập tên hoặc mã sản phẩm..." className={styles.search} loading enterButton />
          </Col>
          <Col span={6}>
            <Space>
              <div className={styles.containerIconSearch}>
                <SearchOutlined className={styles.searchIcon} />
                <Divider type="vertical" />
              </div>
              <ShoppingCartOutlined
                style={{ fontSize: 24, cursor: "pointer" }}
                onClick={() => dispatch(toggleCartDrawer())}
              />
              <div className={styles.authDropdownContainer}>
                <Divider type="vertical" />
                <Dropdown
                  className={styles.authDropdown}
                  menu={{
                    items,
                  }}
                  placement="bottomRight"
                  arrow
                  trigger={["click"]}
                >
                  <Typography.Link>Tài khoản</Typography.Link>
                </Dropdown>
              </div>
            </Space>
          </Col>
        </Row>
      </div>
    </div>
  );
};
export default Header;
