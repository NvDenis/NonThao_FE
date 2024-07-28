import {
  Button,
  Col,
  ColorPicker,
  Flex,
  Form,
  Image,
  Input,
  InputNumber,
  Modal,
  Row,
  Select,
  Space,
  Switch,
  Table,
  Tabs,
  Tag,
  Upload,
  message,
} from "antd";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { DeleteOutlined, EditOutlined, LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import styles from "./ModalAddProduct.module.css";
import { toggleModalAddProduct } from "../../redux/features/toggle/toggleSlice";
import DescProduct from "../DescProduct";
import formatPrice from "../../utils/formatPrice";
import ModalAddUnit from "../ModalAddUnit";
import ModalEditUnit from "../ModalEditUnit";
import { callCreateProduct } from "../../services/api";
import generateUniqueCode from "../../utils/generateUniqueCode";
import convertToSlug from "../../utils/convertSlug";

const ModalAddProduct = ({ categories, setProducts }) => {
  const dispatch = useDispatch();
  const { modalAddProduct } = useSelector((state) => state.toggle);
  const [descProductValue, setDescProductValue] = useState("");
  const [isShowModalAddUnit, setIsShowModalAddUnit] = useState(false);
  const [isShowModalEditUnit, setIsShowModalEditUnit] = useState(false);
  const [units, setUnits] = useState([]);
  const [unitEdit, setUnitEdit] = useState([]);
  const [costPrice, setCostPrice] = useState("");

  const items = [
    {
      key: "1",
      label: "Mô tả",
      children: <DescProduct onDescChange={setDescProductValue} />,
    },
  ];

  const unitTables = [
    {
      title: "Hình ảnh",
      dataIndex: "images",
      key: "images",
      render: (src) => <Image width={100} height={100} src={src[0]?.url} />,
      width: 200,
    },
    {
      title: "Màu sắc",
      dataIndex: "color",
      key: "color",
      render: (color) => (
        <>
          <ColorPicker value={color} open={false} />
        </>
      ),
      width: 200,
    },
    {
      title: "Giá",
      dataIndex: "price",
      key: "price",
      width: 200,
    },
    {
      title: "Thao tác",
      key: "key",
      width: 100,
      render: (item) => (
        <Space size="middle">
          <EditOutlined
            style={{ color: "orange" }}
            onClick={() => {
              setUnitEdit(item);
              setIsShowModalEditUnit(true);
            }}
          />
          <DeleteOutlined style={{ color: "red" }} onClick={() => handleRemoveUnit(item.key)} />
        </Space>
      ),
    },
  ];

  const onFinish = async (values) => {
    const data = {
      ...values,
      name: generateUniqueCode(values.name.trim()),
      costPrice: Number(costPrice.replace(/\,/g, "")),
      units: units.map((unit) => {
        return {
          ...unit,
          price: Number(unit.price.replace(/\,/g, "")),
          images: unit.images.map((image) => image.name),
        };
      }),
      link: convertToSlug(values.name.trim()),
    };

    try {
      const res = await callCreateProduct(data);
      if (res.vcode == 0) {
        setProducts((pre) => [...pre, res.data]);
        dispatch(toggleModalAddProduct());
        message.success(res.message);
      } else message.error(res.message);
    } catch (error) {
      console.error("error", error.message);
    }
  };

  const handleRemoveUnit = (id) => {
    setUnits((pre) => pre.filter((unit) => unit.key !== id));
  };

  return (
    <Modal
      title="Thêm sản phẩm"
      open={modalAddProduct}
      onCancel={() => dispatch(toggleModalAddProduct())}
      footer={null}
      style={{
        minWidth: "70%",
      }}
    >
      <Form
        className={styles.form}
        onFinish={onFinish}
        initialValues={{
          status: true,
          active: true,
        }}
      >
        <Row
          gutter={[
            {
              lg: 24,
            },
            0,
          ]}
        >
          <Col
            xs={{
              span: 24,
            }}
            lg={{
              span: 12,
            }}
          >
            <Form.Item label="Tên sản phẩm" name="name" labelCol={{ span: 24 }}>
              <Input />
            </Form.Item>
          </Col>
          <Col
            xs={{
              span: 24,
            }}
            lg={{
              span: 12,
            }}
          >
            <Form.Item label="Giá vốn" labelCol={{ span: 24 }}>
              <Input
                value={costPrice}
                onChange={(e) => setCostPrice(formatPrice(e.target.value))}
              />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={[16, 24]}>
          <Col
            xs={{
              span: 24,
            }}
            lg={{
              span: 6,
            }}
          >
            <Form.Item label="Tình trạng" name="status" labelCol={{ span: 24 }}>
              <Select
                style={{ width: "100%" }}
                options={[
                  { value: true, label: "Còn hàng" },
                  { value: false, label: "Hết hàng" },
                ]}
              />
            </Form.Item>
          </Col>
          <Col
            xs={{
              span: 24,
            }}
            lg={{
              span: 6,
            }}
          >
            <Form.Item label="Danh mục" name="id_category" labelCol={{ span: 24 }}>
              <Select
                style={{ width: "100%" }}
                options={[
                  ...categories.map((category) => ({
                    value: category._id,
                    label: category.name,
                  })),
                ]}
              />
            </Form.Item>
          </Col>
          <Col
            xs={{
              span: 24,
            }}
            lg={{
              span: 12,
            }}
          >
            <Form.Item
              label="Bật hiển thị trên web"
              name="active"
              valuePropName="checked"
              labelCol={{ span: 24 }}
            >
              <Switch />
            </Form.Item>
          </Col>
        </Row>

        <Button type="primary" onClick={() => setIsShowModalAddUnit((pre) => !pre)}>
          Thêm thuộc tính
        </Button>

        <Form.Item>
          <Table columns={unitTables} dataSource={units} pagination={false} />
        </Form.Item>

        <Tabs style={{ width: "100%", height: "400px" }} defaultActiveKey="1" items={items} />

        <Form.Item style={{ textAlign: "right", marginTop: "10px" }}>
          <Button type="primary" htmlType="submit">
            Thêm sản phẩm
          </Button>
        </Form.Item>
      </Form>

      <ModalAddUnit
        setIsShowModalAddUnit={setIsShowModalAddUnit}
        isShowModalAddUnit={isShowModalAddUnit}
        setUnits={setUnits}
      />
      <ModalEditUnit
        unitEdit={unitEdit}
        isShowModalEditUnit={isShowModalEditUnit}
        setIsShowModalEditUnit={setIsShowModalEditUnit}
        setUnits={setUnits}
      />
    </Modal>
  );
};
export default ModalAddProduct;
