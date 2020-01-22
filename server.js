const express = require('express');
const connectDB = require('./config/db');
const cors = require('cors');
const app = express();
// const path = require('path');

// Connect Database
connectDB();
app.use(cors());
// Init Middleware
app.use(express.json({
    extended: false
}));

app.get('/', (req, res) => res.send('API Running'));
app.get('/api/auth', (req, res) => {
    res.send({ express: 'Hello From auth file' });
  });

// Define Routes

app.options('*', cors());
app.use('/api/users', require('./routes/api/users'));
// app.use('/api/posts', require('./routes/api/posts'));
app.use('/api/profile', require('./routes/api/profile'));
app.use('/api/auth', require('./routes/api/auth'));


  

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => 
console.log(`Server started on port ${PORT}`));

// module.exports = server;