import React from 'react';
import gql from "graphql-tag";
import { Query } from "react-apollo";

class SingleWorkout extends Component {
  render(){
    { type, name } = this.props;
    const singleWorkoutQuery = gql`
        {
          workoutByName(type:${type}, name:${name}){
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
