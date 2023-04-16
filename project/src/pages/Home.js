import { useState } from "react";
import Login from "../components/Login.jsx";
import Register from "../components/Register.jsx";

const Home = () => {
    const [isLoginPage, setisLoginPage] = useState(true)

  return (
    <>
      {isLoginPage ? <Login sendMessage={setisLoginPage}/> : <Register sendMessage={setisLoginPage}/>}
    </>
  );
};

export default Home;
