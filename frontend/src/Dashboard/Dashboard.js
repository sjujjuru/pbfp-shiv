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
      <h2>Dashboard welcomes you</h2>

      <div className="mt-3">
        <p>This is your dashboard where you can manage your personal budget.</p>
        <p>You can add the budget for each month category-wise and the expense for the same</p>
      </div>

      <div className="mt-3">
        <Link to="/configure-budgets">
          {/* Changed button style to rounded */}
          <button className="btn btn-dark rounded-pill" style={{ marginRight: '20px' }}>Customize Up Budgets</button>
        </Link>

        <Link to="/add-expense">
          {/* Changed button style to rounded */}
          <button className="btn btn-secondary rounded-pill">Manage Spending</button>
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
