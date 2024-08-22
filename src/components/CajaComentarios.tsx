import React from 'react';
import { useEffect, useState } from "react";
import { appsettings } from '../settings/appsetings';
import { Container, Row, Col } from "reactstrap";
import { ComentariosProps } from '../Interfaces/ComentariosProps';

const CajaComentarios: React.FC<ComentariosProps> = ({idAnime, idCliente, contenido}) => {

    useEffect(() => {
        const fetchAnimes = async () => {
            const response = await fetch(`${appsettings.apiUrl}Anime/ObtenerAnimes`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (response.ok) {
                const data = await response.json();
                setAnimes(data);
            } else {
                Swal.fire({
                    title: "Error!",
                    text: "Hubo un problema al obtener los animes.",
                    icon: "warning"
                });
            }
        };

        fetchAnimes();
    }, []);

    function obtenerComentarios(id_anime) {

    }

    return <Container className="comentarios-seccion mt-5">
    <h5>Comentarios</h5>
    <Row>
        <Col md={12} className="mb-3">
            <div className="comentario">
                <p className='text-black'><strong>Usuario:</strong> {idCliente}</p>
                <p className='text-black'>{contenido}.</p>
            </div>
        </Col>
    </Row>
    {/* Aquí podrías mapear y mostrar los comentarios */}
</Container>    
}
export default CajaComentarios;