import axios from "axios";
import React, { useEffect, useState, useCallback, Fragment } from "react";

const ProductList = (props) => {
  const { id, limit } = props;

  const [productData, setProductData] = useState([]);

  const getProduct = useCallback(async (categoryId) => {
    const dataProduct = await axios.get(
      `https://assign-api.piton.com.tr/api/rest/products/${categoryId}`
    );
    setProductData(
      dataProduct.data.product.map((product) => ({ ...product, imgUrl: null }))
    );
    return dataProduct.data.product;
  }, []);

  const getImage = useCallback(
    async (product, index) => {
      try {
        const data = await fetch(
          "https://assign-api.piton.com.tr/api/rest/cover_image",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ fileName: product.cover }),
          }
        );
        const imageData = await data.json();
        setProductData((prevState) => {
          const newProductData = [...prevState];
          newProductData[index].imgUrl = imageData.action_product_image.url;
          return newProductData;
        });
      } catch (error) {
        console.error(error);
      }
    },
    []
  );

  useEffect(() => {
    const fetchData = async () => {
      await getProduct(id);
    };
    fetchData();
  }, [getProduct, id]);

  useEffect(() => {
    productData.forEach((product, index) => {
      if (!product.imgUrl) {
        getImage(product, index);
      }
    });
  }, [getImage, productData]);

  return (
    <>
      {productData.slice(0,limit).map((product, index) => (
        <Fragment key={index}>
          <div className="w-1/4 flex flex-wrap bg-card border-gray-200 border-2 rounded p-2">
            {product.imgUrl && <img className="w-3/6" src={product.imgUrl} alt="books"/>}
            <div className=" w-1/3 flex flex-col justify-around ">
              <div className="flex flex-col gap-3">
                <h2 className="font-bold text-2xl first-letter:uppercase">{product.name}</h2>
                <p className=" text-gray-500">{product.author}</p>
              </div>
              {product.price && <p className="text-2xl text-price font-semibold">{product.price} <span>&#36;</span></p>}
            </div>
          </div>
        </Fragment>
      ))}
    </>
  );
};

ProductList.defaultProps = {
  limit: 999999 // limit prop'unun varsayılan değeri olarak büyük bir sayı ayarlıyoruz
};

export default ProductList;
