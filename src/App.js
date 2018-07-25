import React, { Component } from 'react';
import axios from 'axios';
import './App.css';

class App extends Component {
  componentDidMount(){
    axios.get('http://localhost:5000/shoulders.json')
    .then(res => {
      console.log("REST", res);
    })
    .catch(console.error);
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Do You Lift</h1>
        </header>
        <p className="App-intro">
          HI
        </p>
      </div>
    );
  }
}

export default App;
