import { createContext, useState, useContext, useEffect } from "react";

type AuthProviderProps = {
  children: React.ReactNode
}

type AuthProviderState = {
  isLoggedIn: boolean
  login: (token: string) => void;
  logout: () => void;
  isTokenValid: () => boolean;
  obtenerNombre: () => string;
  isShowLogin: boolean;
  setIsShowLogin: (value: boolean) => void;
  isShowRegister: boolean;
  setIsShowRegister: (value: boolean) => void;
}

const initialState: AuthProviderState = {
  isLoggedIn: false,
  login: () => { },
  logout: () => { },
  isTokenValid: () => false,
  obtenerNombre: () => "",
  isShowLogin: false,
  setIsShowLogin: () => { },
  isShowRegister: false,
  setIsShowRegister: () => { }
}

const AuthContext = createContext<AuthProviderState>(initialState)

// Proveedor del contexto
export function AuthProvider({ children }: AuthProviderProps) {

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isShowLogin, setIsShowLogin] = useState(false);
  const [isShowRegister, setIsShowRegister] = useState(false);


  // Función para verificar si el token es válido
  const isTokenValid = () => {
    const token = localStorage.getItem("token");
    if (!token) return false;

    try {
      const payload = JSON.parse(atob(token.split(".")[1]));
      const isExpired = payload.exp * 1000 < Date.now();
      return !isExpired;
    } catch (error) {
      return false;
    }
  };

  const obtenerNombre = () => {
    const token = localStorage.getItem("token");
    if (!token) return false;

    try {
      const payload = JSON.parse(atob(token.split(".")[1]));
      const usuario = payload.userCreated
      return usuario;
    } catch (error) {
      return "";
    }
  };

  useEffect(() => {
    if (isTokenValid()) {
      setIsLoggedIn(true);
    }
  }, []);

  // Función para iniciar sesión
  const login = (token: string) => {
    setIsLoggedIn(true)
    localStorage.setItem("token", token);
  };

  // Función para cerrar sesión
  const logout = () => {
    setIsLoggedIn(false)
    localStorage.removeItem("token");
  };

  const value = {
    isLoggedIn,
    login,
    logout,
    isTokenValid,
    isShowLogin,
    setIsShowLogin,
    isShowRegister,
    setIsShowRegister,
    obtenerNombre
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

// Hook personalizado para usar el contexto
export function useAuth() {
  return useContext(AuthContext);
}
