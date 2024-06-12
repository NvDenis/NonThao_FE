import { Card, Divider, Typography } from "antd";
import styles from "./Register.module.css";
import { Button, Form, Input } from "antd";
import { Link } from "react-router-dom";
const onFinish = (values) => {
  console.log("Success:", values);
};
const onFinishFailed = (errorInfo) => {
  console.log("Failed:", errorInfo);
};

const Register = () => {
  return (
    <div className={styles.container}>
      <Card style={{ width: "40%", maxWidth: "600px" }}>
        <Typography.Title>Đăng ký</Typography.Title>
        <Divider />
        <Form
          name="basic"
          labelCol={{
            span: 24,
          }}
          initialValues={{
            remember: true,
          }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item
            label="Tên"
            name="name"
            rules={[
              {
                required: true,
                message: "Vui lòng nhập tên!",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Số điện thoại"
            name="phone"
            rules={[
              {
                required: true,
                message: "Vui lòng nhập số điện thoại!",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Mật khẩu"
            name="password"
            rules={[
              {
                required: true,
                message: "Vui lòng nhập mật khẩu!",
              },
            ]}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item
            label="Xác nhận mật khẩu"
            name="confirmPassword"
            rules={[
              {
                required: true,
                message: "Vui lòng nhập xác nhận mật khẩu!",
              },
            ]}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Đăng ký
            </Button>
          </Form.Item>
          <Divider>Hoặc</Divider>
          <Typography.Text>Đã có tài khoản?</Typography.Text>
          &nbsp;
          <Link to="/login" className="ant-typography">
            Đăng nhập
          </Link>
        </Form>
      </Card>
    </div>
  );
};
export default Register;
