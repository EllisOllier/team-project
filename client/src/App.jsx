// Packages
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

// Pages
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import CurrencyConverter from './pages/CurrencyConverter';
import ExpenseTracker from './pages/ExpenseTracker';
import SignUp from './pages/SignUp';

// Components
import NavBar from './components/NavBar';
import Footer from './components/Footer';

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
        <Route path="/sign-up" element={<SignUp />}></Route>
      </Routes>
      <Footer />
    </Router>
    // Add html above
  );
}

export default App;