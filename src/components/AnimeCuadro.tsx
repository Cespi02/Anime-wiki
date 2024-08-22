import React from 'react';
import { ImageWithTextProps } from "../Interfaces/IImageWithTextProps"

const ImageWithText: React.FC<ImageWithTextProps> = ({ imageUrl, text, onClick }) => {
    return (
        <div className="image-container" onClick={onClick}>
            <img src={imageUrl} alt="Clickable" className="image animated-image" />
            {text && ( 
                <div className="overlay">
                    <p className="text">{text}</p>
                </div>
            )}
        </div>
    );
};

export default ImageWithText;