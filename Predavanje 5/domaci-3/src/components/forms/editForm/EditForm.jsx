import React, { useContext, useState } from 'react';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import { useHistory, useLocation } from 'react-router-dom';

const EditForm = ({context}) => {
    const history = useHistory();
    const location = useLocation();
    if (!location?.state) {
        history.goBack();
    }
    const data = location.state.data;

    const [values, setValues] = useState(Object.values(data));

    const { dispatch } = useContext(context);

    const header = Object.keys(data);

    const add = () => {
        console.log(values);
        dispatch({ type: 'edit', data: values });
        history.goBack();
    }

    const handleChange = (e, index) => {
        setValues((state) => {
            let tempVal = [...state];
            tempVal[index] = e.target.value;
            return tempVal;
        });
    };

    return <Form style={{ display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
        <Row>
            {

                Array.isArray(header) &&
                header.map((_, index) => {
                    if (index !== 0) {
                        return <Col key={index}>
                            <Form.Control value={values[index]} onChange={e => handleChange(e, index)} />
                        </Col>;
                    } else {
                        return <></>;
                    }
                })
            }
        </Row>
        <Button style={{ marginTop: 20 }} variant="dark" type="submit" onClick={add}>
            Update
        </Button>
    </Form>
}

export default EditForm;