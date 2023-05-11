import { useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import { Helmet } from "react-helmet";
import { getImage, getProduct } from "../api.js";
import React, { useEffect, useState } from "react";

const ProductDetail = () => {
  const { categoryId, productId } = useParams();
  

  const [category, setCategory] = useState(null);
  const [img, setImg] = useState(null);
  const [fill, setFill] = useState("none");


  useEffect(() => {
    const myData = async () => {
      const data = await getProduct(Number(categoryId), Number(productId));
      setCategory(data);

      const imageUrl = await getImage(data);
      setImg(imageUrl);
    };

    myData();
  }, [productId, categoryId, category]);

  if (!category) {
    return null;
  }

  const { name, author, price, description } = category;

  return (
    <>
      <Helmet>
        <link rel="stylesheet" href="/styles.css" />
      </Helmet>
      <Navbar />
      <div className="p-10">
        <div className="text-3xl font-bold font-gemunu mb-20">
          <h1
            className=" cursor-pointer hover:outline-stone-600 hover:border-b-2 inline-block absolute"
            onClick={() => {
              window.location.href = "/categories";
            }}
          >
            <span>&lt;</span> Book Details
          </h1>
        </div>
        <div className="flex gap-12">
          <div className="w-1/3 bg-card border flex justify-center items-center">
            {img && <img className="w-2/3" src={img} alt="books" />}
          </div>
          <div className="flex flex-col gap-10 w-2/3">
            <div className="flex justify-between">
              <div>
                <h2 className="font-semibold text-4xl first-letter:uppercase mb-2">
                  {name}
                </h2>
                <h2 className=" text-gray-500 text-xl first-letter:uppercase">
                  {author}
                </h2>
              </div>
              <div>
                <svg
                  onClick={() => {
                    setFill(fill === "none" ? "red" : "none");
                  }}
                  width="44"
                  height="44"
                  viewBox="0 0 44 44"
                  fill={fill}
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <circle cx="22" cy="22" r="22" fill="#F4F4FF" />
                  <path
                    d="M29.8143 15.2714L29.8149 15.272C30.3181 15.7607 30.7202 16.3418 30.9991 16.9828C31.288 17.6497 31.4349 18.3552 31.4328 19.0821V19.0843C31.4328 19.7651 31.2928 20.4912 31.0014 21.2478L31.0008 21.2495C30.7594 21.8809 30.402 22.5509 29.9363 23.2412C29.1994 24.332 28.1724 25.4893 26.8751 26.6785C24.7187 28.6538 22.5834 30.0186 22.5057 30.0681L22.5055 30.0682L21.9449 30.4253C21.9448 30.4253 21.9448 30.4253 21.9448 30.4253C21.9435 30.4261 21.941 30.4272 21.9371 30.4272C21.9332 30.4272 21.9307 30.4261 21.9295 30.4253C21.9294 30.4253 21.9294 30.4253 21.9294 30.4253L21.3687 30.0682L21.3687 30.0681L21.3569 30.0608C21.3572 30.061 21.357 30.0609 21.3562 30.0604C21.3537 30.0588 21.345 30.0534 21.3287 30.0429C21.3092 30.0305 21.2819 30.0128 21.2472 29.9902C21.1778 29.9449 21.0799 29.8802 20.9574 29.7974C20.7124 29.6317 20.37 29.3943 19.9624 29.0964C19.146 28.4995 18.0737 27.664 16.9992 26.6786L16.9991 26.6785C15.7017 25.4891 14.6746 24.3317 13.9377 23.2409C13.473 22.552 13.1172 21.8813 12.8727 21.2474C12.5814 20.4909 12.4414 19.765 12.4414 19.0843C12.4414 18.3558 12.5886 17.6494 12.8776 16.9824C13.1555 16.3414 13.5575 15.7605 14.061 15.2726L14.0621 15.2716C14.5698 14.7778 15.1604 14.3903 15.8168 14.1204L15.8176 14.1201C16.4965 13.84 17.2152 13.6986 17.9605 13.6986C18.9938 13.6986 20.0002 13.9795 20.8737 14.5087L20.8737 14.5087C21.0827 14.6353 21.2807 14.7739 21.4678 14.9247L21.9383 15.3036L22.4087 14.9247C22.5959 14.7739 22.7939 14.6353 23.0029 14.5087L23.0029 14.5087C23.8764 13.9795 24.8828 13.6986 25.9161 13.6986L25.9178 13.6986C26.6527 13.6969 27.3806 13.8402 28.059 14.1201L28.0599 14.1205C28.7139 14.3891 29.3094 14.7799 29.8143 15.2714ZM22.6144 13.8674L22.6145 13.8676L22.6144 13.8674Z"
                    stroke="#6251DD"
                    stroke-width="1.5"
                  />
                </svg>
              </div>
            </div>
            <div className=" flex flex-col">
              <h2 className="font-bold text-lg">Summary</h2>
              <span className="">{description}</span>
            </div>
          </div>
        </div>
      </div>
      <div className="float-right flex justify-between p-4 w-96 bg-buy font-manrope text-gega-white rounded mr-14 mb-10">
        <div className="flex gap-1"><span>{price}</span><span>&#36;</span></div>
        <span>Buy Now</span>
      </div>
    </>
  );
};

export default ProductDetail;
