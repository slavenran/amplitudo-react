import React from 'react';
import { deletePerson, getAllPeople } from '../../services/people';
import PageDataLayout from '../../components/layout/PageDataLayout';

const headers = [
    {key: "id", title: "Id"},
    {key: "firstName", title: "First name"},
    {key: "lastName", title: "Last name"},
    {key: "age", title: "Age"},
    {key: "dateOfBirth", title: "Date of birth"},
    {key: "gender", title: "Gender"},
    {key: "occupation", title: "Occupation"}
]

const People = () => {
    return <PageDataLayout
        headers={headers}
        queryTitle="people"
        getAllQuery={getAllPeople}
        deleteInstance={deletePerson} />
}

export default People;