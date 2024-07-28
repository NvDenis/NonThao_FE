import { Button, Flex, Image, Menu, message, Popover, Table } from "antd";
import Search from "antd/es/input/Search";
import no_image from "../../assets/images/no-image.jpg";

import styles from "./CategoryManagement.module.css";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import ModalAddCategory from "../../components/ModalAddCategory";
import {
  toggleModalAddCategory,
  toggleModalEditCategory,
} from "../../redux/features/toggle/toggleSlice";
import { useDispatch, useSelector } from "react-redux";
import { callCreateCategory, callDeleteCategory, callGetCategories } from "../../services/api";
import ModalEditCategory from "../../components/ModalEditCategory";

const CategoryManagement = () => {
  const { modalAddCategory, modalEditCategory } = useSelector((state) => state.toggle);
  const [isLoading, setIsLoading] = useState(false);
  const [products, setProducts] = useState([]);
  const [openKeys, setOpenKeys] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const dispatch = useDispatch();
  const [categories, setCategories] = useState([]);
  const [categoryEdit, setCategoryEdit] = useState();

  const handleDeleteCategory = async (_id) => {
    try {
      const res = await callDeleteCategory(_id);
      if (res.vcode == 0) {
        const newCategories = categories.filter((item) => item._id !== _id);
        setCategories(newCategories);
        message.success(res.message);
      } else {
        message.error(res.message);
      }
    } catch (error) {
      console.error("error", error.message);
    }
  };

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await callGetCategories();
        if (res.vcode == 0) {
          setCategories(
            res.data.map((item) => ({
              ...item,
              key: item._id,
            }))
          ) || [];
        }
      } catch (error) {
        console.error("error", error.message);
      }
    };

    fetchCategories();
  }, []);

  const columns = [
    {
      title: "Hình thumb",
      dataIndex: "thumb",
      key: "thumb",
      render: (thumbUrl) => (
        <Image
          src={
            thumbUrl
              ? import.meta.env.VITE_BASE_URL + "/uploads/images/category/" + thumbUrl
              : no_image
          }
          style={{ width: "100px", height: "100px" }}
        />
      ),
      width: 300,
    },
    {
      title: "Hình banner",
      dataIndex: "banner",
      key: "banner",
      render: (banner) => (
        <Image
          src={
            banner ? import.meta.env.VITE_BASE_URL + "/uploads/images/category/" + banner : no_image
          }
          style={{ width: "100px", height: "100px" }}
        />
      ),
      width: 300,
    },
    {
      title: "Tên danh mục",
      dataIndex: "name",
      key: "name",
      render: (text, record) => (
        <a>
          {record.id_parent ? "-" : ""} {text}
        </a>
      ),
    },
    {
      title: " Thao tác",
      dataIndex: "_id",
      key: "_id",
      render: (_id, record) => (
        <Flex gap={20}>
          <EditOutlined
            style={{
              color: "orange",
            }}
            onClick={() => {
              setCategoryEdit(record);
              dispatch(toggleModalEditCategory());
            }}
          />

          <DeleteOutlined
            onClick={() => handleDeleteCategory(_id)}
            style={{
              color: "red",
            }}
          />
        </Flex>
      ),

      width: 200,
    },
  ];
  return (
    <div className={styles.container}>
      <Flex className={styles.header}>
        <Search
          placeholder="Tìm kiếm bằng tên danh mục..."
          enterButton="Tìm"
          className={styles.search}
        />
        <Button
          type="primary"
          onClick={() => {
            dispatch(toggleModalAddCategory());
          }}
        >
          Thêm danh mục
        </Button>
      </Flex>
      <Table columns={columns} dataSource={categories} />

      <ModalAddCategory
        open={modalAddCategory}
        categories={categories}
        setCategories={setCategories}
      />
      <ModalEditCategory
        open={modalEditCategory}
        categoryEdit={categoryEdit}
        categories={categories}
        setCategories={setCategories}
      />
    </div>
  );
};
export default CategoryManagement;
