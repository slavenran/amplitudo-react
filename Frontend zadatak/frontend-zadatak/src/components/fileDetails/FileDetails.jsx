import React, { useEffect, useState } from 'react';
import Row from 'antd/lib/row';
import Col from 'antd/lib/col';
import Divider from 'antd/lib/divider';
import Button from 'antd/lib/button';
import FileIcon from '../fileIcon/FileIcon';
import ModalForm from '../modalForm/ModalForm';
import DetailsTop from './detailsTop/DetailsTop';
import DetailsBottom from './detailsBottom/DetailsBottom';
import getWindowDimensions from '../../functions/getWindowDimesions';

const FileDetails = ({ style, fileData, setFileData }) => {

    // const [fileDataState, setFileDataState] = useState(fileData);
    const [width, setWidth] = useState(getWindowDimensions);
    const [isModalVisible, setIsModalVisible] = useState(false);

    const showModal = () => {
        setIsModalVisible(true);
    };

    const handleOk = () => {
        setIsModalVisible(false);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };

    // useEffect(() => {
    //     setFileDataState(fileData);
    // }, [fileData])

    useEffect(() => {
        function handleResize() {
            setWidth(getWindowDimensions);
        }

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return <div className={style.divStyle}>
        <Row className={style.rowStyle}>
            <Col>
                <DetailsTop style={style} fileData={fileData} />
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
                        <Button className={style.editStyle} type="text" onClick={() => showModal()}>IZMIJENI</Button>
                    </Col>
                </Row>
                <DetailsBottom style={style} fileData={fileData} />
            </Col>
        </Row>
        {
            isModalVisible ?
                <ModalForm
                    isModalVisible={isModalVisible}
                    handleOk={() => handleOk()}
                    handleCancel={() => handleCancel()}
                    fileData={fileData}
                    setFileData={(e) => setFileData(e)}
                    icon={FileIcon} />
                :
                <></>
        }
    </div>
}

export default FileDetails;