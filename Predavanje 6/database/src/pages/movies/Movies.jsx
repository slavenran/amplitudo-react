import React, { useEffect, useState } from 'react';
import NavbarTop from '../../components/navbar/Navbar';
import TableData from '../../components/table/Table';
import { deleteMovie, getAllMovies } from '../../services/movies';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { useHistory } from 'react-router-dom';

const headers = [
    'Reziser',
    'Trajanje',
    'Id',
    'Naziv',
    'Ocjena',
    'Scenarista',
    'Izmijeni',
    'Obrisi'
];

const Movies = () => {
    const history = useHistory();
    const [rows, setRows] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [refresh, setRefresh] = useState(0);
    const [modalData, setModalData] = useState();

    const onDelete = () => {
        if (modalData?.id) {
            deleteMovie(modalData?.id)
            .then(() => {
                setIsModalOpen(false);
                setRefresh(prevState => prevState + 1);
            })
            .catch((err) => {
                console.log(err);
            });
        }
    }

    useEffect(() => {
        getAllMovies()
            .then((r) => {
                console.log(r?.data);
                const data = r?.data.map(item => {
                    return {
                        directorName: item.directorName,
                        duration: item.duration,
                        id: item.id,
                        name: item.name,
                        rating: item.rating,
                        writerName: item.writerName,
                        edit: <button onClick={() => history.push(`/movies/${item.id}`)}>Izmijeni</button>,
                        delete: <button onClick={() => {
                            setModalData(item);
                            setIsModalOpen(true);
                        }}>Izbrisi</button>
                    }
                });
                setRows(data);
            })
            .catch((err) => {
                console.log(err);
            })
    }, [refresh])

    return <div>
        <Modal show={isModalOpen} onHide={() => setIsModalOpen(false)}>
            <Modal.Header closeButton>
                <Modal.Title>Brisanje filma</Modal.Title>
            </Modal.Header>
            <Modal.Body>Da li ste sigurni da zelite izbrisati {modalData?.name}?</Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={() => setIsModalOpen(false)}>
                    Odustani
                </Button>
                <Button variant="primary" onClick={() => onDelete()}>
                    Izbrisi
                </Button>
            </Modal.Footer>
        </Modal>
        <NavbarTop />
        <button onClick={() => history.push('/movies/add')}>Dodaj</button>
        <TableData headers={headers} rows={rows} />
    </div>
}

export default Movies;