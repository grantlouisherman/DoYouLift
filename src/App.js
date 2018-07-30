import React, { Component } from 'react';
import gql from "graphql-tag";
import { Query } from "react-apollo";

import './App.css';

const initialLoad = gql`
  {
    arms {
      name
    }
  }
  `
const App = () => (
  <Query
  query={initialLoad}
>
  {({ loading, error, data }) => {
    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error :(</p>;
      console.log(data)
    return  (
      <div >
        <p>HI</p>
      </div>
    );
  }}
</Query>
);

export default App;
