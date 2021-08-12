import React from 'react';
import "./Image.css";

const Image = ({src}) => {
    return <img className="image-size" src={`/images/${src}`} alt="person" />
}

export default Image;