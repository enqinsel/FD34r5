import { useState } from "react";
import Login from "../components/Login.jsx";
import Register from "../components/Register.jsx";
import bg from "../assets/images/bg.svg";


const Home = () => {
  const [isLoginPage, setisLoginPage] = useState(true);

  return (
    <div className="container-lg flex items-center h-screen overflow-hidden">
      <img className="w-6/12" src={bg} alt="bg" />
      <div className="w-6/12">
        {isLoginPage ? (
          <Login sendMessage={setisLoginPage} />
        ) : (
          <Register sendMessage={setisLoginPage} />
        )}
      </div>
    </div>
  );
};

export default Home;
