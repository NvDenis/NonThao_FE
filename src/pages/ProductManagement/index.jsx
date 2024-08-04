import { Button, Space, Table, Typography, Tag, Image, message, Flex } from "antd";
import { useEffect, useState } from "react";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { useDispatch } from "react-redux";
import ModalAddProduct from "../../components/ModalAddProduct";
import { callDeleteProduct, callFetchProduct, callGetCategories } from "../../services/api";
import {
  toggleModalAddProduct,
  toggleModalEditProduct,
} from "../../redux/features/toggle/toggleSlice";
import Search from "antd/es/input/Search";
import styles from "./ProductManagement.module.css";
import formatPrice from "../../utils/formatPrice";
import ModalEditProduct from "../../components/ModalEditProduct";

const ProductManagement = () => {
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const [current, setCurrent] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const [total, setTotal] = useState(0);
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [productEdit, setProductEdit] = useState();

  const columns = [
    {
      title: "Hình ảnh",
      dataIndex: "units",
      key: "units",
      render: (units) => (
        <>
          <Image
            src={import.meta.env.VITE_BASE_URL + "/uploads/images/hat/" + units[0]?.images?.[0]}
            style={{ width: "100px", height: "100px" }}
          />
        </>
      ),
      width: 150,
    },
    {
      title: "Tên sản phẩm",
      dataIndex: "name",
      key: "name",
      render: (text) => <a>{text}</a>,
      width: 150,
    },
    {
      title: "Giá",
      dataIndex: "units",
      key: "units",
      render: (units) => <p> {formatPrice(units?.[0]?.price.toString())}</p>,
      width: 150,
    },
    {
      title: "Tình trạng",
      dataIndex: "status",
      key: "status",
      render: (status) => (
        <Tag color={status ? "green" : "red"}>
          {status ? "Còn hàng" : "Hết hàng"} {status}
        </Tag>
      ),
      width: 150,
    },
    {
      title: " Thao tác",
      dataIndex: "_id",
      key: "_id",
      render: (_id, record) => (
        <Space>
          <EditOutlined
            style={{
              color: "orange",
            }}
            onClick={() => {
              setProductEdit(record);
              dispatch(toggleModalEditProduct());
            }}
          />

          <DeleteOutlined
            onClick={() => handleDeleteProduct(_id)}
            style={{
              color: "red",
            }}
          />
        </Space>
      ),
      width: 150,
    },
  ];

  const handleDeleteProduct = async (id) => {
    try {
      const res = await callDeleteProduct(id);
      if (res.vcode == 0) {
        const newProducts = products.filter((product) => product._id !== id);
        setProducts(newProducts);
        message.success(res.message);
      } else {
        console.log(res.message);
      }
    } catch (error) {
      console.error("error", error.message);
    }
  };

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await callFetchProduct(current, pageSize);
        const products = res.data.result.map((item) => ({
          ...item,
          key: item._id,
        }));
        setProducts(products);
        setTotal(res.data.meta.total);
      } catch (error) {
        console.error(error.message);
      }
    };

    fetchProduct();
  }, [current, pageSize]);

  useEffect(() => {
    const fetchCategory = async () => {
      try {
        const res = await callGetCategories();
        setCategories(res.data);
      } catch (error) {
        console.error(error.message);
      }
    };

    fetchCategory();
  }, []);

  return (
    <div className={styles.container}>
      <Flex className={styles.header}>
        <Search
          placeholder="Tìm kiếm bằng tên sản phẩm..."
          enterButton="Tìm"
          className={styles.search}
        />
        <Button
          type="primary"
          onClick={() => {
            dispatch(toggleModalAddProduct());
          }}
        >
          Thêm sản phẩm
        </Button>
      </Flex>
      <Table
        columns={columns}
        dataSource={products}
        loading={isLoading}
        pagination={{ current: current, pageSize: pageSize, total: total, showSizeChanger: true }}
        onChange={(pagination) => {
          setCurrent(pagination.current);
          setPageSize(pagination.pageSize);
        }}
      />

      <ModalAddProduct setProducts={setProducts} categories={categories} />
      <ModalEditProduct
        setProducts={setProducts}
        categories={categories}
        productEdit={productEdit}
      />
    </div>
  );
};
export default ProductManagement;
