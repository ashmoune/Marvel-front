import { Link } from "react-router-dom";
import marvelLogo from "../assets/image/Marvel_Logo.svg";

const Header = () => {
  return (
    <>
      <header>
        <div className="logo">
          <Link to="/">
            <img src={marvelLogo} alt="" />
          </Link>
        </div>
        <div className="categories">
          <div>
            <Link to="/comics">Comics</Link>
          </div>
          <div>
            <Link to="/">Characters</Link>
          </div>
          <div>
            <Link>Favoris</Link>
          </div>
        </div>
      </header>
    </>
  );
};
export default Header;
