import Home from "./pages/Home"
import Categories from "./pages/Categories"
import ProductDetail from "./pages/ProductDetail"
import ProductsOfCategory from "./pages/ProductsOfCategory"
import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css';
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/categories" element={<Categories />} />
          <Route path="/productdetail" element={<ProductDetail />} />
          <Route path="/productsofcategory" element={<ProductsOfCategory />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
