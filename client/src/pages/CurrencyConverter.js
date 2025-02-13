import React, { useState } from "react";
import Freecurrencyapi from '@everapi/freecurrencyapi-js';
import "../styles/main.css";

const CurrencyConverter = () => {
  const currencyApi = new Freecurrencyapi('fca_live_7IzkWSy6LsA5XsnsG6t7ldzmhfHHJGG3om5pODDr');
  
  const [isOutputMessageVisible, setIsOutputMessageVisible] = React.useState(false);
  const toggleOutputMessageVisibility = () => {
    setIsOutputMessageVisible(isOutputMessageVisible);
  };

  const currencies = [
    { code: "GBP", symbol: "£" },
    { code: "EUR", symbol: "€" },
    { code: "USD", symbol: "$" },
    { code: "JPY", symbol: "¥" },
    { code: "AUD", symbol: "A$" },
    { code: "CAD", symbol: "C$" },
    { code: "CHF", symbol: "CHF" },
    { code: "CNY", symbol: "¥" },
    { code: "SEK", symbol: "kr" },
    { code: "NZD", symbol: "NZ$" },
    // Add more currencies as needed
  ];

  function getConverionRate() {
    const baseCurrency = document.getElementById('from-currency').value;
    const conversionCurrency = document.getElementById('to-currency').value;
    currencyApi.latest({
      base_currency: baseCurrency, // from currency
      currencies: conversionCurrency // to currency
    }).then(response => {
      convertCurrency(response)
    })
  }

  function convertCurrency(conversion) { // conversion variable passed from response on getConversionRate()
    const currencyAmount = document.getElementById('amount-currency').value;
    const toCurrency = document.getElementById('to-currency').value;

    const convertedAmount = conversion.data[toCurrency] * currencyAmount;
    const outputElement = document.getElementById('converted-amount');

    outputElement.textContent = `Converted Amount: ${(Math.round(convertedAmount * 100) / 100).toString()}`;
  }

  return (
    <div>
      <div className="title-container">
        <h1>Currency Converter</h1>
        <h3>From A to B with ease</h3>
      </div>
      <div className="main-content">
        <label htmlFor="amount-currency">Enter amount: <input id="amount-currency" type="number" /></label>
        <div className="currency-from-to-container">
          <label htmlFor="from-currency">from currency</label>
          <select id="from-currency">
            {currencies.map(currency => (
              <option key={currency.code} value={currency.code}>
                {currency.code} ({currency.symbol})
              </option>
            ))}
          </select>

          <span> → </span>

          <label htmlFor="to-currency">to currency</label>
          <select id="to-currency">
            {currencies.map(currency => (
              <option key={currency.code} value={currency.code}>
                {currency.code} ({currency.symbol})
              </option>
            ))}
          </select>
        </div>

        <button className="signup-button" onClick={getConverionRate}>Convert</button>
        <p id="converted-amount">Converted Amount: 0</p>
      </div>
    </div>
  );
};

export default CurrencyConverter;