import React, { useState } from 'react';
import '../styles/styles.css';
import { Link } from 'react-router-dom';

function Register() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [usernameError, setUsernameError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleRegister = () => {
    setUsernameError('');
    setPasswordError('');
    setErrorMessage('');
    setSuccessMessage('');

    if (!username || !password) {
      if (!username) {
        setUsernameError('Please enter your username.');
      }
      if (!password) {
        setPasswordError('Please enter your password.');
      }
      return;
    }

    if (username.length < 6 || password.length < 6) {
      if (username.length < 6) {
        setUsernameError('Username must be at least 6 characters long.');
      }
      if (password.length < 6) {
        setPasswordError('Password must be at least 6 characters long.');
      }
      return;
    }

    // Check if the username already exists
    fetch('http://localhost/backend/check_username.php?username=' + encodeURIComponent(username))
      .then(response => response.json())
      .then(data => {
        if (data.exists) {
          setErrorMessage('Username already exists. Please choose a different one.');
        } else {
          // Proceed with registration
          fetch('http://localhost/backend/register.php', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, password }), // Send username and password in the request body
          })
          .then(response => response.json())
          .then(data => {
            console.log(data);
            // Handle response data as needed
            setSuccessMessage('Account created successfully!');
          })
          .catch(error => {
            console.error('Error:', error);
          });
        }
      })
      .catch(error => {
        console.error('Error:', error);
      });
  };

  return (
    <div className="mainContainer-log">
      <div className="loginBox">
        <div className="loginBoxHeading">REGISTER</div>
        <div className="loginInputBox">
          <input
            type="text"
            className="loginInput"
            placeholder="USERNAME"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          {usernameError && <p className="error">{usernameError}</p>}
        </div>
        <div className="loginInputBox">
          <input
            type="password"
            className="loginInput"
            placeholder="PASSWORD"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {passwordError && <p className="error">{passwordError}</p>}
        </div>
        {errorMessage && <p className="error">{errorMessage}</p>}
        {successMessage && <p className="success">{successMessage}</p>}
        <button className="loginButton" onClick={handleRegister}>CREATE ACCOUNT</button>
        <Link to="/" className="loginHeader">
          I ALREADY HAVE AN ACCOUNT
        </Link>
      </div>
    </div>
  );
}

export default Register;
