const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

const mongoURI = process.env.MONGO_URI || 'mongodb://localhost:27017/mydatabase';

mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.log(err));


// Routes
app.use('/api/users', require('../routes/users'));
app.use('/api/employees', require('../routes/employees'));

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
}); 