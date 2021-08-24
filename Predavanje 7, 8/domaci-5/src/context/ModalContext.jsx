import React, { createContext, useContext, useState } from 'react';
import ModalForm from '../components/modal/ModalForm';

const ModalContext = createContext();

const ModalProvider = ({ children }) => {
    const [showModal, setShowModal] = useState(false);
    const [title, setTitle] = useState(null);
    const [content, setContent] = useState(null);
    const [footer, setFooter] = useState(null);

    const handleClose = () => setShowModal(false);

    const data = {
        open: (data) => {
            data.title && setTitle(data.title);
            data.content && setContent(data.content);
            data.footer && setFooter(data.footer);
            setShowModal(true);
        },
        close: () => {
            setTitle(null);
            setContent(null);
            setFooter(null);
            setShowModal(false);
        }
    }

    return <ModalContext.Provider value={data}>
        <ModalForm
            title={title}
            children={content}
            footer={footer}
            show={showModal}
            handleClose={() => handleClose()} />
        {children}
    </ModalContext.Provider>
}

export const useModal = () => {
    const data = useContext(ModalContext);
    return data;
}

export default ModalProvider;