import './App.css';
import NavBar from './NavBar';
import {useState, useEffect} from "react";

// function imports
import { getTest } from './functions/test'; 


function App() {
  const [data, setData] = useState("offline");

  useEffect(() => {
    getTest()
      .then((res) => {
        setData(res.message);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="App">
      <h1>Finance Tracker for Students</h1>
      <p>API Status: {data}</p>
      <NavBar></NavBar>
    </div>
  );
}

export default App;
