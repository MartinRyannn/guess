import React, { useState } from 'react';
import '../styles/styles.css';
import { Link, useNavigate } from 'react-router-dom';

function Login() {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = () => {
    setError('');

    if (!username || !password) {
      setError('Please enter both username and password.');
      return;
    }

    if (username.length < 6 || password.length < 6) {
      setError('Username and password must be at least 6 characters long.');
      return;
    }

    fetch('http://localhost/backend/login.php', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Invalid username or password.');
      }
      return response.json();
    })
    .then(data => {
      console.log(data.message);

      localStorage.setItem('userId', data.userId);
      localStorage.setItem('username', data.username);

      navigate('/LevelSelect');
    })
    .catch(error => {
      setError(error.message);
    });
  };

  return (
    <div className="mainContainer-log">
      <div className="loginBox">
        <div className="loginBoxHeading">LOG IN</div>
        <div className="loginInputBox">
          <input
            type="text"
            className="loginInput"
            placeholder="USERNAME"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="loginInputBox">
          <input
            type="password"
            className="loginInput"
            placeholder="PASSWORD"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        {error && <p className="error">{error}</p>}
        <button className="loginButton" onClick={handleLogin}>JUMP IN</button>
        <Link to="/register" className="loginHeader">
          I DON'T HAVE AN ACCOUNT
        </Link>
      </div>
    </div>
  );
}

export default Login;
