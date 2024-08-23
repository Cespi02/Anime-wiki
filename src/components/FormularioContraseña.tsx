import { ChangeEvent, useState, useEffect } from "react"
import { appsettings } from "../settings/appsetings"
import { useNavigate } from "react-router-dom"
import Swal from "sweetalert2"
import { ICliente } from "../Interfaces/ICliente"
import { Container, Row, Col, Form, FormGroup, Label, Input, Button } from "reactstrap"
import ArrowBack from './ArrowBack';
import { AUTH_TOKEN_NAME } from "../config"
import { getUserFromJwt, getCookie } from "../functions/utils"


const initialCliente = {
    nombre:"",
    apellido:"",
    nroDoc:"",
    contrasenia:"",
    email:""
}


export function CambiarContra() {
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
         setCliente({ ...cliente, [inputName] : inputValue})     
    }
    const cambiarContrasenia = async (): Promise<void> => {
        const token = getCookie(AUTH_TOKEN_NAME);
        if (!token) {
            Swal.fire({
                title: "Error!",
                text: "Debe iniciar sesión para cambiar contraseña",
                icon: "warning"
            });
            return;
        }
        const idUsuario = getUserFromJwt(token);     
        try {
            const response = await fetch(`${appsettings.apiUrl}Cliente/CambiarContra/${idUsuario}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(cliente)
            });    
            if (!response.ok) {
                throw new Error('Respuesta del servidor fallida');
            }  
            navigate("/Index");
        } catch (error) {
            console.error('Error al registrarse:', error);
            Swal.fire({
                title: "Error!",
                text: "Hubo un problema con el cambio de contraseña. Inténtalo de nuevo.",
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
                                  <Label class="text-white">Contraseña</Label>
                                  <Input type="password" name="contrasenia" onChange={inputChangeValue} value={cliente.contrasenia} />
                             </FormGroup>
                             <FormGroup className="itemCentrado">
                             <Button class="btn btn-primary"  onClick={cambiarContrasenia}>Aceptar</Button>
                             </FormGroup>
                        </Form>
                   </Col>
              </Row>
        </Container>
    )
}
