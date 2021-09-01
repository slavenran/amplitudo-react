import React from 'react';
import { useForm } from 'react-hook-form';
import { useRefresh } from '../../../context/RefreshTableContext';
import Form from 'antd/lib/form';
import Input from 'antd/lib/input';
import Button from 'antd/lib/button';
import Select from 'antd/lib/select';
import PropTypes from 'prop-types';
import updateTree from '../../../functions/updateTree';
import style from '../Create.module.scss';

const { Option } = Select;

const CreateFolderForm = ({ setShowModal, folderData }) => {
    const { register, handleSubmit, setValue, formState: { errors } } = useForm();

    const { setRefreshData } = useRefresh();    // refresh after successful update

    const onSubmit = (data) => {
        const folders = JSON.parse(localStorage.getItem("folderTree")); // load local folder data

        updateTree(folders, data, folderData);  // function for updating folder children

        localStorage.setItem("folderTree", JSON.stringify(folders));    // update local folder data

        setRefreshData();
        setShowModal(false); // close modal
    }

    return <Form style={{ textAlign: 'center' }} labelCol={{ span: 6 }} wrapperCol={{ span: 14 }} onFinish={handleSubmit(onSubmit)}>
        <div style={{ marginBottom: 40 }}>Dodajte novi folder u {folderData?.title}</div>
        <Form.Item style={{ textAlign: 'left' }} label="Naziv foldera: ">
            <Input type="text" placeholder="Naziv foldera"
                {...register("name", {
                    required: {
                        value: true,
                        message: "Morate popuniti naziv novog foldera"
                    }
                })}
                onChange={(e) => {
                    setValue("name", e.target.value);
                }} />
            <div style={{ color: "red" }}>{errors?.name?.message}</div>
        </Form.Item>
        <Form.Item style={{ textAlign: 'left' }} label="Sektor: ">
            <Input type="text" placeholder="Sektor"
                {...register("sector", {
                    required: {
                        value: true,
                        message: "Morate popuniti sektor novog foldera"
                    }
                })}
                onChange={(e) => {
                    setValue("sector", e.target.value);
                }} />
            <div style={{ color: "red" }}>{errors?.sector?.message}</div>
        </Form.Item>
        <Form.Item style={{ textAlign: 'left' }} label="Kreator fajla: ">
            <Input type="text" placeholder="Kreator fajla"
                {...register("creator", {
                    required: {
                        value: true,
                        message: "Morate popuniti kreatora novog foldera"
                    }
                })}
                onChange={(e) => {
                    setValue("creator", e.target.value);
                }} />
            <div style={{ color: "red" }}>{errors?.creator?.message}</div>
        </Form.Item>
        <Form.Item style={{ textAlign: 'left' }} label="Opis fajla: ">
            <Input type="text" placeholder="Opis fajla"
                {...register("description", {
                    required: {
                        value: true,
                        message: "Morate popuniti opis novog foldera"
                    }
                })}
                onChange={(e) => {
                    setValue("description", e.target.value);
                }} />
            <div style={{ color: "red" }}>{errors?.description?.message}</div>
        </Form.Item>
        <Form.Item style={{ textAlign: 'left' }} label="Tip: ">
            <Select
                placeholder="Odaberite tip foldera"
                {...register("folderType", {
                    required: {
                        value: true,
                        message: "Morate odabrati tip foldera"
                    }
                })}
                onChange={(e) => {
                    setValue("folderType", e);
                }}
                allowClear
            >
                <Option value="organizer">Folder za organizaciju</Option>
                <Option value="docFolder">Folder sa dokumentima</Option>
            </Select>
            <div style={{ color: "red" }}>{errors?.folderType?.message}</div>
        </Form.Item>
        <Button className={style.submit} type="primary" htmlType="submit">
            Potvrdi
        </Button>
    </Form>
}

export default CreateFolderForm;

CreateFolderForm.propTypes = {
    setShowModal: PropTypes.func.isRequired,
    folderData: PropTypes.oneOfType([PropTypes.bool, PropTypes.object]).isRequired
}