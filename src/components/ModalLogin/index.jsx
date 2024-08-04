import { Divider, Modal, Typography, message } from "antd";
import styles from "./ModalLogin.module.css";
import { Button, Form, Input } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { callLogin } from "../../services/api";
import { setCredentials } from "../../redux/features/user/userSlice";
import { toggleModalLogin, toggleModalRegister } from "../../redux/features/toggle/toggleSlice";

const ModalLogin = () => {
  const dispatch = useDispatch();
  const onFinish = async (values) => {
    try {
      const res = await callLogin(values);
      if (res?.vcode == 0) {
        dispatch(setCredentials(res.data));
        localStorage.setItem("accessToken", res.data.accessToken);
        message.success(res.message);
        dispatch(toggleModalLogin());
      } else message.error(res.message);
    } catch (error) {
      console.error(error.message);
    }
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  const { modalLogin } = useSelector((state) => state.toggle);

  return (
    <Modal open={modalLogin} onCancel={() => dispatch(toggleModalLogin())} footer={null}>
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
        <Typography.Link onClick={() => dispatch(toggleModalRegister())} className="ant-typography">
          Đăng ký
        </Typography.Link>
      </Form>
    </Modal>
  );
};
export default ModalLogin;
