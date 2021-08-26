import React from 'react';
import Row from 'antd/lib/row';
import Col from 'antd/lib/col';

const DirectoryDetails = ({style, folderData}) => {
    return <>
        <div className={style.titleStyle}>DOKUMENTI</div>
        <Row className={style.cardStyle}>
            <Col span={10}>
                <div>Naziv foldera: <span>{folderData?.title}</span></div>
                <div>Sektor: <span>{folderData?.sector}</span></div>
                <div>Datum kreiranja: <span>{folderData?.creationDate}</span></div>
                <div>Kreator: <span>{folderData?.creator}</span></div>
            </Col>
            <Col span={13} offset={1}>
                <div>Opis: <p>{folderData?.description}</p></div>
            </Col>
        </Row>
    </>
}

export default DirectoryDetails;