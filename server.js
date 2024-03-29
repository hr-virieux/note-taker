// Node.js modules
const express = require('express');
const apiRoutes = require('./routes/apiRoutes');
const htmlRoutes = require('./routes/htmlRoutes');

// Express app
const app = express();
const PORT = process.env.PORT || 3001; // Define the port

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

// Routes
app.use('/api', apiRoutes);
app.use('/', htmlRoutes);

// Start the server
app.listen(PORT, () => console.log(`Server is listening on port ${PORT}`));
