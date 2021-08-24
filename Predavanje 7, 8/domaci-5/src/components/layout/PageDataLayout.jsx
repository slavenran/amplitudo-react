import React, { useState } from 'react';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { useModal } from '../../context/ModalContext';
import Button from 'react-bootstrap/Button';
import style from './Layout.module.css';
import CustomTable from '../customTable/CustomTable';
import ModalDelete from '../modal/ModalDelete';

const PageDataLayout = ({ headers, queryTitle, getAllQuery, instanceTitle, name, optionalName=null, deleteInstance, form: Form }) => {

    const { open } = useModal();

    const queryClient = useQueryClient();
    const { data, isLoading } = useQuery(queryTitle, getAllQuery);

    const [modalData, setModalData] = useState();

    const mutationDelete = useMutation(deleteInstance, {
        onSuccess: () => {
            // Invalidate and refetch
            queryClient.invalidateQueries(queryTitle);
        }
    });

    return <>
        {
            isLoading ? <div>Loading...</div>
                :
                <>
                    <div className={style.container}>
                        <CustomTable header={[...headers,
                        { key: "editModal", title: "Edit", render: (data) => <Button variant="danger" onClick={() => open({
                            title: `Update ${data[optionalName] ? data[name] + ' ' + data[optionalName] : data[name]}`,
                            content: <Form id={data.id} />
                        })}>Edit</Button> },
                        {
                            key: "delete", title: "Delete", render: (data) => <ModalDelete
                                onBtnClick={() => setModalData(data)}
                                title={instanceTitle}
                                instanceName={modalData ? `${modalData[name]}${modalData[optionalName] ? ' ' + modalData[optionalName] : ''}` : ''}
                                deleteFn={() => mutationDelete.mutate(modalData?.id)} />
                        }
                        ]} rows={data?.data} />
                    </div>
                    <div className={style.container}>
                        <Button variant="dark" onClick={() => open({
                            title: `Add a ${instanceTitle}`,
                            content: <Form id="add" />
                        })}>Add</Button>
                    </div>
                </>
        }
    </>
}

export default PageDataLayout;