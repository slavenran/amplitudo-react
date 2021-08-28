import React, { useEffect } from 'react';
import Modal from 'antd/lib/modal';
import Row from 'antd/lib/row';
import Col from 'antd/lib/col';
import Button from 'antd/lib/button';
import Form from 'antd/lib/form';
import Input from 'antd/lib/input';
import style from './Form.module.scss';
import { useForm } from 'react-hook-form';
import { useRefresh } from '../../context/RefreshData';

const ModalForm = ({ isModalVisible, handleOk, handleCancel, fileData, icon: Icon, setFileDataState }) => {
    // console.log(fileData?.name);
    const { register, handleSubmit, setValue, formState: { errors } } = useForm();

    const { setRefreshData } = useRefresh();

    const onSubmit = (data) => {
        console.log(data);
        setRefreshData();
        setFileDataState({...fileData, ...data});
        handleOk();
    }

    useEffect(() => {
        setValue("name", fileData?.name);
        setValue("effectiveNumber", fileData?.effectiveNumber);
        setValue("description", fileData?.description);
        setValue("subject", fileData?.subject);
        setValue("documentSign", fileData?.documentSign);
        setValue("receptionMode", fileData?.receptionMode);
    }, [])

    return <Modal title="" width={"70vw"} visible={isModalVisible} onCancel={handleCancel} footer={null} closable={false}>
        <Form onFinish={handleSubmit(onSubmit)}>
            <Row className={style.mainRow}>
                <Col span={24}>
                    <Row>
                        <Col span={8}>
                            <Icon fileType={fileData?.docType} />
                            <span>{fileData?.name}</span>
                        </Col>
                        <Col span={8}>
                            <p>Verzija: {fileData?.version}</p>
                            <p>Autor: {fileData?.author} </p>
                        </Col>
                        <Col span={8}>
                            <Button>+ DODAJ NOVO POLJE</Button>
                        </Col>
                    </Row>
                </Col>
                <Col span={24}>
                    <Row>
                        <Col span={8}>
                            <div>Naziv dokumenta</div>
                            <Input style={{ width: '70%' }} type="text"
                                placeholder="Document title" defaultValue={fileData?.name}
                                {...register("name", {
                                    required: {
                                        value: true,
                                        message: "You must fill the name"
                                    }
                                })}
                                onChange={(e) => {
                                    setValue("name", e.target.value);
                                }}
                            />
                            <div style={{ color: "red" }}>{errors?.name?.message}</div>
                        </Col>
                        <Col span={8}>
                            <div>Djelovodni broj</div>
                            <Input style={{ width: '70%' }} type="text"
                                placeholder="Effective number" defaultValue={fileData?.effectiveNumber}
                                {...register("effectiveNumber", {
                                    required: {
                                        value: true,
                                        message: "You must fill the effective number"
                                    }
                                })}
                                onChange={(e) => {
                                    setValue("effectiveNumber", e.target.value);
                                }}
                            />
                            <div style={{ color: "red" }}>{errors?.name?.message}</div>
                        </Col>
                        <Col span={8}>
                            <div>Opis dokumenta</div>
                            <Input style={{ width: '70%' }} type="text"
                                placeholder="Doc description" defaultValue={fileData?.description}
                                {...register("description", {
                                    required: {
                                        value: true,
                                        message: "You must fill the description"
                                    }
                                })}
                                onChange={(e) => {
                                    setValue("description", e.target.value);
                                }}
                            />
                            <div style={{ color: "red" }}>{errors?.name?.message}</div>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={8}>
                            <div>Subjekt</div>
                            <Input style={{ width: '70%' }} type="text"
                                placeholder="Subject" defaultValue={fileData?.subject}
                                {...register("subject", {
                                    required: {
                                        value: true,
                                        message: "You must fill the subject"
                                    }
                                })}
                                onChange={(e) => {
                                    setValue("subject", e.target.value);
                                }}
                            />
                            <div style={{ color: "red" }}>{errors?.name?.message}</div>
                        </Col>
                        <Col span={8}>
                            <div>Oznaka dokumenta</div>
                            <Input style={{ width: '70%' }} type="text"
                                placeholder="Document sign" defaultValue={fileData?.documentSign}
                                {...register("documentSign", {
                                    required: {
                                        value: true,
                                        message: "You must fill the document sign"
                                    }
                                })}
                                onChange={(e) => {
                                    setValue("documentSign", e.target.value);
                                }}
                            />
                            <div style={{ color: "red" }}>{errors?.name?.message}</div>
                        </Col>
                        <Col span={8}>
                            <div>Nacin prijema</div>
                            <Input style={{ width: '70%' }} type="text"
                                placeholder="Reception mode" defaultValue={fileData?.receptionMode}
                                {...register("receptionMode", {
                                    required: {
                                        value: true,
                                        message: "You must fill the reception mode"
                                    }
                                })}
                                onChange={(e) => {
                                    setValue("receptionMode", e.target.value);
                                }}
                            />
                            <div style={{ color: "red" }}>{errors?.name?.message}</div>
                        </Col>
                    </Row>
                </Col>
                <Button style={{ alignSelf: "flex-end" }} htmlType="submit">SACUVAJ IZMJENE</Button>
            </Row>
        </Form>
    </Modal>
}

export default ModalForm;