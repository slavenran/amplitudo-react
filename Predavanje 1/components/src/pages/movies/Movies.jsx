import React, { useReducer, useState } from 'react';
import MoviesData from '../../context/MoviesData';
import Form from './components/form/Form';
import Grid from './components/grid/Grid';
import movies from '../../constants/movies';
import Button from 'react-bootstrap/Button';

const changeMovies = (state, action) => {
    switch (action.type) {
        case 'filter':
            return action.data.length > 0 ? movies.filter(item => item.title.includes(action.data)) : movies;
        case 'add':
            const newId = movies.length + 1;
            // state.push(action.data) - pogresno, state ne smiju da se direktno mijenjaju
            return [...movies, { id: newId, ...action.data }];
        case 'edit':
            // action.data {id, title, year}
            return state.map(item => {
                if (item.id === action.data.id) {
                    return action.data;
                }
                return item;
            });
        default:
            return;
    }
}

const Movies = () => {
    const [isGridInView, setIsGridInView] = useState(true);   // grid ili form
    const [moviesList, dispatch] = useReducer(changeMovies, movies);
    const [selectedRow, setSelectedRow] = useState({});

    const onRowClick = (rowData) => {
        console.log(rowData);
        setSelectedRow(rowData);
        setIsGridInView(false);
    }

    return <MoviesData.Provider value={{ list: moviesList, dispatch: (e) => dispatch(e) }}>
        <div className="container">
            <div>
                <Button variant="dark" onClick={() => setIsGridInView(true)}>Prikazi filmove</Button>
                <Button variant="dark" onClick={() => setIsGridInView(false)}>Dodaj novi film</Button>
                <Button variant="dark" onClick={() => setIsGridInView(false)}>Izmijeni film</Button>
            </div>
            <div>
                {
                    isGridInView ?
                        <Grid onRowClick={onRowClick} /> :
                        <Form returnToGrid={() => {
                            setIsGridInView(true);
                            setSelectedRow({});
                        }} data={selectedRow} />
                }
            </div>
        </div>
    </MoviesData.Provider>
}

export default Movies;