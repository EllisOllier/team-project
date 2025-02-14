// import modules
const express = require("express");
const { MongoClient, ServerApiVersion } = require("mongodb");
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
const checkApi = require("./routes/api-check");
app.use("/", checkApi);

const validateLogin = require("./routes/validate-login");
app.use("/", validateLogin);

// port
const port = process.env.PORT || 8080;

// listener
const server = app.listen(port, () => 
    console.log(`Server is running on ${port}`)
);
