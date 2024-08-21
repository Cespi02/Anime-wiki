import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { appsettings } from "../settings/appsetings";
import { IAnime } from "../Interfaces/IAnimes";
import ImageWithText from './AnimeCuadro';
import Swal from "sweetalert2";
import CustomNavbar from "./CustomNavbar";
import { Container, Row, Col } from "reactstrap";

const AnimeDescripcion: React.FC = () => {
    const { id } = useParams<{ id: string }>(); // Obtiene el id de la URL
    const [anime, setAnime] = useState<IAnime | null>(null);
    const [searchQuery, setSearchQuery] = useState<string>('');

    useEffect(() => {
        const fetchAnime = async () => {
            const response = await fetch(`${appsettings.apiUrl}Anime/ObtenerAnime/${id}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (response.ok) {
                const data = await response.json();
                setAnime(data);
            } else {
                Swal.fire({
                    title: "Error!",
                    text: "Hubo un problema al obtener el anime.",
                    icon: "warning"
                });
            }
        };

        if (id) {
            fetchAnime();
        }
    }, [id]);

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(event.target.value);
    };

    const handleSearchSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        alert(`You searched for: ${searchQuery}`);
    };

    return (
        <>
            <CustomNavbar 
                searchQuery={searchQuery} 
                onSearchChange={handleSearchChange} 
                onSearchSubmit={handleSearchSubmit} 
            />
            <Container className="container-xxl descripcionAnime">
                {anime && (
                    <>
                        <Row className="desc d-flex justify-content-center">
                            <ImageWithText 
                                imageUrl={`data:image/jpeg;base64,${anime.imagen}`} 
                                onClick={() => console.log(anime.texto + " " + anime.idAnime)} 
                            />                  
                            <Col md={12} sm={12} lg={8} xs={8} className="mb-4 justify-content-center">
                                <p className='mt-4 texto-grande'>{anime.nombre}</p> 
                                <p className='mb-5 mt-4 fs-5 text-start'>{anime.texto}</p>                     
                            </Col>
                        </Row>
                        
                        {/* Nueva sección para los comentarios */}
                        <Container className="comentarios-seccion mt-5">
                            <h5>Comentarios</h5>
                            <Row>
                                <Col md={12} className="mb-3">
                                    <div className="comentario">
                                        <p className='text-black'><strong>Usuario:</strong> Este es un comentario.</p>
                                        <p className='text-black'>Contenido del comentario aquí.</p>
                                    </div>
                                </Col>
                            </Row>
                            {/* Aquí podrías mapear y mostrar los comentarios */}
                        </Container>
                    </>
                )}
            </Container>      
        </>
    );
};

export default AnimeDescripcion;