const express = require('express');
const connectDB = require('./config/db');

const path = require('path');

const app = express();

// Connect Database
connectDB();

//Init Middleware
app.use(express.json({
    extended: false
}));

app.get('/', (req, res) => res.send('API Running'));

// Define Routes
app.use('/api/users', require('./routes/api/users'));
<<<<<<< HEAD
app.use('/api/posts', require('./routes/api/posts'));
=======
app.use('/api/post', require('./routes/api/posts'));
>>>>>>> 32a37122b930af4ff9f95552f27614c603198062
app.use('/api/profile', require('./routes/api/profile'));
app.use('/api/auth', require('./routes/api/auth'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));