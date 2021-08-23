import React, { useState } from 'react';
import { useQuery, useQueryClient } from 'react-query';
import { useHistory } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import ModalDelete from '../modal/ModalDelete';
import TableData from '../table/Table';

const PageDataLayout = ({
    headers,
    getData,
    getDataQueryKey,
    deleteData,
    deleteDataKey,
    routeAdd,
    routeEdit,
    modalTitleName
}) => {
    const history = useHistory();

    const [modalData, setModalData] = useState();

    const { data, isLoading } = useQuery(getDataQueryKey, getData);
    const queryClient = useQueryClient();

    const onDelete = () => {
        if (modalData?.id) {
            deleteData(modalData?.id)
                .then(() => {
                    queryClient.invalidateQueries(getDataQueryKey);
                })
                .catch((err) => {
                    console.log(err);
                });
        }
    }

    return <div>
        {isLoading ? <div>Loading</div> :
            <TableData headers={[...headers,
            { key: '', title: 'Izmijeni', render: (data) => <button onClick={() => history.push(`/${routeEdit}/${data.id}`)}>Izmijeni</button> },
            {
                key: '', title: 'Obrisi', render: (data) => <ModalDelete
                    onDelete={onDelete}
                    // modalData fetches correct data only after we click on delete button
                    name={modalData ? modalData[deleteDataKey] : ''}
                    titleName={modalTitleName}
                    onBtnClick={() => setModalData(data)} />
            }]}
                rows={data?.data} />
        }
        <Button variant="primary" onClick={() => history.push(routeAdd)}>
            Dodaj
        </Button>
    </div>
}

export default PageDataLayout;