import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";
import logo from '../assets/logo.svg'
import SearchBox from "./search-box";
import Autenticacion from "./autenticacion-modal";

const Header = ({ isLoggedIn, setIsLoggedIn }) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [showOpinarMenu, setShowOpinarMenu] = useState(false);

  const handleOutsideClick = (event) => {
    if (!event.target.closest(".dropdown") && !event.target.closest(".opinar-menu")) {
      setShowDropdown(false);
      setShowOpinarMenu(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleOutsideClick);
    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, []);

  return (
    <header className="header">
      <div className="logo">
        <a href="/">
          <img src={logo} className="logoImagen" alt="logo" />
        </a>
      </div>

      <SearchBox />

      <nav className="navbar">
        <div className="opinar-menu" style={{ position: "relative" }}>
          <button className="nav-item" onClick={(e) => { e.stopPropagation(); setShowOpinarMenu(!showOpinarMenu); }}>
            Opinar
          </button>
          {showOpinarMenu && (
            <div className="dropdown" style={{ position: "absolute", top: "100%", left: 0, display: "flex", flexDirection: "column", background: "white", boxShadow: "0px 4px 6px rgba(0,0,0,0.1)", borderRadius: "4px", padding: "8px 0" }}>
              <NavLink to="/escribir" className="dropdown-item" style={{ padding: "8px 16px", textAlign: "left" }}>Escribir</NavLink>
              <NavLink to="/publicar" className="dropdown-item" style={{ padding: "8px 16px", textAlign: "left" }}>Publicar</NavLink>
            </div>
          )}
        </div>
        {isLoggedIn ? (
          <div className="user-menu">
            <button className="user-icon" onClick={(e) => { e.stopPropagation(); setShowDropdown(!showDropdown); }}>
              <FaUserCircle size={24} />
            </button>
            {showDropdown && (
              <div className="dropdown">
                <NavLink to="/perfil" className="dropdown-item">Mi Perfil</NavLink>
                <button className="dropdown-item" onClick={() => { setIsLoggedIn(false); setShowDropdown(false); }}>Cerrar</button>
              </div>
            )}
          </div>
        ) : (
          <Autenticacion setIsLoggedIn={setIsLoggedIn} />
        )}
      </nav>
    </header>
  );
};

export default Header;
