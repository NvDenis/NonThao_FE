import CategoriesProduct from "../CategoriesProduct";
import FeaturesProduct from "../FeaturesProduct";
import styles from "./Products.module.css";

const Products = () => {
  return (
    <div id="products" className={styles.productsContainer}>
      <CategoriesProduct />
      <FeaturesProduct />
    </div>
  );
};
export default Products;
