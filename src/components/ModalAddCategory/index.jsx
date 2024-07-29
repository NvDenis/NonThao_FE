import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import { Button, Form, Input, message, Modal, Select, Upload } from "antd";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toggleModalAddCategory } from "../../redux/features/toggle/toggleSlice";
import { callCreateCategory, callUploadImg } from "../../services/api";
import convertToSlug from "../../utils/convertSlug";
const ModalAddCategory = ({ open, categories, setCategories }) => {
  const [loading, setLoading] = useState(false);
  const [thumbUrl, setThumbUrl] = useState();
  const [bannerUrl, setBannerUrl] = useState();
  const [categoriesParent, setCategoriesParent] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    setCategoriesParent([
      ...categories.map((item) => {
        return {
          label: item.name,
          value: item._id,
        };
      }),
      {
        label: "Trống",
        value: "",
      },
    ]);
  }, [categories]);

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

  const onFinish = async (values) => {
    try {
      values.thumb = thumbUrl?.substring(thumbUrl.lastIndexOf("/") + 1);
      values.banner = bannerUrl?.substring(bannerUrl.lastIndexOf("/") + 1);
      values.link = convertToSlug(values.name);
      if (!values.id_parent) {
        delete values.id_parent;
      }
      const res = await callCreateCategory(values);
      if (res.vcode == 0) {
        dispatch(toggleModalAddCategory());
        message.success(res.message);
        setCategories([
          ...categories,
          {
            ...res.data,
            key: res.data._id,
          },
        ]);
      }
    } catch (error) {
      console.error("error", error.message);
    }
  };
  const handleUploadImg = async ({ file }, type) => {
    try {
      const res = await callUploadImg(file, "category");
      if (res.vcode == 0) {
        if (type == "thumb") {
          setThumbUrl(
            import.meta.env.VITE_BASE_URL + "/uploads/images/category/" + res.data.fileUploaded
          );
        } else {
          setBannerUrl(
            import.meta.env.VITE_BASE_URL + "/uploads/images/category/" + res.data.fileUploaded
          );
        }
      } else message.error(res.message);
    } catch (error) {
      console.error("error", error.message);
    }
  };
  return (
    <Modal
      title="Thêm danh mục"
      open={open}
      footer={null}
      onCancel={() => dispatch(toggleModalAddCategory())}
    >
      <Form name="add-category" onFinish={onFinish} autoComplete="off">
        <Form.Item labelCol={{ span: 24 }} label="Tên danh mục" name="name">
          <Input />
        </Form.Item>

        <Form.Item labelCol={{ span: 24 }} label="Danh mục cha" name="id_parent">
          <Select options={categoriesParent} />
        </Form.Item>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <Form.Item labelCol={{ span: 24 }} label="Ảnh thumb:">
            <Upload
              name="avatar"
              listType="picture-card"
              showUploadList={false}
              customRequest={(file) => handleUploadImg(file, "thumb")}
            >
              {thumbUrl ? (
                <img
                  src={thumbUrl}
                  alt="avatar"
                  style={{
                    width: "100%",
                  }}
                />
              ) : (
                uploadButton
              )}
            </Upload>
          </Form.Item>
          <Form.Item labelCol={{ span: 24 }} label="Ảnh banner:">
            <Upload
              name="avatar"
              listType="picture-card"
              showUploadList={false}
              customRequest={(file) => handleUploadImg(file, "banner")}
            >
              {bannerUrl ? (
                <img
                  src={bannerUrl}
                  alt="avatar"
                  style={{
                    width: "100%",
                  }}
                />
              ) : (
                uploadButton
              )}
            </Upload>
          </Form.Item>
        </div>

        <Form.Item style={{ textAlign: "right" }}>
          <Button type="primary" htmlType="submit">
            Thêm danh mục
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};
export default ModalAddCategory;
