import React from 'react';
import { Container, Navbar, NavbarBrand, Form, Input, Button } from 'reactstrap';
import { CustomNavbarProps } from '../Interfaces/CustomNavbarProps';
import { FaSearch } from "react-icons/fa";

const CustomNavbar: React.FC<CustomNavbarProps> = ({ email, searchQuery, onSearchChange, onSearchSubmit }) => {
    return (
        <Navbar color="dark" dark expand="md">
            <Container>
                <NavbarBrand className='titulo' href="/">Anime Wiki</NavbarBrand>
                <div className="d-flex align-items-center">
                    <Form inline onSubmit={onSearchSubmit} className="d-flex ms-auto">
                        <Input
                            type="search"
                            placeholder="Buscar..."
                            className="mr-sm-2"
                            value={searchQuery}
                            onChange={onSearchChange}
                        />
                        <Button   type="submit" color="primary"><FaSearch /></Button>
                    </Form>
                    {email === "" ? (
                        <NavbarBrand href="/Login">Iniciar Sesión</NavbarBrand>
                    ) : (
                        <NavbarBrand>
                            <div className="dropdown">
                                <button className="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    {email}
                                </button>
                                <ul className="dropdown-menu dropdown-menu-dark">
                                    <li><a className="dropdown-item" href="#">Cerrar sesión</a></li>
                                    <li><a className="dropdown-item" href="#">Cambiar contraseña</a></li>
                                </ul>
                            </div>
                        </NavbarBrand>
                    )}
                </div>
            </Container>
        </Navbar>
    );
};

export default CustomNavbar;