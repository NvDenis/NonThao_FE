import { Button, Form, Image, Input, message, Modal, Select, Upload } from "antd";
import { useDispatch } from "react-redux";
import { toggleModalEditCategory } from "../../redux/features/toggle/toggleSlice";
import { useEffect, useState } from "react";
import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import { callUpdateCategory, callUploadImg } from "../../services/api";
import no_image from "../../assets/images/no-image.jpg";
import convertToSlug from "../../utils/convertSlug";

const ModalEditCategory = ({ open, categoryEdit, categories, setCategories }) => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [categoriesParent, setCategoriesParent] = useState([]);
  const [thumbUrl, setThumbUrl] = useState(categoryEdit?.thumb);
  const [bannerUrl, setBannerUrl] = useState(categoryEdit?.banner);
  const [form] = Form.useForm();
  const onFinish = async (values) => {
    try {
      if (thumbUrl) {
        values.thumb = thumbUrl?.substring(thumbUrl.lastIndexOf("/") + 1);
      }
      if (bannerUrl) {
        values.banner = bannerUrl?.substring(bannerUrl.lastIndexOf("/") + 1);
      }

      if (!values.id_parent) {
        delete values.id_parent;
      }

      values.link = convertToSlug(values.name);
      if (!values.id_parent) {
        delete values.id_parent;
      }

      const res = await callUpdateCategory(categoryEdit._id, values);
      if (res.vcode == 0) {
        dispatch(toggleModalEditCategory());
        message.success(res.message);
        const newCategories = categories.map((item) => {
          if (item._id === categoryEdit._id) {
            return {
              ...item,
              ...values,
            };
          }
          return item;
        });

        setCategories(newCategories);
      } else {
        message.error(res.message);
      }
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

  useEffect(() => {
    if (open) {
      form.resetFields();
      setThumbUrl(null);
      setBannerUrl(null);

      setCategoriesParent([
        ...categories
          .filter((item) => {
            return item._id !== categoryEdit?._id && !item.id_parent;
          })
          .map((item) => {
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

      if (categoryEdit?.thumb) {
        setThumbUrl(
          import.meta.env.VITE_BASE_URL + "/uploads/images/category/" + categoryEdit?.thumb
        );
      }
      if (categoryEdit?.banner) {
        setBannerUrl(
          import.meta.env.VITE_BASE_URL + "/uploads/images/category/" + categoryEdit?.banner
        );
      }

      form.setFieldsValue({
        name: categoryEdit?.name,
        id_parent: categoryEdit?.id_parent,
      });
    }
  }, [open]);

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
      open={open}
      title="Chỉnh sửa danh mục"
      onCancel={() => dispatch(toggleModalEditCategory())}
      footer={null}
    >
      <Form form={form} name="basic" onFinish={onFinish} autoComplete="off">
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
                  src={thumbUrl || no_image}
                  alt="thumb"
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
                  src={bannerUrl || no_image}
                  alt="banner"
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
            Sửa danh mục
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};
export default ModalEditCategory;
