import { useEffect, useState } from "react";
import { appsettings } from "../settings/appsetings";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { IAnime } from "../Interfaces/IAnimes";
import { Navbar, NavbarBrand, Form, Input, Container, Row, Col, Button } from "reactstrap";
import ImageWithText from './AnimeCuadro';
import ArrowBack from './ArrowBack'; 
import ArrowNext from './ArrowNext'; 

export function Index() {
    const navigate = useNavigate();
    const [animes, setAnimes] = useState<IAnime[]>([]);
    const [currentGroup, setCurrentGroup] = useState<number>(0);
    const [searchQuery, setSearchQuery] = useState<string>('');

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

    // Divide los animes en grupos de 9
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

    return (
        <>
            <Navbar color="dark" dark expand="md">
                <Container>
                    <NavbarBrand href="/">Anime Wiki</NavbarBrand>
                    <Form inline onSubmit={handleSearchSubmit} className="d-flex">
                        <Input
                            type="search"
                            placeholder="Buscar..."
                            className="mr-sm-2"
                            value={searchQuery}
                            onChange={handleSearchChange}
                        />
                        <Button type="submit" color="primary">Buscar</Button>
                    </Form>
                </Container>
            </Navbar>
            <Container className="container-xxl">
                    
                <Row className="d-flex justify-content-center">
                <h4>Anime Wiki</h4>
                <hr></hr>
                    {animeGroups[currentGroup]?.map((anime, index) => (
                        <Col key={index} md={4} sm={4} lg={4} xs={6} className="mb-4 justify-content-center">
                            <ImageWithText imageUrl={`data:image/jpeg;base64,${anime.imagen}`} text={anime.nombre} onClick={() => console.log(anime.texto + " " + anime.idAnime)} />                          
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