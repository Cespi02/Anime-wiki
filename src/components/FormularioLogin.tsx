import { ChangeEvent, useState, useEffect } from "react"
import { appsettings } from "../settings/appsetings"
import { Link, useNavigate } from "react-router-dom"
import { FaFacebook, FaTwitter, FaInstagram } from 'react-icons/fa';
import   Swal  from "sweetalert2"
import { ICliente } from "../Interfaces/ICliente"
import { Container, Row, Col, Form, FormGroup, Label, Input, Button } from "reactstrap"


const initialCliente = {
    nombre:"",
    nroDoc:"",
    contrasenia:"",
    email:"",
    sueldo:0
}


export function Login() {
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
        const logear = async () =>{
            const response = await fetch(`${appsettings.apiUrl}Cliente/Login`,{
                 method: 'POST',
                 headers:{
                      'Content-Type': 'application/json'
                 },
                 body: JSON.stringify(cliente)
            })
            if(response.ok){
                 navigate("/Index")
            }else{
                 Swal.fire({
                      title: "Error!",
                      text: "Contraseña o correo incorrecta",
                      icon: "warning"
                    });
            }
       }
        function registarse(){
            navigate("/registrarse")
        }
    return(
        <Container className="container-sm">
              <Row className="justify-content-center">
                   <Col sm={{size:6, offset:0}}>
                        <h4 className="itemCentrado">Iniciar Sesión</h4>
                        <Form>
                             <FormGroup>
                                  <Label class="text-white">Correo Electrónico</Label>
                                  <Input type="text" name="nombre" onChange={inputChangeValue} value={cliente.email} />
                             </FormGroup>
                             <FormGroup>
                                  <Label class="text-white">Contraseña</Label>
                                  <Input type="text" name="nroDoc" onChange={inputChangeValue} value={cliente.nroDoc} />
                             </FormGroup>
                             <FormGroup className="itemCentrado">
                             <Button type="button" class="btn btn-primary" onClick={logear}>Iniciar Sesión</Button>
                             </FormGroup>
                             <FormGroup className="itemCentrado">
                             <Link to="/" className="link-muted">¿Olvidaste tu contraseña?</Link>
                             </FormGroup>
                             <FormGroup className="itemCentrado">
                             <Button class="btn btn-primary"  onClick={registarse}>Registrarse</Button>
                             </FormGroup>
                        </Form>
                   </Col>
              </Row>
        </Container>
    )
} 
