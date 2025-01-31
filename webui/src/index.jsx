import React, { Children, useEffect, useState } from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import './App.css';

const PrivateRoute = ({ children }) => {
  const token = localStorage.getItem("token");
  return token ? children : <Navigate to={"/login"} />;
};

const root = ReactDOM.createRoot(document.getElementById('react-section'));
root.render(
  <Router>
    <Routes>
      <Route path='/login' element={<Login />} />
      <Route path='/dashboard' element={
        <PrivateRoute>
          <Dashboard />
        </PrivateRoute>
      } />
      <Route path='*' element={<Navigate to={"/dashboard"} />} />
    </Routes>
  </Router>
);