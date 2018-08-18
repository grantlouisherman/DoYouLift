import React, { Component } from 'react';
import gql from "graphql-tag";
import { Query } from "react-apollo";

import CreateRoutine from '../components/CreateRoutine';
import { combineData } from '../utils';

const initialLoad = gql`
  {
    arms {
      name
    }
    back {
      name
    }
    chest {
      name
    }
    shoulders {
      name
    }
    legs {
      name
    }
    calves {
      name
    }
  }
  `;

class CreateRoutineContainer extends Component {
  constructor(props){
    super(props);
    this.state ={
      currentValue:'',
      workouts: {}
    }
  }
 filterWorkouts = (data, value) => {
   return data.filter(d => ( d.includes(value) ))
 }

 handleChange = (event) => {
   const typedValue = event.currentTarget.value;
   this.setState({currentValue:typedValue})
 }
  render(){
    return (
      <Query query={initialLoad}>
      {({ loading, error, data }) => {
        if (loading) return <p>Loading...</p>;
        if (error) return <p>Error :(</p>;
        return  (
          <div>
            <CreateRoutine
              currentValue={this.state.currentValue}
              handleChange={this.handleChange}
              workouts={combineData(data)}
              filterWorkouts={this.filterWorkouts}
              />
          </div>
        );
      }}
    </Query>
    )
  }
}

export default CreateRoutineContainer;
