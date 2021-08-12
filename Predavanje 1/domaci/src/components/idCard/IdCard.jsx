import React from 'react';
import Image from '../image/Image';

const IdCard = ({name, surname, birthDate, city, src}) => {
    // return <div>
    //     <div>Ime i prezime: {name} {surname}</div>
    //     <div>Datum rodjenja: {birthDate}</div>
    //     <div>Grad: {city}</div>
    //     <div><Image src={src} /></div>
    // </div>

    return <tr>
        <td>{name} {surname}</td>
        <td>{birthDate}</td>
        <td>{city}</td>
        <td><Image src={src}/></td>
    </tr>
}

export default IdCard;