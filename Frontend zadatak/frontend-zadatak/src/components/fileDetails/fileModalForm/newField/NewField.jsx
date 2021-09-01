import React, { useEffect, useState } from 'react';
import Col from 'antd/lib/col';
import Input from 'antd/lib/input';
import NewFieldModal from '../createFieldModal/CreateFieldModal';
import style from '../Form.module.scss';

const NewField = ({ num, register, setValue, errors }) => {
    const [newFieldData, setNewFieldData] = useState(false);
    const [showAddField, setShowAddField] = useState(true);

    // setting the data to allow saving when adding checkbox (setting checkbox to false default value)
    useEffect(() => {
        if (newFieldData !== false) {
            setValue(newFieldData?.fieldName?.toLowerCase(), { title: newFieldData?.fieldName, value: newFieldData?.inputType === "checkbox" ? false : '', type: newFieldData?.inputType });
        }
    }, [newFieldData, setValue])

    return <>
        <NewFieldModal showAddField={showAddField} setShowAddField={(e) => setShowAddField(e)} setFieldData={(e) => setNewFieldData(e)} />
        {
            newFieldData &&
                <Col className={style.childCol} span={num} >
                    <div>{newFieldData?.fieldName}</div>
                    <Input className={style.input} type={newFieldData?.inputType}
                        placeholder={newFieldData?.fieldName}
                        {...register(newFieldData?.fieldName?.toLowerCase(), {
                            validate: value => value?.value !== '' ? true : `Morate popuniti ${newFieldData?.fieldName?.toLowerCase()}`
                        })}
                        onChange={(e) => {
                            setValue(newFieldData?.fieldName?.toLowerCase(), {
                                title: newFieldData?.fieldName,
                                value: newFieldData?.inputType === "checkbox" ? e.target.checked : e.target.value,
                                type: newFieldData?.inputType
                            });
                        }}
                    />
                    <div style={{ color: "red" }}>{errors[newFieldData?.fieldName?.toLowerCase()]?.message}</div>
                </Col >
        }
    </>
}

export default NewField;