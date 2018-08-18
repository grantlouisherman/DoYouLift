import React from 'react';
import ReactDOM from 'react-dom';
import { Route, Switch, BrowserRouter } from 'react-router-dom'
import { ApolloProvider } from "react-apollo";
import { client } from './ApolloClient';

import './index.css';
import App from './App';
import SingleWorkout from './components/SingleWorkout';
import registerServiceWorker from './registerServiceWorker';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const Routes = () => {
  return (
    <Switch>
      <Route exact path='/' component={App}/>
      <Route path='/:workoutName' component={SingleWorkout}/>
    </Switch>
  )
}

ReactDOM.render(
  <ApolloProvider client={client}>
    <BrowserRouter>
      <Routes />
    </BrowserRouter>
  </ApolloProvider>,
  document.getElementById('root'));
registerServiceWorker();
