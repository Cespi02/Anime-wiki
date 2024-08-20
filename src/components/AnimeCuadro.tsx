import React from 'react';

interface ImageWithTextProps {
    imageUrl: string;
    text: string;
    onClick: () => void;
}

const ImageWithText: React.FC<ImageWithTextProps> = ({ imageUrl, text, onClick }) => {
    return (
        <div className="image-container" onClick={onClick}>
            <img src={imageUrl} alt="Clickable" className="image" />
            <div className="overlay">
                <p className="text">{text}</p>
            </div>
        </div>
    );
};

export default ImageWithText;