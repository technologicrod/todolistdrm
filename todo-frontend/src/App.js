import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register'; // Import the new Register component
import Todo from './components/Todo'; // Assuming this is your TODO page component

const App = () => {
  const isAuthenticated = () => {
    return !!localStorage.getItem('token'); // Check if the user is logged in
  };

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} /> {/* Add register route */}
        <Route
          path="/todo"
          element={isAuthenticated() ? <Todo /> : <Navigate to="/login" />}
        />
        <Route path="/" element={<Navigate to="/login" />} />
      </Routes>
    </Router>
  );
};

export default App;
