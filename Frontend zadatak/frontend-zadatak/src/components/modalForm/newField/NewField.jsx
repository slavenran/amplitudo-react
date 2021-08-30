import React, { useState } from 'react';
import Col from 'antd/lib/col';
import Input from 'antd/lib/input';
import NewFieldModal from '../newFieldModal/NewFieldModal';

const NewField = ({ num, style, register, setValue, errors }) => {
    const [newFieldData, setNewFieldData] = useState(false);
    const [addRow, setAddRow] = useState(true);

    return <> 
    <NewFieldModal addRow={addRow} setAddRow={(e) => setAddRow(e)} setFieldData={(e) => setNewFieldData(e)} />
    {
        newFieldData ?
            <Col className={style.childCol} span={num} >
                <div>{newFieldData?.fieldName}</div>
                <Input className={style.input} type={newFieldData?.inputType}
                    placeholder={newFieldData?.fieldName} defaultValue=''
                    {...register(newFieldData?.fieldName?.toLowerCase(), {
                        required: {
                            value: true,
                            message: `Morate popuniti ${newFieldData?.fieldName}`
                        }
                    })}
                    onChange={(e) => {
                        setValue(newFieldData?.fieldName?.toLowerCase(), { title: newFieldData?.fieldName, value: newFieldData?.inputType === "checkbox" ? e.target.checked : e.target.value, type: newFieldData?.inputType });
                    }}
                />
                <div style={{ color: "red" }}>{errors[newFieldData?.fieldName?.toLowerCase()]?.message}</div>
            </Col >
            :
            <></>
    }
    </>
}

export default NewField;