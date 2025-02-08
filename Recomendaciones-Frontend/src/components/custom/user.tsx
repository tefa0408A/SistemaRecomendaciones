import { NavLink } from "react-router-dom";
import { Button } from "../ui/button";
import { User, UserIcon, LogOut } from "lucide-react";
import { useState, useRef, useEffect } from "react";

const UserLoggedIn = ({ logout }) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Cerrar el dropdown al hacer clic fuera
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowDropdown(false);
      }
    };

    if (showDropdown) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showDropdown]);

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Botón de Usuario */}
      <Button
        onClick={(e) => {
          e.stopPropagation();
          setShowDropdown(!showDropdown);
        }}
        className="rounded-full bg-white hover:shadow-md transition"
      >
        <User className="h-5 w-5 text-gray-700" />
      </Button>

      {/* Dropdown de Opciones */}
      {showDropdown && (
        <div className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-lg border border-gray-200">
          <NavLink
            to="/perfil"
            className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-t-lg transition"
          >
            <UserIcon className="h-5 w-5" />
            <span>Mi Perfil</span>
          </NavLink>
          <button
            onClick={() => {
              logout();
              setShowDropdown(false);
            }}
            className="flex w-full items-center gap-2 px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-b-lg transition"
          >
            <LogOut className="h-5 w-5" />
            <span>Cerrar Sesión</span>
          </button>
        </div>
      )}
    </div>
  );
};

export default UserLoggedIn;
