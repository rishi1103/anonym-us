import React, { useState } from 'react';
import './css/Navigation.css';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';



const NavigationBar = () => {
  return (
    <header className="navigation-header">
        <div className="left">
          <Link to="/"><img className="logo" src="./logo.jpeg" width="70"/></Link>
        </div>
        <nav className="menu">
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/create">Create Threads</Link>
            </li>
            <li>
              <Link to="/register">Register</Link>
            </li>
            <li>
              <Link to="/login">Login</Link>
            </li>
          </ul>
        </nav>
      </header>
    // <nav>
    //   <ul>
    //     <li>
    //       <Link to="/">User Registration</Link>
    //     </li>
    //     <li>
    //       <Link to="/login">User Login</Link>
    //     </li>
    //     <li>
    //       <Link to="/create">Create Thread</Link>
    //     </li>
    //   </ul>
    // </nav>
  );
};


export default NavigationBar;
