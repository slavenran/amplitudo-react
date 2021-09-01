import React from 'react';
import { useForm } from 'react-hook-form';
import setFileMaxId, { getFileMaxId } from '../../../functions/fileMaxId';
import { useRefresh } from '../../../context/RefreshTableContext';
import Form from 'antd/lib/form';
import Input from 'antd/lib/input';
import Button from 'antd/lib/button';
import PropTypes from 'prop-types';
import moment from 'moment';
import style from '../Create.module.scss';

const CreateFileForm = ({ setShowModal, folderData }) => {
    const { register, handleSubmit, setValue, formState: { errors } } = useForm();

    const { setRefreshData } = useRefresh();    // refresh shown data after successful update

    const onSubmit = (data) => {
        const files = JSON.parse(localStorage.getItem("documentList")); // load local document data and update

        localStorage.setItem("documentList", JSON.stringify([...files, {
            ...data,
            id: getFileMaxId() + 1,
            version: 1,
            date: moment().format("DD.MM.YYYY."),
            parentDir: folderData?.key,
            extra: {}
        }]));

        setFileMaxId(getFileMaxId() + 1);
        setRefreshData();
        setShowModal(false); // close modal
    }

    return <Form style={{ textAlign: 'center' }} labelCol={{ span: 6 }} wrapperCol={{ span: 14 }} onFinish={handleSubmit(onSubmit)}>
        <div style={{marginBottom: 40}}>Dodajte novi fajl u {folderData?.title}</div>
        <Form.Item style={{ textAlign: 'left' }} label="Naziv fajla: ">
            <Input type="text" placeholder="Naziv fajla"
                {...register("name", {
                    required: {
                        value: true,
                        message: "Morate popuniti naziv novog fajla"
                    }
                })}
                onChange={(e) => {
                    setValue("name", e.target.value);
                }} />
            <div style={{ color: "red" }}>{errors?.name?.message}</div>
        </Form.Item>
        <Form.Item style={{ textAlign: 'left' }} label="Broj fajla: ">
            <Input type="number" placeholder="Broj fajla"
                {...register("number", {
                    required: {
                        value: true,
                        message: "Morate popuniti broj novog fajla"
                    }
                })}
                onChange={(e) => {
                    setValue("number", e.target.value);
                }} />
            <div style={{ color: "red" }}>{errors?.number?.message}</div>
        </Form.Item>
        <Form.Item style={{ textAlign: 'left' }} label="Status fajla: ">
            <Input type="text" placeholder="Status fajla"
                {...register("status", {
                    required: {
                        value: true,
                        message: "Morate popuniti status novog fajla"
                    }
                })}
                onChange={(e) => {
                    setValue("status", e.target.value);
                }} />
            <div style={{ color: "red" }}>{errors?.status?.message}</div>
        </Form.Item>
        <Form.Item style={{ textAlign: 'left' }} label="Autor fajla: ">
            <Input type="text" placeholder="Autor fajla"
                {...register("author", {
                    required: {
                        value: true,
                        message: "Morate popuniti autora novog fajla"
                    }
                })}
                onChange={(e) => {
                    setValue("author", e.target.value);
                }} />
            <div style={{ color: "red" }}>{errors?.author?.message}</div>
        </Form.Item>
        <Form.Item style={{ textAlign: 'left' }} label="Tip fajla: ">
            <Input type="text" placeholder="Tip fajla"
                {...register("type", {
                    required: {
                        value: true,
                        message: "Morate popuniti tip novog fajla"
                    }
                })}
                onChange={(e) => {
                    setValue("type", e.target.value);
                }} />
            <div style={{ color: "red" }}>{errors?.type?.message}</div>
        </Form.Item>
        <Form.Item style={{ textAlign: 'left' }} label="Putanja do fajla: ">
            <Input type="text" placeholder="Putanja do fajla"
                {...register("path", {
                    required: {
                        value: true,
                        message: "Morate popuniti putanju novog fajla"
                    }
                })}
                onChange={(e) => {
                    setValue("path", e.target.value);
                }} />
            <div style={{ color: "red" }}>{errors?.path?.message}</div>
        </Form.Item>
        <Button className={style.submit} type="primary" htmlType="submit">
            Potvrdi
        </Button>
    </Form>
}

export default CreateFileForm;

CreateFileForm.propTypes = {
    setShowModal: PropTypes.func.isRequired,
    folderData: PropTypes.oneOfType([PropTypes.bool, PropTypes.object]).isRequired
}