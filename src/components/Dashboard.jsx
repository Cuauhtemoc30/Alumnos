import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { HomeIcon, UserIcon, ChatBubbleBottomCenterIcon } from "@heroicons/react/24/outline";
import logo from "../img/log-alum.png";

const DashPage = () => {
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
    } else {
      setIsAuthenticated(true);
    }
  }, [navigate]);

  if (!isAuthenticated) return null;

  return (
    <div className="min-h-screen flex bg-gray-200">
      {/* Sidebar */}
      <div className={`bg-[#2C3E50] text-white w-64 p-4 space-y-4 ${sidebarOpen ? "block" : "hidden"} md:block`}>
        <h2 className="text-xl font-semibold text-center">Dashboard</h2>
        <nav className="space-y-2">
          <button className="flex items-center w-full p-2 rounded hover:bg-gray-700" onClick={() => navigate("/dashboard")}>
            <HomeIcon className="w-6 h-6 mr-2" /> Inicio
          </button>
          <button className="flex items-center w-full p-2 rounded hover:bg-gray-700" onClick={() => navigate("/calendario")}>
            <UserIcon className="w-6 h-6 mr-2" /> Calendario
          </button>
          <button className="flex items-center w-full p-2 rounded hover:bg-gray-700" onClick={() => navigate("/chat")}>
            <ChatBubbleBottomCenterIcon className="w-6 h-6 mr-2" /> Chat
          </button>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header sin menú hamburguesa */}
        <div className="bg-[#34495E] p-4 flex justify-between items-center">
          <img src={logo} alt="Logo" className="h-12" />
        </div>

        {/* Dashboard Content */}
        <div className="p-6">
          <h1 className="text-2xl font-semibold text-[#34495E] mb-4">Bienvenido al Dashboard</h1>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Cuadro de Mensajes */}
            <div
              className="bg-white p-6 rounded-lg shadow-lg cursor-pointer hover:bg-gray-100"
              onClick={() => navigate("/mensajes")}
            >
              <h3 className="text-lg font-semibold">Mensajes</h3>
              <p className="text-gray-600">Revisa tus mensajes.</p>
            </div>

            {/* Cuadro de Notificaciones */}
            <div
              className="bg-white p-6 rounded-lg shadow-lg cursor-pointer hover:bg-gray-100"
              onClick={() => navigate("/notificaciones")}
            >
              <h3 className="text-lg font-semibold">Notificaciones</h3>
              <p className="text-gray-600">Consulta tus alertas y notificaciones.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashPage;
