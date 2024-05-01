import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';

function ConfigureBudgets() {
  const [category, setCategory] = useState("");
  const [budget, setBudget] = useState("");
  const [budgetList, setBudgetList] = useState([]);
  const [months, setMonths] = useState([
    "January",
    "February",
    "March",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ]);

  const [selectedMonth, setSelectedMonth] = useState("");
  const [userId, setUserId] = useState(localStorage.getItem("userId"));
  const [feedbackMessage, setFeedbackMessage] = useState("");

  const handleCategoryChange = (e) => {
    setCategory(e.target.value);
  };

  const handleBudgetChange = (e) => {
    setBudget(e.target.value);
  };

  const handleAddBudget = async () => {
    if (category && budget && selectedMonth) {
      const token=localStorage.getItem("token");
      try {
        const response = await axios.get(`http://localhost:3002/check-existing-budget/${userId}/${selectedMonth}/${category}`,{
          headers:{
            Authorization:`Bearer ${token}`
          }
        });

        if (response.data.exists) {
          setFeedbackMessage("Budget for this category already exists for the selected month.");
        } else {
          setBudgetList([...budgetList, { category, budget, month: selectedMonth }]);
          setCategory("");
          setBudget("");
          setFeedbackMessage(""); 
        }
      } catch (error) {
        console.error("Error checking existing budget:", error);
        setFeedbackMessage("Error checking existing budget.");
      }
    }
  };

  const handleEditBudget = (index) => {
    const editedBudget = budgetList[index];
    setCategory(editedBudget.category);
    setBudget(editedBudget.budget);

    const updatedBudgetList = [...budgetList];
    updatedBudgetList.splice(index, 1);
    setBudgetList(updatedBudgetList);
  };

  const handleSaveBudgets = async () => {
    try {
      if (budgetList.length === 0 || !selectedMonth) {
        console.error("Month or budget list is empty");
        return;
      }
      const token = localStorage.getItem("token");
      console.log(token);
      console.log(months);
      await axios.post(
        "http://localhost:3002/configure-budgets",
        {
          userId,
          months: selectedMonth,
          budgetList,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("Budgets saved successfully!");

      setBudgetList([]);
      setSelectedMonth("");
      setFeedbackMessage("Budgets saved successfully!");
    } catch (error) {
      setBudgetList([]);
      setSelectedMonth("");
      setFeedbackMessage("Error saving budgets: " + error.message);
      console.error("Error saving budgets:", error);
    }
  };

  const handleBack = () => {
    window.history.back();
  };

  return (
    <main className="center" id="main" aria-label="main">
      <div>
        <h2>Configure Budgets</h2>
        <div className="row mb-3">
          <div className="col-md-4">
            <label htmlFor="months">Month:</label>
            <select
              id="months"
              onChange={(e) => setSelectedMonth(e.target.value)}
              value={selectedMonth}
              className="form-select"
            >
              <option value="">Select Month</option>
              {months.map((month) => (
                <option key={month} value={month}>
                  {month}
                </option>
              ))}
            </select>
          </div>
          <div className="col-md-4">
            <label htmlFor="category">Category:</label>
            <input
              type="text"
              id="category"
              value={category}
              onChange={handleCategoryChange}
              className="form-control"
            />
          </div>
          <div className="col-md-4">
            <label htmlFor="budget">Budget:</label>
            <input
              type="number"
              id="budget"
              value={budget}
              onChange={handleBudgetChange}
              className="form-control"
            />
          </div>
        </div>

        <button type="button" onClick={handleAddBudget} className="btn btn-dark mb-3">
          Add Budget
        </button>
        {feedbackMessage && <p className="text-danger">{feedbackMessage}</p>}

        <ul className="list-group mb-3">
          {budgetList.map((item, index) => (
            <li key={index} className="list-group-item d-flex justify-content-between align-items-center">
              {item.category}: {item.budget}
              <button type="button" onClick={() => handleEditBudget(index)} className="btn btn-warning btn-sm">
                Edit
              </button>
            </li>
          ))}
        </ul>

        <div className="mb-3">
          <button type="button" onClick={handleSaveBudgets} className="btn btn-success me-3">
            Save Budgets
          </button>
          <button type="button" onClick={handleBack} className="btn btn-secondary">
            Back
          </button>
        </div>

        <div>
          <Link to="/add-expense">
            <button className="btn btn-dark">Manage Expenses</button>
          </Link>
        </div>
      </div>
    </main>
  );
}

export default ConfigureBudgets;
