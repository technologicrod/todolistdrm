import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Register = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isAdmin, setIsAdmin] = useState(false); // For account type
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleBack = (e) => {
    e.preventDefault();
    navigate("/login");
};
  const handleRegister = async (e) => {
    e.preventDefault();
    let is_superuser;
    if(isAdmin == true){
      is_superuser = 1;
    }
    else{
      is_superuser = 0;
    }
    // Log the data being sent
    console.log({
        username,
        password,
        confirmPassword,
        is_superuser
    });

    try {
        const response = await axios.post('http://127.0.0.1:8000/api/register/', {
            username,
            password,
            confirmPassword,
            is_superuser
        });
        console.log(response)
        if (response.status === 201) {
            alert('Registration successful');
            navigate("/login")
        }
    } catch (err) {
        console.error('Registration failed:', err);
        setError('Registration failed. Please try again.');
    }
};


  return (
    <div>
      <h2>Register</h2>
      <button onClick={handleBack}>Back</button>
      <form onSubmit={handleRegister}>
        <div>
          <label>Username:</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Confirm Password:</label>
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Admin Account?</label>
          <input
            type="checkbox"
            checked={isAdmin}
            onChange={(e) => setIsAdmin(e.target.checked)}
          />
        </div>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default Register;
