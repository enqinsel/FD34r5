const Password = ({password, setPassword}) => {
    return(
        <>
            <h3>Password</h3>
            <input type="password" placeholder="password" value={password} onChange={(e) => setPassword(e.target.value)}/>
        </>
    )
}



export default Password;