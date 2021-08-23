import React from 'react';
import Table from 'react-bootstrap/Table';

const TableData = ({ headers = [], rows = [] }) => {
    return <Table striped bordered hover>
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
                rows?.length &&
                rows.map(row => {
                    return <tr key={row?.id}>
                        {headers.map(headerItem => {
                            if (headerItem.render) {
                                return <td key={`${row?.id}${headerItem.key}`}>{headerItem.render(row)}</td>
                            } else {
                                return <td key={`${row?.id}${headerItem.key}`}>{row[headerItem.key]}</td>
                            }
                            // { Object.values(row).map(data => <td>{data}</td>) }
                        })}
                    </tr>
                })
            }
        </tbody>
    </Table>
}

export default TableData;