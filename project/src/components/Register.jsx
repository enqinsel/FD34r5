import Name from "./Inputs/Name";
import Email from "./Inputs/Email";
import Password from "./Inputs/Password";
import { useState, useEffect, useMemo } from "react";
import logo from "../assets/images/logo.svg";


const Register = ({ sendMessage }) => {
  const emailRegex = useMemo(
    () => /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
    []
  );

  const passwordRegex = useMemo(
    () =>
      /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-])[a-zA-Z0-9#?!@$%^&*-]{6,20}$/,
    []
  );
  const [modalVisible, setModalVisible] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isDisabled, setIsDisabled] = useState(false);

  useEffect(() => {
    setIsDisabled(
      name.length <= 3 ||
        !emailRegex.test(email) ||
        !passwordRegex.test(password)
    );
  }, [name, email, emailRegex, passwordRegex, password]);

  const registerClick = (e) => {
    setName(e.target.value);
    setEmail(e.target.value);
    setPassword(e.target.value);
    fetch("https://assign-api.piton.com.tr/api/rest/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email: email, name:name, password:password }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        // window.location.href = "/categories";
      })
      .catch((error) => {
        console.error("Kayıt olurken hata oluştu:", error);
        setModalVisible(true)
      });
  };

  const loginClick = () => {
    //logine yönlendirir
    sendMessage(true);
  };
  const clickModalBg = () => {
    setModalVisible(false)
  }
  
  return (
    <>
      {/* Modal Start */}
      <div
        className={`modal ${
          modalVisible ? "visible" : "hidden"
        }  fixed inset-0 bg-gega-grey bg-opacity-60 z-50 flex items-center justify-center`}
        onClick={clickModalBg}
      >
        <div className="bg-gega-red w-1/4 h-1/4 flex items-center justify-center">
          <span className="text-gega-white text-lg text-center">
          This account already exists! <br /> Please go to the Login page
          </span>
        </div>
      </div>
      {/* Modal End */}

      <div className="flex flex-col items-center justify-center gap-8 w-full">
        <div>
          <img className="w-20" src={logo} alt="logo" />
        </div>
        <div className="flex flex-col gap-9 items-center">
          <div className="flex flex-col">
            <span className=" text-base">Welcome Back!</span>
            <span className="font-bold text-xl">Login to your account</span>
          </div>
          <div className="flex flex-col gap-4 ">
            <Name name={name} setName={setName} />
            <Email email={email} setEmail={setEmail} />
            <Password password={password} setPassword={setPassword} />
          </div>
          <div className="w-72 flex flex-col gap-4 mt-10">
            <button
              className="bg-view border-view"
              onClick={registerClick}
              disabled={isDisabled}
            >
              Register
            </button>
            <button
              className="bg-gega-white text-border-vio border border-border-vio tracking-tight"
              onClick={loginClick}
            >
              Login
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;
