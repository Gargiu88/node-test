const express = require('express');
const userRoute = require('./user.js');
const noteRoute = require('./note.js');
var bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use('/user', userRoute);
app.use('/note', noteRoute);

const HOST = process.env.HOST || 'localhost';
const PORT = process.env.PORT || 3000;

app.listen(PORT, HOST, () => {
  console.log('sono il server e funziono sulla porta ' + PORT);
});
