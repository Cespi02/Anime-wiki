import { useEffect, useState } from "react"
import { appsettings } from "../settings/appsetings"
import { Link, useNavigate } from "react-router-dom"
import Swal from "sweetalert2"
import { IEmpleado } from "../Interfaces/IEmpleado"
import { Navbar, NavbarBrand, Nav, NavItem, NavLink, Form, Input, Container, Row, Col, Table, Button } from "reactstrap"
import ImageWithText from './AnimeCuadro';


export function Index() {
    const navigate = useNavigate();
    useEffect(() => {
        // Añadir clase al body cuando el componente se monta
        document.body.classList.add('index-custom');

        // Eliminar clase al desmontar el componente
        return () => {
          document.body.classList.remove('index-custom');
        };
      }, []);
      const handleClick = () => {
        alert('Image clicked!');
    }
    const [searchQuery, setSearchQuery] = useState<string>('');

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(event.target.value);
    };

    const handleSearchSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        alert(`You searched for: ${searchQuery}`);
        // Aquí puedes manejar la búsqueda, como redirigir a otra página o filtrar resultados
    };
     return (<>
        <Navbar color="dark" dark expand="md">
        <Container>
            <NavbarBrand href="/">Anime Wiki</NavbarBrand>

            <Form inline onSubmit={handleSearchSubmit} className="d-flex">
                <Input
                    type="search"
                    placeholder="Buscar..."
                    className="mr-sm-2"
                    value={searchQuery}
                    onChange={handleSearchChange}
                />
                <Button type="submit" color="primary">Buscar</Button>
            </Form>
        </Container>
    </Navbar>
          <Container className="container-xxl">
               <Row className="row">
                    <h4>Anime Wiki</h4>
                    <Col sm={{ size: 4, offset: 0 }} xs={{ size: 6 }}>
                    <ImageWithText imageUrl="https://via.placeholder.com/300x200" text="Anime 1" onClick={handleClick}/>
                    </Col>
                    <Col sm={{ size: 4, offset: 0 }} xs={{ size: 6 }}>
                    <ImageWithText imageUrl="https://via.placeholder.com/300x200" text="Anime 4" onClick={handleClick}/>
                    </Col>
                    <Col sm={{ size: 4, offset: 0 }} xs={{ size: 6 }}>
                    <ImageWithText imageUrl="https://via.placeholder.com/300x200" text="Anime 7" onClick={handleClick}/>
                    </Col>
                    <Col sm={{ size: 4, offset: 0 }} xs={{ size: 6 }}>
                    <ImageWithText imageUrl="https://via.placeholder.com/300x200" text="Anime 7" onClick={handleClick}/>
                    </Col>
                    <Col sm={{ size: 4, offset: 0 }} xs={{ size: 6 }}>
                    <ImageWithText imageUrl="https://via.placeholder.com/300x200" text="Anime 7" onClick={handleClick}/>
                    </Col>
                    <Col sm={{ size: 4, offset: 0 }} xs={{ size: 6 }}>
                    <ImageWithText imageUrl="https://via.placeholder.com/300x200" text="Anime 7" onClick={handleClick}/>
                    </Col>
                    <Col sm={{ size: 4, offset: 0 }} xs={{ size: 6 }}>
                    <ImageWithText imageUrl="https://via.placeholder.com/300x200" text="Anime 7" onClick={handleClick}/>
                    </Col>
                    <Col sm={{ size: 4, offset: 0 }} xs={{ size: 6 }}>
                    <ImageWithText imageUrl="https://via.placeholder.com/300x200" text="Anime 7" onClick={handleClick}/>
                    </Col>
                    <Col sm={{ size: 4, offset: 0 }} xs={{ size: 6 }}>
                    <ImageWithText imageUrl="https://via.placeholder.com/300x200" text="Anime 7" onClick={handleClick}/>
                    </Col>
               </Row>
          </Container>
          </>
     )
}