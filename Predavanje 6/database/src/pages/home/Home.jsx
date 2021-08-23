import React from 'react';
import NavbarTop from '../../components/navbar/Navbar';
import TableData from '../../components/table/Table';

const Home = () => {
    return <div>
        <NavbarTop />
        Home
        <TableData
            // headers={[
            //     { key: 'id', title: 'Id' },
            //     { key: 'name', title: 'Name' }
            // ]}
            // rows={[
            //     { id: 'Id 1', name: 'Name 1' },
            //     { id: 'Id 2', name: 'Name 2' }
            // ]}
        />
    </div>
}

export default Home;