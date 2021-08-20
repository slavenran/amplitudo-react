import React, { useContext, useEffect, useState } from 'react';
import CustomTable from '../../components/customTable/CustomTable';
import PeopleData from '../../context/PeopleData';
import style from './People.module.css';
import Button from 'react-bootstrap/Button';
import AddForm from '../../components/forms/addForm/AddForm';
import { useHistory, useRouteMatch } from 'react-router-dom';

const People = () => {
    const netData = useRouteMatch();
    const history = useHistory();

    const { list, dispatch } = useContext(PeopleData);

    const [addForm, setAddForm] = useState(false);
    const [name, setName] = useState('');
    const [surname, setSurname] = useState('');
    const [age, setAge] = useState(18);
    const [city, setCity] = useState('');

    const header = ["Id", "Name", "Surname", "Age", "City"];

    const goToEdit = (id, name, surname, age, city) => {
        history.push(`${netData.path}/edit`, { data: { id: id, name: name, surname: surname, age: age, city: city }, targetLink: 'people' });
    }

    const deleteFromTable = (id) => {
        dispatch({ type: "delete", id: id });
    }

    useEffect(() => {
        setName('');
        setSurname('');
        setAge(18);
        setCity('');
    }, [list])

    return <>
        <div className={style.container}>
            <CustomTable header={header} rows={list} goToEdit={goToEdit} deleteFromTable={deleteFromTable} />
        </div>
        <div className={style.container}>
            {
                addForm ?
                    <AddForm setView={() => setAddForm(false)}
                        data={{ name: name, surname: surname, age: age, city: city }}
                        functions={{ name: setName, surname: setSurname, age: setAge, city: setCity }}
                        context={PeopleData} />
                    :
                    <Button variant="dark" onClick={() => setAddForm(true)}>Add</Button>
            }
        </div>
    </>
}

export default People;