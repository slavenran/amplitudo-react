import React from 'react';
import Row from 'antd/lib/row';
import Col from 'antd/lib/col';
import style from './Content.module.scss';
import DataTable from '../dataTable/DataTable';
import DirectoryDetails from '../directoryDetails/DirectoryDetails';
import FileDetails from '../fileDetails/FileDetails';

const ContentComponent = ({ showFiles, folderData, searchValue, fileData, setFileData, activeRow, setActiveRow }) => {

    return <Row className={style.bigRow}>
        <Col className={style.leftCol} span={fileData ? 15 : 24}>
            <Row className={style.rowStyle}>
                {
                    folderData ?
                        <Col className={style.titleCol}>
                            <DirectoryDetails style={style} folderData={folderData} isDoc={showFiles} />
                        </Col>
                        :
                        <></>
                }
                {
                    showFiles ?
                        <Col className={style.colStyle}>
                            <DataTable
                                folderData={folderData}
                                searchValue={searchValue}
                                setFileData={(data) => setFileData(data)}
                                activeRow={activeRow}
                                setActiveRow={(e) => setActiveRow(e)} />
                        </Col>
                        :
                        <></>
                }
            </Row>
        </Col>
        {
            fileData ?
                <Col className={`${style.colStyle} ${style.rightCol}`} span={8} offset={1}>
                    <FileDetails style={style} fileData={fileData} setFileData={(data) => setFileData(data)} />
                </Col>
                :
                <></>
        }
    </Row>
}

export default ContentComponent;