import React, { useState, useRef, useEffect } from "react";
import { FaMicrophone, FaMicrophoneSlash, FaVideo, FaVideoSlash, FaLink, FaUserPlus } from "react-icons/fa";
import { useNavigate } from "react-router-dom";


const VideoCallPreview = () => {
    const navigate = useNavigate();
  const [isMicOn, setIsMicOn] = useState(true);
  const [isVideoOn, setIsVideoOn] = useState(true);
  const [callStatus, setCallStatus] = useState("Preparándose...");
  const [showPreview, setShowPreview] = useState(true);
  const [roomLink, setRoomLink] = useState("");
  const videoRef = useRef(null);
  

  //Acceso a la cámara y micrófono
  useEffect(() => {
    if (showPreview) {
      navigator.mediaDevices
        .getUserMedia({ video: isVideoOn, audio: isMicOn })
        .then((stream) => {
          if (videoRef.current) {
            videoRef.current.srcObject = stream;
          }
        })
        .catch((error) => {
          console.error("Error al acceder a los dispositivos multimedia:", error);
        });
    }
  }, [isMicOn, isVideoOn, showPreview]);

  const generateRoomLink = () => {
    const link = `https://tu-app.com/videollamada/${Math.random().toString(36).substring(7)}`;
    setRoomLink(link);
  };

  const joinCall = () => {
    setShowPreview(false);
    setCallStatus("Conectando...");
    navigate("/Videollamada2"); // Redirige a otro archivo JSX

};

  return (
    <div className="h-screen w-screen flex items-center justify-center bg-gray-900">
      {showPreview ? (
        <div className="w-full max-w-2xl bg-gray-800 rounded-lg shadow-lg p-6">
          <h2 className="text-2xl font-semibold text-white mb-4">Preparar Videollamada</h2>

          <div className="bg-gray-700 rounded-lg overflow-hidden mb-4">
            {isVideoOn ? (
              <video ref={videoRef} autoPlay muted className="w-full h-48 object-cover" />
            ) : (
              <div className="w-full h-48 bg-gray-600 flex items-center justify-center">
                <p className="text-gray-400 font-bold">Cámara apagada</p>
              </div>
            )}
          </div>

          <div className="flex justify-center gap-4 mb-6">
            <button
              onClick={() => setIsMicOn(!isMicOn)}
              className={`p-3 rounded-full text-white ${
                isMicOn ? "bg-green-500 hover:bg-green-600" : "bg-red-500 hover:bg-red-600"
              }`}
            >
              {isMicOn ? <FaMicrophone size={20} /> : <FaMicrophoneSlash size={20} />}
            </button>
            <button
              onClick={() => setIsVideoOn(!isVideoOn)}
              className={`p-3 rounded-full text-white ${
                isVideoOn ? "bg-green-500 hover:bg-green-600" : "bg-red-500 hover:bg-red-600"
              }`}
            >
              {isVideoOn ? <FaVideo size={20} /> : <FaVideoSlash size={20} />}
            </button>
          </div>

          <div className="flex flex-col gap-4">
            <button
              onClick={generateRoomLink}
              className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center justify-center gap-2"
            >
              <FaLink size={16} />
              {roomLink ? "Copiar Enlace" : "Generar Enlace"}
            </button>
            {roomLink && (
              <input
                type="text"
                value={roomLink}
                readOnly
                className="w-full bg-gray-700 text-white px-4 py-2 rounded-lg"
                onClick={(e) => e.target.select()}
              />
            )}
            <button
              onClick={joinCall}
              className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg flex items-center justify-center gap-2"
            >
              <FaUserPlus size={16} />
              Unirse a la Videollamada
            </button>
          </div>
        </div>
      ) : (
        <div className="w-full h-full max-w-6xl bg-gray-800 rounded-lg shadow-lg overflow-hidden flex flex-col">
          <div className="bg-gray-700 text-white p-4 flex justify-between items-center">
            <h2 className="text-lg font-semibold">Videollamada en Curso</h2>
            <p className={`text-sm ${callStatus === "Conectado" ? "text-green-400" : "text-yellow-400"}`}>
              {callStatus}
            </p>
          </div>

          <div className="flex-1 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4 overflow-y-auto">
            <div className="bg-gray-900 rounded-lg shadow-md flex flex-col items-center justify-center p-4">
              {isVideoOn ? (
                <video ref={videoRef} autoPlay muted className="w-full h-48 object-cover rounded-lg" />
              ) : (
                <div className="w-full h-48 bg-gray-800 rounded-lg flex items-center justify-center">
                  <p className="text-gray-400 font-bold">Cámara apagada</p>
                </div>
              )}
              <p className="mt-2 text-white font-semibold">Tú</p>
            </div>

            <div className="bg-gray-900 rounded-lg shadow-md flex flex-col items-center justify-center p-4">
              <div className="w-full h-48 bg-gray-700 rounded-lg flex items-center justify-center">
                <p className="text-white font-bold">Video de Usuario 1</p>
              </div>
              <p className="mt-2 text-white font-semibold">Usuario 1</p>
            </div>
          </div>

          <footer className="bg-gray-700 p-4 flex justify-center gap-6">
            <button
              onClick={() => setIsMicOn(!isMicOn)}
              className={`p-3 rounded-full text-white ${
                isMicOn ? "bg-green-500 hover:bg-green-600" : "bg-red-500 hover:bg-red-600"
              }`}
            >
              {isMicOn ? <FaMicrophone size={24} /> : <FaMicrophoneSlash size={24} />}
            </button>
            <button
              onClick={() => setIsVideoOn(!isVideoOn)}
              className={`p-3 rounded-full text-white ${
                isVideoOn ? "bg-green-500 hover:bg-green-600" : "bg-red-500 hover:bg-red-600"
              }`}
            >
              {isVideoOn ? <FaVideo size={24} /> : <FaVideoSlash size={24} />}
            </button>
            <button
              className="p-3 rounded-full bg-red-600 hover:bg-red-700 text-white"
              onClick={() => setCallStatus("Finalizado")}
            >
              <FaPhoneSlash size={24} />
            </button>
          </footer>
        </div>
      )}
    </div>
  );
};

export default VideoCallPreview;