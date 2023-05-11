import Email from "./Inputs/Email";
import Password from "./Inputs/Password";
import { useEffect, useMemo, useState } from "react";
import logo from "../assets/images/logo.svg";

const Login = ({ sendMessage }) => {
  const [email, setEmail] = useState(
    localStorage.getItem("rememberedEmail") || ""
  );
  const [password, setPassword] = useState(
    localStorage.getItem("rememberedPassword") || ""
  );

  const [modalVisible, setModalVisible] = useState(false);

  const [isDisabled, setIsDisabled] = useState(true);

  const [rememberMe, setRememberMe] = useState(true);

  const emailRegex = useMemo(
    () => /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
    []
  );

  const passwordRegex = useMemo(
    () =>
      /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-])[a-zA-Z0-9#?!@$%^&*-]{6,20}$/,
    []
  );

  useEffect(() => {
    // localdaki beni hatırla ile kaydedilenler value değerlerine ekler.
    const savedEmail = localStorage.getItem("rememberedEmail");
    const savedPassword = localStorage.getItem("rememberedPassword");
    setEmail(savedEmail || "");
    setPassword(savedPassword || "");
  }, []);

  useEffect(() => {
    // regex kontrolü yapıyor ve eğer rememberme false olursa remove işlemi yapıyor.
    setIsDisabled(!emailRegex.test(email) || !passwordRegex.test(password));

    if (!rememberMe) {
      localStorage.removeItem("rememberedEmail");
      localStorage.removeItem("rememberedPassword");
    }
  }, [email, emailRegex, password, passwordRegex, rememberMe]);

  const loginClick = (e) => {
    e.preventDefault();

    fetch("https://assign-api.piton.com.tr/api/rest/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email:email, password:password }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.action_login.token && rememberMe) {
          localStorage.setItem("rememberedEmail", email);
          localStorage.setItem("rememberedPassword", password);
          window.location.href = "/categories";
        } else if (data.action_login.token && !rememberMe) {
          window.location.href = "/categories";
        } else {
          setModalVisible(true);
        }
      })
      .catch((error) => {
        console.error("Login yaparken hata oluştu:", error);
      });
  };

  const registerClick = () => {
    // registere yönlendirir.
    sendMessage(false);
  };

  const handleRememberMeChange = (event) => {
    // true ya da false mu onun değerini değişkene atıyor.
    setRememberMe(event.target.checked);
  };

  const clickModalBg = () => {
    setModalVisible(false);
  };
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
            Account not found! <br /> Please go to the Register page
          </span>
        </div>
      </div>
      {/* Modal End */}

      <div className="flex flex-col items-center justify-center gap-10 w-full ">
        <div>
          <img className="w-20" src={logo} alt="logo" />
        </div>
        <div className="flex flex-col gap-10 items-center">
          <div className="flex flex-col">
            <span className=" text-base">Welcome Back!</span>
            <span className="font-bold text-xl">Login to your account</span>
          </div>
          <div className="flex flex-col gap-4 items-start">
            <Email email={email} setEmail={setEmail} />
            <Password password={password} setPassword={setPassword} />
            <div className="flex flex-row-reverse gap-2 text-border-vio cursor-pointer">
              <label htmlFor="rememberme">Remember me</label>
              <input
                className="accent-border-vio"
                type="checkbox"
                id="rememberme"
                checked={rememberMe}
                onChange={handleRememberMeChange}
              />
            </div>
          </div>

          <div className=" w-72 flex flex-col gap-4 mt-14">
            <button
              className="bg-view border-view"
              onClick={loginClick}
              disabled={isDisabled}
            >
              Login
            </button>
            <button
              className="bg-gega-white text-border-vio border border-border-vio tracking-tight"
              onClick={registerClick}
            >
              Register
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
