import React from 'react';
import './Table.css';

const Table = () => {
    return  <table className="container">
                <th className="table-header">
                    <td>Ime</td>
                    <td>Prezime</td>
                </th>
                <tr className="table-row">
                    <td>Slaven</td>
                    <td>Ranisavljevic</td>
                </tr>
                <tr className="table-row">
                    <td>Memanja</td>
                    <td>Kumkulicic</td>
                </tr>
            </table>
}

export default Table;