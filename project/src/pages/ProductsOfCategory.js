import { useParams } from "react-router-dom";
import ProductList from "../components/ProductList";
import Navbar from "../components/Navbar";
const ProductsOfCategory = () => {
  const id = useParams();
  const categoryName = useParams();

  console.log(categoryName.categoryName);
  console.log(id.id);
  return (
    <>
      <Navbar />
      <hr />
      <div className="cardParent">
        <h1>{categoryName.categoryName}</h1>
        <ProductList id={id.id}  />
      </div>
    </>
  );
};

export default ProductsOfCategory;
