const Name = ({name, setName}) => {
    return(
        <div>
            <h3 className="font-bold">Name</h3>
            <input type="text" placeholder="name" value={name}  onChange={(e) => setName(e.target.value)}/>
        </div>
    )
}



export default Name;