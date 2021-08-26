import React, { useState } from 'react';
import Row from 'antd/lib/row';
import Col from 'antd/lib/col';
import style from './Content.module.scss';
import DataTable from '../dataTable/DataTable';
import DirectoryDetails from '../directoryDetails/DirectoryDetails';
import FileDetails from '../fileDetails/FileDetails';

const ContentComponent = ({ showFiles, folderData, searchValue, fileData, setFileData }) => {

    return <Row className={style.bigRow}>
        <Col className={style.leftCol} span={15}>
            <Row className={style.rowStyle}>
                {
                    folderData ?
                        <Col className={style.titleCol}>
                            <DirectoryDetails style={style} folderData={folderData} />
                        </Col>
                        :
                        <></>
                }
                {
                    showFiles ?
                        <Col className={style.colStyle}>
                            <DataTable folderData={folderData} searchValue={searchValue} setFileData={(data) => setFileData(data)} />
                        </Col>
                        :
                        <></>
                }
            </Row>
        </Col>
        {
            fileData ?
                <Col className={`${style.colStyle} ${style.rightCol}`} span={8} offset={1}>
                    <FileDetails style={style} fileData={fileData} />
                </Col>
                :
                <></>
        }
    </Row>
}

export default ContentComponent;