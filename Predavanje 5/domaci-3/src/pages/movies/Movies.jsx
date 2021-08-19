import React, { useEffect, useReducer, useState } from 'react';
import CustomTable from '../../components/customTable/CustomTable';
import movies from '../../constants/movies';
import MoviesData from '../../context/MoviesData';
import style from './Movies.module.css';
import Button from 'react-bootstrap/Button';
import AddForm from '../../components/forms/addForm/AddForm';
import { useHistory, useRouteMatch } from 'react-router-dom';
import PrivateRoute from '../../privateRoute/PrivateRoute';
import EditForm from '../../components/forms/editForm/EditForm';

const movieReducer = (state, action) => {
    switch (action.type) {
        case "add":
            // adding new entry and providing id
            const newId = state.length + 1;
            return [...state, { id: newId, ...action.data }];
        case "edit":
            // finding state item that matches dispatched action
            return state.map(item => {
                if (action.data[0] === item.id) {
                    return action.data;
                } else {
                    return item;
                }
            })
        case "delete":
            // returning all items except the one that matches the action
            return state.filter(item => action.id !== item.id);
        default:
            return state;
    }
}

const Movies = () => {
    const netData = useRouteMatch();
    const history = useHistory();

    const [movieList, dispatch] = useReducer(movieReducer, movies);
    const [addForm, setAddForm] = useState(false);
    const [editForm, setEditForm] = useState(false);
    const [title, setTitle] = useState('');
    const [director, setDirector] = useState('');
    const [actors, setActors] = useState('');
    const [year, setYear] = useState(2000);

    const header = ["Id", "Title", "Director", "Actors", "Year"];

    // passing data through route
    const goToEdit = (id, title, director, actors, year) => {
        history.push(`${netData.path}/edit`, { data: { id: id, title: title, director: director, actors: actors, year: year }, targetLink: 'movies' });
    }

    const deleteFromTable = (id) => {
        dispatch({type: "delete", id: id});
    }

    useEffect(() => {
        setTitle('');
        setDirector('');
        setActors('');
        setYear(2000);
    }, [movieList])

    return <MoviesData.Provider value={{ list: movieList, dispatch: dispatch }}>
        <PrivateRoute exact path={`${netData.path}/edit`}>
            <EditForm setEdit={() => setEditForm(true)} context={MoviesData} />
        </PrivateRoute>
        {
            // changes view when entry in the table is clicked (needs fix, has a split second glitch)
            editForm ?
                <></>
                :
                <>
                    <div className={style.container}>
                        <CustomTable header={header} rows={movieList} goToEdit={goToEdit} deleteFromTable={deleteFromTable} />
                    </div>
                    <div className={style.container}>
                        {
                            addForm ?
                                <AddForm setView={() => setAddForm(false)}
                                    data={{ title: [title, setTitle], director: [director, setDirector], actors: [actors, setActors], year: [year, setYear] }}
                                    context={MoviesData} />
                                :
                                <Button variant="dark" onClick={() => setAddForm(true)}>Add</Button>
                        }
                    </div>
                </>
        }

    </MoviesData.Provider>;
}

export default Movies;