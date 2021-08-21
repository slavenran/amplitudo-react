import React from 'react';
import Table from 'react-bootstrap/Table';

const CustomTable = ({ header, rows }) => {
    return <Table responsive striped bordered hover variant="dark">
        <thead>
            <tr>
                {
                    Array.isArray(header) &&
                    header.map((item, index) => <th key={index}>{item}</th>)
                }
                <th></th>
                <th></th>
            </tr>
        </thead>
        <tbody>
            {
                Array.isArray(rows) &&
                rows.map(row => {
                    return <tr key={row.id}>{
                        Object.values(row).map((item, index) => <td key={index}>{item}</td>)
                    }
                    </tr>
                })
            }
        </tbody>
    </Table>
}

export default CustomTable;