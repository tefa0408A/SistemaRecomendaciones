import { useState } from "react";
import Login from "./login-modal";
import CrearUsuario from "./user-create";
import { Button } from "../ui/button";
import { useAuth } from "../../context/auth-context";

const Authenticacion = () => {

  const { isShowLogin, setIsShowLogin, isShowRegister } = useAuth()

  return (
    <div>
      <Button onClick={() => setIsShowLogin(true)}>Iniciar Sesión</Button>
      {isShowLogin && (
        <Login/>
      )}
      {isShowRegister && (
        <CrearUsuario/>
      )}
    </div>
  );
};

export default Authenticacion;
