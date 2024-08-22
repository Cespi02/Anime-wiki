import { useEffect, useState } from "react";
import { appsettings } from "../settings/appsetings";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { IAnime } from "../Interfaces/IAnimes";
import { Navbar, NavbarBrand, Form, Input, Container, Row, Col, Button } from "reactstrap";
import ImageWithText from './AnimeCuadro';
import CustomNavbar from "./CustomNavbar";
import ArrowBack from './ArrowBack'; 
import ArrowNext from './ArrowNext'; 
import {jwtDecode} from "jwt-decode";


export function Index() {
    const navigate = useNavigate();
    const [animes, setAnimes] = useState<IAnime[]>([]);
    const [currentGroup, setCurrentGroup] = useState<number>(0);
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

    // Obtener el JWT desde la cookie y extraer el email
    const token = getCookieValue("authToken");
    const email = token ? getEmailFromJwt(token) : null;

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
        if (currentGroup < animeGroups.length - 1) {
            setCurrentGroup(currentGroup + 1);
        }
    };

    const handlePreviousGroup = () => {
        if (currentGroup > 0) {
            setCurrentGroup(currentGroup - 1);
        }
    };

    function registarse(){
        navigate("/registrarse")
    }

    return (
        <>
            <CustomNavbar 
                email={email || ""} // Pasar el email al CustomNavbar
                searchQuery={searchQuery} 
                onSearchChange={handleSearchChange} 
                onSearchSubmit={handleSearchSubmit} 
            />
            <Container className="container-xxl">
                <Row className="d-flex justify-content-center">
                    <h3>Anime Wiki</h3>
                    <hr></hr>
                    {animeGroups[currentGroup]?.map((anime, index) => (
                        <Col key={index} md={4} sm={4} lg={4} xs={8} className="mb-4 justify-content-center">
                            <ImageWithText imageUrl={`data:image/jpeg;base64,${anime.imagen}`} text={anime.nombre} onClick={() => navigate(`/Anime/${anime.idAnime}`)} />                          
                        </Col>
                    ))}
                    <hr></hr>
                </Row>
                <Row className="mt-3">
                    <Col className="text-left">
                        <ArrowBack onClick={handlePreviousGroup} />
                    </Col>
                    <Col className="text-right">
                        <ArrowNext onClick={handleNextGroup}/>
                    </Col>
                </Row>
            </Container>
        </>
    );
}