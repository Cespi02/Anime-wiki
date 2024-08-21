import { ChangeEvent, useState, useEffect } from "react"
import { appsettings } from "../settings/appsetings"
import { useNavigate } from "react-router-dom"
import { FaFacebook, FaTwitter, FaInstagram } from 'react-icons/fa';
import Swal from "sweetalert2"
import { ICliente } from "../Interfaces/ICliente"
import { Container, Row, Col, Form, FormGroup, Label, Input, Button } from "reactstrap"
import ArrowBack from './ArrowBack'; // Asegúrate de importar el componente


const initialCliente = {
    nombre:"",
    nroDoc:"",
    contrasenia:"",
    email:"",
    sueldo:0
}


export function Registro() {
    const navigate = useNavigate();
    useEffect(() => {
        // Añadir clase al body cuando el componente se monta
        document.body.classList.add('gradient-custom');
    
        // Eliminar clase al desmontar el componente
        return () => {
          document.body.classList.remove('gradient-custom');
        };
      }, []);
    const [cliente,setCliente] = useState<ICliente>(initialCliente);
    const inputChangeValue = (event : ChangeEvent<HTMLInputElement>)=> {
         const inputName = event.target.name;
         const inputValue = event.target.value;
            console.log(inputName, "+", inputValue);
         setCliente({ ...cliente, [inputName] : inputValue})     
    }
    const registrarse = async () => {
        try {
            const response = await fetch(`${appsettings.apiUrl}Cliente/Registro`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(cliente)
            });
    
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
    
            navigate("/Index");
        } catch (error) {
            console.error('Error al registrarse:', error);
            Swal.fire({
                title: "Error!",
                text: "Hubo un problema con el registro. Inténtalo de nuevo.",
                icon: "error"
            });
        }
    };
       function volverALogin(){
            navigate("/Login")
       }
    return(
        <Container className="container-sm registro">
            <ArrowBack onClick={volverALogin} />
              <Row>
                   <Col sm={{size:8, offset:2}}>
                        <h4 className="itemCentrado">Iniciar Sesión</h4>
                        <Form>
                             <FormGroup>
                                  <Label class="text-white">Nombre</Label>
                                  <Input type="text" name="nombre" onChange={inputChangeValue} value={cliente.nombre} />
                             </FormGroup>
                             <FormGroup>
                                  <Label class="text-white">Apellido</Label>
                                  <Input type="text" name="nroDoc" onChange={inputChangeValue} value={cliente.nombre} />
                             </FormGroup>
                             <FormGroup>
                                  <Label class="text-white">Correo Electrónico</Label>
                                  <Input type="text" name="email" onChange={inputChangeValue} value={cliente.email} />
                             </FormGroup>
                             <FormGroup>
                                  <Label class="text-white">Contraseña</Label>
                                  <Input type="text" name="contrasenia" onChange={inputChangeValue} value={cliente.contrasenia} />
                             </FormGroup>
                             <FormGroup className="itemCentrado">
                             <Button class="btn btn-primary"  onClick={registrarse}>Registrarse</Button>
                             </FormGroup>
                        </Form>
                   </Col>
              </Row>
        </Container>
    )
 
}
