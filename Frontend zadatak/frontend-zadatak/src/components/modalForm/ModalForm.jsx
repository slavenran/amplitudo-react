import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useRefresh } from '../../context/RefreshData';
import Modal from 'antd/lib/modal';
import Row from 'antd/lib/row';
import Col from 'antd/lib/col';
import Button from 'antd/lib/button';
import Form from 'antd/lib/form';
import Input from 'antd/lib/input';
import Divider from 'antd/lib/divider';
import PlusOutlined from '@ant-design/icons/PlusOutlined';
import style from './Form.module.scss';
import './Modal.scss';

function getWindowDimensions() {
    const { innerWidth: width } = window;
    return width;
}

const ModalForm = ({ isModalVisible, handleOk, handleCancel, fileData, icon: Icon, setFileDataState }) => {
    const [width, setWidth] = useState(getWindowDimensions());

    // console.log(fileData?.name);
    const { register, handleSubmit, setValue, formState: { errors } } = useForm();

    const { setRefreshData } = useRefresh();

    const num = width > 800 ? 7 : 24;

    const onSubmit = (data) => {
        localStorage.setItem("documentList", JSON.stringify(JSON.parse(localStorage.getItem("documentList")).map(file => {
            return file?.id === fileData?.id ?
                { ...file, ...data }
                :
                file
        })));
        setFileDataState({ ...fileData, ...data });
        setRefreshData();
        handleOk();
    }

    useEffect(() => {
        function handleResize() {
            setWidth(getWindowDimensions());
        }

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    useEffect(() => {
        setValue("name", fileData?.name);
        Object.entries(fileData?.extra)?.map(([key, value]) => setValue(key, value?.value));
    }, [fileData.description, fileData.documentSign, fileData.effectiveNumber, fileData?.extra, fileData?.name, fileData.receptionMode, fileData.subject, setValue])

    return <Modal className={style.modal} title="" width={"70vw"} visible={isModalVisible} onCancel={handleCancel} footer={null} closable={false}>
        <Form onFinish={handleSubmit(onSubmit)}>
            <Row className={style.mainRow}>
                <Col span={24}>
                    <Row className={style.childRow}>
                        <Col className={style.headerCols} span={num}>
                            <div className={style.titleCol}>
                                <Icon fileType={fileData?.docType} />
                                <span className={style.titleSpan}>{fileData?.name}</span>
                            </div>
                        </Col>
                        <Col className={`${style.details} ${style.headerCols}`} span={num}>
                            <div>Verzija: {fileData?.version}</div>
                            <div>Autor: {fileData?.author} </div>
                        </Col>
                        <Col className={`${style.button} ${style.headerCols}`} span={num}>
                            <Button className={style.add}><PlusOutlined style={{fontSize: 16, marginRight: 10}} />DODAJ NOVO POLJE</Button>
                        </Col>
                        <Divider plain />
                    </Row>
                </Col>
                <Col span={24}>
                    <Row className={style.childRow}>
                        <Col className={style.childCol} span={num}>
                            <div>Naziv dokumenta</div>
                            <Input className={style.input} type="text"
                                placeholder="Naziv dokumenta" defaultValue={fileData?.name}
                                {...register("name", {
                                    required: {
                                        value: true,
                                        message: "Morate popuniti naziv dokumenta"
                                    }
                                })}
                                onChange={(e) => {
                                    setValue("name", e.target.value);
                                }}
                            />
                            <div style={{ color: "red" }}>{errors?.name?.message}</div>
                        </Col>
                        {
                            Object.entries(fileData?.extra)?.map(([key, value]) => {
                                return <Col className={style.childCol} span={num}>
                                    <div>{value?.title}</div>
                                    <Input className={style.input} type="text"
                                        placeholder={value?.title} defaultValue={value?.value}
                                        {...register(key, {
                                            required: {
                                                value: true,
                                                message: `Morate popuniti ${value?.title.toLowerCase()}`
                                            }
                                        })}
                                        onChange={(e) => {
                                            setValue(key, e.target.value);
                                        }}
                                    />
                                    <div style={{ color: "red" }}>{errors[key]?.message}</div>
                                </Col>
                            })
                        }
                    </Row>
                </Col>
                <Col className={style.button} span={24}>
                    <Button className={style.submit} htmlType="submit">SACUVAJ IZMJENE</Button>
                </Col>
            </Row>
        </Form>
    </Modal>
}

export default ModalForm;