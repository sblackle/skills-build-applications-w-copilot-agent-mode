import React, { useEffect, useState } from 'react';

function Workouts() {
  const [workouts, setWorkouts] = useState([]);

  useEffect(() => {
    const apiUrl = process.env.REACT_APP_CODESPACE_NAME
      ? `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev/api/workouts/`
      : 'http://localhost:8000/api/workouts/';
    console.log('Fetching from:', apiUrl);
    fetch(apiUrl)
      .then(response => response.json())
      .then(data => {
        console.log('Workouts data:', data);
        setWorkouts(data.results || data);
      })
      .catch(error => console.error('Error fetching workouts:', error));
  }, []);

  return (
    <div>
      <h2>Workouts</h2>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>ID</th>
            <th>User</th>
            <th>Name</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          {workouts.map(workout => (
            <tr key={workout.id}>
              <td>{workout.id}</td>
              <td>{workout.user ? workout.user.username : ''}</td>
              <td>{workout.name}</td>
              <td>{workout.description}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Workouts;