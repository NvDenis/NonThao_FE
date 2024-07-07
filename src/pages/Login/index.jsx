import { Card, Divider, Typography, message } from "antd";
import styles from "./Login.module.css";
import { Button, Form, Input } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { callLogin } from "../../services/api";
import { setCredentials } from "../../redux/features/user/userSlice";
import { useDispatch } from "react-redux";

const Login = () => {
  const dispath = useDispatch();
  const navigate = useNavigate();
  const onFinish = async (values) => {
    try {
      const res = await callLogin(values);
      if (res?.vcode == 0) {
        dispath(setCredentials(res.data));
        localStorage.setItem("accessToken", res.data.accessToken);
        message.success(res.message);
        navigate("/account");
      } else message.error(res.message);
    } catch (error) {
      console.error(error.message);
    }
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <div className={styles.container}>
      <Card className={styles.cardContainer}>
        <Typography.Title>Đăng nhập</Typography.Title>
        <Divider />
        <Form
          name="basic"
          labelCol={{
            span: 24,
          }}
          initialValues={{
            phone: "000000",
            password: "123",
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
