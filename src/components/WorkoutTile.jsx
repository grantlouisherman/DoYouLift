import React from 'react';
import { Link } from 'react-router-dom'

const WorkoutTile = ({ name, type }) => {
  return (
    <div className="col-sm-6 col-md-6 col-lg-6">
      <h2><Link to={`${type}/${name}`}>{ name }</Link></h2>
    </div>
  )
}
export default WorkoutTile;
