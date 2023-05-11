import React, { useEffect, useState, Fragment } from "react";
import { getCategory, getImage } from "../api.js";

const ProductList = (props) => {
  const { id, limit } = props;

  const [category, setCategory] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getCategory(id);
      setCategory(data.map((product) => ({ ...product, imgUrl: null })));
    };
    fetchData();
  }, [id]);

  useEffect(() => {
    category.forEach((product, index) => {
      if (!product.imgUrl) {
        getImage(product, index).then((imageUrl) => {
          setCategory((prevState) => {
            const newcategory = [...prevState];
            newcategory[index].imgUrl = imageUrl;
            return newcategory;
          });
        });
      }
    });
  }, [category]);

  return (
    <>
      {category.slice(0, limit).map((product, index) => (
        <Fragment key={index}>
          <div
            onClick={() => {
              window.location.href = `/productdetail/${id}/${product.name}/${product.id}`;
            }}
            className="w-1/4 flex flex-wrap bg-card border-gray-200 border-2 rounded p-2"
          >
            {product.imgUrl && (
              <img className="w-3/6" src={product.imgUrl} alt="books" />
            )}
            <div className=" w-1/3 flex flex-col justify-around ">
              <div className="flex flex-col gap-3">
                <h2 className="font-bold text-2xl first-letter:uppercase">
                  {product.name}
                </h2>
                <p className=" text-gray-500">{product.author}</p>
              </div>
              {product.price && (
                <p className="text-2xl text-price font-semibold">
                  {product.price} <span>&#36;</span>
                </p>
              )}
            </div>
          </div>
        </Fragment>
      ))}
    </>
  );
};

ProductList.defaultProps = {
  limit: 999999, // limit prop'unun varsayılan değeri olarak büyük bir sayı ayarlıyoruz
};

export default ProductList;
