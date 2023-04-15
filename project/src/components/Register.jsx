import Name from "./Inputs/Name"
import Email from "./Inputs/Email"
import Password from "./Inputs/Password"
import { useState } from "react";


const Register = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const registerClick = (e) => {
        setName(e.target.value)
        setEmail(e.target.value)
        setPassword(e.target.value)
        console.log("Name",name , "email", email, "pass", password)

        fetch('https://assign-api.piton.com.tr/api/rest/register', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name, email, password }),
          })
            .then((response) => response.json())
            .then((data) => {
              console.log('Kayıt yapıldı:', data.action_register.id);
            })
            .catch((error) => {
              console.error('Kayıt olurken hata oluştu:', error);
            });
    }

    const loginClick = (e) => {
        setName(e.target.value)
        setEmail(e.target.value)
        setPassword(e.target.value)
        console.log("Name",name , "email", email, "pass", password)
    }

    return(
    <>
        <div>
            <div>
                <img src="" alt="left" />
            </div>
            <div>
                <img src="" alt="" />
                <div>
                    <span>Welcome Back</span>
                    <span>Login to ...</span>
                </div>
                <div>
                    <Name name={name} setName={setName}/>
                    <Email email={email} setEmail={setEmail}/>
                    <Password password={password} setPassword={setPassword}/>
                </div>
                <div>
                <button onClick={registerClick}>Register</button>
                <button onClick={loginClick}>Login</button>
            </div>
            </div>
        </div>
    </>
    )
}



export default Register;