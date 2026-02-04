import React, { useEffect, useState } from 'react';

function Activities() {
  const [activities, setActivities] = useState([]);

  useEffect(() => {
    const apiUrl = process.env.REACT_APP_CODESPACE_NAME
      ? `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev/api/activities/`
      : 'http://localhost:8000/api/activities/';
    console.log('Fetching from:', apiUrl);
    fetch(apiUrl)
      .then(response => response.json())
      .then(data => {
        console.log('Activities data:', data);
        setActivities(data.results || data);
      })
      .catch(error => console.error('Error fetching activities:', error));
  }, []);

  return (
    <div>
      <h2>Activities</h2>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>ID</th>
            <th>User</th>
            <th>Activity Type</th>
            <th>Duration</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {activities.map(activity => (
            <tr key={activity.id}>
              <td>{activity.id}</td>
              <td>{activity.user ? activity.user.username : ''}</td>
              <td>{activity.activity_type}</td>
              <td>{activity.duration}</td>
              <td>{activity.date}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Activities;