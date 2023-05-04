import Home from "./pages/Home"
import Categories from "./pages/Categories"
import ProductDetail from "./pages/ProductDetail"
import CategoryProducts from "./pages/CategoryProducts"
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
          <Route path="/categoryproducts/:id/:categoryName" element={<CategoryProducts />} />
          {/* <Route path="*" element={<NotFound />} /> */}
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
