import { useState } from "react";

const CrearUsuario = ({ setShowRegister, setShowLogin }) => {
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
      setShowRegister(false);
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      setError("Las contraseñas no coinciden");
      return;
    }

    try {
      const response = await fetch("http://localhost:8080/api/authentication/v1/signupuser", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setShowRegister(false);
        setShowLogin(true);
      } else {
        setError(data.message || "Error al crear la cuenta");
      }
    } catch (err) {
      setError("Error de conexión con el servidor");
      console.error("Error en la petición:", err);
    }
  };

  return (
    <div className="modal-overlay" onClick={handleClickOutside}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="close-button" onClick={() => setShowRegister(false)}>×</button>
        <h1>Crear Cuenta</h1>
        <form onSubmit={handleRegister}>
          <label>Nombre</label>
          <input
            type="text"
            placeholder="Nombre"
            value={formData.nombres}
            onChange={(e) => setFormData({ ...formData, nombres: e.target.value })}
            required
          />

          <label>Apellido</label>
          <input
            type="text"
            placeholder="Apellido"
            value={formData.apellidos}
            onChange={(e) => setFormData({ ...formData, apellidos: e.target.value })}
            required
          />

          <label>Email</label>
          <input
            type="email"
            placeholder="Correo electrónico"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            required
          />

          <label>Contraseña</label>
          <input
            type="password"
            placeholder="Contraseña"
            value={formData.password}
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            required
          />

          <label>Confirmar Contraseña</label>
          <input
            type="password"
            placeholder="Confirmar contraseña"
            value={formData.confirmPassword}
            onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
            required
          />

          {error && <p className="error-message">{error}</p>}

          <button type="submit">Crear Usuario</button>
        </form>
      </div>
    </div>
  );
};

export default CrearUsuario;
