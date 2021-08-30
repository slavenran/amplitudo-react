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
import getWindowDimensions from '../../functions/getWindowDimesions';
import style from './Form.module.scss';
import './Modal.scss';
import NewField from './newField/NewField';

const ModalForm = ({ isModalVisible, handleOk, handleCancel, fileData, icon: Icon, setFileData }) => {
    const [width, setWidth] = useState(getWindowDimensions);

    const { register, handleSubmit, setValue, formState: { errors } } = useForm();

    const { setRefreshData } = useRefresh();

    // dynamically set the span of columns via state
    const num = width > 800 ? 7 : 24;

    const onSubmit = (data) => {
        // save and remove name from call so we can easily update "extra" object
        const name = data?.name;
        delete data?.name;

        // update files in local storage
        localStorage.setItem("documentList", JSON.stringify(JSON.parse(localStorage.getItem("documentList")).map(file => {
            return file?.id === fileData?.id ?
                { ...file, name: name, extra: { ...data } }
                :
                file
        })));

        // handle refresh and new file data view
        setFileData({ ...fileData, name: name, extra: { ...data } });
        setRefreshData();
        handleOk();

    }

    useEffect(() => {
        function handleResize() {
            setWidth(getWindowDimensions);
        }

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    useEffect(() => {
        setValue("name", fileData?.name);
        Object.entries(fileData?.extra)?.map(([key, value]) =>
            setValue(key, { title: value?.title, value: value?.value, type: value?.type }));
    }, [fileData?.extra, fileData?.name, setValue])

    return <Modal centered className={style.modal} title="" width={width > 600 ? "70vw" : "90vw"} visible={isModalVisible} onCancel={handleCancel} footer={null} closable={false}>
        <Form onFinish={handleSubmit(onSubmit)}>
            <Form.List name="inputs">
                {(fields, { add }) => (
                    <>
                        <Col span={24}>
                            <Row className={style.childRow}>
                                <Col className={style.headerCols} span={num}>
                                    <div className={style.titleCol}>
                                        <Icon fileType={fileData?.docType} />
                                        <span className={style.titleSpan}>{fileData?.name}</span>
                                    </div>
                                </Col>
                                {
                                    width > 800 ? <Divider type="vertical" style={{ height: "45px" }} /> : <></>
                                }
                                <Col className={`${style.details} ${style.headerCols}`} span={num}>
                                    <div>Verzija: {fileData?.version}</div>
                                    <div>Autor: {fileData?.author} </div>
                                </Col>
                                <Col className={`${style.button} ${style.headerCols}`} span={num}>
                                    <Button className={style.add} onClick={() => add()}><PlusOutlined style={{ fontSize: 16, marginRight: 10 }} />DODAJ NOVO POLJE</Button>
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
                                        const isChecked = value?.type === "checkbox" ? { defaultChecked: value?.value } : { defaultValue: value?.value }
                                        return <Col className={style.childCol} span={num}>
                                            <div>{value?.title}</div>
                                            <Input className={style.input} type={value?.type}
                                                placeholder={value?.title} {...isChecked}
                                                {...register(key, {
                                                    validate: value => value?.value !== '' ? true : `Morate popuniti ${value?.title?.toLowerCase()}`
                                                })}
                                                onChange={(e) => {
                                                    setValue(key, { ...value, value: value?.type === "checkbox" ? e.target.checked : e.target.value });
                                                }}
                                            />
                                            <div style={{ color: "red" }}>{errors[key]?.message}</div>
                                        </Col>
                                    })
                                }
                                {
                                    fields.map(() => (
                                        <NewField num={num} style={style} register={register} setValue={setValue} errors={errors} />
                                    ))
                                }
                            </Row>
                        </Col>
                        <Col className={style.button} span={24}>
                            <Button className={style.submit} htmlType="submit">SACUVAJ IZMJENE</Button>
                        </Col>
                    </>
                )}
            </Form.List>
        </Form>
    </Modal>
}

export default ModalForm;








// eslint-disable-next-line no-lone-blocks
{/* <Row className={style.mainRow}>
                <Col span={24}>
                    <Row className={style.childRow}>
                        <Col className={style.headerCols} span={num}>
                            <div className={style.titleCol}>
                                <Icon fileType={fileData?.docType} />
                                <span className={style.titleSpan}>{fileData?.name}</span>
                            </div>
                        </Col>
                        {
                            width > 800 ? <Divider type="vertical" style={{ height: "45px" }} /> : <></>
                        }
                        <Col className={`${style.details} ${style.headerCols}`} span={num}>
                            <div>Verzija: {fileData?.version}</div>
                            <div>Autor: {fileData?.author} </div>
                        </Col>
                        <Col className={`${style.button} ${style.headerCols}`} span={num}>
                            <Button className={style.add}><PlusOutlined style={{ fontSize: 16, marginRight: 10 }} />DODAJ NOVO POLJE</Button>
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
                                    <Input className={style.input} type={value?.type}
                                        placeholder={value?.title} defaultValue={value?.value}
                                        {...register(key, {
                                            required: {
                                                value: true,
                                                message: `Morate popuniti ${value?.title?.toLowerCase()}`
                                            }
                                        })}
                                        onChange={(e) => {
                                            setValue(key, { ...value, value: e.target.value });
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
            </Row> */}