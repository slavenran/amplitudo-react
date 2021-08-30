import React, { useEffect, useState } from 'react';
import Modal from 'antd/lib/modal';
import Form from 'antd/lib/form';
import Input from 'antd/lib/input';
import Select from 'antd/lib/select';
import Button from 'antd/lib/button';
import { useForm } from 'react-hook-form';
import getWindowDimensions from '../../../functions/getWindowDimesions';

const { Option } = Select;

const NewFieldModal = ({ addRow, setAddRow, setFieldData }) => {
    const [width, setWidth] = useState(getWindowDimensions);

    const { register, handleSubmit, setValue, formState: { errors } } = useForm();

    const onSubmit = (data) => {
        setFieldData(data);
        handleCancel();
    }

    const handleCancel = () => {
        setAddRow(false);
    }

    useEffect(() => {
        function handleResize() {
            setWidth(getWindowDimensions);
        }

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return <Modal centered title="" width={width > 800 ? "30vw" : width > 600 ? "60vw" : "80vw"} visible={addRow} onCancel={() => handleCancel()} footer={null} closable={false}>
        <Form onFinish={handleSubmit(onSubmit)}>
            <Form.Item name="fieldName" label="Ime polja: ">
                <Input type="text" placeholder="Naziv polja"
                    {...register("fieldName", {
                        required: {
                            value: true,
                            message: "Morate popuniti naziv novog polja"
                        }
                    })}
                    onChange={(e) => {
                        console.log(e.target.value);
                        setValue("fieldName", e.target.value);
                    }} />
                <div style={{ color: "red" }}>{errors?.fieldName?.message}</div>
            </Form.Item>
            <Form.Item name="inputType" label="Tip: ">
                <Select
                    placeholder="Select a type of input"
                    {...register("inputType", {
                        required: {
                            value: true,
                            message: "Morate odabrati tip polja"
                        }
                    })}
                    onChange={(e) => {
                        console.log(e);
                        setValue("inputType", e);
                    }}
                    allowClear
                >
                    <Option value="text">Text</Option>
                    <Option value="checkbox">Checkbox</Option>
                    <Option value="textarea">Text area</Option>
                </Select>
                <div style={{ color: "red" }}>{errors?.inputType?.message}</div>
            </Form.Item>
            <Button type="primary" htmlType="submit">
                Potvrdi
            </Button>
        </Form>
    </Modal>
}

export default NewFieldModal;