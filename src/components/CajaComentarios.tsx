import React, { ChangeEvent, useEffect, useState } from 'react';
import { Container, Row, Col, Input, Form, Button } from "reactstrap";
import Swal from "sweetalert2";
import { IoSend } from "react-icons/io5";
import { FcLike } from "react-icons/fc";
import { MdOutlineQuestionAnswer } from "react-icons/md";
import { appsettings } from '../settings/appsetings';
import { ComentariosProps } from '../Interfaces/ComentariosProps';
import { IComentario } from '../Interfaces/IComentarios';
import { getUserFromJwt, getCookie } from '../functions/utils';
import { AUTH_TOKEN_NAME } from '../config';

const CajaComentarios: React.FC<ComentariosProps> = ({ idAnime }) => {
    const [comentarios, setComentarios] = useState<IComentario[]>([]);
    const [nuevosComentarios, setNuevosComentarios] = useState<{ Contenido: string }>({ Contenido: '' });

    useEffect(() => {
        const fetchComentarios = async () => {
            const response = await fetch(`${appsettings.apiUrl}Comentario/ObtenerComentarios/${idAnime}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (response.ok) {
                const data = await response.json();
                setComentarios(data);
            } else {
                console.log("No hay comentarios");
            }
        };

        fetchComentarios();
    }, [idAnime]);

    const inputChangeValue = (event: ChangeEvent<HTMLInputElement>) => {
        const inputValue = event.target.value;
        setNuevosComentarios({ Contenido: inputValue });
    };

    const publicarComentario = async (): Promise<void> => {
        const token = getCookie(AUTH_TOKEN_NAME);

        if (!token) {
            Swal.fire({
                title: "Error!",
                text: "Debe iniciar sesión para comentar",
                icon: "warning"
            });
            return;
        }

        const id = getUserFromJwt(token);

        if (!id) {
            Swal.fire({
                title: "Error!",
                text: "No se pudo obtener el ID del usuario",
                icon: "warning"
            });
            return;
        }

        const response = await fetch(`${appsettings.apiUrl}Comentario/NuevoComentario/IdAnime=${idAnime}&IdUsuario=${id}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(nuevosComentarios)
        });

        if (response.ok) {
            await response.json();
        
            // Realizar una nueva llamada fetch para obtener la lista actualizada
            const responseComentarios = await fetch(`${appsettings.apiUrl}Comentario/ObtenerComentarios/${idAnime}`, {
              method: 'GET',
              headers: {
                'Content-Type': 'application/json',
              },
            });
        
            if (responseComentarios.ok) {
              const comentariosActualizados = await responseComentarios.json();
              setComentarios(comentariosActualizados);
            } else {
              console.log("Error al obtener comentarios actualizados");
            }
        
            // Limpia el campo de entrada
            setNuevosComentarios({ Contenido: '' });
          } else {
            // ... código existente para manejar el error ...
          }
    };

    return (
        <Container className="comentarios-seccion mt-5">
            <h5>Comentarios</h5>
            <Row>
                <Form>
                    <Col md={12} className="mb-3">
                        <div className="input-group">
                            <Input
                                name="Contenido"
                                onChange={inputChangeValue}
                                placeholder='Realiza un comentario...'
                                value={nuevosComentarios.Contenido}
                            />
                            <Button className="btn" onClick={publicarComentario}>
                                <IoSend />
                            </Button>
                        </div>
                    </Col>
                </Form>
                <Col md={12} className="mb-3">
                    {comentarios.length > 0 ? (
                        comentarios.map((comentario) => (
                            <div className="text-start comentario" key={comentario.idComentario}>
                                <div className="d-flex justify-content-between align-items-center">
                                    <div>
                                        <strong>{comentario.username}</strong>
                                        <span className="ms-1 fuente-hora">{comentario.fecha}</span>
                                    </div>
                                </div>
                                <p>{comentario.contenido}</p>
                                <Button><FcLike /></Button>
                                <Button className='ms-1'><MdOutlineQuestionAnswer /> Responder</Button>
                            </div>
                        ))
                    ) : (
                        <p>No hay comentarios aún. ¡Sé el primero en comentar!</p>
                    )}
                </Col>
            </Row>
        </Container>
    );
}

export default CajaComentarios;