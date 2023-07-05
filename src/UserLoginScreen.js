import React, { useState } from 'react';
import './css/UserLoginScreen.css';

const UserLoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    // Perform user login logic here
    if (email && password) {
      // Process the login data, for example, send a request to an API or validate against a database
      console.log('User login successful!');
      // Optionally, you can redirect the user to a different page after successful login
    } else {
      console.log('Please fill in all the required fields');
      
    }
  };

  return (
    <div className="user-login-container">
      <input
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="user-login-input"
      />
      <input
        placeholder="Password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="user-login-input"
      />
      <button onClick={handleLogin} className="user-login-button">Login</button>
    </div>
  );
};

export default UserLoginScreen;
