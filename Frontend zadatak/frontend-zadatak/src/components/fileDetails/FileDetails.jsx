import React, { useState } from 'react';
import { useWidth } from '../../context/WidthContext';
import Row from 'antd/lib/row';
import Col from 'antd/lib/col';
import Divider from 'antd/lib/divider';
import Button from 'antd/lib/button';
import FileIcon from './fileIcon/FileIcon';
import FileModalForm from './fileModalForm/FileModalForm';
import DetailsTop from './detailsTop/DetailsTop';
import DetailsBottom from './detailsBottom/DetailsBottom';
import style from '../content/Content.module.scss';

const FileDetails = ({ fileData, setFileData }) => {

    const [width] = useWidth(); // dynamically set width of file data container

    const [isModalVisible, setIsModalVisible] = useState(false);    // set if modal is showing

    return <div className={style.divStyle}>
        <Row className={style.rowStyle}>
            <Col>
                <DetailsTop fileData={fileData} />
            </Col>
            <Col>
                <Row className={style.divider} justify="space-between" align="middle">
                    <Col className={style.infoTitle} span={width >= 1300 ? 9 : 12}>
                        Informacije o dokumentu
                    </Col>
                    {
                        width >= 1300 ?
                            <Col className={style.divider} span={9}>
                                <Divider />
                            </Col>
                            :
                            <></>
                    }
                    <Col span={width >= 1300 ? width >= 1500 ? 5 : 6 : 12}>
                        <Button className={style.editStyle} type="text" onClick={() => setIsModalVisible(true)}>IZMIJENI</Button>
                    </Col>
                </Row>
                <DetailsBottom fileData={fileData} />
            </Col>
        </Row>
        {
            isModalVisible ?
                <FileModalForm
                    isModalVisible={isModalVisible}
                    handleOk={() => setIsModalVisible(false)}
                    handleCancel={() => setIsModalVisible(false)}
                    fileData={fileData}
                    setFileData={(e) => setFileData(e)}
                    icon={FileIcon} />
                :
                <></>
        }
    </div>
}

export default FileDetails;