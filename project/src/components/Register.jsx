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

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [isDisabled, setIsDisabled] = useState(true);


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
      body: JSON.stringify({ name, email, password }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Kayıt yapıldı:", data.action_register.id);
        window.location.href = "/categories";
      })
      .catch((error) => {
        console.error("Kayıt olurken hata oluştu:", error);
        alert("Aynı kayıt mevcuttur")
      });
  };

  const loginClick = () => {
    //logine yönlendirir
    sendMessage(true);
  };

  return (
    <>
      <div className="flex flex-col items-center justify-center gap-8 w-full">
        <div>
          <img className="w-20" src={logo} alt="logo" />
        </div>
        <div className="flex flex-col gap-9 items-center">
          <div className="flex flex-col">
            <span className=" text-base">Welcome Back!</span>
            <span className="font-bold text-xl">Register to your account</span>
          </div>
          <div className="flex flex-col gap-4 ">
            <Name name={name} setName={setName} />
            <Email email={email} setEmail={setEmail} />
            <Password password={password} setPassword={setPassword} />
          </div>
          <div className="w-48 flex flex-col gap-4 mt-10">
            <button onClick={loginClick}>Login</button>
            <button
              onClick={registerClick}
              disabled={isDisabled}
            >
              Register
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;
