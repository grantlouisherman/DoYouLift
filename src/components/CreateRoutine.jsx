import React from 'react';
import WorkoutTile from './WorkoutTile';

const CreateRoutine = ({handleChange, currentValue, workouts, filterWorkouts}) => {
  return (
    <div>
      <div className="form-group col-sm-8 col-md-8 col-lg-8 ">
        <input
          id="search"
          type="text"
          className="form-control"
          placeholder="Search..."
          value={currentValue}
          onChange={handleChange} />
        </div>
       { workouts && filterWorkouts(workouts, currentValue).map(workout => ( <WorkoutTile name={workout.name} type={workout.type}/>))}
    </div>
  )

};
export default CreateRoutine;
