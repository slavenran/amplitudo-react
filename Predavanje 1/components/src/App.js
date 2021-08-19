import { Switch } from 'react-router-dom';
import './App.css';
import Administration from './pages/administration/Administration';
import Login from './pages/login/Login';
import Movies from './pages/movies/Movies';
import People from './pages/people/People';
import Person from './pages/people/Person';
import Styling from './pages/styling/Styling';
import PrivateRoute from './privateRoute/PrivateRoute';

function App() {
  return (
    <div className="App">
      <Switch>
        <PrivateRoute path="/movies" exact component={Movies} isPrivate />
        <PrivateRoute path="/styling" exact component={Styling} isPrivate />
        <PrivateRoute path="/people" exact component={People} isPrivate />
        <PrivateRoute path="/people/:name" exact component={Person} isPrivate />
        <PrivateRoute path="/administration" component={Administration} isPrivate />
        <PrivateRoute path="/login" component={Login} />
      </Switch>
    </div>
  );
}

export default App;
