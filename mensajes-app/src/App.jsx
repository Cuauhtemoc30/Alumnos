// Importaciones necesarias
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"; // Importar Router y Routes
import HomePage from "./components/principal";  // Componente de la página principal
import NotFoundPage from "./components/404page"; // Componente de la página error 404
import ServerErrorPage from "./components/servererrorpage"; // Componente de la página error 500
import LoginPage from "./components/login"; // Componente de la página de login
import InformacionPage from "./components/informacion"; // Componente de la página de informacion
import RegistroPage from "./components/registro"; // Componente de la página de registro
import CalendarPage from "./components/calendario"; // Componente de la página de calendario
import DashPage from "./components/Dashboard"; // Componente de la página de dasboard
import Messages from "./components/messages"; // Componente de la página de mensajes
import Notifications from "./components/notifications"; // Componente de la página de notificaciones
import ChatPage from "./components/chat"; // Componente de la página de chat

const App = () => {
  return (
    // Asegúrate de que todo esté envuelto por el Router
    <Router>
      <Routes>
        {/* Ruta para la página principal */}
        <Route path="/" element={<HomePage />} />
        {/* Ruta para la página de error 404 */}
        <Route path="*" element={<NotFoundPage />} />
        {/* Ruta para la página de error 500 */}
        <Route path="/500" element={<ServerErrorPage />} />
        {/* Ruta para la página de login */}
        <Route path="/login" element={<LoginPage />} />
        {/* Ruta para la página de informacion */}
        <Route path="/informacion" element={<InformacionPage />} />
        {/* Ruta para la página de registro */}
        <Route path="/registro" element={<RegistroPage />} />
        {/* Ruta para la página de calendario */}
        <Route path="/calendario" element={<CalendarPage />} />
        {/* Ruta para la página de calendario */}
        <Route path="/dashboard" element={<DashPage />} />
        {/* Ruta para la página de mensajes */}
        <Route path="/mensajes" element={<Messages />} />
        {/* Ruta para la página de notificaciones */}
        <Route path="/notificaciones" element={<Notifications />} />
        {/* Ruta para la página de chat */}
        <Route path="/chat" element={<ChatPage />} />
      </Routes>
    </Router>
  );
};

export default App;
