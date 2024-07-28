import { Button, ColorPicker, Form, Image, Input, Modal, Upload } from "antd";
import formatPrice from "../../utils/formatPrice";
import { useState } from "react";
import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import { callUploadImg } from "../../services/api";
const normFile = (e) => {
  if (Array.isArray(e)) {
    return e;
  }
  return e?.fileList;
};

const ModalAddUnit = ({ isShowModalAddUnit, setIsShowModalAddUnit, setUnits }) => {
  const [price, setPrice] = useState("");
  const [color, setColor] = useState("");
  const [loading, setLoading] = useState(false);
  const [fileList, setFileList] = useState([]);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");

  const handleChangeImg = async ({ file }) => {
    try {
      const res = await callUploadImg(file, "hat");
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

  const handleRemoveImg = (file) => {
    setFileList((pre) => pre.filter((item) => item.uid !== file.uid));
  };

  const handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setPreviewImage(file.url || file.preview);
    setPreviewOpen(true);
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

  const handleAddUnits = (values) => {
    setUnits((pre) => [
      ...pre,
      {
        color: color,
        price: formatPrice(price),
        images: fileList,
        key: Date.now(),
      },
    ]);
  };

  return (
    <Modal
      title="Thêm thuộc tính"
      open={isShowModalAddUnit}
      onOk={() => setIsShowModalAddUnit((pre) => !pre)}
      onCancel={() => setIsShowModalAddUnit((pre) => !pre)}
      footer={null}
    >
      <Form onFinish={handleAddUnits}>
        <Form.Item label="Màu sắc" name="color" labelCol={{ span: 24 }} valuePropName="value">
          <ColorPicker
            onChangeComplete={(color) => {
              setColor(color.toHexString());
            }}
          />
        </Form.Item>
        <Form.Item label="Giá" labelCol={{ span: 24 }}>
          <Input onChange={(e) => setPrice(formatPrice(e.target.value))} value={price} />
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
            multiple
          >
            {fileList.length >= 8 ? null : uploadButton}
          </Upload>
        </Form.Item>

        <div style={{ textAlign: "right" }}>
          <Form.Item>
            <Button htmlType="submit" type="primary">
              Thêm
            </Button>
          </Form.Item>
        </div>
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
  );
};
export default ModalAddUnit;
