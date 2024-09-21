import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('http://127.0.0.1:8000/api/login/', {
                username,
                password
            });
            if (response.status === 200) {
                alert("Logged in");
                localStorage.setItem('token', response.data.token);
                console.log("Navigating to /todo");
                navigate('/todo'); // Redirect to Todo page
            } else if (response.status === 403) {
                alert("Forbidden access");
            }
        } catch (err) {
            if (err.response && err.response.status === 403) {
                setError('Forbidden access. You do not have permission to view this resource.');
            } else if (err.response && err.response.status === 401) {
                setError('Invalid credentials. Please try again.');
            } else {
                setError('An error occurred. Please try again later.');
            }
        }
    };

    const handleRegisterRedirect = () => {
        navigate('/register'); // Redirect to the Register page
    };

    return (
        <div>
            <h2>Login</h2>
            <form onSubmit={handleLogin}>
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
                {error && <p style={{ color: 'red' }}>{error}</p>}
                <button type="submit">Login</button>
            </form>

            {/* Register Button */}
            <div>
                <p>Don't have an account?</p>
                <button onClick={handleRegisterRedirect}>Register</button>
            </div>
        </div>
    );
};

export default Login;
