import Email from "./Inputs/Email"
import Password from "./Inputs/Password"

const Login = () => {
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
                        <Email/>
                        <Password/>
                    </div>
                    <div>
                        <button>Login</button>
                        <button>Register</button>
                    </div>
                </div>
            </div>
        </>
    )
}



export default Login;