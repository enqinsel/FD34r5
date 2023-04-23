import axios from "axios";
import React, { useEffect, useState, Fragment } from "react";

const ProductList = (props) => {
  const { id} = props;

  const [productData, setProductData] = useState([]);

  const getProduct = async (categoryId) => {
    const dataProduct = await axios.get(
      `https://assign-api.piton.com.tr/api/rest/products/${categoryId}`
    );
    setProductData(dataProduct.data.product);
    return dataProduct.data.product;
  };

  useEffect(() => {
    getProduct(id);
  });

  return (
    <>
      {productData.map((product, index) => (
        <Fragment key={index}>
          <div className="cardContainer">
            {product.cover && <img src={product.cover} alt={product.cover} />}
            <div>
              <h2>{product.name}</h2>
              <p>{product.author}</p>
              {product.price && <p>{product.price}</p>}
            </div>
          </div>
        </Fragment>
      ))}
    </>
  );
};

export default ProductList;
