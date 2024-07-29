import { Button, ColorPicker, Form, Image, Input, Modal, Upload } from "antd";
import formatPrice from "../../utils/formatPrice";
import { useEffect, useState } from "react";
import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import { callUploadImg } from "../../services/api";
const normFile = (e) => {
  if (Array.isArray(e)) {
    return e;
  }
  return e?.fileList;
};

const ModalEditUnit = ({ unitEdit, isShowModalEditUnit, setIsShowModalEditUnit, setUnits }) => {
  const [price, setPrice] = useState(0);
  const [color, setColor] = useState();
  const [loading, setLoading] = useState(false);
  const [fileList, setFileList] = useState([]);
  const [form] = Form.useForm();

  const handleEditUnit = () => {
    setUnits((pre) => {
      const index = pre.findIndex((unit) => unit.key === unitEdit.key);
      pre[index] = {
        ...pre[index],
        price: price,
        color: color,
        images: fileList,
      };
      return [...pre];
    });

    setIsShowModalEditUnit(false);
  };

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

  console.log("unitEdit", unitEdit);

  useEffect(() => {
    setFileList(unitEdit.images);
    setPrice(unitEdit.price);
    setColor(unitEdit.color);
  }, [unitEdit]);

  return (
    <Modal
      open={isShowModalEditUnit}
      title="Sửa thuộc tính"
      footer={null}
      onCancel={() => setIsShowModalEditUnit(false)}
    >
      <Form onFinish={handleEditUnit} form={form}>
        <Form.Item label="Màu sắc" labelCol={{ span: 24 }}>
          <ColorPicker value={color} />
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
            {fileList?.length >= 8 ? null : uploadButton}
          </Upload>
        </Form.Item>

        <Form.Item style={{ textAlign: "right" }}>
          <Button htmlType="submit" type="primary">
            Cập nhật
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};
export default ModalEditUnit;
