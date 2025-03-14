// Importing necessary React hooks and other dependencies
import React, { useState, useEffect } from "react";
import Freecurrencyapi from "@everapi/freecurrencyapi-js"; // Currency conversion API library
import "../styles/main.css"; // Styles for the component

const CurrencyConverter = () => {
  // Initialize the currency API client with an API key
  const currencyApi = new Freecurrencyapi("fca_live_7IzkWSy6LsA5XsnsG6t7ldzmhfHHJGG3om5pODDr");

  // State to store the list of recent conversions (up to 5 recent conversions)
  const [recentConversions, setRecentConversions] = useState([]);
  // State to store the most recently converted amount
  const [convertedAmount, setConvertedAmount] = useState(0);

  // States for calculator functionality
  const [calcInput, setCalcInput] = useState(""); // User input for the calculator
  const [calcResult, setCalcResult] = useState(""); // The result of the calculator computation
  const [previousCalculations, setPreviousCalculations] = useState([]); // History of calculations

  // List of currencies available for conversion, including their symbols
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

  // Function to fetch the conversion rate between two currencies
  const getConversionRate = () => {
    // Grab the selected currencies and amount from the input fields
    const baseCurrency = document.getElementById("from-currency").value;
    const conversionCurrency = document.getElementById("to-currency").value;
    const currencyAmount = parseFloat(document.getElementById("amount-currency").value);

    // Validate the entered amount before making the API call
    if (isNaN(currencyAmount) || currencyAmount <= 0) {
      alert("Please enter a valid amount.");
      return;
      
    }

    // validate the entered amount is below threshhold
    if (currencyAmount > 9999999999) {
      alert("Amount is too large. Please enter a number below 9,999,999,999.");
      return;
  }

    // Call the currency API for the latest conversion rates
    currencyApi
      .latest({
        base_currency: baseCurrency,
        currencies: conversionCurrency,
      })
      .then((response) => {
        // Once we have the rate, perform the conversion
        convertCurrency(response, currencyAmount, baseCurrency, conversionCurrency);
      })
      .catch((error) => {
        // Handle any API errors
        console.error("Error fetching conversion rate:", error);
        alert("Failed to get conversion rate. Please try again later.");
      });
  };

  // Function to calculate and display the converted amount
  const convertCurrency = (conversion, amount, fromCurrency, toCurrency) => {
    const rate = conversion.data[toCurrency]; // Extract the conversion rate
    if (!rate) {
      alert("Invalid conversion data.");
      return;
    }

    const result = amount * rate; // Perform the conversion calculation
    setConvertedAmount(result.toFixed(2)); // Update the result, rounded to 2 decimal places

    // Create a new conversion record and update the recent conversions list
    const newConversion = {
      id: Date.now(), // Unique ID based on timestamp
      amount,
      fromCurrency,
      toCurrency,
      result: result.toFixed(2),
    };

    // Add the new conversion to the beginning of the list and keep only the 5 most recent
    setRecentConversions((prevConversions) => [newConversion, ...prevConversions].slice(0, 5));
  };

  // Function to handle calculator input
  const handleCalcInput = (value) => {
    setCalcInput((prev) => {
      // Prevent multiple consecutive operators (e.g., "++" or "**")
      if (/[\+\-\*\/]$/.test(prev) && /[\+\-\*\/]/.test(value)) {
        return prev;
      }
      return prev + value; // Append the input value to the current expression
    });
  };

  // Clears the calculator's input and result
  const clearCalculator = () => {
    setCalcInput("");
    setCalcResult("");
  };

  // Function to evaluate the calculator expression
  const calculateResult = () => {
    try {
      // Evaluate the expression using the Function constructor
      const result = new Function(`return ${calcInput}`)();

      // Update the result and add it to the calculation history
      setCalcResult(result.toFixed(2));
      setPreviousCalculations((prev) => [
        `${calcInput} = ${result.toFixed(2)}`,
        ...prev,
      ]);

      // Clear the input field after calculation
      setCalcInput("");
    } catch (error) {
      // Handle invalid expressions
      setCalcResult("Error");
      setCalcInput("");
    }
  };

  // useEffect hook to handle key presses for calculator input
  useEffect(() => {
    const handleKeyPress = (event) => {
      const { key } = event;

      // Check for valid calculator input keys (numbers, operators, decimal)
      if (/[0-9+\-*/.]/.test(key)) {
        handleCalcInput(key);
      } else if (key === "Backspace") {
        // Remove last character on Backspace
        setCalcInput((prev) => prev.slice(0, -1));
      } else if (key === "Escape") {
        // Clear calculator on Escape
        clearCalculator();
      }
    };

    // Attach the event listener when the component mounts
    window.addEventListener("keydown", handleKeyPress);

    // Clean up the event listener on unmount
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, []);

  return (
    <div>
      {/* Title section */}
      <div className="title-container">
        <h1>Currency Converter</h1>
        <h3>Convert currencies & calculate with ease</h3>
      </div>

      {/* Main container with two-column layout */}
      <div className="main-content two-column-layout">

        {/* Currency converter section */}
        <div className="currency-converter-container">
          <h2>Currency Converter</h2>

          {/* Amount input field */}
          <label htmlFor="amount-currency">
            Enter Desired Amount: <input id="amount-currency" type="number" />
          </label>

          {/* Dropdowns for selecting currencies */}
          <div className="currency-from-to-container">
            <label htmlFor="from-currency">From </label>
            <select id="from-currency">
              {currencies.map((currency) => (
                <option key={currency.code} value={currency.code}>
                  {currency.code} ({currency.symbol})
                </option>
              ))}
            </select>

            <span> → </span>

            <label htmlFor="to-currency">To </label>
            <select id="to-currency">
              {currencies.map((currency) => (
                <option key={currency.code} value={currency.code}>
                  {currency.code} ({currency.symbol})
                </option>
              ))}
            </select>
          </div>

          {/* Button to trigger conversion and display result */}
          <div className="currency-output-container">
            <button className="convert-button" onClick={getConversionRate}>
              Convert
            </button>
            <p>Last Converted Amount: {convertedAmount}</p>
          </div>

          {/* Display recent conversions, if any */}
          {recentConversions.length > 0 && (
            <div className="recent-conversions">
              <h3>Recent Conversions:</h3>
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

        {/* Calculator section */}
        <div className="calculator-outer-container">

          {/* Previous calculation history */}
          <div className="previous-calculations">
            <h3>Calculator History:</h3>
            <ul>
              {previousCalculations.length > 0 ? (
                previousCalculations.map((calculation, index) => (
                  <li key={index}>{calculation}</li>
                ))
              ) : (
                <p>No calculations found</p>
              )}
            </ul>
          </div>

          {/* Calculator interface */}
          <div className="calculator-container">
            <h2>Calculator</h2>

            {/* Display for current input and result */}
            <div className="calculator-display">
              <input type="text" value={calcInput} readOnly />
              <p>Result: {calcResult}</p>
            </div>

            {/* Calculator buttons */}
            <div className="calculator-buttons">
              <button onClick={() => handleCalcInput("1")}>1</button>
              <button onClick={() => handleCalcInput("2")}>2</button>
              <button onClick={() => handleCalcInput("3")}>3</button>
              <button onClick={() => handleCalcInput("+")}>+</button>
              <button onClick={() => handleCalcInput("4")}>4</button>
              <button onClick={() => handleCalcInput("5")}>5</button>
              <button onClick={() => handleCalcInput("6")}>6</button>
              <button onClick={() => handleCalcInput("-")}>-</button>
              <button onClick={() => handleCalcInput("7")}>7</button>
              <button onClick={() => handleCalcInput("8")}>8</button>
              <button onClick={() => handleCalcInput("9")}>9</button>
              <button onClick={() => handleCalcInput("*")}>*</button>
              <button onClick={clearCalculator}>C</button> {/* Clear button */}
              <button onClick={() => handleCalcInput("0")}>0</button>
              <button onClick={calculateResult}>=</button> {/* Equals button */}
              <button onClick={() => handleCalcInput("/")}>/</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Export the CurrencyConverter component to be used in other parts of the app
export default CurrencyConverter;