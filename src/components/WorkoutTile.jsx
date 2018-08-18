import React from 'react';

const WorkoutTile = ({ name }) => {
  return (
    <div className="col-sm-6 col-md-6 col-lg-6">
      <h2>{ name }</h2>
    </div>
  )
}
export default WorkoutTile;
