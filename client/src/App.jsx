import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import NavBar from './components/NavBar';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import CurrencyConverter from './pages/CurrencyConverter';
import ExpenseTracker from './pages/Track';
import BudgetForecasting from './pages/BudgetForecasting';

function App() {
  return (
    // Add html below
    <Router>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/currency-converter" element={<CurrencyConverter />} />
        <Route path="/expense-tracker" element={<ExpenseTracker />} />
        <Route path="/budget-forecasting" element={<BudgetForecasting />} />
      </Routes>
    </Router>
    // Add html above
  );
}

export default App;