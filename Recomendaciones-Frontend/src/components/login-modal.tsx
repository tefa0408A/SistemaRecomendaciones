import { useState } from "react";

const LoginModal = ({ setShowLogin, setShowRegister, setIsLoggedIn }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleClickOutside = (event) => {
    if (event.target.classList.contains("modal-overlay")) {
      setShowLogin(false);
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:8080/api/authentication/v1/signin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        setIsLoggedIn(true);
        setShowLogin(false);
      } else {
        setError(data.message || "Credenciales incorrectas");
      }
    } catch (err) {
      setError("Error al conectar con el servidor");
      console.error("Error en la petición:", err);
    }
  };

  return (
    <div className="modal-overlay" onClick={handleClickOutside}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="close-button" onClick={() => setShowLogin(false)}>×</button>
        <h1>Bienvenido</h1>
        <form onSubmit={handleLogin}>
          <label>Email</label>
          <input
            type="email"
            placeholder="Correo electrónico"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <label>Contraseña</label>
          <input
            type="password"
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <a href="#" className="forgot-password">Olvidé mi contraseña</a>
          {error && <p className="error-message">{error}</p>}

          <button type="submit">Login</button>
          <button className="link-button" onClick={() => { setShowLogin(false); setShowRegister(true); }}>
            Crear cuenta
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginModal;
