import React from 'react';
import Table from 'react-bootstrap/Table';

const TableData = ({ headers = [], rows = [] }) => {
    return <Table striped bordered hover>
        <thead>
            <tr>
                {
                    headers?.length &&
                    headers.map(item => <th>{item}</th>)
                }
            </tr>
        </thead>
        <tbody>
            {
                rows?.length &&
                rows.map(row => <tr>{Object.values(row).map(data => <td>{data}</td>)}</tr>)
            }
        </tbody>
    </Table>
}

export default TableData;