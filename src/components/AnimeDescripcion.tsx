import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { IAnime } from "../Interfaces/IAnimes";
import ImageWithText from './AnimeCuadro';
import Swal from "sweetalert2";
import CustomNavbar from "./CustomNavbar";
import { Container, Row, Col } from "reactstrap";
import { getUserNameFromJwt } from '../functions/utils';
import CajaComentarios  from "./CajaComentarios"


const AnimeDescripcion: React.FC = () => {
    const { id } = useParams<{ id: string }>(); // Obtiene el id de la URL
    const [anime, setAnime] = useState<IAnime | null>(null);
    const [searchQuery, setSearchQuery] = useState<string>('');
   // const [buscoAnime, setBuscoAnime] = useState<boolean>(false);
    const [animes, setAnimes] = useState<IAnime[]>([]);
   //const [currentGroup, setCurrentGroup] = useState<number>(0);
    const navigate = useNavigate();

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


    const token = getCookieValue("authToken");
    const username = token ? getUserNameFromJwt(token) : null;
    console.log("el nombre es: ", username)


    useEffect(() => {
        const fetchAnime = async () => {
            const response = await fetch(`${import.meta.env.VITE_BASE_URL}Anime/ObtenerAnime/${id}`, {
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
        fetchAnimesNombre(); 
        const animeIds = animes.map(anime => anime.idAnime);

        const searchParams = new URLSearchParams({
            buscar: 'true',
            grupos: '0',
            animes: JSON.stringify(animeIds),
          });
      
        navigate(`/Index?${searchParams.toString()}`);
    };

    const fetchAnimesNombre = async () => {
        try {
            const response = await fetch(`${import.meta.env.VITE_BASE_URL}Anime/ObtenerAnimesConNombre/${searchQuery}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            //setBuscoAnime(true); // Detiene la animación
            if (response.ok) {
                const data = await response.json();
               // setCurrentGroup(0);
                setAnimes(data);
            } else {
                Swal.fire({
                    title: "Error!",
                    text: "Hubo un problema al obtener los animes.",
                    icon: "warning"
                });
            }
        } catch (error) {
            console.error("Error fetching animes:", error);
            Swal.fire({
                title: "Error!",
                text: "Hubo un problema al conectarse con el servidor.",
                icon: "error"
            });
        }
    };
    return (
        <>
            <CustomNavbar 
                username={username || ""}
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