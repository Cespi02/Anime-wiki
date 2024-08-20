import React from 'react';
import { Button } from 'reactstrap';
import  '../App.css'

const ArrowBack: React.FC<{ onClick?: () => void }> = ({ onClick }) => {
  return (
    <Button color="link" className="arrow-back" onClick={onClick}>
      {/* Puedes agregar texto o íconos aquí si lo necesitas */}
    </Button>
  );
};

export default ArrowBack;