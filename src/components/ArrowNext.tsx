import React from 'react';
import { Button } from 'reactstrap';
import  '../App.css'

const ArrowNext: React.FC<{ onClick?: () => void }> = ({ onClick }) => {
  return (
    <Button color="link" className="arrow-next" onClick={onClick}>
    </Button>
  );
};

export default ArrowNext;