// IMPORT:
const express = require('express');
const bodyParser = require("body-parser");
const userRoute = require('./routes/user');
const noteRoute = require('./routes/note');

// PORTA E HOST
const hostname = 'localhost';
const port = 3000;

// SetUp the express app --> rappresenta l app:
const app = express();

// Cors policy -> abilitare chiamate api in base agli indirizzi. Qui abilitare x tutti:
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
    next();
});

// Set up bodyParser to handle data parsing -> formati abilitati nell'app:
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// PORTA in ascolto:
app.listen(port, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});

// Endpoint?
app.get('/', (req, res) => {
    res.json({'message': 'Hello World'})
});

// utilizzo ROUTES
app.use('/user', userRoute);
app.use('/note', noteRoute);

