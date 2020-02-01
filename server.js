const express = require('express');
const connectDB = require('./config/db');
const cors = require('cors');
const app = express();
const mongoose = require('mongoose');


mongoose.connect(
  'mongodb+srv://jhpkinsinger02:Gr8ontheSq@encouraging-moms-ywdax.mongodb.net/test?retryWrites=true&w=majority',
  { useNewUrlParser: true },
  () => console.log('connected to db')
);


// Connect Database
// connectDB();
app.use(cors());
// Init Middleware
app.use(express.json({
    extended: false
}));

app.get('/', (req, res) => res.send('API Running'));
app.get('/api/encouragement', (req, res) => {
    res.send({ express: 'Hello From encouragement file' });
  });

// Define Routes


app.options('*', cors());
app.use('/api/users', require('./routes/api/users'));
app.use('/api/posts', require('./routes/api/posts'));
app.use('/api/profile', require('./routes/api/profile'));
app.use('/api/auth', require('./routes/api/auth'));
app.use('/api/encouragements', require('./routes/api/encouragements'));


  

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => 
console.log(`Server started on port ${PORT}`));
