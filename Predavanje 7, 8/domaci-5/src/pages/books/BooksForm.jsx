import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { createBook, getBook, updateBook } from '../../services/books';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useModal } from '../../context/ModalContext';

const initialState = {
    genre: '',
    id: 0,
    isbn: '',
    publishedDate: '',
    publisherName: '',
    writerName: ''
}

const BooksForm = ({ id }) => {
    const history = useHistory();

    const { close } = useModal();

    const [bookData, setBookData] = useState(initialState);

    const submitEntry = (e) => {
        e.preventDefault();
        if (id === 'add') {
            delete bookData.id;
            createBook(bookData)
                .then(() => {
                    close();
                    history.push('/books');
                }).catch((err) => {
                    console.log(err);
                });
        } else {
            updateBook(bookData)
                .then(() => {
                    close();
                    history.push('/books');
                }).catch((err) => {
                    console.log(err);
                });
        }
    }

    useEffect(() => {
        if (id !== 'add') {
            getBook(id)
                .then((r) => {
                    setBookData(r?.data);
                })
                .catch((err) => {
                    console.log(err);
                });
        }
    }, [id])

    return <div>
        <Form style={{ textAlign: 'left', margin: 20 }}>
            <Form.Group className="mb-3" controlId="genre">
                <Form.Control type="text" placeholder="Genre" value={bookData?.genre}
                    onChange={(e) => setBookData(prevState => {
                        return {
                            ...prevState,
                            genre: e.target.value
                        }
                    })} />
            </Form.Group>

            <Form.Group className="mb-3" controlId="isbn">
                <Form.Control type="text" placeholder="ISBN" value={bookData?.isbn}
                    onChange={(e) => setBookData(prevState => {
                        return {
                            ...prevState,
                            isbn: e.target.value
                        }
                    })} />
            </Form.Group>

            <Form.Group className="mb-3" controlId="date">
                <Form.Control type="date" placeholder="Date" value={bookData?.publishedDate}
                    onChange={(e) => setBookData(prevState => {
                        return {
                            ...prevState,
                            publishedDate: e.target.value
                        }
                    })} />
            </Form.Group>

            <Form.Group className="mb-3" controlId="publisherName">
                <Form.Control type="text" placeholder="Publisher name" value={bookData?.publisherName}
                    onChange={(e) => setBookData(prevState => {
                        return {
                            ...prevState,
                            publisherName: e.target.value
                        }
                    })} />
            </Form.Group>

            <Form.Group className="mb-3" controlId="writerName">
                <Form.Control type="text" placeholder="Writer name" value={bookData?.writerName}
                    onChange={(e) => setBookData(prevState => {
                        return {
                            ...prevState,
                            writerName: e.target.value
                        }
                    })} />
            </Form.Group>

            <Button variant="primary" type="submit" onClick={(e) => submitEntry(e)}>
                Submit
            </Button>
        </Form>
    </div>
}

export default BooksForm;