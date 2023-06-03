require('dotenv').config();
const express = require('express');
const app = express();
const path = require('path');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const connectDB = require('./config/dbConnection');
const allowedOrigins = require('./config/corsOrigin');
const PORT = process.env.PORT || 3500;
connectDB();
const logger = require('./middleware/logEvents/logger');
const errLog = require('./middleware/logEvents/errLog');
const logEvent = require('./middleware/logEvents/logEvent');
app.use(logger);

console.log(process.env.NODE_DEV);
app.use(cors(allowedOrigins)); //allow cross site visit
// app.use(path, middleware, callback);
app.use(express.json()); //parse the json data
app.use(cookieParser()); //parse the cookies
// app.use(express.static('public')) both ok
app.use('/', express.static(path.join(__dirname, 'public'))); //when use static files, we need to add the completed path
app.use('/', require('./routes/root'));

app.all('*', (req, res) => {
  res.status(404);
  if (req.accepts('html')) {
    res.sendFile(path.join(__dirname, 'views', '404.html'));
  } else if (req.accepts('json')) {
    res.json({ message: 'Your request is not found' });
  } else {
    res.type('txt').send('404, Your request is not allowed');
  }
});

app.use(errLog);
app.use(errLog);
mongoose.connection.once('open', () => {
  console.log('Connected to MongoDB');
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});

//to listen for the mongoose when error appears
mongoose.connection.on('error', (err) => {
  console.log(err);
  logEvent(
    `${err.no}: ${err.code}\t${err.syscall}\t${err.hostname}`,
    'mongoError.log'
  );
});
