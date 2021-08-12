import React from 'react';
import Image from '../image/Image';

const Movie = ({title, year, genre, director, actors, src}) => {
    // return <div>
    //     <div>Naziv: {title}</div>
    //     <div>Godina: {year}</div>
    //     <div>Zanr: {genre}</div>
    //     <div>Reziser: {director}</div>
    //     <div>Glumci: {actors}</div>
    //     <div><Image src={src}/></div>
    // </div>

    return <tr>
        <td>{title}</td>
        <td>{year}</td>
        <td>{genre}</td>
        <td>{director}</td>
        <td>{actors}</td>
        <td><Image src={src}/></td>
    </tr>
}

export default Movie;