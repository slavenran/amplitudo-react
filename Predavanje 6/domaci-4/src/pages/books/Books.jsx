import React, { useEffect, useState } from 'react';
import CustomTable from '../../components/customTable/CustomTable';
import style from './Books.module.css';
import Button from 'react-bootstrap/Button';
import { useHistory } from 'react-router-dom';
import { deleteBook, getAllBooks } from '../../services/books';
import Modal from 'react-bootstrap/Modal';

const headers = [
    "Genre",
    "Id",
    "ISBN",
    "Published date",
    "Publisher name",
    "Writer name"
]

const Books = () => {
    const history = useHistory();

    const [apiBookList, setApiBookList] = useState();
    const [showModal, setShowModal] = useState(false);
    const [modalData, setModalData] = useState();
    const [refresh, setRefresh] = useState(false);

    const handleClose = () => setShowModal(false);

    const deleteInstance = () => {
        deleteBook(modalData?.id)
            .then(() => {
                handleClose();
                setRefresh(prevState => !prevState);
            }).catch((err) => {
                console.log(err);
            });
    }

    useEffect(() => {
        getAllBooks()
            .then((r) => {
                console.log(r?.data);
                const data = r?.data.map(item => {
                    return {
                        genre: item.genre,
                        id: item.id,
                        isbn: item.isbn,
                        publishedDate: item.publishedDate,
                        publisherName: item.publisherName,
                        writerName: item.writerName,
                        edit: <Button variant="danger" onClick={() => history.push(`books/${item.id}`)}>Edit</Button>,
                        delete: <Button variant="danger" onClick={() => {
                            setModalData(item);
                            setShowModal(true);
                        }}>Delete</Button>
                    }
                });
                setApiBookList(data);
            })
            .catch((err) => {
                console.log(err);
            });
    }, [refresh, history])

    return <>
        <Modal show={showModal} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Delete a book</Modal.Title>
            </Modal.Header>
            <Modal.Body>Are you sure you want to delete {modalData?.isbn}?</Modal.Body>
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
            <CustomTable header={headers} rows={apiBookList} />
        </div>
        <div className={style.container}>
            <Button variant="dark" onClick={() => history.push('books/add')}>Add</Button>
        </div>
    </>
}

export default Books;