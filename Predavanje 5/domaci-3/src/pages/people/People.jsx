import React, { useEffect, useReducer, useState } from 'react';
import CustomTable from '../../components/customTable/CustomTable';
import people from '../../constants/people';
import PeopleData from '../../context/PeopleData';
import style from './People.module.css';
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

const People = () => {
    const netData = useRouteMatch();
    const history = useHistory();

    const [peopleList, dispatch] = useReducer(movieReducer, people);
    const [addForm, setAddForm] = useState(false);
    const [editForm, setEditForm] = useState(false);
    const [name, setName] = useState('');
    const [surname, setSurname] = useState('');
    const [age, setAge] = useState(18);
    const [city, setCity] = useState('');

    const header = ["Id", "Name", "Surname", "Age", "City"];

    const goToEdit = (id, name, surname, age, city) => {
        history.push(`${netData.path}/edit`, { data: { id: id, name: name, surname: surname, age: age, city: city }, targetLink: 'people' });
    }

    const deleteFromTable = (id) => {
        dispatch({type: "delete", id: id});
    }

    useEffect(() => {
        setName('');
        setSurname('');
        setAge(18);
        setCity('');
    }, [peopleList])

    return <PeopleData.Provider value={{ list: peopleList, dispatch: dispatch }}>
        <PrivateRoute exact path={`${netData.path}/edit`}>
            <EditForm setEdit={() => setEditForm(true)} context={PeopleData} />
        </PrivateRoute>
        {
            editForm ?
                <></>
                :
                <>
                    <div className={style.container}>
                        <CustomTable header={header} rows={peopleList} goToEdit={goToEdit} deleteFromTable={deleteFromTable} />
                    </div>
                    <div className={style.container}>
                        {
                            addForm ?
                                <AddForm setView={() => setAddForm(false)}
                                    data={{ name: [name, setName], surname: [surname, setSurname], age: [age, setAge], city: [city, setCity] }}
                                    context={PeopleData} />
                                :
                                <Button variant="dark" onClick={() => setAddForm(true)}>Add</Button>
                        }
                    </div>
                </>
        }

    </PeopleData.Provider>;
}

export default People;