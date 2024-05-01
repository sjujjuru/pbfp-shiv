import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../AuthContext';
import CurrencyExchangeLogo from '../currency-exchange.svg'; // replace with the actual path


function Menu() {
  const { isLoggedIn, logout } = useAuth();

  const handleLogout = () => {
    logout();
    localStorage.removeItem('userId');
    localStorage.removeItem('token');
    localStorage.removeItem('expirationTime');
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light fixed-top">
      <div className="container">
        <Link className="navbar-brand" to="/home">
        <img src={CurrencyExchangeLogo} alt="Currency Exchange Logo" height="30" width="30" />
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link className="nav-link" to="/home">
                Home
              </Link>
            </li>

            {isLoggedIn ? (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/dashboard">
                    Dashboard
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/Visual">
                    Visuals
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/" onClick={handleLogout}>
                    Logout
                  </Link>
                </li>
              </>
            ) : (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/">
                    Login
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
      <style>
        {`
          header img {
            height: 80px;
            margin-left: 40px;
            width: 100px;
            height: 90px;
            border-radius: 50%;
            overflow: hidden;
          }
          .menu {
            padding: 10px 0;
            text-align: center;
          }
          header {
            background-color: #ababd2;
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            height: 100px;
            display: flex;
            align-items: center;
            border-bottom: 1px solid #333333;
          }
          header * {
            display: inline;
          }
          .menu ul {
            list-style-type: none;
            padding: 0;
            margin: 0;
          }
          .menu li {
            display: inline;
            margin-right: 20px;
            color: black;
          }
          .menu ul li a {
            color: black;
            text-decoration: none;
            font-weight: bold;
            font-size: 17px;
            font-family: Georgia, 'Times New Roman', Times, serif;
          }
          .menu ul li a:hover {
            color: navy;
          }
          .center::after {
            content: "\\00a9"; // Double backslashes here
            margin-left: 5px;
          }
        `}
      </style>
    </nav>
  );
}

export default Menu;
