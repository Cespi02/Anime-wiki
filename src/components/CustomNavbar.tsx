import React from 'react';
import { Container, Navbar, NavbarBrand, Form, Input, Button } from 'reactstrap';
import { CustomNavbarProps } from '../Interfaces/CustomNavbarProps';

const CustomNavbar: React.FC<CustomNavbarProps> = ({ searchQuery, onSearchChange, onSearchSubmit }) => {
    return (
        <Navbar color="dark" dark expand="md">
            <Container>
                <NavbarBrand href="/">Anime Wiki</NavbarBrand>
                <NavbarBrand href="/Login">Iniciar Sesión</NavbarBrand>
                <Form inline onSubmit={onSearchSubmit} className="d-flex">
                    <Input
                        type="search"
                        placeholder="Buscar..."
                        className="mr-sm-2"
                        value={searchQuery}
                        onChange={onSearchChange}
                    />
                    <Button type="submit" color="primary">Buscar</Button>
                </Form>
            </Container>
        </Navbar>
    );
};

export default CustomNavbar;