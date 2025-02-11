import { X } from "lucide-react";
import { useState } from "react";
import { useAuth } from "../../context/auth-context";

const CrearUsuario = () => {

  const { setIsShowRegister, setIsShowLogin  } = useAuth();

  const API_URL = import.meta.env.VITE_API_SERVICIOS_URL as string
  const [formData, setFormData] = useState({
    nombres: "",
    apellidos: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");

  const handleClickOutside = (event) => {
    if (event.target.classList.contains("modal-overlay")) {
      setIsShowRegister(false);
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      setError("Las contraseñas no coinciden");
      return;
    }

    try {
      const response = await fetch(`${API_URL}/api/authentication/v1/signupuser`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setIsShowRegister(false);
        setIsShowLogin(true);
      } else {
        setError(data.message || "Error al crear la cuenta");
      }
    } catch (err) {
      setError("Error de conexión con el servidor");
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
        {/* Botón para cerrar el modal */}
        <button
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
          onClick={() => setIsShowRegister(false)}
        >
          <X />
        </button>

        {/* Título */}
        <h1 className="text-lg font-semibold mb-4 text-center">Crear Cuenta</h1>

        {/* Formulario */}
        <form onSubmit={handleRegister} className="flex flex-col gap-4">
          <div className="flex flex-col">
            <label className="text-sm font-medium">Nombre</label>
            <input
              type="text"
              placeholder="Nombre"
              className="border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={formData.nombres}
              onChange={(e) =>
                setFormData({ ...formData, nombres: e.target.value })
              }
              required
            />
          </div>

          <div className="flex flex-col">
            <label className="text-sm font-medium">Apellido</label>
            <input
              type="text"
              placeholder="Apellido"
              className="border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={formData.apellidos}
              onChange={(e) =>
                setFormData({ ...formData, apellidos: e.target.value })
              }
              required
            />
          </div>

          <div className="flex flex-col">
            <label className="text-sm font-medium">Email</label>
            <input
              type="email"
              placeholder="Correo electrónico"
              className="border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              required
            />
          </div>

          <div className="flex flex-col">
            <label className="text-sm font-medium">Contraseña</label>
            <input
              type="password"
              placeholder="Contraseña"
              className="border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={formData.password}
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
              required
            />
          </div>

          <div className="flex flex-col">
            <label className="text-sm font-medium">Confirmar Contraseña</label>
            <input
              type="password"
              placeholder="Confirmar contraseña"
              className="border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={formData.confirmPassword}
              onChange={(e) =>
                setFormData({ ...formData, confirmPassword: e.target.value })
              }
              required
            />
          </div>

          {error && <p className="text-red-500 text-sm text-center">{error}</p>}

          <button
            type="submit"
            className="mt-4 bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition"
          >
            Crear Usuario
          </button>
        </form>
      </div>
    </div>

  );
};

export default CrearUsuario;
