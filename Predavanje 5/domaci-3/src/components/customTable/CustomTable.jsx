import React from 'react';
import Button from 'react-bootstrap/esm/Button';
import Table from 'react-bootstrap/Table';

const CustomTable = ({ header, rows, goToEdit, deleteFromTable }) => {
    return <Table responsive striped bordered hover variant="dark">
        <thead>
            <tr>
                {
                    Array.isArray(header) &&
                    header.map((item, index) => <th key={index}>{item}</th>)
                }
                <th></th>
            </tr>
        </thead>
        <tbody>
            {
                Array.isArray(rows) &&
                rows.map(row => {
                    return <tr key={row.id}>{
                        Object.values(row).map((item, index) => <td key={index}  onClick={() => goToEdit(...Object.values(row))}>{item}</td>)
                    }
                    <td><Button variant="danger" onClick={() => deleteFromTable(row.id)}>Delete</Button></td>
                    </tr>
                })
            }
        </tbody>
    </Table>
}

export default CustomTable;