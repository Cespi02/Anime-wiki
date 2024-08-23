import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { appsettings } from "../settings/appsetings";
import { IAnime } from "../Interfaces/IAnimes";
import ImageWithText from './AnimeCuadro';
import Swal from "sweetalert2";
import CustomNavbar from "./CustomNavbar";
import { Container, Row, Col } from "reactstrap";
import {jwtDecode} from "jwt-decode";
import CajaComentarios  from "./CajaComentarios"


const AnimeDescripcion: React.FC = () => {
    const { id } = useParams<{ id: string }>(); // Obtiene el id de la URL
    const [anime, setAnime] = useState<IAnime | null>(null);
    const [searchQuery, setSearchQuery] = useState<string>('');

    function getCookieValue(name: string): string | null {
        const cookieArr = document.cookie.split(";");

        for (let i = 0; i < cookieArr.length; i++) {
            const cookiePair = cookieArr[i].split("=");

            if (name === cookiePair[0].trim()) {
                console.log("valor de la cookie "+decodeURIComponent(cookiePair[1]))
                return decodeURIComponent(cookiePair[1]);
            }
        }
        return null;
    }

    interface JwtPayload {
        email: string;
    }

    function getEmailFromJwt(token: string): string | null {
        try {
            const decoded: any = jwtDecode<JwtPayload>(token);
            // Acceder al correo electrónico usando el URI correcto
            const email = decoded["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress"];
            console.log("Email:", email);
            return email || null;
        } catch (error) {
            console.error("Invalid token", error);
            return null;
        }
    }
    const token = getCookieValue("authToken");
    const email = token ? getEmailFromJwt(token) : null;



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
                email={email || ""}
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
                        <CajaComentarios idAnime={Number(id)}>
                        </CajaComentarios>
                    </>
                )}
            </Container>      
        </>
    );
};

export default AnimeDescripcion;