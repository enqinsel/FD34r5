const Email = ({email, setEmail}) => {
    return(
        <div>
            <h3 className="font-bold">Email</h3>
            <input type="text" placeholder="email" value={email} onChange={(e) => setEmail(e.target.value)}/>
        </div>
    )
}



export default Email;