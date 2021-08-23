import React, { useEffect, useState } from 'react';
import Table from 'react-bootstrap/Table';
import Pagination from 'react-bootstrap/Pagination';
import { useQuery } from 'react-query';

const TableDataWithPagination = ({ headers = [], queryKey, queryFn }) => {
    const pageSize = 5;

    const [numberOfPages, setNumberOfPages] = useState(0);
    const [activePage, setActivePage] = useState(0);

    const { data } = useQuery([queryKey, activePage], () => queryFn(pageSize, activePage), {
        enabled: Boolean(queryKey && queryFn)
    });

    useEffect(() => {
        const totalCount = data?.headers['x-total-count'];
        const numberOfPages = Math.ceil(totalCount / pageSize);
        console.log(numberOfPages);
        setNumberOfPages(numberOfPages);
    }, [data?.headers['x-total-count']]);

    return <div>
        <Table striped bordered hover>
            <thead>
                <tr>
                    {
                        headers?.length &&
                        headers.map(item => <th key={item.key}>{item.title}</th>)
                    }
                </tr>
            </thead>
            <tbody>
                {
                    data?.data?.length &&
                    data?.data.map(row => {
                        return <tr key={row?.id}>
                            {headers.map(headerItem => {
                                if (headerItem.render) {
                                    return <td
                                        key={`${row?.id}${headerItem.key}`}>
                                        {headerItem.render(row)}</td>
                                } else {
                                    return <td
                                        key={`${row?.id}${headerItem.key}`}>
                                        {row[headerItem.key]}</td>
                                }
                                // { Object.values(row).map(data => <td>{data}</td>) }
                            })}
                        </tr>
                    })
                }
            </tbody>
        </Table>
        <Pagination>
            {numberOfPages && [...Array(numberOfPages)].map((x, i) => <Pagination.Item key={i} active={i === activePage} onClick={() => setActivePage(i)}>
                {i + 1}
            </Pagination.Item>)}
        </Pagination>
    </div>
}

export default TableDataWithPagination;