import React, { useState } from "react";
import Freecurrencyapi from "@everapi/freecurrencyapi-js";
import "../styles/main.css";

const CurrencyConverter = () => {
  const currencyApi = new Freecurrencyapi("fca_live_7IzkWSy6LsA5XsnsG6t7ldzmhfHHJGG3om5pODDr");

  const [recentConversions, setRecentConversions] = useState([]);
  const [convertedAmount, setConvertedAmount] = useState(0);

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
  ];

  const getConversionRate = () => {
    const baseCurrency = document.getElementById("from-currency").value;
    const conversionCurrency = document.getElementById("to-currency").value;
    const currencyAmount = parseFloat(document.getElementById("amount-currency").value);

    if (isNaN(currencyAmount) || currencyAmount <= 0) {
      alert("Please enter a valid amount.");
      return;
    }

    currencyApi
      .latest({
        base_currency: baseCurrency,
        currencies: conversionCurrency,
      })
      .then((response) => {
        convertCurrency(response, currencyAmount, baseCurrency, conversionCurrency);
      })
      .catch((error) => {
        console.error("Error fetching conversion rate:", error);
        alert("Failed to get conversion rate. Please try again later.");
      });
  };

  const convertCurrency = (conversion, amount, fromCurrency, toCurrency) => {
    const rate = conversion.data[toCurrency];
    if (!rate) {
      alert("Invalid conversion data.");
      return;
    }

    const result = amount * rate;
    setConvertedAmount(result.toFixed(2));

    // Add to recent conversions list
    const newConversion = {
      id: Date.now(),
      amount,
      fromCurrency,
      toCurrency,
      result: result.toFixed(2),
    };

    setRecentConversions((prevConversions) => [newConversion, ...prevConversions].slice(0, 5)); // Keep only last 5
  };

  return (
    <div>
      <div className="title-container">
        <h1>Currency Converter</h1>
        <h3>From A to B with ease</h3>
      </div>
      <div className="main-content">
        <div className="currency-converter-container">
          <label htmlFor="amount-currency">
            Enter amount: <input id="amount-currency" type="number" />
          </label>
          <div className="currency-from-to-container">
            <label htmlFor="from-currency">From currency</label>
            <select id="from-currency">
              {currencies.map((currency) => (
                <option key={currency.code} value={currency.code}>
                  {currency.code} ({currency.symbol})
                </option>
              ))}
            </select>

            <span> → </span>

            <label htmlFor="to-currency">To currency</label>
            <select id="to-currency">
              {currencies.map((currency) => (
                <option key={currency.code} value={currency.code}>
                  {currency.code} ({currency.symbol})
                </option>
              ))}
            </select>
          </div>
          <div className="currency-output-container">
            <button className="convert-button" onClick={getConversionRate}>
              Convert
            </button>
            <p>Converted Amount: {convertedAmount}</p>
          </div>

          {recentConversions.length > 0 && (
            <div className="recent-conversions">
              <h3>Recent Conversions</h3>
              <ul>
                {recentConversions.map((conversion) => (
                  <li key={conversion.id}>
                    {conversion.amount} {conversion.fromCurrency} → {conversion.result} {conversion.toCurrency}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CurrencyConverter;