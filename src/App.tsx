import { BrowserRouter, Route, Routes } from "react-router-dom"
import { Login } from "./components/FormularioLogin"
import { Lista } from "./components/Lista"
import { Registro } from "./components/FormularioRegistro"
import { NuevoEmpleado } from "./components/NuevoEmpleado"
import { EditarEmpleado } from "./components/EditarEmpleado"
import { Index } from "./components/Index"

function App() {


  return (
    <BrowserRouter>
      <Routes>
      <Route path="/" element={<Login />}/>
     
      <Route path="/lista" element={<Lista/>}/>
      <Route path="/nuevoempleado" element={<NuevoEmpleado/>}/>
      <Route path="/editarempleado/:id" element={<EditarEmpleado/>}/>
      <Route path="/Index" element={<Index/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App
//<Route path="/registrarse" element={<Registro />}/>