import { useState } from "react";
import Login from "./login-modal";
import CrearUsuario from "./crear-usuario";

const Autenticacion = ({ setIsLoggedIn }) => {
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  
  return (
    <div>
      <button onClick={() => setShowLogin(true)}>Iniciar Sesión</button>
      {showLogin && (
        <Login
          setShowLogin={setShowLogin}
          setShowRegister={setShowRegister}
          setIsLoggedIn={setIsLoggedIn}
        />
      )}
      {showRegister && (
        <CrearUsuario
          setShowRegister={setShowRegister}
          setShowLogin={setShowLogin}
        />
      )}
    </div>
  );
};

export default Autenticacion;
