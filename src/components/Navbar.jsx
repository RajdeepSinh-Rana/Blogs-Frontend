import { NavLink, useNavigate } from "react-router-dom";
import { useState } from "react";
import "./Navbar.css"; 

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  const isAuthenticated = localStorage.getItem("token");

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className={`navbar ${isMenuOpen ? "active" : ""}`}>
      <div className="logo">
        <NavLink to="/">BlogApp</NavLink>
      </div>
      <ul className="nav-links">
        <li>
          <NavLink to="/">Home</NavLink>
        </li>
        {isAuthenticated ? (
          <>
           
            <li>
              <NavLink to="/my-blogs">My Blogs</NavLink>
            </li>
            <li>
              <NavLink to="/add-blog">Add Blog</NavLink>
            </li>
            <li>
              <button onClick={handleLogout} className="logout-btn">
                Logout
              </button>
            </li>
          </>
        ) : (
          <>
            <li>
              <NavLink to="/login">Login</NavLink>
            </li>
            <li>
              <NavLink to="/register">Register</NavLink>
            </li>
          </>
        )}
      </ul>
      <div className="hamburger-menu" onClick={toggleMenu}>
       
      </div>
    </nav>
  );
}

export default Navbar;
