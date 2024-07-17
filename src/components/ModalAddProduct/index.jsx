import {
  Button,
  Col,
  Flex,
  Form,
  Image,
  Input,
  InputNumber,
  Modal,
  Row,
  Select,
  Space,
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
import { callUploadImgHat } from "../../services/api";
import DescProduct from "../DescProduct";

const beforeUpload = (file) => {
  const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
  if (!isJpgOrPng) {
    message.error("You can only upload JPG/PNG file!");
  }
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    message.error("Image must smaller than 2MB!");
  }
  return isJpgOrPng && isLt2M;
};
const normFile = (e) => {
  if (Array.isArray(e)) {
    return e;
  }
  return e?.fileList;
};

const columns = [
  {
    title: "Hình ảnh",
    dataIndex: "images",
    key: "images",
    render: (text) => <a>{text}</a>,
    width: 200,
  },
  {
    title: "Màu sắc",
    dataIndex: "color",
    key: "color",
    render: (text) => <a>{text}</a>,
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
    key: "action",
    width: 100,
    render: (_, record) => (
      <Space size="middle">
        <EditOutlined style={{ color: "orange" }} />
        <DeleteOutlined style={{ color: "red" }} />
      </Space>
    ),
  },
];
const data = [
  {
    key: "1",
    name: "John Brown",
    age: 32,
    address: "New York No. 1 Lake Park",
    tags: ["nice", "developer"],
  },
  {
    key: "2",
    name: "Jim Green",
    age: 42,
    address: "London No. 1 Lake Park",
    tags: ["loser"],
  },
  {
    key: "3",
    name: "Joe Black",
    age: 32,
    address: "Sydney No. 1 Lake Park",
    tags: ["cool", "teacher"],
  },
];

const ModalAddProduct = () => {
  const dispatch = useDispatch();
  const { modalAddProduct } = useSelector((state) => state.toggle);
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState();
  const [descProductValue, setDescProductValue] = useState("");
  const [detailDescProductValue, setDetailDescProductValue] = useState("");
  const [isShowModal, setIsShowModal] = useState(false);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [fileList, setFileList] = useState([
    {
      uid: "-1",
      name: "image.png",
      status: "done",
      url: "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png",
    },
  ]);

  const handleChangeImg = async ({ file }) => {
    try {
      const res = await callUploadImgHat(file);
      if (res.vcode == 0) {
        setFileList((pre) => [
          ...pre,
          {
            uid: res.data.fileUploaded,
            name: res.data.fileUploaded,
            status: "done",
            url: import.meta.env.VITE_BASE_URL + "/uploads/images/hat/" + res.data.fileUploaded,
          },
        ]);
      } else message.error(res.message);
    } catch (error) {
      console.error("error", error.message);
    }
  };

  const uploadButton = (
    <button
      style={{
        border: 0,
        background: "none",
      }}
      type="button"
    >
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div
        style={{
          marginTop: 8,
        }}
      >
        Upload
      </div>
    </button>
  );

  const onChange = (key) => {
    console.log(key);
  };
  const items = [
    {
      key: "1",
      label: "Mô tả",
      children: (
        <Form.Item name="descProduct">
          <DescProduct onDescChange={setDescProductValue} />
        </Form.Item>
      ),
    },
  ];

  const onFinish = async (values) => {
    const imageProduct = imageUrl?.substring(imageUrl.lastIndexOf("/") + 1) ?? "";
    let dataProduct = {
      image: imageProduct,
      name: form.getFieldValue("name"),
      price: form.getFieldValue("price"),
      status: form.getFieldValue("status"),
      discountedPrice: form.getFieldValue("discountedPrice"),
      desc: descProductValue,
      detailDesc: detailDescProductValue,
    };

    try {
      const res = await callCreateProduct(dataProduct);

      if (res.vcode == 0) {
        setProducts((pre) => [
          ...pre,
          {
            ...res.data,
            image: import.meta.env.VITE_BASE_URL + "/images/fish/" + res.data.image,
            key: res.data._id,
          },
        ]);
        message.success(res.message);
        form.resetFields();
        setDescProductValue("");
        setDetailDescProductValue("");
        setImageUrl("");
        dispatch(toggleModalAddProduct());
      } else {
        message.error(res.message);
      }
    } catch (error) {
      console.error("error", error.message);
    }
  };

  const [form] = Form.useForm();

  const handleRemoveImg = (file) => {
    setFileList((pre) => pre.filter((item) => item.uid !== file.uid));
  };

  const handlePreview = async (file) => {
    console.log("filePreview", file);
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setPreviewImage(file.url || file.preview);
    setPreviewOpen(true);
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
        form={form}
        onFinish={onFinish}
        initialValues={{
          status: true,
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
            <Form.Item label="Giá sản phẩm" name="price" labelCol={{ span: 24 }}>
              <Input />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={[16, 24]}>
          <Col span={12}>
            <Space>
              <Form.Item label="Tình trạng" name="status" labelCol={{ span: 24 }}>
                <Select
                  style={{ width: "100%" }}
                  options={[
                    { value: true, label: "Còn hàng" },
                    { value: false, label: "Hết hàng" },
                  ]}
                />
              </Form.Item>
              <Form.Item label="Danh mục" name="units" labelCol={{ span: 24 }}>
                <Select
                  style={{ width: "100%" }}
                  options={[
                    { value: true, label: "Còn hàng" },
                    { value: false, label: "Hết hàng" },
                  ]}
                />
              </Form.Item>
            </Space>
          </Col>
          <Col span={12}></Col>
        </Row>

        <Button type="primary" onClick={() => setIsShowModal((pre) => !pre)}>
          Thêm thuộc tính
        </Button>

        <Form.Item>
          <Table columns={columns} dataSource={data} />
        </Form.Item>

        <Form.Item>
          <Tabs style={{ width: "100%" }} defaultActiveKey="1" items={items} onChange={onChange} />
        </Form.Item>

        <div className="text-right mt-2">
          <Form.Item>
            <Button htmlType="submit">Thêm sản phẩm</Button>
          </Form.Item>
        </div>
      </Form>

      <Modal
        title="Thêm thuộc tính"
        open={isShowModal}
        onOk={() => setIsShowModal((pre) => !pre)}
        onCancel={() => setIsShowModal((pre) => !pre)}
      >
        <Form>
          <Form.Item label="Màu sắc" name="color" labelCol={{ span: 24 }}>
            <Input />
          </Form.Item>
          <Form.Item label="Giá" name="price" labelCol={{ span: 24 }}>
            <Input />
          </Form.Item>

          <Form.Item valuePropName="fileList" getValueFromEvent={normFile}>
            <Upload
              name="avatar"
              listType="picture-card"
              className="avatar-uploader"
              customRequest={handleChangeImg}
              onPreview={handlePreview}
              fileList={fileList}
              onRemove={handleRemoveImg}
            >
              {fileList.length >= 8 ? null : uploadButton}
            </Upload>
          </Form.Item>
        </Form>
        {previewImage && (
          <Image
            wrapperStyle={{
              display: "none",
            }}
            preview={{
              visible: previewOpen,
              onVisibleChange: (visible) => setPreviewOpen(visible),
              afterOpenChange: (visible) => !visible && setPreviewImage(""),
            }}
            src={previewImage}
          />
        )}
      </Modal>
    </Modal>
  );
};
export default ModalAddProduct;
