import React from 'react';
import { Container, Navbar, NavbarBrand, Form, Input, Button, Row, Col } from 'reactstrap';
import { CustomNavbarProps } from '../Interfaces/CustomNavbarProps';
import { FaSearch } from "react-icons/fa";
import { AUTH_TOKEN_NAME } from '../config';
import { eliminarCookie } from '../functions/utils';

const CustomNavbar: React.FC<CustomNavbarProps> = ({ email, searchQuery, onSearchChange, onSearchSubmit }) => {
    const boton: HTMLElement | null = document.getElementById('cerrarSesion');
    if (boton) {
        boton.addEventListener('click', (event: Event) => {
            event.preventDefault();
            eliminarCookie(AUTH_TOKEN_NAME)
            location.reload();
        });
    } else {
        console.error('No se encontró el enlace de cierre de sesión');
    }
    return (
        <Navbar color="dark" dark expand="md">
            <Container>
                <Row className="w-100">
                    <Col className="d-flex justify-content-center">
                        <NavbarBrand className="titulo" href="/">Anime Wiki</NavbarBrand>
                    </Col>
                </Row>
                <Row className="w-100">
                    <Col className="d-flex justify-content-end align-items-center">
                        <Form inline onSubmit={onSearchSubmit} className="d-flex me-3">
                            <Input
                                type="search"
                                placeholder="Buscar..."
                                className="mr-sm-2"
                                value={searchQuery}
                                onChange={onSearchChange}
                            />
                            <Button type="submit" color="primary"><FaSearch /></Button>
                        </Form>
                    </Col>
                    <Col md={3} lg={2} sm={4} className="d-flex justify-content-end align-items-center">
                        {email === "" ? (
                            <NavbarBrand href="/Login">Iniciar Sesión</NavbarBrand>
                        ) : (
                            <NavbarBrand>
                                <div className="dropdown">
                                    <button className="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                        {email}
                                    </button>
                                    <ul className="dropdown-menu dropdown-menu-dark">
                                        <li><a id='cerrarSesion' className="dropdown-item" >Cerrar sesión</a></li>
                                        <li><a className="dropdown-item" href="/CambiarContraseña">Cambiar contraseña</a></li>
                                    </ul>
                                </div>
                            </NavbarBrand>
                        )}
                    </Col>
                </Row>
            </Container>
        </Navbar>
    );
};

export default CustomNavbar;