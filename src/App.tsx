import { BrowserRouter, Route, Routes } from "react-router-dom"
import { Login } from "./components/FormularioLogin"
import { Lista } from "./components/Lista"
import { Registro } from "./components/FormularioRegistro"
import { NuevoEmpleado } from "./components/NuevoEmpleado"
import AnimeDescripcion from "./components/AnimeDescripcion";
import { Index } from "./components/Index"

function App() {


  return (
    <BrowserRouter>
      <Routes>
      <Route path="/Login" element={<Login />}/>
      <Route path="/registrarse" element={<Registro />}/>
      <Route path="/lista" element={<Lista/>}/>
      <Route path="/nuevoempleado" element={<NuevoEmpleado/>}/>
      <Route path="/Anime/:id" element={<AnimeDescripcion/>}/>
      <Route path="/Index" element={<Index/>}/>
      <Route path="/" element={<Index/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App