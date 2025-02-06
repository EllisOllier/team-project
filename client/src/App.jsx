import './App.css';
import NavBar from './NavBar';
import {useState, useEffect} from "react";

// function imports
import { getApiCheck } from './functions/getApiCheck'; 



function App() {
  const [data, setData] = useState("offline");

  useEffect(() => {
    getApiCheck()
      .then((res) => {
        setData(res.message);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="App">
      <NavBar></NavBar>
      <h1>Finance Tracker for Students</h1>
      <p>API Status: {data}</p>
    </div>
  );
}

export default App;
