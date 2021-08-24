import React from 'react';
import Modal from 'react-bootstrap/Modal';

const ModalForm = ({ title, children, footer = null, show, handleClose }) => {
    return <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
            <Modal.Title>{title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>{children}</Modal.Body>
        {footer && <Modal.Footer>{footer}</Modal.Footer>}
    </Modal>
}

export default ModalForm;