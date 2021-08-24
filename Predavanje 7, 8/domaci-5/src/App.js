import './App.css';
import { Redirect, Switch } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import Home from './pages/home/Home';
import Login from './pages/login/Login';
import Books from './pages/books/Books';
import Movies from './pages/movies/Movies';
import People from './pages/people/People';
import PrivateRoute from './privateRoute/PrivateRoute';
import ModalProvider from './context/ModalContext';
import Register from './pages/register/Register';

const queryClient = new QueryClient();

function App() {

  return (
    <QueryClientProvider client={queryClient}>
      <ModalProvider>
      <div className="App">
        <Switch>
          <PrivateRoute exact path="/movies" component={Movies} isPrivate />
          <PrivateRoute exact path="/books" component={Books} isPrivate />
          <PrivateRoute exact path="/people" component={People} isPrivate />
          <PrivateRoute exact path="/login" component={Login} />
          <PrivateRoute exact path="/register" component={Register} />
          <PrivateRoute exact path="/home" component={Home} />
          {/* redirects user to home page when trying to acces the main link */}
          <PrivateRoute exact path="/"><Redirect to="/home" /></PrivateRoute>
        </Switch>
      </div>
      </ModalProvider>
    </QueryClientProvider>
  );
}

export default App;
