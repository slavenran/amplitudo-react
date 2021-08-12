import React from 'react';
import MyImage from '../myImage/MyImage';

//props
// {name, surname, city}

const IdCard = ({name, surname, city="Podgorica", src}) => {
    return <div>
        <div>Ime: {name}</div>
        <div>Prezime: {surname}</div>
        <div>Grad: {city}</div>
        <div>Slika: <MyImage src={src}/></div>
    </div>
}

export default IdCard;