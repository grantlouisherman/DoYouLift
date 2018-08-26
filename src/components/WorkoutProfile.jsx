import React from 'react';

const WorkoutProfile = ({ category, description, equipment, muscles}) => {
  const { name } = category;
  return (
    <div>
      <div>{description}</div>
    </div>
  )
};

export default WorkoutProfile;
