import React from 'react';
import { useForm } from 'react-hook-form';
import { useWidth } from '../../../../context/WidthContext';
import Modal from 'antd/lib/modal';
import Form from 'antd/lib/form';
import Input from 'antd/lib/input';
import Select from 'antd/lib/select';
import Button from 'antd/lib/button';
import style from '../Form.module.scss';

const { Option } = Select;

const CreateFieldModal = ({ showAddField, setShowAddField, setFieldData }) => {
    const { register, handleSubmit, setValue, formState: { errors } } = useForm();

    const [width] = useWidth();

    const onSubmit = (data) => {
        setFieldData(data);
        setShowAddField(false);
    }

    return <Modal centered title="" width={width > 1200 ? "30vw" : width > 600 ? "60vw" : "80vw"} visible={showAddField} onCancel={() => setShowAddField(false)} footer={null} closable={false}>
        <Form style={{textAlign: 'center'}} labelCol={{ span: 6 }} wrapperCol={{ span: 14 }} onFinish={handleSubmit(onSubmit)}>
            <Form.Item style={{textAlign: 'left'}} label="Naziv polja: ">
                <Input type="text" placeholder="Naziv polja"
                    {...register("fieldName", {
                        required: {
                            value: true,
                            message: "Morate popuniti naziv novog polja"
                        }
                    })}
                    onChange={(e) => {
                        setValue("fieldName", e.target.value);
                    }} />
                <div style={{ color: "red" }}>{errors?.fieldName?.message}</div>
            </Form.Item>
            <Form.Item style={{textAlign: 'left'}} label="Tip: ">
                <Select
                    placeholder="Odaberite tip polja"
                    {...register("inputType", {
                        required: {
                            value: true,
                            message: "Morate odabrati tip polja"
                        }
                    })}
                    onChange={(e) => {
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
            <Button className={style.submit} type="primary" htmlType="submit">
                Potvrdi
            </Button>
        </Form>
    </Modal>
}

export default CreateFieldModal;