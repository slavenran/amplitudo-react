import { Route, Switch } from 'react-router-dom';
import './App.css';
import Home from './pages/home/Home';
import Login from './pages/login/Login';
import MovieEdit from './pages/movies/MovieEdit';
import Movies from './pages/movies/Movies';

function App() {
  return (
    <div className="App">
      <Switch>
        <Route path="/login" component={Login} />
        <Route path="/movies/:id" component={MovieEdit} />
        <Route path="/movies" component={Movies} />
        <Route path="/" component={Home} />
      </Switch>
    </div>
  );
}

export default App;
