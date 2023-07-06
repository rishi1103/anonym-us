import React, { useState } from 'react';
import './css/Navigation.css';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import logo from './Logo.jpeg';




const NavigationBar = () => {
  return (
    <header className="navigation-header">
        <div className="left">
          <Link to="/"><img className="logo" src={logo} width="70" alt="Logo" /></Link>
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
  );
};


export default NavigationBar;
