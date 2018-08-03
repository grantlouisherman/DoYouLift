import React from 'react';


const CreateRoutine = ({handleChange, currentValue, workouts}) => (
  <div>
    <input
       type="text"
       placeholder="Search..."
       value={currentValue}
       onChange={handleChange}
       />
     {workouts}
  </div>
);
export default CreateRoutine;
