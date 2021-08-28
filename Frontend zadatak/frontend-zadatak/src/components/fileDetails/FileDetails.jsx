import React, { useEffect, useState } from 'react';
import Row from 'antd/lib/row';
import Col from 'antd/lib/col';
import Divider from 'antd/lib/divider';
import Button from 'antd/lib/button';
import FileIcon from '../fileIcon/FileIcon';
import ModalForm from '../modalForm/ModalForm';
import DetailsTop from './detailsTop/DetailsTop';
import DetailsBottom from './detailsBottom/DetailsBottom';
// import FileViewer from 'react-file-viewer';

function getWindowDimensions() {
    const { innerWidth: width } = window;
    return width;
}

const FileDetails = ({ style, fileData }) => {

    const [fileDataState, setFileDataState] = useState(fileData);
    const [width, setWidth] = useState(getWindowDimensions());
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

    useEffect(() => {
        setFileDataState(fileData);
    }, [fileData])

    useEffect(() => {
        function handleResize() {
            setWidth(getWindowDimensions());
        }

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return <div className={style.divStyle}>
        <Row className={style.rowStyle}>
            <Col>
                {/* <FileViewer
                    style={{height: 100}}
                    fileType={fileData?.docType}
                    filePath={fileData?.path} /> */}

                <DetailsTop style={style} fileData={fileDataState} />
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
                <DetailsBottom style={style} fileData={fileDataState} />
            </Col>
        </Row>
        {/* <ModalForm
            isModalVisible={isModalVisible}
            handleOk={() => handleOk()}
            handleCancel={() => handleCancel()}
            fileData={fileData}
            icon={FileIcon} /> */}
        {
            isModalVisible ?
                <ModalForm
                    isModalVisible={isModalVisible}
                    handleOk={() => handleOk()}
                    handleCancel={() => handleCancel()}
                    fileData={fileDataState}
                    setFileDataState={(e) => setFileDataState(e)}
                    icon={FileIcon} />
                :
                <></>
        }
    </div>
}

export default FileDetails;