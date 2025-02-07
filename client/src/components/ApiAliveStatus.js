// Import neccessary files
import React from 'react';
import './ApiAliveStatus.css';
import {useState, useEffect} from "react";

import { getApiCheck } from '../functions/getApiCheck';

// Sets up the ApiAliveStatus component
// This component is used to check the status of the API
// Declares how the api message is displayed
const ApiAliveStatus = () => {
    const [data, setData] = useState("offline");

    useEffect(() => {
        getApiCheck()
          .then((res) => {
            setData(res.message);
          })
          .catch((err) => console.log(err));
      }, []);

    return (
      // Add html below
        <p>Api status check: {data}</p>
      // Add html above
    )
}
export default ApiAliveStatus;