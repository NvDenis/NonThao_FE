import {
  AppstoreOutlined,
  CalendarOutlined,
  FilterOutlined,
  LinkOutlined,
  MailOutlined,
  ReloadOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import Title from "antd/es/typography/Title";
import { Card, Checkbox, Col, Divider, Flex, Menu, Row } from "antd";
import { useState } from "react";
import { Link } from "react-router-dom";

const Filter = () => {
  const [mode, setMode] = useState("inline");
  const [theme, setTheme] = useState("light");
  const items = [
    {
      label: <Link to={"/category/non-ket"}>NÓN KẾT</Link>,
      key: "1",
    },
    {
      label: <Link to={"/category/non-da"}>NÓN DA</Link>,
      key: "2",
    },
    {
      label: <Link to={"/category/non-dan-tay"}>NÓN ĐAN TAY</Link>,
      key: "3",
    },
    {
      label: <Link to={"/category/non-vanh"}>NÓN VÀNH</Link>,
      key: "4",
    },
    {
      label: <Link to={"/category/non-phot"}>NÓN PHỚT</Link>,
      key: "5",
    },
    {
      label: <Link to={"/category/non-tre-em"}>NÓN TRẺ EM</Link>,
      key: "6",
    },
  ];
  const changeMode = (value) => {
    setMode(value ? "vertical" : "inline");
  };
  const changeTheme = (value) => {
    setTheme(value ? "dark" : "light");
  };
  const onChange = (key) => {
    console.log(key);
  };
  return (
    <Card bordered={false}>
      <Flex justify={"space-between"}>
        <Flex justify={"space-between"} gap={"10px"} align={"center"}>
          <FilterOutlined />
          <Title level={5} style={{ margin: 0 }}>
            Bộ lọc tìm kiếm
          </Title>
        </Flex>
        <ReloadOutlined />
      </Flex>
      <Divider />
      <Checkbox.Group
        style={{
          width: "100%",
        }}
        onChange={onChange}
      >
        <Row gutter={[16, 8]}>
          <Menu
            defaultSelectedKeys={["1"]}
            defaultOpenKeys={["sub1"]}
            mode={mode}
            theme={theme}
            items={items}
          />
        </Row>
      </Checkbox.Group>
    </Card>
  );
};
export default Filter;
