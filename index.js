const express = require('express');
const app = express();
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const volleyball = require('volleyball');
const cors = require('cors');

dotenv.config();
// connect to db
mongoose.connect(
  process.env.DB_CONNECTION,
  { useNewUrlParser: true, useUnifiedTopology: true },
  () => {
    console.log('connected to DB 🌴');
  },
);

// import router
const authRoute = require('./routes/auth');

// Route
app.get('/', (req, res) => {
  res.send('Home Page ! 🏡');
});

// middleware
app.use(cors());
app.use(express.json());
app.use(volleyball);
//// Route middlewre
app.use('/user', authRoute);

// app listen on the port
app.listen(2000, () => {
  console.log('App listening on port 2000!');
});
