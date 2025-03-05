try {
  console.log("Enviando datos:", { recipientEmail, content });
  
  const response = await axios.post(
    "https://github-back-alumnos-8.onrender.com/api/messages/send",
    { recipientEmail, content },
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );

  console.log("Respuesta del servidor:", response.data);
  setContent("");
  setRecipientEmail("");
} catch (err) {
  console.error("Error en la solicitud:", err.response?.data || err.message);
  setError(err.response?.data?.message || "Error al enviar el mensaje");
}
