import { Link } from "react-router-dom";
import marvelLogo from "../assets/image/marvelogo4.avif";

const Header = () => {
  return (
    <>
      <header className="header-container">
        <div className="logo">
          <Link to="/">
            <img src={marvelLogo} alt="" />
          </Link>
        </div>
        <div className="categories">
          <div>
            <Link to="/comics" className="link">
              Comics
            </Link>
          </div>
          <div>
            <Link to="/" className="link">
              Characters
            </Link>
          </div>
          <div>
            <Link className="link">Favoris</Link>
          </div>
        </div>
      </header>
    </>
  );
};
export default Header;
