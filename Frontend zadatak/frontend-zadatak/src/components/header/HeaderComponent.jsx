import React from 'react';
import Row from 'antd/lib/row';
import Col from 'antd/lib/col';
import Input from 'antd/lib/input';
import SearchOutlined from '@ant-design/icons/SearchOutlined'
import style from './Header.module.scss';
import ImageComponent from '../image/ImageComponent';

const HeaderComponent = () => {
    return <Row style={{minWidth: 360}} className={style.rowStyle}>
        <Col flex={1}>
            <Row className={style.rowStyle} justify="space-between" align="middle">
                <Col span={8} className={style.titleCol}>
                    Novi folder 1
                </Col>
                <Col span={14}>
                    <Input className={style.inputStyle} size="large" placeholder="Pretraga" bordered={false} prefix={<SearchOutlined className={style.searchIcon} />} />
                </Col>
            </Row>
        </Col>
        <Col flex={1} className={style.colStyle}>
            <ImageComponent />
        </Col>
    </Row>
}

export default HeaderComponent;