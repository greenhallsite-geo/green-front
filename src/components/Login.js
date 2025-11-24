import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Login.css';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Get credentials from environment variables
  const INVESTOR_USERNAME = process.env.REACT_APP_INVESTOR_USERNAME;
  const INVESTOR_PASSWORD = process.env.REACT_APP_INVESTOR_PASSWORD;

  // DEBUG: Check what values we're getting
  console.log('ENV Username:', INVESTOR_USERNAME);
  console.log('ENV Password:', INVESTOR_PASSWORD);
  console.log('All env vars:', process.env);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    // DEBUG: Check what user entered
    console.log('Entered username:', username);
    console.log('Entered password:', password);
    console.log('Match username?', username === INVESTOR_USERNAME);
    console.log('Match password?', password === INVESTOR_PASSWORD);

    // Simple authentication check
    if (username === INVESTOR_USERNAME && password === INVESTOR_PASSWORD) {
      // Set authentication in localStorage
      localStorage.setItem('investorAuth', 'true');
      localStorage.setItem('investorAuthTime', Date.now().toString());
      
      // Redirect to investor portal
      setTimeout(() => {
        navigate('/investor-portal');
      }, 500);
    } else {
      setError('Invalid username or password');
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <div className="login-header">
          <h1>Investor Login</h1>
          <p>Please enter your credentials to access the investor portal</p>
        </div>

        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter username"
              required
              autoComplete="username"
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter password"
              required
              autoComplete="current-password"
            />
          </div>

          {error && <div className="error-message">{error}</div>}

          <button type="submit" className="login-button" disabled={loading}>
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>

        <div className="login-footer">
          <p>Need help? Contact us at <a href="mailto:info.dc@greenhallcapital.com">info.dc@greenhallcapital.com</a></p>
        </div>
      </div>
    </div>
  );
}

export default Login;