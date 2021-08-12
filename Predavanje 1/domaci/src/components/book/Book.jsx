import React from 'react';
import Image from '../image/Image';

const Book = ({title, year, author, src, quote}) => {
    // return <div>
    //     <div>Naslov: {title}</div>
    //     <div>Godina izdavanja: {year}</div>
    //     <div>Autor: {author}</div>
    //     <div><Image src={src}/></div>
    //     <div>Quote: {quote}</div>
    // </div>

    return <tr>
        <td>{title}</td>
        <td>{year}</td>
        <td>{author}</td>
        <td><Image src={src}/></td>
        <td>{quote}</td>
    </tr>
}

export default Book;