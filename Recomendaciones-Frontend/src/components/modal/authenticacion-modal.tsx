import { useState } from "react";
import Login from "./login-modal";
import CrearUsuario from "../funcionalidad/user-create";
import { Button } from "../ui/button";

const Authenticacion = ({ login }) => {
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);

  return (
    <div>
      <Button onClick={() => setShowLogin(true)}>Iniciar Sesión</Button>
      {showLogin && (
        <Login
          setShowLogin={setShowLogin}
          setShowRegister={setShowRegister}
          login={login}
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

export default Authenticacion;
