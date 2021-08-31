import React from 'react';
import DownloadOutlined from '@ant-design/icons/DownloadOutlined';
import UploadOutlined from '@ant-design/icons/UploadOutlined';
import MailOutlined from '@ant-design/icons/MailOutlined';
import Button from 'antd/lib/button';
import FileIcon from '../fileIcon/FileIcon';
import downloadFile from '../../../functions/downloadFile';
import style from '../../content/Content.module.scss'

const DetailsTop = ({ fileData }) => {
    return <div className={style.fileDiv}>
        <FileIcon fileType={fileData?.docType} />
        <h3>{fileData?.name}</h3>
        <p>Verzija: {fileData?.version}</p>
        <p>Autor: {fileData?.author}</p>
        <p>Broj: {fileData?.number}</p>
        <p>Tip: {fileData?.type}</p>
        <p>Datum: {fileData?.date}</p>
        <div>
            {/* button for file preview in new tab */}
            <Button className={style.button} size="large" type='primary' onClick={() => window.open(fileData?.path, "_blank")}>POGLEDAJ DOKUMENT</Button>
            <Button className={style.smallButton} size="large" icon={<MailOutlined style={{ fontSize: 20 }} />} />
            {/* button for file download */}
            <Button className={style.smallButton} size="large" onClick={() => downloadFile(fileData?.path)} icon={<DownloadOutlined style={{ fontSize: 20 }} />} />
            <Button className={style.smallButtonLast} size="large" icon={<UploadOutlined style={{ fontSize: 20 }} />} />
        </div>
    </div>
}

export default DetailsTop;