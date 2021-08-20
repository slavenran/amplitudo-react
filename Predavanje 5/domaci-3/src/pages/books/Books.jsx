import React, { useContext, useEffect, useState } from 'react';
import CustomTable from '../../components/customTable/CustomTable';
import BooksData from '../../context/BooksData';
import style from './Books.module.css';
import Button from 'react-bootstrap/Button';
import AddForm from '../../components/forms/addForm/AddForm';
import { useHistory, useRouteMatch } from 'react-router-dom';

const Books = () => {
    const netData = useRouteMatch();
    const history = useHistory();

    const { list, dispatch } = useContext(BooksData);

    const [addForm, setAddForm] = useState(false);
    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState('');
    const [year, setYear] = useState(2000);

    const header = ["Id", "Title", "Author", "Year"];

    const goToEdit = (id, title, author, year) => {
        history.push(`${netData.path}/edit`, { data: { id: id, title: title, author: author, year: year }, targetLink: 'books' });
    }

    const deleteFromTable = (id) => {
        dispatch({ type: "delete", id: id });
    }

    useEffect(() => {
        setTitle('');
        setAuthor('');
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
                        data={{ title: title, author: author, year: year }}
                        functions={{ title: setTitle, author: setAuthor, year: setYear }}
                        context={BooksData} />
                    :
                    <Button variant="dark" onClick={() => setAddForm(true)}>Add</Button>
            }
        </div>
    </>
}

export default Books;