import React, { useState } from 'react';
import './css/App.css';
import UserRegistrationScreen from './UserRegistrationScreen.js';
import UserLoginScreen from './UserLoginScreen.js';
import CreateThreadScreen from './CreateThreadScreen.js';
import NavigationBar from './Navigation.js';
import HomeScreen from './HomeScreen.js';
// import ViewThreadScreen from './ViewThreadScreen.js';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';



const App = () => {
  return (
    <Router>
      <div className="App">
        <NavigationBar />
        <Routes>
          <Route exact path="/" element={<HomeScreen/>}/>
          <Route exact path="/register" element={<UserRegistrationScreen/>}/>
          <Route exact path="/login" element={<UserLoginScreen/>}/>
          <Route exact path="/create" element={<CreateThreadScreen/>}/>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
