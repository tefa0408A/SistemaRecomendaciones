import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import "./styles/style.css";
import Home from "./pages/home";
import Header from "./components/header";
import Opinar from "./pages/opinar";
import Perfil from "./pages/perfil";
import Cafeteria from "./pages/cafeteria";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <Router>
      <Header isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/opinar" element={<Opinar />} />
        <Route path="/perfil" element={<Perfil />} />
        <Route path="/cafeteria/:id" element={<Cafeteria />} />
      </Routes>
    </Router>
  );
}

export default App
