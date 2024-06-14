import React, { useEffect, useState } from "react";
import { Button, Card, Form, Input, Select } from "antd";
import axios from "axios";
import { CloseOutlined } from "@ant-design/icons";
import { useForm } from "antd/es/form/Form";
import styles from "./CheckoutPayment.module.css";

const CheckoutPayment = ({ setCurrentStep }) => {
  const [provinces, setProvinces] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [wards, setWards] = useState([]);
  const [form] = useForm();
  const getCitys = async () => {
    const res = await axios.get("https://vapi.vnappmob.com/api/province/");
    if (res.status === 200) {
      setProvinces(
        res.data.results.map((item) => {
          return {
            value: item.province_id,
            label: item.province_name,
          };
        })
      );
    }
  };

  useEffect(() => {
    getCitys();
  }, []);

  const handleChangeProvice = async () => {
    const res = await axios.get(`https://vapi.vnappmob.com/api/province/district/${form.getFieldValue("province")}`);
    if (res.status === 200) {
      setDistricts(
        res.data.results.map((item) => {
          return {
            value: item.district_id,
            label: item.district_name,
          };
        })
      );
    }
  };

  const handleChangeDistrict = async () => {
    const res = await axios.get(`https://vapi.vnappmob.com/api/province/ward/${form.getFieldValue("district")}`);
    if (res.status === 200) {
      setWards(
        res.data.results.map((item) => {
          return {
            value: item.ward_id,
            label: item.ward_name,
          };
        })
      );
    }
  };

  const paymentMethods = [
    { value: "COD", label: "Thanh toán khi nhận hàng" },
    { value: "BankTransfer", label: "Chuyển khoản ngân hàng" },
    { value: "Momo", label: "Chuyển khoản qua Momo" },
  ];

  const sentOTP = (values) => {
    console.log(values);
    setCurrentStep((pre) => (pre += 1));
  };

  return (
    <Card>
      <Form form={form} variant="filled" onFinish={sentOTP}>
        <Form.Item
          label="Tên người nhận"
          name="name"
          labelCol={{ span: 24 }}
          rules={[{ required: true, message: "Vui lòng nhập tên người nhận!" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Số điện thoại"
          labelCol={{ span: 24 }}
          name="phone"
          rules={[
            { required: true, message: "Vui lòng nhập số điện thoại!" },
            () => ({
              validator(_, value) {
                if (!value) {
                  return Promise.resolve();
                }
                if (!value.startsWith("0")) {
                  return Promise.reject(new Error("Số điện thoại phải bắt đầu bằng 0."));
                }
                if (value.length !== 10) {
                  return Promise.reject(new Error("Số điện thoại phải có 10 chữ số."));
                }
                return Promise.resolve();
              },
            }),
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Thành phố "
          labelCol={{ span: 24 }}
          name="province"
          rules={[{ required: true, message: "Vui lòng chọn thành phố!" }]}
        >
          <Select options={provinces} onChange={handleChangeProvice} />
        </Form.Item>

        <Form.Item
          label="Quận/huyện"
          labelCol={{ span: 24 }}
          name="district"
          rules={[{ required: true, message: "Vui lòng chọn quận/huyện!" }]}
        >
          <Select options={districts} onChange={handleChangeDistrict} />
        </Form.Item>
        <Form.Item
          label="Xã/phường"
          labelCol={{ span: 24 }}
          name="ward"
          rules={[{ required: true, message: "Vui lòng chọn xã/phường!" }]}
        >
          <Select options={wards} />
        </Form.Item>

        <Form.Item
          label="Địa chỉ nhận hàng"
          name="address"
          labelCol={{ span: 24 }}
          rules={[{ required: true, message: "Vui lòng nhập địa chỉ nhận hàng!" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Phương thức thanh toán"
          name="paymentmethod"
          labelCol={{ span: 24 }}
          rules={[{ required: true, message: "Vui lòng chọn phương thức thanh toán!" }]}
        >
          <Select options={paymentMethods} />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" className={styles.btnPayment}>
            Đặt hàng
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );
};
export default CheckoutPayment;
