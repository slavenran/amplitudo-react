import React from 'react';
import Table from 'react-bootstrap/Table';

const TableComponent = ({header, rows, onRowClick}) => {
    return <Table striped bordered hover variant="dark">
        <thead>
            <tr className="table-header">
                {
                    Array.isArray(header) &&
                        header.map((item, index) => {
                            return <th key={index}>{item}</th>
                        })
                }
            </tr>
        </thead>
        <tbody>
        {
            Array.isArray(rows) && 
                rows.map(row => {
                    // console.log(Object.values(row));
                    return <tr className="table-row" key={row?.id} onClick={() => onRowClick(row)}>
                        {
                            Object.values(row).map((item, index) => {
                                // console.log(item, index);
                                return <td key={index}>{item}</td>;
                            })
                        }
                    </tr>
                })
        }
        </tbody>
    </Table>
}

export default TableComponent;