import { useParams } from "react-router-dom";
import ProductList from "../components/ProductList";
import Navbar from "../components/Navbar";
import { Helmet } from "react-helmet";

function CategoryProducts() {
  const { id, categoryName } = useParams();

  console.log(categoryName);
  console.log(id);

  return (
    <>
      <Helmet>
        <link rel="stylesheet" href="/styles.css" />
      </Helmet>
      <Navbar />
      <div className="p-10">
        <div className="text-3xl font-bold font-gemunu mb-20">
          <h1 className=" cursor-pointer hover:outline-stone-600 hover:border-b-2 inline-block absolute"
            onClick={() => {
              window.location.href = "/categories";
            }}
          >
            <span>&lt;</span> {categoryName}
          </h1>
        </div>
        <div className="flex flex-wrap gap-10 gap-x-40">
          <ProductList id={id} />
        </div>
      </div>
    </>
  );
}

export default CategoryProducts;
