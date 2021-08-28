import React from 'react';

const DetailsBottom = ({ style, fileData }) => {
    return <div className={style.infoStyle}>
        <div>Naziv dokumenta</div>
        <p>{fileData?.name}</p>
        <div>Djelovodni broj</div>
        <p>{fileData?.effectiveNumber}</p>
        <div>Opis dokumenta</div>
        <p>{fileData?.description}</p>
        <div>Subjekt</div>
        <p>{fileData?.subject}</p>
        <div>Oznaka dokumenta</div>
        <p>{fileData?.documentSign}</p>
        <div>Nacin prijema</div>
        <p>{fileData?.receptionMode}</p>
    </div>
}

export default DetailsBottom;