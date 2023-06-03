const express = require('express');
const app = express();
const path = require('path');
const PORT = process.env.PORT || 3500;

// app.use(path, middleware, callback);
app.use('/', express.static(path.join(__dirname, '/public'))); //when use static files, we need to add the completed path
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
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
