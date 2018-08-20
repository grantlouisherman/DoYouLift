import React, {Component} from 'react';
import gql from "graphql-tag";
import { Query } from "react-apollo";

class SingleWorkout extends Component {
  render(){
    const { pathname } = this.props.location;
    const queryParameter = pathname.split("/");
    const type = queryParameter[1];
    const workout = queryParameter[2];
    const singleWorkoutQuery = gql`
        {
          workoutByName(type:"${type}", name:"${workout}"){
            name
            category {
              id
              name
            }
            description
            muscles {
              name
            }
            muscles_secondary {
              name
            }
            equipment {
              name
            }
          }
        }`
    return (
      <Query query={singleWorkoutQuery}>
      {({ loading, error, data }) => {
        if (loading) return <p>Loading...</p>;
        if (error) return <p>Error :(</p>;
        console.log(data)
        return  (
          <div>
            Hi
          </div>
        );
      }}
    </Query>
      );
  }
}

export default SingleWorkout;
