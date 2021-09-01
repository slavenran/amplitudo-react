import React, { useState } from 'react';
import Row from 'antd/lib/row';
import Col from 'antd/lib/col';
import Button from 'antd/lib/button';
import DataTableInfinite from '../dataTable/DataTableInfinite';
import DirectoryDetails from '../directoryDetails/DirectoryDetails';
import FileDetails from '../fileDetails/FileDetails';
import FormModal from '../modal/FormModal';
import CreateFileForm from '../createForms/createFileForm/CreateFileForm';
import style from './Content.module.scss';

const ContentComponent = ({ showFiles, folderData, searchValue, fileData, setFileData, activeRow, setActiveRow }) => {

    const [showModal, setShowModal] = useState(false);    // state for file creation modal

    return <Row className={style.bigRow}>
        <Col className={style.leftCol} span={fileData ? 15 : 24}>
            <Row className={style.rowStyle}>
                {
                    folderData &&
                        <Col className={style.titleCol}>
                            <DirectoryDetails folderData={folderData} isDoc={showFiles} />
                        </Col>
                }
                {
                    showFiles &&
                        <Col className={style.colStyle}>
                            <DataTableInfinite
                                folderData={folderData}
                                searchValue={searchValue}
                                setFileData={(data) => setFileData(data)}
                                activeRow={activeRow}
                                setActiveRow={(e) => setActiveRow(e)} />
                            <Button style={{ borderRadius: 5, marginTop: 10 }} onClick={() => setShowModal(true)}>Napravi novi fajl</Button>
                        </Col>
                }
            </Row>
        </Col>
        {
            fileData &&
                <Col className={`${style.colStyle} ${style.rightCol}`} span={8} offset={1}>
                    <FileDetails fileData={fileData} setFileData={(data) => setFileData(data)} />
                </Col>
        }
        {
            showModal &&
                <FormModal show={showModal} setShow={(e) => setShowModal(e)}>
                    <CreateFileForm setShowModal={(e) => setShowModal(e)} folderData={folderData} />
                </FormModal>
        }
    </Row>
}

export default ContentComponent;