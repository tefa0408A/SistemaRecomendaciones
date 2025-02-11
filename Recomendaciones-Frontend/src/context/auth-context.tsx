import { createContext, useState, useContext, useEffect } from "react";

// Crear el contexto
const AuthContext = createContext();

// Proveedor del contexto
export function AuthProvider({ children }) {

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isShowLogin, setIsShowLogin] = useState(false);
  const [isShowRegister, setIsShowRegister] = useState(false);


  // Función para verificar si el token es válido
  const isTokenValid = () => {
    const token = localStorage.getItem("token");
    if (!token) return false;

    try {
      const payload = JSON.parse(atob(token.split(".")[1])); // Decodificar el JWT
      const isExpired = payload.exp * 1000 < Date.now(); // Comprobar si ha expirado
      return !isExpired;
    } catch (error) {
      return false;
    }
  };

  const obtenerNombre = () => {
    const token = localStorage.getItem("token");
    if (!token) return false;

    try {
      const payload = JSON.parse(atob(token.split(".")[1])); // Decodificar el JWT
      const usuario = payload.userCreated // Comprobar si ha expirado
      return usuario;
    } catch (error) {
      return "";
    }
  };


  

  useEffect(() => {
    // Verificamos si el token es válido cuando la aplicación se monta
    if (isTokenValid()) {
      setIsLoggedIn(true);
    }
  }, []);

  // Función para iniciar sesión
  const login = (token) => {
    setIsLoggedIn(true)
    localStorage.setItem("token", token); 
  };

  // Función para cerrar sesión
  const logout = () => {
    setIsLoggedIn(false)
    localStorage.removeItem("token");
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout, isTokenValid, isShowLogin, setIsShowLogin, isShowRegister, setIsShowRegister, obtenerNombre }}>
      {children}
    </AuthContext.Provider>
  );
}

// Hook personalizado para usar el contexto
export function useAuth() {
  return useContext(AuthContext);
}
