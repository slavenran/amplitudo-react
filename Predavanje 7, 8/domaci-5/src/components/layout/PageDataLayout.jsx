import React, { useState } from 'react';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { useHistory } from 'react-router';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import style from './Layout.module.css';
import CustomTable from '../customTable/CustomTable';

const PageDataLayout = ({ headers, queryTitle, getAllQuery, deleteInstance }) => {

    const history = useHistory();

    const queryClient = useQueryClient();
    const { data, isLoading } = useQuery(queryTitle, getAllQuery);

    const [showModal, setShowModal] = useState(false);
    const [modalData, setModalData] = useState();

    const handleClose = () => setShowModal(false);

    const mutationDelete = useMutation(deleteInstance, {
        onSuccess: () => {
            // Invalidate and refetch
            handleClose();
            queryClient.invalidateQueries(queryTitle);
        }
    });

    return <>
        <Modal show={showModal} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Delete a movie</Modal.Title>
            </Modal.Header>
            <Modal.Body>Are you sure you want to delete {modalData?.name}?</Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Cancel
                </Button>
                <Button variant="danger" onClick={() => mutationDelete.mutate(modalData?.id)}>
                    Delete
                </Button>
            </Modal.Footer>
        </Modal>
        {
            isLoading ? <div>Loading...</div>
                :
                <>
                    <div className={style.container}>
                        <CustomTable header={[...headers,
                        { key: "edit", title: "Edit", render: (data) => <Button variant="danger" onClick={() => history.push(`${queryTitle}/${data.id}`)}>Edit</Button> },
                        {
                            key: "delete", title: "Delete", render: (data) => <Button variant="danger" onClick={() => {
                                setModalData(data);
                                setShowModal(true);
                            }}>Delete</Button>
                        }
                        ]} rows={data?.data} />
                    </div>
                    <div className={style.container}>
                        <Button variant="dark" onClick={() => history.push(`${queryTitle}/add`)}>Add</Button>
                    </div>
                </>
        }
    </>
}

export default PageDataLayout;