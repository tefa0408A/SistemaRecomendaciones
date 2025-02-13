import { X } from "lucide-react";
import { useState } from "react";
import { useAuth } from "../../context/auth-context";
import { useLoginUser } from "../../hook/use.user";
import type { Auth } from "../lib/types";

const LoginModal = () => {

  const { login, setIsShowLogin, setIsShowRegister } = useAuth()
  
  const createMutation = useLoginUser();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleClickOutside = (event:any) => {
    if (event.target.classList.contains("modal-overlay")) {
      setIsShowLogin(false);
    }
  };

  const handleLogin = async (e: any) => {
    e.preventDefault();
    try {

      const loginForm: Auth = {
        email: email,
        password: password
      }

      const response = await createMutation.mutateAsync(loginForm);

      if (response.token) {
        login(response.token);
        setIsShowLogin(false);
      } else {
        setError("Credenciales incorrectas");
      }
    } catch (err) {
      setError("Credenciales incorrectas");
      console.error("Error en la petición:", err);
    }
  };

  return (
    <div
      className="fixed inset-0 top-0 left-0 w-full h-screen flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm p-4 z-50 overflow-auto"
      onClick={handleClickOutside}
    >
      <div
        className="bg-white p-6 rounded-lg shadow-lg border border-gray-300 relative w-full max-w-sm max-h-[90vh] overflow-auto flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
          onClick={() => setIsShowLogin(false)}
        >
          <X />
        </button>

        <h1 className="text-lg font-semibold mb-4 text-center">Iniciar Sesión</h1>

        <form onSubmit={handleLogin} className="flex flex-col gap-4">
          <div className="flex flex-col">
            <label className="text-sm font-medium">Email</label>
            <input
              type="email"
              placeholder="Correo electrónico"
              className="border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="flex flex-col">
            <label className="text-sm font-medium">Contraseña</label>
            <input
              type="password"
              placeholder="Contraseña"
              className="border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          {error && <p className="text-red-500 text-sm text-center">{error}</p>}

          <button
            type="submit"
            className="mt-4 bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition"
          >
            Iniciar Sesión
          </button>
        </form>
        <br />
        <button onClick={() => { setIsShowLogin(false); setIsShowRegister(true); }}>
          Crear cuenta
        </button>
      </div>
    </div>


  );
};

export default LoginModal;
