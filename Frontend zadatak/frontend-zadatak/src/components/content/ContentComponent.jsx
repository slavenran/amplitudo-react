import React, { Suspense, useState } from 'react';
import Row from 'antd/lib/row';
import Col from 'antd/lib/col';
import Button from 'antd/lib/button';
import PropTypes from 'prop-types';
import style from './Content.module.scss';

const DirectoryDetails = React.lazy(() => import('../directoryDetails/DirectoryDetails'));
const DataTableInfinite = React.lazy(() => import('../dataTable/DataTableInfinite'));
const FileDetails = React.lazy(() => import('../fileDetails/FileDetails'));
const FormModal = React.lazy(() => import('../modal/FormModal'));
const CreateFileForm = React.lazy(() => import('../createForms/createFileForm/CreateFileForm'));

const ContentComponent = ({ showFiles, folderData, searchValue, fileData, setFileData, activeRow, setActiveRow }) => {
    const [showNewFileModal, setShowNewFileModal] = useState(false);    // state for file creation modal
    
    return <Row className={style.bigRow}>
        <Col className={style.leftCol} span={fileData ? 15 : 24}>
            <Row className={style.rowStyle}>
                {
                    folderData &&
                    <Col className={style.titleCol}>
                        <Suspense fallback={<div>Loading...</div>}>
                            <DirectoryDetails folderData={folderData} isDoc={showFiles} />
                        </Suspense>
                    </Col>
                }
                {
                    showFiles &&
                    <Col className={style.colStyle}>
                        <Suspense fallback={<div>Loading...</div>}>
                            <DataTableInfinite
                                folderData={folderData}
                                searchValue={searchValue}
                                setFileData={(data) => setFileData(data)}
                                activeRow={activeRow}
                                setActiveRow={(e) => setActiveRow(e)} />
                            <Button style={{ borderRadius: 5, marginTop: 10 }} onClick={() => setShowNewFileModal(true)}>Napravi novi fajl</Button>
                        </Suspense>
                    </Col>
                }
            </Row>
        </Col>
        {
            fileData &&
            <Col className={`${style.colStyle} ${style.rightCol}`} span={8} offset={1}>
                <Suspense fallback={<div>Loading...</div>}>
                    <FileDetails fileData={fileData} setFileData={(data) => setFileData(data)} />
                </Suspense>
            </Col>
        }
        {
            showNewFileModal &&
            <Suspense fallback={<div>Loading...</div>}>
                <FormModal show={showNewFileModal} setShow={(e) => setShowNewFileModal(e)}>
                    <Suspense fallback={<div>Loading...</div>}>
                        <CreateFileForm setShowModal={(e) => setShowNewFileModal(e)} folderData={folderData} />
                    </Suspense>
                </FormModal>
            </Suspense>
        }
    </Row>
}

export default ContentComponent;

ContentComponent.propTypes = {
    showFiles: PropTypes.bool.isRequired,
    folderData: PropTypes.oneOfType([PropTypes.bool, PropTypes.object]).isRequired,
    searchValue: PropTypes.string.isRequired,
    fileData: PropTypes.oneOfType([PropTypes.bool, PropTypes.object]).isRequired,
    setFileData: PropTypes.func.isRequired,
    activeRow: PropTypes.number,
    setActiveRow: PropTypes.func.isRequired
}