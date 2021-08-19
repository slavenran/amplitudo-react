import React from 'react';

//props
// {name, surname, city}

const IdCard = ({name, surname, city="Podgorica", image, 
    childElement: ChildElement, onClick}) => {
    const parentName = "Slaven";
    return <div>
        <div>Ime: {name}</div>
        <div>Prezime: {surname}</div>
        <div>Grad: {city}</div>
        {/* <div>Slika: {image}</div>
        <div><ChildElement parentName={parentName}/></div> */}
        <button onClick={() => onClick && onClick()}>Click me</button>
    </div>
}

export default IdCard;