import React from 'react';
import FileWordFilled from '@ant-design/icons/FileWordFilled';
import FilePdfFilled from '@ant-design/icons/FilePdfFilled';
import FilePptFilled from '@ant-design/icons/FilePptFilled';
import FileExcelFilled from '@ant-design/icons/FileExcelFilled';
import FileUnknownFilled from '@ant-design/icons/FileUnknownFilled';

const FileIcon = ({ fileType }) => {
    // choose icon based on file extension
    return fileType === "doc" || fileType === "docx" ?
        <FileWordFilled style={{ fontSize: 30, color: "#2b579a" }} />
        :
        fileType === "ppt" || fileType === "pptx" ?
            <FilePptFilled style={{ fontSize: 30, color: "#d24726" }} />
            :
            fileType === "xls" || fileType === "xlsx" ?
                <FileExcelFilled style={{ fontSize: 30, color: "#217346" }} />
                :
                fileType === "pdf" ?
                    <FilePdfFilled style={{ fontSize: 30, color: "#f40f02" }} />
                    :
                    <FileUnknownFilled style={{ fontSize: 30, color: "rgb(94, 123, 137)" }} />
}

export default FileIcon;