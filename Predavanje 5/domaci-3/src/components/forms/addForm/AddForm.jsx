import React, { useContext } from 'react';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';

const AddForm = ({ setView, data, context }) => {
  const { dispatch } = useContext(context);

  const header = Object.keys(data);

  const add = () => {
    dispatch({ type: 'add', data: data });
    setView();
  }

  const handleChange = (e, item) => data[item][1](e.target.value);

  return <Form style={{ display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
    <Row>
      {
        Array.isArray(header) &&
        header.map((item, index) => {
          return <Col key={index}>
            <Form.Control placeholder={item.charAt(0).toUpperCase() + item.slice(1)} onChange={e => handleChange(e, item)} />
          </Col>
        })
      }
    </Row>
    <Button style={{ marginTop: 20 }} variant="dark" type="submit" onClick={add}>
      Add
    </Button>
  </Form>
}

export default AddForm;