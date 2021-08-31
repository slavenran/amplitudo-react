import React from 'react';
import { useWidth } from '../../context/WidthContext';
import Modal from 'antd/lib/modal';

const FormModal = ({children, show, setShow}) => {
    
    const [width] = useWidth(); // dynamically set the width of modal

    const handleCancel = () => {
        setShow(false); // close modal
    }

    return <Modal centered title="" width={width > 1100 ? "40vw" : width > 800 ? "60vw" : "80vw"} visible={show} onCancel={() => handleCancel()} footer={null} closable={false}>
        {children}
    </Modal>
}

export default FormModal;