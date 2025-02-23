import { Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import Chat from "./pages/Chat";
import Videollamada from "./pages/Videollamada";
import Tareas from "./pages/Tareas";
import Recompensas from "./pages/Recompensas";
import Perfil from "./pages/Perfil";
import Usuarios from "./pages/Usuarios";
import Videollamada2 from "./pages/Videollamada2";
import ChatGrupal from "./pages/Chatgrupal";
import Login from "./pages/Login";


function App() {
  return (
      <div className="h-screen w-screen p-4">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/chat" element={<Chat />} />
          <Route path="/videollamada" element={<Videollamada />} />
          <Route path="/tareas" element={<Tareas />} />
          <Route path="/recompensas" element={<Recompensas />} />
          <Route path="/perfil" element={<Perfil />} />
          <Route path="/usuarios" element={<Usuarios />} />
          <Route path="/videollamada2" element={<Videollamada2 />} />
          <Route path="/chatgrupal" element={<ChatGrupal />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </div>

  );
}

export default App;
