import React from 'react';
import { deleteBook, getAllBooks } from '../../services/books';
import PageDataLayout from '../../components/layout/PageDataLayout';

const headers = [
    { key: "id", title: "Id" },
    { key: "isbn", title: "Title" },
    { key: "genre", title: "Genre" },
    { key: "publishedDate", title: "Published date" },
    { key: "writerName", title: "Writer name" },
    { key: "publisherName", title: "Publisher name" }
]

const Books = () => {
    return <PageDataLayout
        headers={headers}
        queryTitle="books"
        getAllQuery={getAllBooks}
        deleteInstance={deleteBook} />
}

export default Books;