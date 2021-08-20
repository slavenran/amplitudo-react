import React, { useContext, useEffect, useState } from 'react';
import CustomTable from '../../components/customTable/CustomTable';
import MoviesData from '../../context/MoviesData';
import style from './Movies.module.css';
import Button from 'react-bootstrap/Button';
import AddForm from '../../components/forms/addForm/AddForm';
import { useHistory, useRouteMatch } from 'react-router-dom';

const Movies = () => {
    const netData = useRouteMatch();
    const history = useHistory();

    const { list, dispatch } = useContext(MoviesData);

    const [addForm, setAddForm] = useState(false);
    const [title, setTitle] = useState('');
    const [director, setDirector] = useState('');
    const [actors, setActors] = useState('');
    const [year, setYear] = useState(2000);

    const header = ["Id", "Title", "Director", "Actors", "Year"];

    // passing data through route
    const goToEdit = (id, title, director, actors, year) => {
        history.push(`${netData.path}/edit`, { data: { id: id, title: title, director: director, actors: actors, year: year }});
    }

    const deleteFromTable = (id) => {
        dispatch({ type: "delete", id: id });
    }

    useEffect(() => {
        setTitle('');
        setDirector('');
        setActors('');
        setYear(2000);
    }, [list])

    return <>
        <div className={style.container}>
            <CustomTable header={header} rows={list} goToEdit={goToEdit} deleteFromTable={deleteFromTable} />
        </div>
        <div className={style.container}>
            {
                addForm ?
                    <AddForm setView={() => setAddForm(false)}
                        data={{ title: title, director: director, actors: actors, year: year }}
                        functions={{title: setTitle, director: setDirector, actors:  setActors, year: setYear }}
                        context={MoviesData} />
                    :
                    <Button variant="dark" onClick={() => setAddForm(true)}>Add</Button>
            }
        </div>
    </>;
}

export default Movies;