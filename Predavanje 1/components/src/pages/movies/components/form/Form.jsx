import React, { useContext, useState } from 'react';
import MoviesData from '../../../../context/MoviesData';

const Form = ({ returnToGrid, data }) => {
    // console.log("Passed data is: ", data);
    const { dispatch } = useContext(MoviesData);
    const [title, setTitle] = useState(data?.title ? data?.title : '');
    const [year, setYear] = useState(data?.year ? data?.year : 2010);

    const onSave = () => {
        if (data?.id) {
            // edit
            dispatch({ type: 'edit', data: { id: data?.id, title: title, year: year } });
        } else {
            dispatch({ type: 'add', data: { title: title, year: year } });
        }
        console.log(title, year);
        returnToGrid();
    }

    return <div>
        <input style={{ display: 'block' }}
            type="text" placeholder="Title"
            value={title} onChange={(e) => setTitle(e.target.value)} />
        <input style={{ display: 'block' }}
            type="number" placeholder="Year"
            value={year} onChange={(e) => setYear(e.target.value)} />
        <button onClick={() => onSave()}>Save</button>
    </div>;
}

export default Form;