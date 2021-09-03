import React from 'react';
import PropTypes from 'prop-types';
import style from '../../content/Content.module.scss'

const DetailsBottom = ({ fileData }) => {
    return <div className={style.infoStyle}>
        <div>Naziv dokumenta</div>
        <p>{fileData?.name}</p>
        {
            Object.entries(fileData?.extra)?.map(([key, value]) => {
                return <div  key={key}>
                    <div>{value?.title}</div>
                    <p>{value?.type === "checkbox" ? value?.value === true ? "Da" : "Ne" : value?.value}</p>
                </div>
            })
        }
    </div>
}

export default DetailsBottom;

DetailsBottom.propTypes = {
    fileData: PropTypes.oneOfType([PropTypes.bool, PropTypes.object]).isRequired
}