import { Modal } from "antd";
import { Card, Divider, Typography, message } from "antd";
import styles from "./ModalRegister.module.css";
import { Button, Form, Input } from "antd";
import { useNavigate } from "react-router-dom";
import { callRegister } from "../../services/api";
import { useDispatch, useSelector } from "react-redux";
import { setCredentials } from "../../redux/features/user/userSlice";
import { toggleModalLogin, toggleModalRegister } from "../../redux/features/toggle/toggleSlice";

const ModalRegister = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const onFinish = async (values) => {
    try {
      const res = await callRegister(values);
      if (res?.vcode === 0) {
        dispatch(setCredentials(res.data));
        message.success(res.message);
        navigate("/account");
      } else {
        message.error(res.message);
      }
    } catch (error) {
      message.error("Đăng ký thất bại. Vui lòng thử lại.");
    }
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  const { modalRegister } = useSelector((state) => state.toggle);

  return (
    <Modal open={modalRegister} onCancel={() => dispatch(toggleModalRegister())} footer={null}>
      <Typography.Title>Đăng ký</Typography.Title>
      <Divider />
      <Form
        name="basic"
        labelCol={{
          span: 24,
        }}
        initialValues={{
          name: "admin",
          phone: "000000",
          password: "123",
          confirmPassword: "123",
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
        <Typography.Link onClick={() => dispatch(toggleModalLogin())} className="ant-typography">
          Đăng nhập
        </Typography.Link>
      </Form>
    </Modal>
  );
};
export default ModalRegister;
