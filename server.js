const express = require('express');
const connectDB = require('./config/db');
const cors = require('cors');
const app = express();
// const path = require('path');

// Connect Database
connectDB();

// Init Middleware
app.use(express.json({
    extended: false
}));

app.get('/', (req, res) => res.send('API Running'));

// Define Routes
app.use(cors());
app.options('*', cors());
app.use('/api/users', require('./routes/api/users'));
app.use('/api/posts', require('./routes/api/posts'));
app.use('/api/profile', require('./routes/api/profile'));
app.use('/api/auth', require('./routes/api/auth'));

// if (process.env.NODE_ENV === 'production') {
//     // Set static folder
//     app.use(express.static('client/build'));
  
// //     app.get('*', (req, res) => {
// //       res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
// //     });
// //   }
  

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => 
console.log(`Server started on port ${PORT}`));

module.exports = server;