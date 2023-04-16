import Email from "./Inputs/Email";
import Password from "./Inputs/Password";
import { useEffect, useMemo, useState } from "react";

const Login = ({ sendMessage }) => {
  const [email, setEmail] = useState(localStorage.getItem("rememberedEmail") || "");
  const [password, setPassword] = useState(localStorage.getItem("rememberedPassword") || "");

  const [isDisabled, setIsDisabled] = useState(true);
  const [isRed, setIsRed] = useState(false);

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
    setIsRed(!emailRegex.test(email) || !passwordRegex.test(password));

    if(!rememberMe){
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
      body: JSON.stringify({ email, password }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.action_login.token && rememberMe) {
            localStorage.setItem("rememberedEmail", email);
            localStorage.setItem("rememberedPassword", password);
            window.location.href = "/categories";
          } else if(data.action_login.token && !rememberMe){
            window.location.href = "/categories";
          } else{
            alert("hata")
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
            <span>Login to ...</span>
          </div>
          <div>
            <Email email={email} setEmail={setEmail} />
            <Password password={password} setPassword={setPassword} />
          </div>
          <div>
            <button
              onClick={loginClick}
              disabled={isDisabled}
              style={{ border: isRed ? "1px solid red" : "1px solid blue" }}
            >
              Login
            </button>
            <button onClick={registerClick}>Register</button>
          </div>
          <label htmlFor="rememberme">Beni Hatırla</label>
          <input
            type="checkbox"
            id="rememberme"
            checked={rememberMe}
            onChange={handleRememberMeChange}
          />
        </div>
      </div>
    </>
  );
};

export default Login;
