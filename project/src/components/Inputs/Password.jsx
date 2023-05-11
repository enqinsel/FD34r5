const Password = ({password, setPassword}) => {
    return(
        <div>
            <h3 className="font-bold">Password</h3>
            <input type="password" placeholder="password" value={password} onChange={(e) => setPassword(e.target.value)}/>
        </div>
    )
}



export default Password;