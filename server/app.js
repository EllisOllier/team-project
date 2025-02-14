// import modules
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
require("dotenv").config();

// app
const app = express();

// middleware
app.use(morgan("dev"));
app.use(cors({origin : true, credentials : true}));
app.use(express.json()); // Add this line to parse JSON request bodies

// routes
const validateLogin = require("./routes/validate-login");
app.use("/api/user", validateLogin);

const checkApi = require("./routes/api-check");
app.use("/api/status-check", checkApi);

// Test POST Api

app.use(cors({ origin: true, credentials: true }));
app.use(express.json()); // Middleware to parse JSON request bodies



// Define a catch-all route for undefined routes
app.use((req, res) => {
  res.status(404).json({ error: "Not Found" });
});

// end of test post api

// port
const port = process.env.PORT || 8080;

// listener
const server = app.listen(port, () => 
    console.log(`Server is running on ${port}`)
);
