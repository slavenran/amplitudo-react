import React, { useEffect, useState } from 'react';
import Row from 'antd/lib/row';
import Col from 'antd/lib/col';
import Divider from 'antd/lib/divider';
import FileWordFilled from '@ant-design/icons/FileWordFilled';
import DownloadOutlined from '@ant-design/icons/DownloadOutlined';
import UploadOutlined from '@ant-design/icons/UploadOutlined';
import MailOutlined from '@ant-design/icons/MailOutlined';
import Button from 'antd/lib/button';

function getWindowDimensions() {
    const { innerWidth: width } = window;
    return width;
}

const FileDetails = ({style}) => {

    const [width, setWidth] = useState(getWindowDimensions());

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
                <div className={style.fileDiv}>
                    <FileWordFilled style={{ fontSize: 30, color: "rgb(43, 167, 217)" }} />
                    <h3>Lorem ipsum dolorit</h3>
                    <p>Verzija: </p>
                    <p>Autor: </p>
                    <p>Broj: </p>
                    <p>Tip: </p>
                    <p>Datum: </p>
                    <div>
                        <Button className={style.button} size="large" type='primary'>POGLEDAJ DOKUMENT</Button>
                        <Button className={style.smallButton} size="large" icon={<MailOutlined style={{ fontSize: 20 }} />} />
                        <Button className={style.smallButton} size="large" icon={<DownloadOutlined style={{ fontSize: 20 }} />} />
                        <Button className={style.smallButtonLast} size="large" icon={<UploadOutlined style={{ fontSize: 20 }} />} />
                    </div>
                </div>
            </Col>
            <Col>
                <Row wrap={true} justify="space-between" align="middle">
                    <Col className={style.infoTitle} span={width >= 1250 ? 9 : 12}>
                        Informacije o dokumentu
                    </Col>
                    {
                        width >= 1250 ?
                            <Col className={style.divider} span={9}>
                                <Divider />
                            </Col>
                            :
                            <></>
                    }
                    <Col className={style.editStyle} span={width >= 1250 ? 4 : 12}>
                        IZMIJENI
                    </Col>
                </Row>
                <div className={style.infoStyle}>
                    <div>Naziv dokumenta</div>
                    <p>Random</p>
                    <div>Djelovodni broj</div>
                    <p>Random</p>
                    <div>Opis dokumenta</div>
                    <p>Random</p>
                    <div>Subjekt</div>
                    <p>Random</p>
                    <div>Oznaka dokumenta</div>
                    <p>Random</p>
                    <div>Nacin prijema</div>
                    <p>Random</p>
                </div>
            </Col>
        </Row>
    </div>
}

export default FileDetails;