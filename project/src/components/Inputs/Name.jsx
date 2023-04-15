
const Name = ({name, setName}) => {
    return(
        <>
            <h3>Name</h3>
            <input type="text" placeholder="name" value={name}  onChange={(e) => setName(e.target.value)}/>
        </>
    )
}



export default Name;