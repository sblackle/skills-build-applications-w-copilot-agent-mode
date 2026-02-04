import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Users from './components/Users';
import Teams from './components/Teams';
import Activities from './components/Activities';
import Leaderboard from './components/Leaderboard';
import Workouts from './components/Workouts';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
          <div className="container">
            <Link className="navbar-brand" to="/">OctoFit Tracker</Link>
            <div className="navbar-nav">
              <Link className="nav-link" to="/users">Users</Link>
              <Link className="nav-link" to="/teams">Teams</Link>
              <Link className="nav-link" to="/activities">Activities</Link>
              <Link className="nav-link" to="/leaderboard">Leaderboard</Link>
              <Link className="nav-link" to="/workouts">Workouts</Link>
            </div>
          </div>
        </nav>
        <div className="container mt-4">
          <Routes>
            <Route path="/users" element={<Users />} />
            <Route path="/teams" element={<Teams />} />
            <Route path="/activities" element={<Activities />} />
            <Route path="/leaderboard" element={<Leaderboard />} />
            <Route path="/workouts" element={<Workouts />} />
            <Route path="/" element={<h1>Welcome to OctoFit Tracker</h1>} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;