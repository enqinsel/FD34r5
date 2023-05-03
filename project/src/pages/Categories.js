import { useEffect, useState } from "react";
import React from "react";
import axios from "axios";

import Carousel from "nuka-carousel";
import Navbar from "../components/Navbar";
import ProductList from "../components/ProductList.jsx";

import book1 from "../assets/images/carouselImg.svg";
const Categories = () => {
  const [categories, setCategories] = useState([]);

  const getCategories = async () => {
    const dataCategories = await axios.get(
      "https://assign-api.piton.com.tr/api/rest/categories"
    );
    setCategories(dataCategories.data.category);
    return dataCategories.data.category;
  };

  useEffect(() => {
    getCategories();
  }, []);

  const viewClick = (id, categoryName) => {
    window.location.href = `/productsofcategory/${id}/${categoryName}`;
  };
  return (
    <>
      <Navbar />

      <Carousel autoplayInterval>
        <div className="carouselImg">
          <img src={book1} alt="book" />
          <img src={book1} alt="book" />
          <img src={book1} alt="book" />
        </div>
        <div className="carouselImg">
          <img src={book1} alt="book" />
          <img src={book1} alt="book" />
          <img src={book1} alt="book" />
        </div>
        <div className="carouselImg">
          <img src={book1} alt="book" />
          <img src={book1} alt="book" />
          <img src={book1} alt="book" />
        </div>
      </Carousel>

      {categories.map((category) => (
        <div key={category.id} className="p-10">
          <div className="flex justify-between mb-5">
            <h2 className=" font-bold text-3xl" key={category.id}>{category.name}</h2>
            <button onClick={() => viewClick(category.id, category.name)}>
              View All
            </button>
          </div>
          <div className="flex gap-3 w-full">
            <ProductList id={category.id} limit="4" />
          </div>
        </div>
      ))}
    </>
  );
};

export default Categories;
