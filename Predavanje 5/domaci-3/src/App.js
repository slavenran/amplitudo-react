import { Redirect, Switch } from 'react-router-dom';
import './App.css';
import Home from './pages/home/Home';
import Login from './pages/login/Login';
import Books from './pages/books/Books';
import Movies from './pages/movies/Movies';
import People from './pages/people/People';
import PrivateRoute from './privateRoute/PrivateRoute';
import MoviesData from './context/MoviesData';
import { useReducer } from 'react';
import movies from './constants/movies';
import books from './constants/books';
import people from './constants/people';
import EditForm from './components/forms/editForm/EditForm';
import BooksData from './context/BooksData';
import PeopleData from './context/PeopleData';

const reducer = (state, action) => {
  switch (action.type) {
    case "add":
      // adding new entry and providing id
      const newId = state[state.length - 1]?.id + 1;
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

function App() {
  const [movieList, movieDispatch] = useReducer(reducer, movies);
  const [bookList, bookDispatch] = useReducer(reducer, books);
  const [peopleList, peopleDispatch] = useReducer(reducer, people);

  return (
    <div className="App">
      <Switch>
        <PrivateRoute exact path="/login" component={Login} />
        <PrivateRoute exact path="/home" component={Home} />
        <MoviesData.Provider value={{ list: movieList, dispatch: movieDispatch }}>
          <BooksData.Provider value={{ list: bookList, dispatch: bookDispatch }}>
            <PeopleData.Provider value={{ list: peopleList, dispatch: peopleDispatch }}>
              <PrivateRoute exact path="/movies/edit" render={(props) => <EditForm {...props} context={MoviesData} />} isPrivate></PrivateRoute>
              <PrivateRoute exact path="/movies" render={Movies} isPrivate />
              <PrivateRoute exact path="/books/edit" render={(props) => <EditForm {...props} context={BooksData} />} isPrivate></PrivateRoute>
              <PrivateRoute exact path="/books" render={Books} isPrivate />
              <PrivateRoute exact path="/people/edit" render={(props) => <EditForm {...props} context={PeopleData} />} isPrivate></PrivateRoute>
              <PrivateRoute exact path="/people" render={People} isPrivate />
            </PeopleData.Provider>
          </BooksData.Provider>
        </MoviesData.Provider>
        {/* redirects user to home page when trying to acces the main link */}
        <PrivateRoute exact path="/"><Redirect to="/home" /></PrivateRoute>
      </Switch>
    </div>
  );
}

export default App;
