import React, { useEffect, useState } from 'react';
import CustomTable from '../../components/customTable/CustomTable';
import style from './People.module.css';
import Button from 'react-bootstrap/Button';
import { useHistory } from 'react-router-dom';
import { deletePerson, getAllPeople } from '../../services/people';
import Modal from 'react-bootstrap/Modal';

const headers = [
    "Age",
    "Date of birth",
    "First name",
    "Gender",
    "Id",
    "Last name",
    "Occupation"
]

const People = () => {
    const history = useHistory();

    const [apiPersonList, setApiPersonList] = useState();
    const [showModal, setShowModal] = useState(false);
    const [modalData, setModalData] = useState();
    const [refresh, setRefresh] = useState(false);

    const handleClose = () => setShowModal(false);

    const deleteInstance = () => {
        deletePerson(modalData?.id)
            .then(() => {
                handleClose();
                setRefresh(prevState => !prevState);
            }).catch((err) => {
                console.log(err);
            });
    }

    useEffect(() => {
        getAllPeople()
            .then((r) => {
                console.log(r?.data);
                const data = r?.data.map(item => {
                    return {
                        id: item.id,
                        firstName: item.firstName,
                        lastName: item.lastName,
                        age: item.age,
                        dateOfBirth: item.dateOfBirth,
                        gender: item.gender,
                        occupation: item.occupation,
                        edit: <Button variant="danger" onClick={() => history.push(`people/${item.id}`)}>Edit</Button>,
                        delete: <Button variant="danger" onClick={() => {
                            setModalData(item);
                            setShowModal(true);
                        }}>Delete</Button>
                    }
                });
                setApiPersonList(data);
            })
            .catch((err) => {
                console.log(err);
            });
    }, [refresh, history])

    return <>
        <Modal show={showModal} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Delete a person</Modal.Title>
            </Modal.Header>
            <Modal.Body>Are you sure you want to delete {modalData?.firstName} {modalData?.lastName}?</Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Cancel
                </Button>
                <Button variant="danger" onClick={() => deleteInstance()}>
                    Delete
                </Button>
            </Modal.Footer>
        </Modal>
        <div className={style.container}>
            <CustomTable header={headers} rows={apiPersonList} />
        </div>
        <div className={style.container}>
            <Button variant="dark" onClick={() => history.push('people/add')}>Add</Button>
        </div>
    </>
}

export default People;