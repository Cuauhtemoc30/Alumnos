import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { HomeIcon, ChatBubbleBottomCenterIcon, UserIcon } from "@heroicons/react/24/outline";
import logo from "../img/log-alum.png";

const ChatPage = () => {
  const navigate = useNavigate();
  const [content, setContent] = useState("");
  const [recipientEmail, setRecipientEmail] = useState("");
  const [error, setError] = useState("");
  const [token, setToken] = useState("");

  useEffect(() => {
    const savedToken = sessionStorage.getItem("token");
    console.log("Token en ChatPage:", savedToken); // Depuración
    if (!savedToken) {
      setError("No tienes autorización. Inicia sesión nuevamente.");
      navigate("/login");
    } else {
      setToken(savedToken);
    }
  }, [navigate]);

  const sendMessage = async (e) => {
    e.preventDefault();
    setError("");

    if (!content.trim() || !recipientEmail.trim()) {
      setError("El mensaje y el correo del destinatario no pueden estar vacíos");
      return;
    }

    try {
      const response = await axios.post(
        "https://github-back-alumnos-8.onrender.com/api/messages/send",
        { recipientEmail, content },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setContent("");
      setRecipientEmail("");
      console.log("Mensaje enviado:", response.data);
    } catch (err) {
      setError(err.response ? err.response.data.message : "Error al enviar el mensaje");
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen flex bg-gray-200">
      <div className="bg-[#2C3E50] text-white w-64 p-4 space-y-4">
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

      <div className="flex-1 p-6 flex justify-center items-center">
        <form onSubmit={sendMessage} className="max-w-md w-full bg-white p-6 shadow-lg rounded-lg">
          <h2 className="text-[#34495E] text-2xl font-semibold mb-4 text-center">Enviar Mensaje</h2>
          {error && <p className="text-red-500 text-center mb-4">{error}</p>}
          <input type="email" placeholder="Correo del destinatario" className="w-full p-3 mb-4 border rounded-lg" value={recipientEmail} onChange={(e) => setRecipientEmail(e.target.value)} required />
          <textarea placeholder="Escribe tu mensaje aquí" className="w-full p-3 mb-4 border rounded-lg" value={content} onChange={(e) => setContent(e.target.value)} required />
          <button type="submit" className="w-full bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600">Enviar</button>
        </form>
      </div>
    </div>
  );
};

export default ChatPage;
