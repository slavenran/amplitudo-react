import React, { useEffect, useReducer, useState } from 'react';
import CustomTable from '../../components/customTable/CustomTable';
import books from '../../constants/books';
import BooksData from '../../context/BooksData';
import style from './Books.module.css';
import Button from 'react-bootstrap/Button';
import AddForm from '../../components/forms/addForm/AddForm';
import { useHistory, useRouteMatch } from 'react-router-dom';
import PrivateRoute from '../../privateRoute/PrivateRoute';
import EditForm from '../../components/forms/editForm/EditForm';

const movieReducer = (state, action) => {
    switch (action.type) {
        case "add":
            const newId = state.length + 1;
            return [...state, { id: newId, ...action.data }];
        case "edit":
            return state.map(item => {
                if (action.data[0] === item.id) {
                    return action.data;
                } else {
                    return item;
                }
            })
        case "delete":
            return state.filter(item => action.id !== item.id);
        default:
            return state;
    }
}

const Movies = () => {
    const netData = useRouteMatch();
    const history = useHistory();

    const [booksList, dispatch] = useReducer(movieReducer, books);
    const [addForm, setAddForm] = useState(false);
    const [editForm, setEditForm] = useState(false);
    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState('');
    const [year, setYear] = useState(2000);

    const header = ["Id", "Title", "Author", "Year"];

    const goToEdit = (id, title, author, year) => {
        history.push(`${netData.path}/edit`, { data: { id: id, title: title, author: author, year: year }, targetLink: 'books' });
    }

    const deleteFromTable = (id) => {
        dispatch({type: "delete", id: id});
    }

    useEffect(() => {
        setTitle('');
        setAuthor('');
        setYear(2000);
    }, [booksList])

    return <BooksData.Provider value={{ list: booksList, dispatch: dispatch }}>
        <PrivateRoute exact path={`${netData.path}/edit`}>
            <EditForm setEdit={() => setEditForm(true)} context={BooksData} />
        </PrivateRoute>
        {
            editForm ?
                <></>
                :
                <>
                    <div className={style.container}>
                        <CustomTable header={header} rows={booksList} goToEdit={goToEdit} deleteFromTable={deleteFromTable} />
                    </div>
                    <div className={style.container}>
                        {
                            addForm ?
                                <AddForm setView={() => setAddForm(false)}
                                    data={{ title: [title, setTitle], author: [author, setAuthor], year: [year, setYear] }}
                                    context={BooksData} />
                                :
                                <Button variant="dark" onClick={() => setAddForm(true)}>Add</Button>
                        }
                    </div>
                </>
        }

    </BooksData.Provider>;
}

export default Movies;