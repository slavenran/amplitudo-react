import React, { useState } from 'react';
import { useQueryClient } from 'react-query';
import { deleteMovie, getAllMoviesWithPagination } from '../../services/movies';
import { useModal } from '../../context/ModalContext';
import PageLayout from '../../components/layouts/PageLayout';
import ModalDelete from '../../components/modal/ModalDelete';
import Button from 'react-bootstrap/Button';
import MovieForm from './form/MovieForm';
import TableDataWithPagination from '../../components/table2/Table2';
import Select from '../../components/select/Select';

const headers = [
    { key: 'id', title: 'Id' },
    { key: 'name', title: 'Naziv' },
    { key: 'duration', title: 'Trajanje' },
    { key: 'rating', title: 'Ocjena' },
    { key: 'directorName', title: 'Reziser' },
    { key: 'writerName', title: 'Scenarista' }
];

const Movies2 = () => {
    const { open } = useModal();

    const [modalData, setModalData] = useState();

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
        <TableDataWithPagination headers={[...headers,
        {
            key: 'Izmijeni', title: 'Izmijeni', render: (data) => <button onClick={() => open({
                title: `Promijeni film ${data?.name}`,
                content: <MovieForm id={data?.id} />
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
        queryKey="movies"
        queryFn={getAllMoviesWithPagination} />
        <Button variant="primary" onClick={() => open({
            title: "Dodaj film",
            content: <MovieForm id="add" />
        })}>
            Dodaj
        </Button>
        <Select optionLabel="directorName" />
    </PageLayout>
}

export default Movies2;