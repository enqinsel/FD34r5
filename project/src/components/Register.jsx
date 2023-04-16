import Name from "./Inputs/Name";
import Email from "./Inputs/Email";
import Password from "./Inputs/Password";
import { useState, useEffect, useMemo } from "react";

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
  const [isRed, setIsRed] = useState(false);

  useEffect(() => {
    setIsDisabled(
      name.length <= 3 ||
      !emailRegex.test(email) ||
      !passwordRegex.test(password)
    );
    setIsRed(
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
      <div>
        <div>
          <img src="" alt="left" />
        </div>
        <div>
          <img src="" alt="" />
          <div>
            <span>Welcome Back</span> <br />
            <span>Register to ...</span>
          </div>
          <div>
            <Name name={name} setName={setName} />
            <Email email={email} setEmail={setEmail} />
            <Password password={password} setPassword={setPassword} />
          </div>
          <div>
            <button onClick={loginClick}>Login</button>
            <button
              onClick={registerClick}
              disabled={isDisabled}
              style={{ border: isRed ? "1px solid red" : "1px solid blue" }}
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
