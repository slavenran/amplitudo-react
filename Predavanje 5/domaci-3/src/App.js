import { Redirect, Switch } from 'react-router-dom';
import './App.css';
import Home from './pages/home/Home';
import Login from './pages/login/Login';
import Books from './pages/books/Books';
import Movies from './pages/movies/Movies';
import People from './pages/people/People';
import PrivateRoute from './privateRoute/PrivateRoute';

function App() {
  return (
    <div className="App">
      <Switch>
        <PrivateRoute exact path="/login" component={Login} />
        <PrivateRoute exact path="/home" component={Home} />
        <PrivateRoute path="/books" component={Books} isPrivate />
        <PrivateRoute path="/movies" component={Movies} isPrivate />
        <PrivateRoute path="/people" component={People} isPrivate />
        <PrivateRoute exact path="/"><Redirect to="/home" /></PrivateRoute>
      </Switch>
    </div>
  );
}

export default App;
