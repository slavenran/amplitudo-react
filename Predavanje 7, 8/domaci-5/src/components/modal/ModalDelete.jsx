import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

const ModalDelete = ({ onBtnClick, title, instanceName, deleteFn }) => {
    const [showModal, setShowModal] = useState(false);

    const handleClose = () => setShowModal(false);

    return <>
        <Button variant="danger" onClick={() => {
            onBtnClick();
            setShowModal(true);
        }}>Delete</Button>
        <Modal show={showModal} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Delete a {title}?</Modal.Title>
            </Modal.Header>
            <Modal.Body>Are you sure you want to delete {instanceName}?</Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Cancel
                </Button>
                <Button variant="danger" onClick={() => deleteFn()}>
                    Delete
                </Button>
            </Modal.Footer>
        </Modal>
    </>
}

export default ModalDelete