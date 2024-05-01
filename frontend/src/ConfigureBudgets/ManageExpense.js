// ManageExpenses.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../AuthContext';

function ManageExpense() {
 // const { isLoggedIn } = useAuth();
  const [months, setMonths] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedMonth, setSelectedMonth] = useState('');
  const [selectedCategory, setSelectedCategory] = useState({
    categories:[]
  });
  const [expense, setExpenseAmount] = useState('');
  const [month,setmonth]=useState({
    months:['January','February','March','May','June','July','August','September','October','November','December']
  })
  const [expenseAdded, setExpenseAdded] = useState(false);
  const [error, setError] = useState('');
  useEffect(()=>{
    setMonths(month.months)
  },[])


  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const userId = localStorage.getItem('userId');
        const token = localStorage.getItem('token');
  
        const categoriesResponse = await axios.get(`http://localhost:3002/get-categories/${userId}?month=${selectedMonth}`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
  
        console.log("GOT USER CATEGORIES FOR SELECTED MONTH", categoriesResponse);
        setCategories(categoriesResponse.data);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };
  
    if (selectedMonth) {
      fetchCategories();
    } else {
      setCategories([]);
    }
  }, [selectedMonth]);

  const handleAddExpense = async () => {
    try {
      console.log("Hello There")
      const userId = localStorage.getItem('userId');
     
      const token= localStorage.getItem('token')
      if (!selectedMonth && !selectedCategory && !expense) {
        console.error('Month, category, and expense amount are required');
        return;
      }
      await axios.post('http://localhost:3002/add-expense', {
        userId: userId,
        month: selectedMonth,
        category: selectedCategory,
        expense: parseFloat(expense),
      },
        {
          headers:
          {Authorization:`Bearer ${token}`}
      });
      console.log('Expense added successfully!');
      setExpenseAdded(true);
      setError('')
      setSelectedMonth('');
    setSelectedCategory('');
    setExpenseAmount('');
    } catch (error) {
      setExpenseAdded(false);
      setSelectedMonth('');
      setSelectedCategory('');
      setExpenseAmount('');
      setError('Error adding expense. Please try again.');
      console.error('Error adding expense:', error);
    }
  };
  const handleBack = () => {
    window.history.back();
    
  };

  return (
    <main className="container">
      <div className="my-4">
        <h2 className="mb-4">Manage Expenses</h2>

        <div className="mb-3">
          <label htmlFor="month" className="me-2">Month:</label>
          <select
            id="month"
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

        <div className="mb-3">
          <label htmlFor="category" className="me-2">Category:</label>
          <select
            id="category"
            onChange={(e) => setSelectedCategory(e.target.value)}
            value={selectedCategory}
            className="form-select"
          >
            <option value="">Select Category</option>
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-3">
          <label htmlFor="expenseAmount" className="me-2">Expense Amount:</label>
          <input
            type="number"
            id="expenseAmount"
            value={expense}
            onChange={(e) => setExpenseAmount(e.target.value)}
            className="form-control"
          />
        </div>

        {expenseAdded && <p className="text-success">Expense added successfully!</p>}
        {error && <p style={{ color: 'red' }}>{error}</p>}

        <div className="mb-3">
          <button onClick={handleAddExpense} className="btn btn-dark me-2">Add Expense</button>
          <button type="button" onClick={handleBack} className="btn btn-secondary">
            Back
          </button>
        </div>
      </div>
    </main>
  );
}

export default ManageExpense;
 