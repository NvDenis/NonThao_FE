import { FilterOutlined, ReloadOutlined } from "@ant-design/icons";
import Title from "antd/es/typography/Title";
import { Card, Checkbox, Col, Divider, Flex, Row } from "antd";

const Filter = () => {
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
          <Col span={24}>
            <Checkbox value="A">Nón da</Checkbox>
          </Col>
          <Col span={24}>
            <Checkbox value="B">Nón kết</Checkbox>
          </Col>
          <Col span={24}>
            <Checkbox value="C">Nón tai bèo</Checkbox>
          </Col>
          <Col span={24}>
            <Checkbox value="D">Nón vành</Checkbox>
          </Col>
          <Col span={24}>
            <Checkbox value="E">Nón trẻ em</Checkbox>
          </Col>
          <Col span={24}>
            <Checkbox value="F">Nón da</Checkbox>
          </Col>
          <Col span={24}>
            <Checkbox value="G">Nón quảng châu</Checkbox>
          </Col>
        </Row>
      </Checkbox.Group>
    </Card>
  );
};
export default Filter;
