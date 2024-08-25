import React from 'react';
import { Container, Navbar, NavbarBrand, Form, Input, Button, Row, Col } from 'reactstrap';
import { CustomNavbarProps } from '../Interfaces/CustomNavbarProps';
import { FaSearch } from "react-icons/fa";
import { AUTH_TOKEN_NAME } from '../config';
import { eliminarCookie } from '../functions/utils';
import { RiAccountCircleFill } from "react-icons/ri";

const CustomNavbar: React.FC<CustomNavbarProps> = ({ username, searchQuery, onSearchChange, onSearchSubmit }) => {
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
        <Navbar expand="md">
            <Container>
                <Row className="w-100">
                    <Col className="d-flex justify-content-center">
                        <NavbarBrand className="titulo ff-marko-one" href="/">Anime Discussion</NavbarBrand>
                    </Col>
                </Row>
                <Row className="w-100">
                    <Col className="d-flex justify-content-start align-items-center">
                        <Form inline onSubmit={onSearchSubmit} className=" d-flex me-3">
                            <Button className='br-0-5 b-c-lb text-dark ' type="submit" color="primary"><FaSearch /></Button>
                            <Input
                                type="search"
                                placeholder="Buscar..."
                                className="ms-2 br-1-5"
                                value={searchQuery}
                                onChange={onSearchChange}
                            />              
                        </Form>
                    </Col>
                    <Col md={3} lg={2} sm={4} className="d-flex justify-content-end align-items-center">
                        {username === "" ? (
                            <>
                            <NavbarBrand className='b-c-lb px-5 text-dark br-1-5' href="/Login">Iniciar Sesión</NavbarBrand>
                            <Button className='br-2-5 b-c-lb icon text-dark inicio-sesion' type="submit" color="primary"><RiAccountCircleFill /></Button>
                            </>
                        ) : (
                            <NavbarBrand>
                                <div className="dropdown">
                                    <button className="btn btn-secondary dropdown-usuario dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                        {username}
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