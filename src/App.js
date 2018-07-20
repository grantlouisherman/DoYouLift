import React, { Component } from 'react';
import axios from 'axios';
import './App.css';

class App extends Component {
  constructor(){
    super();
    this.state = {
      workouts: [],
      loaded: false,
      cleanedData: []
    }
  }
  componentDidMount(){
    /*  API endpoint is https://wger.de/api/v2/exerciseinfo/?page=27 -> 27 is the last page*/
    const API_CALLS = [];
    for(let i=1;i<=27;i++){
      API_CALLS.push(axios.get(`https://wger.de/api/v2/exerciseinfo/?page=${i}`))
    }
    Promise.all(API_CALLS).then(calls => {
      this.setState({workouts:calls, loaded:true})
    })
  }

  processor(data){
    data.forEach(d => {
      d.data.results.forEach( info => {
        this.state.cleanedData.push(info)
      })
    })
  }

  render() {
    const { loaded } = this.state
    if(!loaded){
      return (
        <div> Loading ..... </div>
      )
    }
    console.log(this.state.workouts[0].data.results)
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Do You Lift</h1>
        </header>
        <p className="App-intro">
          { this.state.workouts[0].description }
        </p>
      </div>
    );
  }
}

export default App;
