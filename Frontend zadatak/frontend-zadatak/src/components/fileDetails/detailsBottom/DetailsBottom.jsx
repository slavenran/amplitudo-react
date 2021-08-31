import React from 'react';
import style from '../../content/Content.module.scss'

const DetailsBottom = ({ fileData }) => {
    return <div className={style.infoStyle}>
        <div>Naziv dokumenta</div>
        <p>{fileData?.name}</p>
        {
            Object.entries(fileData?.extra)?.map(([_, value]) => {
                return <>
                    <div>{value?.title}</div>
                    <p>{value?.type === "checkbox" ? value?.value === true ? "Da" : "Ne" : value?.value}</p>
                </>
            })
        }
    </div>
}

export default DetailsBottom;