import React, { useState } from "react";
import "../styles/main.css";

const CurrencyConverter = () => {
  const [amount, setAmount] = useState(1);
  const [fromCurrency, setFromCurrency] = useState("GBP");
  const [toCurrency, setToCurrency] = useState("EUR");
  const [convertedAmount, setConvertedAmount] = useState(null);

  // Example exchange rates (static for simplicity)
  const exchangeRates = {
    GBP: { EUR: 1.15, USD: 1.27 },
    EUR: { GBP: 0.87, USD: 1.10 },
    USD: { GBP: 0.79, EUR: 0.91 },
  };

  const convertCurrency = () => {
    if (fromCurrency === toCurrency) {
      setConvertedAmount(amount);
    } else {
      const rate = exchangeRates[fromCurrency]?.[toCurrency] || 1;
      setConvertedAmount((amount * rate).toFixed(2));
    }
  };

  return (
    <div>
      <div className="title-container">
      <h1>Currency Converter</h1>
      </div>
      <input
        type="number"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      />
      
      <label for="from-currency">from currency</label>
      <select id="from-currency" value={fromCurrency} onChange={(e) => setFromCurrency(e.target.value)}>
        <option value="GBP">GBP (£)</option>
        <option value="EUR">EUR (€)</option>
        <option value="USD">USD ($)</option>
      </select>

      <span> → </span>

      <select value={toCurrency} onChange={(e) => setToCurrency(e.target.value)}>
        <option value="GBP">GBP (£)</option>
        <option value="EUR">EUR (€)</option>
        <option value="USD">USD ($)</option>
      </select>

      <button className="signup-button"onClick={convertCurrency}>Convert</button>

      {convertedAmount !== null && (
        <p>
          {amount} {fromCurrency} = {convertedAmount} {toCurrency}
        </p>
      )}
    </div>
  );
};

export default CurrencyConverter;