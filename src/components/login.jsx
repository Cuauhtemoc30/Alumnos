import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import ReCAPTCHA from "react-google-recaptcha";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import logo from "../img/log-alum.png";

const LoginPage = () => {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [captchaValue, setCaptchaValue] = useState(null);

  const toggleMenu = () => setMenuOpen(!menuOpen);
  const handleNavigation = (path) => {
    navigate(path);
    setMenuOpen(false);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    if (!captchaValue) {
      setError("Por favor, verifica el CAPTCHA.");
      return;
    }

    try {
      const response = await axios.post("https://github-back-alumnos-8.onrender.com/api/users/login", {
        email,
        password,
        captcha: captchaValue, // Enviamos el captcha al backend para verificación
      });

      localStorage.setItem("token", response.data.token);
      localStorage.setItem("user", JSON.stringify(response.data.user));

      navigate("/dashboard");
    } catch (err) {
      setError("Correo o contraseña incorrectos");
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-200">
      {/* Header */}
      <div className="bg-[#34495E] p-4 flex justify-between items-center relative">
        <img src={logo} alt="Logo" className="h-12" />
        <button onClick={toggleMenu} className="text-white focus:outline-none">
          {menuOpen ? <XMarkIcon className="w-8 h-8" /> : <Bars3Icon className="w-8 h-8" />}
        </button>
        {menuOpen && (
          <div className="absolute top-16 right-4 bg-[#34495E] text-white shadow-lg rounded-lg py-2 w-48">
            <button onClick={() => handleNavigation("/")} className="block px-4 py-2 w-full text-left hover:bg-gray-700">Inicio</button>
            <button onClick={() => handleNavigation("/informacion")} className="block px-4 py-2 w-full text-left hover:bg-gray-700">Información</button>
            <button onClick={() => handleNavigation("/login")} className="block px-4 py-2 w-full text-left hover:bg-gray-700">Iniciar sesión</button>
          </div>
        )}
      </div>

      {/* Login Form */}
      <div className="flex-grow flex justify-center items-center w-full h-full p-4">
        <div className="max-w-md w-full bg-white rounded-lg p-6 shadow-lg">
          <h2 className="text-[#34495E] text-2xl font-semibold mb-4 text-center">Iniciar Sesión</h2>
          {error && <p className="text-red-500 text-center mb-4">{error}</p>}
          <form onSubmit={handleLogin}>
            <div className="mb-4">
              <input
                type="email"
                placeholder="Correo Electrónico"
                className="w-full px-4 py-3 border rounded-lg text-gray-700"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="mb-4">
              <input
                type="password"
                placeholder="Contraseña"
                className="w-full px-4 py-3 border rounded-lg text-gray-700"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            {/* reCAPTCHA */}
            <div className="mb-4 flex justify-center">
              <ReCAPTCHA
                sitekey="6Lch9ekqAAAAAMgvbns274_MzddzdIKtdPnzG43U" // Reemplaza con tu clave de sitio de Google reCAPTCHA
                onChange={(value) => setCaptchaValue(value)}
              />
            </div>

            <button type="submit" className="w-full bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600">
              Log in
            </button>
          </form>
          <div className="mt-4 text-center">
            <span className="text-gray-700">¿No tienes una cuenta? </span>
            <a href="/registro" className="text-green-600 font-semibold hover:underline">Regístrate</a>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-[#34495E] text-white text-center py-4">
        <div className="container mx-auto">
          <p>Contáctanos: (100-785-0941) | email: contacto@nuestroapp.com</p>
          <p className="mt-2">Derechos Reservados</p>
        </div>
      </footer>
    </div>
  );
};

export default LoginPage;
