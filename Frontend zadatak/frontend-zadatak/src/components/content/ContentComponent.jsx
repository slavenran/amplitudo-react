import React from 'react';
import Row from 'antd/lib/row';
import Col from 'antd/lib/col';
import style from './Content.module.scss';
import DataTable from '../dataTable/DataTable';

const ContentComponent = () => {
    return <Row className={style.bigRow}>
        <Col className={style.leftCol} span={15}>
            <Row className={style.rowStyle}>
                <Col className={style.titleCol}>
                    <div className={style.titleStyle}>DOKUMENTI</div>
                    <Row className={style.cardStyle}>
                        <Col span={10}>
                            <div>Naziv foldera: <span>some random text</span></div>
                            <div>Sektor: </div>
                            <div>Datum kreiranja: </div>
                            <div>Kreator: </div>
                        </Col>
                        <Col span={11} offset={1}>
                            <div>Opis: <p>fdfsdfsdfsd</p></div>
                        </Col>
                    </Row>
                </Col>
                <Col className={style.colStyle}>
                    <DataTable height={700} />
                </Col>
            </Row>
        </Col>
        <Col className={style.colStyle} span={8} offset={1}>
            <div className={style.divStyle}>
                <Row className={style.rowStyle}>
                    <Col style={{height: "40%"}}>
                        
                    </Col>
                    <Col style={{height: "60%"}}>
                        fdsfdsfsdf
                    </Col>
                </Row>
            </div>
        </Col>
    </Row>
}

export default ContentComponent;