import React from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

function Dashboard() {
  const thumbnailStyle = {
    width: '200px',
    height: '150px',
    cursor: 'pointer',
    borderRadius: '8px',  // Add border radius for rounded corners
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',  // Add a subtle shadow
    transition: 'transform 0.3s ease-in-out',  // Add a smooth transition effect
  };

  const thumbnailHoverStyle = {
    transform: 'scale(1.1)',  // Increase size on hover
  };

  return (
    <div className="container mt-5 text-center">
      <h2>Welcome to the Dashboard!</h2>

      <div className="mt-3">
        <p>This is your dashboard where you can manage your personal budget.</p>
        <p>You can add the budget for each month category-wise and the expense for the same</p>
      </div>

      <div className="mt-3">
        <Link to="/configure-budgets">
          <button className="btn btn-dark" style={{ marginRight: '20px' }}>Configure Budgets</button>
        </Link>

        <Link to="/add-expense">
          <button className="btn btn-secondary">Manage Expenses</button>
        </Link>
      </div>

      <div className="mt-5">
        <Link to="/Visual">
          <img
            src="bg.png"
            alt="Visuals Thumbnail"
            style={{ ...thumbnailStyle, ...thumbnailHoverStyle }}
          />
          <div className="mt-2">Click to view Visuals</div>
        </Link>
      </div>
    </div>
  );
}

export default Dashboard;
