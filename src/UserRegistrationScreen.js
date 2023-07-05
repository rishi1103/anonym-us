import React, { useState } from 'react';
import './css/UserRegistrationScreen.css';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';

const UserRegistrationScreen = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleRegistration = () => {
    if (username && email && password) {
      console.log('User registration successful!');
    } else {
      console.log('Please fill in all the required fields');
    }
  };

  return (
    <div className="registration-container">
      <div className="registration-form">
        <form>
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              placeholder="Enter your username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="form-control"
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="form-control"
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="form-control"
            />
          </div>
          <div className="text-center">
            <button onClick={handleRegistration} className="btn btn-primary">
              Register
            </button>
          </div>
        </form>
      </div>
      <footer className="text-center mt-4">
        <p>&copy; 2023 My Forum App</p>
      </footer>
    </div>
  );
};

export default UserRegistrationScreen;
