const express = require('express');
const userRoute = require('./user.js');
const noteRoute = require('./note.js');
var bodyParser = require('body-parser');
const cors = require('cors'); //perchè le due porte litigano e si odiano

const pass = ['http://localhost:4200'];

const app = express();
app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin) return callback(null, true); //se l'origine è nulla, permette la richiesta
      if (pass.indexOf(origin) === -1) {
        //se l'origine da cui viene la chiamata non sta nella lista di quelli col permesso ritorna un mess di errore
        var msg =
          'The CORS policy for this site does not ' +
          'allow access from the specified Origin.';
        return callback(new Error(msg), false);
      }
      return callback(null, true);
    },
  })
);
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use('/user', userRoute);
app.use('/note', noteRoute);

const HOST = process.env.HOST || 'localhost';
const PORT = process.env.PORT || 3000;

app.listen(PORT, HOST, () => {
  console.log('sono il server e funziono sulla porta ' + PORT);
});
