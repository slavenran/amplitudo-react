import React from 'react';
import Table from 'react-bootstrap/Table';

const CustomTable = ({ header: headers, rows }) => {
    return <Table responsive striped bordered hover variant="dark">
        <thead>
            <tr>
                {
                    Array.isArray(headers) &&
                    headers.map((item, index) => <th key={item.key}>{item.title}</th>)
                }
            </tr>
        </thead>
        <tbody>
            {
                Array.isArray(rows) &&
                rows.map(row => {
                    return <tr key={row.id}>
                        {
                            headers.map((item, index) => {
                                return item.render ?
                                <td key={index}>{item.render(row)}</td>
                                :
                                <td key={index}>{row[item.key]}</td>
                            })
                        }
                    </tr>
                })
            }
        </tbody>
    </Table>
}

export default CustomTable;