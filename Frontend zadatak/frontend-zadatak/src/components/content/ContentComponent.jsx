import React from 'react';
import Row from 'antd/lib/row';
import Col from 'antd/lib/col';
import style from './Content.module.scss';
import DataTable from '../dataTable/DataTable';

const ContentComponent = () => {
    return <Row className={style.bigRow}>
        <Col className={style.colStyle} span={16}>
            <Row className={style.rowStyle}>
                <Col className={style.titleCol}>
                    DOKUMENTI
                </Col>
                <Col style={{width: "100%"}}>
                    <DataTable />
                </Col>
            </Row>
        </Col>
        <Col className={style.colStyle} span={8}>
            test
        </Col>
    </Row>
}

export default ContentComponent;