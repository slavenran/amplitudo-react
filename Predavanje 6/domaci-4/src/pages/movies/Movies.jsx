import React, { useEffect, useState } from 'react';
import CustomTable from '../../components/customTable/CustomTable';
import style from './Movies.module.css';
import Button from 'react-bootstrap/Button';
import { useHistory } from 'react-router-dom';
import { deleteMovie, getAllMovies } from '../../services/movies';
import Modal from 'react-bootstrap/Modal';

const headers = [
    "Director name",
    "Duration",
    "Id",
    "Name",
    "Rating",
    "Writer name"
]

const Movies = () => {
    const history = useHistory();

    const [apiMovieList, setApiMovieList] = useState();
    const [showModal, setShowModal] = useState(false);
    const [modalData, setModalData] = useState();
    const [refresh, setRefresh] = useState(false);

    const handleClose = () => setShowModal(false);

    const deleteInstance = () => {
        deleteMovie(modalData?.id)
            .then(() => {
                handleClose();
                setRefresh(prevState => !prevState);
            }).catch((err) => {
                console.log(err);
            });
    }

    useEffect(() => {
        getAllMovies()
            .then((r) => {
                const data = r?.data.map(item => {
                    return {
                        directorName: item.directorName,
                        duration: item.duration,
                        id: item.id,
                        name: item.name,
                        rating: item.rating,
                        writerName: item.writerName,
                        edit: <Button variant="danger" onClick={() => history.push(`movies/${item.id}`)}>Edit</Button>,
                        delete: <Button variant="danger" onClick={() => {
                            setModalData(item);
                            setShowModal(true);
                        }}>Delete</Button>
                    }
                });
                setApiMovieList(data);
            })
            .catch((err) => {
                console.log(err);
            });
    }, [refresh, history])

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
                <Button variant="danger" onClick={() => deleteInstance()}>
                    Delete
                </Button>
            </Modal.Footer>
        </Modal>
        <div className={style.container}>
            <CustomTable header={headers} rows={apiMovieList} />
        </div>
        <div className={style.container}>
            <Button variant="dark" onClick={() => history.push('movies/add')}>Add</Button>
        </div>
    </>;
}

export default Movies;