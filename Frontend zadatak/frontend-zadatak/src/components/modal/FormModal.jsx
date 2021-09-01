import React from 'react';
import { useWidth } from '../../context/WidthContext';
import Modal from 'antd/lib/modal';
import PropTypes from 'prop-types';
import '../fileDetails/fileModalForm/Modal.scss';

const FormModal = ({ children, show, setShow }) => {

    const [width] = useWidth(); // dynamically set the width of modal

    return <Modal
        centered title=""
        width={width > 1100 ? "40vw" : width > 800 ? "60vw" : "80vw"}
        visible={show}
        onCancel={() => setShow(false)}
        footer={null}
        closable={false}>
        {children}
    </Modal>
}

export default FormModal;

FormModal.propTypes = {
    children: PropTypes.element.isRequired,
    show: PropTypes.bool.isRequired,
    setShow: PropTypes.func.isRequired
}