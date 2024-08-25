import { useEffect, useState } from "react";
import { appsettings } from "../settings/appsetings";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { IAnime } from "../Interfaces/IAnimes";
import { Container, Row, Col, Button } from "reactstrap";
import ImageWithText from './AnimeCuadro';
import CustomNavbar from "./CustomNavbar";
import { getEmailFromJwt, getUserNameFromJwt } from '../functions/utils'
import { AUTH_TOKEN_NAME } from "../config";
import { FaLinkedin, FaGithub, FaChevronLeft, FaChevronRight } from 'react-icons/fa';

export function Index() {
    const navigate = useNavigate();
    const [animes, setAnimes] = useState<IAnime[]>([]);
    const [currentGroup, setCurrentGroup] = useState<number>(0);
    const [searchQuery, setSearchQuery] = useState<string>('');
    const [transitioning, setTransitioning] = useState<boolean>(false);

    
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


    // Obtener el JWT desde la cookie y extraer el email
    const token = getCookieValue(AUTH_TOKEN_NAME);
    const email = token ? getEmailFromJwt(token) : null;
    const username = token ? getUserNameFromJwt(token) : null;

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

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(event.target.value);
    };

    const handleSearchSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        alert(`You searched for: ${searchQuery}`);
    };

    const groupAnimes = (animes: IAnime[]) => {
        const groupedAnimes = [];
        for (let i = 0; i < animes.length; i += 6) {
            groupedAnimes.push(animes.slice(i, i + 6));
        }
        return groupedAnimes;
    };

    const animeGroups = groupAnimes(animes);

    const handleNextGroup = () => {
        if (!transitioning) {
            setTransitioning(true);
            setTimeout(() => {
                setCurrentGroup(prevGroup => 
                    prevGroup < animeGroups.length - 1 ? prevGroup + 1 : 0
                );
                setTimeout(() => setTransitioning(false), 500); // Asegurar que la transición se complete
            }, 500); // Duración de la animación en ms
        }
    };
    
    const handlePreviousGroup = () => {
        if (!transitioning) {
            setTransitioning(true);
            setTimeout(() => {
                setCurrentGroup(prevGroup => 
                    prevGroup > 0 ? prevGroup - 1 : animeGroups.length - 1
                );
                setTimeout(() => setTransitioning(false), 500); // Asegurar que la transición se complete
            }, 500); // Duración de la animación en ms
        }
    };

    useEffect(() => {
        const interval = setInterval(() => {
            setTransitioning(true);
            setTimeout(() => {
                setCurrentGroup(prevGroup => 
                    prevGroup < animeGroups.length - 1 ? prevGroup + 1 : 0
                );
                setTransitioning(false);
            }, 500); 
        }, 10000); 
    
        return () => clearInterval(interval); 
    }, [animeGroups.length]);

    return (
        <>
            <CustomNavbar 
                username={username || ""}
                searchQuery={searchQuery} 
                onSearchChange={handleSearchChange} 
                onSearchSubmit={handleSearchSubmit} 
            />
            <Container className="container-xxl position-relative">
                <Row className="d-flex justify-content-center">
                    <h3 className="ff-marko-one">Bienvenido a </h3>
                    <h3 className="texto-grande">Anime Discussion</h3>
                    <h4 className="">Una pagina especialmente para lorem ipsum dolor sit amet consectetur adipiscing elit suspendisse est, vulputate nibh egestas cursus semper quisque orci molestie. Velit penatibus int eger nostra sapien nisi ridiculus fames tristique montes, eget quisque urna massa potenti luctus suspendisse maecenas semper </h4>
                    <div className={`image-group align items-center ${transitioning ? 'transitioning' : ''}`}>
                        {animeGroups[currentGroup]?.map((anime, index) => (
                            <Col key={index} md={4} sm={4} lg={4} xs={8} className="mb-4 justify-content-center">
                                <ImageWithText imageUrl={`data:image/jpeg;base64,${anime.imagen}`} text={anime.nombre} onClick={() => navigate(`/Anime/${anime.idAnime}`)} />                        
                            </Col>
                        ))}
                        <div className="arrow-buttons">
                            <button className="arrow-btn" onClick={handlePreviousGroup}>
                                <FaChevronLeft />
                            </button>
                            <button className="arrow-btn" onClick={handleNextGroup}>
                                <FaChevronRight />
                            </button>
                        </div>
                    </div>
                </Row>
            </Container>
            <Container className="pt-3 container-fluid d-flex justify-content-center">
                <Row>
                    <Col md={12} xs={12}>
                        <h6 className="text-muted ms-3">made by yo</h6>
                    </Col>
                </Row>
                <Row>
                    <Col md={4} xs={4}>
                        <Button href="https://www.linkedin.com/in/luciano-thomas-céspedes/" className="ms-3"><FaLinkedin /></Button>
                    </Col>
                    <Col md={4} xs={4}>
                        <Button href="https://github.com/Cespi02" className="ms-3"><FaGithub /></Button>
                    </Col>
                </Row>
                <Row>
                    <Col md={12} xs={12}>
                        <h5 className="text-muted">Tecnologias utilizadas:</h5>
                    </Col>
                </Row>
            </Container>
            <Container className="py-3 container-fluid d-flex justify-content-center">
                <Row>
                    <Col xs={12}>
                        <h6 className="text-muted"> ASP.NET C#, Microsoft EntityFramework, React.js, Typescript, vite.js </h6>
                    </Col>
                </Row>
            </Container>
        </>
    );
}
