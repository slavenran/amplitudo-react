import React from 'react';
import Row from 'antd/lib/row';
import Col from 'antd/lib/col';
import Input from 'antd/lib/input';
import SearchOutlined from '@ant-design/icons/SearchOutlined'
import style from './Header.module.scss';
import ImageComponent from '../image/ImageComponent';

const HeaderComponent = ({ currentFolder, showSearch, searchValue, setSearch }) => {
    return <Row className={style.rowStyle}>
        <Col span={15}>
            <Row className={style.rowStyle} justify="space-between" align="middle">
                <Col className={style.titleCol} span={8}>
                    {currentFolder}
                </Col>
                <Col span={14}>
                    {
                        showSearch ?
                            <Input className={style.inputStyle} size="large"
                                placeholder="Pretraga" bordered={false}
                                value={searchValue}
                                onChange={(e) => setSearch(e.target.value)}
                                prefix={<SearchOutlined className={style.searchIcon} />} />
                            :
                            <></>
                    }
                </Col>
            </Row>
        </Col>
        <Col className={style.colStyle} span={8} offset={1}>
            <ImageComponent />
        </Col>
    </Row>
}

export default HeaderComponent;