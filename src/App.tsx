import { BrowserRouter, Route, Routes } from "react-router-dom"
import { Login } from "./components/FormularioLogin"
import { Registro } from "./components/FormularioRegistro"
import AnimeDescripcion from "./components/AnimeDescripcion";
import { Index } from "./components/Index"
import { CambiarContra } from "./components/FormularioContraseña";

function App() {
  return (
    <BrowserRouter>
      <Routes>
      <Route path="/Login" element={<Login />}/>
      <Route path="/registrarse" element={<Registro />}/>
      <Route path="/Anime/:id" element={<AnimeDescripcion/>}/>
      <Route path="/Index" element={<Index/>}/>
      <Route path="/CambiarContraseña" element={<CambiarContra/>}/>
      <Route path="/" element={<Index/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App