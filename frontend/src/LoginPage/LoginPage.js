import React, { useState } from 'react';
import axios from 'axios';
import { useAuth } from '../AuthContext';
import { useNavigate } from 'react-router-dom';
import '../custom.scss'; // Import the Bootstrap custom styles

const LoginPage = (props) => {
  const history = useNavigate();
  const { login } = useAuth();
  const [loginFormData, setLoginFormData] = useState({
    username: '',
    password: '',
  });
  const [signupFormData, setSignupFormData] = useState({
    username: '',
    password: '',
    confirmPassword: '', // Added confirmPassword field
  });

  const [loginError, setLoginError] = useState('');
  const [signupError, setSignupError] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [showLogin, setShowLogin] = useState(true);

  const handleLoginInputChange = (e) => {
    const { name, value } = e.target;
    setLoginFormData({
      ...loginFormData,
      [name]: value,
    });
  };

  const handleSignupInputChange = (e) => {
    const { name, value } = e.target;
    setSignupFormData({
      ...signupFormData,
      [name]: value,
    });
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    axios
      .post('http://localhost:3002/', loginFormData)
      .then((response) => {
        setSuccessMessage(response.data.message);
        if (response.data.user) {
          localStorage.setItem('userId', response.data.user._id.toString());
        }
        localStorage.setItem('token', response.data.token);
        login();
        setIsLoggedIn(true);
        props.callBack(true);
        history('/dashboard');
      })
      .catch((error) => {
        setLoginError('Invalid username or password');
        setSuccessMessage('');
      });
  };

  const handleSignup = async (e) => {
    e.preventDefault();

    try {
      if (signupFormData.password !== signupFormData.confirmPassword) {
        throw new Error('Passwords do not match');
      }

      const response = await axios.post('http://localhost:3002/signup', signupFormData);

      setSuccessMessage(response.data.message);

      const loginResponse = await axios.post('http://localhost:3002/', {
        username: signupFormData.username,
        password: signupFormData.password,
      });

      if (loginResponse.data.user) {
        localStorage.setItem('userId', loginResponse.data.user._id.toString());
      }
      localStorage.setItem('token', loginResponse.data.token);
      login();
      setIsLoggedIn(true);
      props.callBack(true);
      history('/dashboard');
    } catch (error) {
      setSignupError(error.message || 'Error during signup. Please try again.');
      setSuccessMessage('');
    }
  };

  const toggleForm = () => {
    setShowLogin(!showLogin);
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card">
            <div className="card-body">
              {successMessage && <p className="text-success">{successMessage}</p>}
              {showLogin ? (
                <>
                  <h2 className="mb-4">Login</h2>
                  {loginError && <p className="text-danger">{loginError}</p>}
                  <form onSubmit={handleLogin}>
                    <div className="mb-3">
                      <label htmlFor="login-username" className="form-label">
                        Username:
                      </label>
                      <input
                        type="text"
                        id="login-username"
                        name="username"
                        value={loginFormData.username}
                        onChange={handleLoginInputChange}
                        className="form-control"
                        required
                      />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="login-password" className="form-label">
                        Password:
                      </label>
                      <input
                        type="password"
                        id="login-password"
                        name="password"
                        value={loginFormData.password}
                        onChange={handleLoginInputChange}
                        autoComplete="current-password" // Updated line
                        className="form-control"
                        required
                      />
                    </div>
                    <div className="d-grid gap-2 col-6 mx-auto mt-3">
                    <button id="login" type="submit" className="btn btn-dark">
                      Login
                    </button>
                    </div>
                  </form>

                  <p className="mt-3">
                    Don't have an account?{' '}
                    <button id = "signuplink" onClick={toggleForm} className="btn btn-link">
                      Sign Up
                    </button>
                  </p>
                </>
              ) : (
                <>
                  <h2 className="mb-4">Sign Up</h2>
                  {signupError && <p className="text-danger">{signupError}</p>}
                  <form onSubmit={handleSignup}>
                    <div className="mb-3">
                      <label htmlFor="signup-username" className="form-label">
                        Username:
                      </label>
                      <input
                        type="text"
                        id="signup-username"
                        name="username"
                        value={signupFormData.username}
                        onChange={handleSignupInputChange}
                        className="form-control"
                        required
                      />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="signup-password" className="form-label">
                        Password:
                      </label>
                      <input
                        type="password"
                        id="signup-password"
                        name="password"
                        value={signupFormData.password}
                        onChange={handleSignupInputChange}
                        className="form-control"
                        required
                      />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="confirm-password" className="form-label">
                        Confirm Password:
                      </label>
                      <input
                        type="password"
                        id="confirm-password"
                        name="confirmPassword"
                        value={signupFormData.confirmPassword}
                        onChange={handleSignupInputChange}
                        className="form-control"
                        required
                      />
                    </div>
                    <button id="signup" type="submit" className="btn btn-dark">
                      Sign Up
                    </button>
                  </form>

                  <p className="mt-3">
                    Already have an account?{' '}
                    <button onClick={toggleForm} className="btn btn-link">
                      Login
                    </button>
                  </p>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
