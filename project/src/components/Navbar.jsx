import logo from "../assets/images/logo.svg";
import search from "../assets/images/search.svg";
const Navbar = () => {
  return (
    <>
      <div className="navbarContainer">
        <img src={logo} alt="logo" />
        <div className="searchBox">
          <div className="searchBox__field">
            <img src={search} alt="search" />
            <input type="text" placeholder="Search" />
          </div>
        </div>
        <div className="buttons">
          <button className="buttons__profile"></button>
          <button className="buttons__like"></button>
          <button className="buttons__basket"></button>
        </div>
      </div>
    </>
  );
};

export default Navbar;
