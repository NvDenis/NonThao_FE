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

const Filter = () => {
  const [mode, setMode] = useState("inline");
  const [theme, setTheme] = useState("light");
  const items = [
    {
      key: "1",
      icon: <MailOutlined />,
      label: "Navigation One",
    },
    {
      key: "2",
      icon: <CalendarOutlined />,
      label: "Navigation Two",
    },
    {
      key: "sub1",
      label: "Navigation Two",
      icon: <AppstoreOutlined />,
    },
    {
      key: "sub2",
      label: "Navigation Three",
      icon: <SettingOutlined />,
    },
    {
      key: "link",
      label: "Navigation Three",

      icon: <LinkOutlined />,
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
          <Menu defaultSelectedKeys={["1"]} defaultOpenKeys={["sub1"]} mode={mode} theme={theme} items={items} />
        </Row>
      </Checkbox.Group>
    </Card>
  );
};
export default Filter;
