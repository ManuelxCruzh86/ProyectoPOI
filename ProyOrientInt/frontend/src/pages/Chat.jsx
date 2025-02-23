import { useState } from "react";
import { Link } from "react-router-dom";

function ChatIndividual() {
  const [showNotifications, setShowNotifications] = useState(false);
  const [showRewards, setShowRewards] = useState(false);
  const [mensaje, setMensaje] = useState("");
  const [mensajes, setMensajes] = useState([]);
  const [archivo, setArchivo] = useState(null);
  const [cifrado, setCifrado] = useState(false);

  const usuarios = [
    { id: 1, nombre: "Juan", estado: "" },
    { id: 2, nombre: "Ana", estado: "" },
    { id: 3, nombre: "Carlos", estado: "" },
    { id: 4, nombre: "María", estado: "" },
  ];

  const enviarMensaje = (e) => {
    e.preventDefault();
    if (mensaje.trim() || archivo) {
      setMensajes([...mensajes, { id: mensajes.length + 1, texto: mensaje, archivo }]);
      setMensaje("");
      setArchivo(null);
    }
  };

  const compartirUbicacion = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const { latitude, longitude } = position.coords;
        const link = `https://www.google.com/maps?q=${latitude},${longitude}`;
        setMensajes([...mensajes, { id: mensajes.length + 1, texto: "Ubicación compartida", archivo: link }]);
      });
    } else {
      alert("La geolocalización no está soportada en este navegador.");
    }
  };

  return (
    <div className="h-screen w-screen flex bg-gray-900 text-white">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-800 p-4 shadow-lg flex flex-col justify-between">
        <div>
          <h2 className="text-xl font-bold mb-4">Usuarios Conectados</h2>
          <ul className="space-y-2">
            {usuarios.map((usuario) => (
              <li key={usuario.id} className="flex items-center space-x-2">
                <span>{usuario.estado}</span>
                <span>{usuario.nombre}</span>
              </li>
            ))}
          </ul>
        </div>
        <Link to="/" className="text-blue-400 hover:underline mt-4">
          ← Volver al inicio
        </Link>
      </aside>

      <main className="flex-1 flex flex-col">
        <nav className="p-4 bg-gray-800 flex justify-between items-center shadow-md">
          <div className="flex items-center space-x-4">
            <img src="/conexxo.png" className="h-24 w-24 object-contain" alt="logo" />
            <h1 className="text-3xl font-bold">ConneXXo</h1>
          </div>
        </nav>

        <div className="flex-1 p-6 overflow-y-auto">
          {mensajes.map((msg) => (
            <div key={msg.id} className="mb-4">
              <div className="bg-gray-700 p-4 rounded-lg max-w-md">
                <p>{cifrado ? "[Mensaje Cifrado]" : msg.texto}</p>
                {msg.archivo && (typeof msg.archivo === "string" ? (
                  <a href={msg.archivo} target="_blank" rel="noopener noreferrer" className="text-blue-400">Ver archivo</a>
                ) : (
                  <p>Archivo adjunto</p>
                ))}
              </div>
            </div>
          ))}
        </div>

        <form onSubmit={enviarMensaje} className="p-4 bg-gray-800 text-white-200 flex flex-col gap-2">
          <div className="flex gap-2">
            <input
              type="text"
              value={mensaje}
              onChange={(e) => setMensaje(e.target.value)}
              placeholder="Escribe un mensaje..."
              className="flex-1 p-2 rounded-lg bg-gray-700 text-white-200 focus:outline-none focus:ring-2 focus:ring-yellow-400"
            />
            <input
              type="file"
              onChange={(e) => setArchivo(e.target.files[0])}
              className="text-white"
            />
            <button
              type="submit"
              className="bg-yellow-400 text-white-200 px-4 py-2 rounded-lg font-semibold hover:bg-yellow-500 transition"
            >
              Enviar
            </button>
          </div>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={compartirUbicacion}
              className="bg-blue-500 text-white px-4 py-2 rounded-lg font-semibold hover:bg-blue-600 transition"
            >
              Compartir Ubicación
            </button>
            <button
              type="button"
              onClick={() => setCifrado(!cifrado)}
              className="bg-red-500 text-white px-4 py-2 rounded-lg font-semibold hover:bg-red-600 transition"
            >
              {cifrado ? "Desactivar Cifrado" : "Activar Cifrado"}
            </button>
          </div>
        </form>
      </main>
    </div>
  );
}

export default ChatIndividual;
