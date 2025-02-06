const mongoose = require('mongoose');
require('dotenv').config();

// ...existing code...

mongoose.set('debug', true); // Enable Mongoose debugging

mongoose.connect(process.env.MONGO_URI, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected'))
.catch(err => {
  console.error('MongoDB connection error:', err);
  process.exit(1); // Exit the process with an error code
});

// ...existing code...
