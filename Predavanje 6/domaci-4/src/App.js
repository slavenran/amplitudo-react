import { Redirect, Switch } from 'react-router-dom';
import './App.css';
import Home from './pages/home/Home';
import Login from './pages/login/Login';
import Books from './pages/books/Books';
import Movies from './pages/movies/Movies';
import People from './pages/people/People';
import PrivateRoute from './privateRoute/PrivateRoute';
import MoviesForm from './pages/movies/MoviesForm';
import BooksForm from './pages/books/BooksForm';
import PeopleForm from './pages/people/PeopleForm';


function App() {

  return (
    <div className="App">
      <Switch>
        <PrivateRoute exact path="/movies/:id" component={MoviesForm} isPrivate></PrivateRoute>
        <PrivateRoute exact path="/movies" component={Movies} isPrivate />
        <PrivateRoute exact path="/books/:id" component={BooksForm} isPrivate></PrivateRoute>
        <PrivateRoute exact path="/books" component={Books} isPrivate />
        <PrivateRoute exact path="/people/:id" component={PeopleForm} isPrivate></PrivateRoute>
        <PrivateRoute exact path="/people" component={People} isPrivate />
        <PrivateRoute exact path="/login" component={Login} />
        <PrivateRoute exact path="/home" component={Home} />
        {/* redirects user to home page when trying to acces the main link */}
        <PrivateRoute exact path="/"><Redirect to="/home" /></PrivateRoute>
      </Switch>
    </div>
  );
}

export default App;
