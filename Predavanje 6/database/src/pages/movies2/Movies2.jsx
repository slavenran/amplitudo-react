import React, { useState } from 'react';
import { useQuery, useQueryClient } from 'react-query';
import { deleteMovie, getAllMovies } from '../../services/movies';
import PageLayout from '../../components/layouts/PageLayout';
import TableData from '../../components/table/Table';
import ModalDelete from '../../components/modal/ModalDelete';
import Button from 'react-bootstrap/Button';
import { useModal } from '../../context/ModalContext';
import MovieForm from './form/MovieForm';

const headers = [
    { key: 'id', title: 'Id' },
    { key: 'name', title: 'Naziv' },
    { key: 'duration', title: 'Trajanje' },
    { key: 'rating', title: 'Ocjena' },
    { key: 'directorName', title: 'Reziser' },
    { key: 'writerName', title: 'Scenarista' }
];

const Movies2 = () => {
    const { open, close } = useModal();

    const [modalData, setModalData] = useState();

    const { data } = useQuery("movies", getAllMovies);
    const queryClient = useQueryClient();

    const onDelete = () => {
        if (modalData?.id) {
            deleteMovie(modalData?.id)
                .then(() => {
                    queryClient.invalidateQueries("movies");
                })
                .catch((err) => {
                    console.log(err);
                });
        }
    }

    return <PageLayout>
        <TableData headers={[...headers,
        {
            key: 'Izmijeni', title: 'Izmijeni', render: (data) => <button onClick={() => open({
                title: `Promijeni film ${data?.name}`,
                content: <MovieForm id={data?.id} close={close} />
            })}>Izmijeni</button>
        },
        {
            key: 'Obrisi', title: 'Obrisi', render: (data) => <ModalDelete
                onDelete={onDelete}
                // modalData fetches correct data only after we click on delete button
                name={modalData ? modalData["name"] : ''}
                titleName={"film"}
                onBtnClick={() => setModalData(data)} />
        }]}
            rows={data?.data} />
        <Button variant="primary" onClick={() => open({
            title: "Dodaj film",
            content: <MovieForm id="add" close={close} />
        })}>
            Dodaj
        </Button>
    </PageLayout>
}

export default Movies2;