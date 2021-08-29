import React from 'react';

const DetailsBottom = ({ style, fileData }) => {
    return <div className={style.infoStyle}>
        <div>Naziv dokumenta</div>
        <p>{fileData?.name}</p>
        {
            Object.entries(fileData?.extra)?.map(([_, value]) => {
                return <>
                    <div>{value?.title}</div>
                    <p>{value?.value}</p>
                </>
            })
        }
    </div>
}

export default DetailsBottom;