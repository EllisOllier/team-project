// import modules
const express = require("express");
const { MongoClient, ServerApiVersion } = require("mongodb");
const morgan = require("morgan");
const cors = require("cors");
require("dotenv").config();

// app
const app = express();

// db
const uri = process.env.MONGODB_URI || "mongodb+srv://studentFinanceAdmin:StuFinTracker@cluster0.a38cu.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

async function run() {
    try {
        // Connect the client to the server
        await client.connect();
        // Send a ping to confirm a successful connection
        await client.db("admin").command({ ping: 1 });
        console.log("Pinged your deployment. You successfully connected to MongoDB!");
    } catch (error) {
        console.error("Failed to connect to MongoDB:", error);
    }
}

run().catch(console.dir);

// Keep the client connected for the duration of the app's runtime
process.on('SIGINT', async () => {
    await client.close();
    console.log("MongoDB client disconnected");
    process.exit(0);
});

// middleware
app.use(morgan("dev"));
app.use(cors({origin : true, credentials : true}));

// routes
const testRoutes = require("./routes/test");
app.use("/", testRoutes);

// port
const port = process.env.PORT || 8080;

// listener
const server = app.listen(port, () => 
    console.log(`Server is running on ${port}`)
);
