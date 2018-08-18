import React from 'react';
import ReactDOM from 'react-dom';
importi  { Route, Switch } from 'react-router-dom'

import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import { ApolloProvider } from "react-apollo";
import { client } from './ApolloClient';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

ReactDOM.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
  document.getElementById('root'));
registerServiceWorker();
