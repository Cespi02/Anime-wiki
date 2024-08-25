import { ChangeEvent } from 'react';
    
    export interface IComentarioFormProps {
        inputChangeValue: (e: ChangeEvent<HTMLInputElement>) => void;
        nuevosComentarios: { Contenido: string };
        publicarComentario: () => void;
    }