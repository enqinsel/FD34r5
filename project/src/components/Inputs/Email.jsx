const Email = ({email, setEmail}) => {
    return(
        <>
            <h3>Email</h3>
            <input type="text" placeholder="email" value={email} onChange={(e) => setEmail(e.target.value)}/>
        </>
    )
}



export default Email;