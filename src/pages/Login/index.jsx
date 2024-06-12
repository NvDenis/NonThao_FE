import { Card, Divider, Typography } from "antd";
import styles from "./Login.module.css";
import { Button, Checkbox, Form, Input } from "antd";
import { Link } from "react-router-dom";
const onFinish = (values) => {
  console.log("Success:", values);
};
const onFinishFailed = (errorInfo) => {
  console.log("Failed:", errorInfo);
};

const Login = () => {
  return (
    <div className={styles.container}>
      <Card style={{ width: "40%", maxWidth: "600px" }}>
        <Typography.Title>Đăng nhập</Typography.Title>
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
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Đăng nhập
            </Button>
          </Form.Item>
          <Divider>Hoặc</Divider>
          <Typography.Text>Chưa có tài khoản?</Typography.Text>
          &nbsp;
          <Link to="/register" className="ant-typography">
            Đăng ký
          </Link>
        </Form>
      </Card>
    </div>
  );
};
export default Login;
