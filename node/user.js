const { Utente } = require('./Utente');
const express = require('express');
const Router = express.Router();

let listaUtenti = [
  /* { username: 'Andrea', password: 'Mio' },
  { username: 'Lilo', password: 'solilo' }, */
  new Utente('a', 'a'),
  new Utente('b', 'b'),
  new Utente('c', 'c'),
];

Router.get('', async (req, res) => {
  res.status(200).json(listaUtenti);
});

Router.get('/:username', async (req, res) => {
  const trovato = listaUtenti.find((u) => u.username == req.params.username);
  if (trovato) {
    res.status(200).json(trovato);
  } else {
    res.status(404).json({ result: 'user not found' });
  }
});

Router.post('/newuser', async (req, res) => {
  console.log(req.body);
  console.log('prima di inserire', listaUtenti);
  let ce = false;
  for (let u of listaUtenti) {
    if (u.username == req.body.username) {
      console.log('sono nel primo if ' + req.body.username);
      console.log(u.username);
      ce = true;
      break;
    }
  }
  if (ce) {
    res.status(409).json({ result: 'collision' });
  } else {
    listaUtenti.push(
      /* {
        username: req.body.username,
        password: req.body.password,
      } */ new Utente(req.body.username, req.body.password)
    );
    res
      .status(200)
      .json({ username: req.body.username, password: req.body.password });
  }
  console.log('dopo inserito ', listaUtenti);
});

Router.delete('/:utdelete', async (req, res) => {
  var ut = req.params.utdelete;
  listaUtenti = listaUtenti.filter((u) => u.username !== ut);
  res.status(200).json({ result: 'user has been deleted' });
  console.log(listaUtenti);
});

Router.post('/userexist', async (req, res) => {
  if (
    listaUtenti.some(
      (u) => u.username == req.body.username && u.password == req.body.password
    )
  ) {
    res.status(200).json({ result: 'user exists' });
  } else {
    res.status(404).json({ result: 'unregistered user' });
  }
});

/* Router.post('/login', async (req, res) => {
  let found = false;
  for (let u of listaUtenti) {
    if (u.username == req.body.username && u.password == req.body.password) {
      res.status(200).json({ result: 'true', username: u.username });
      found = true;
      break;
    }
  }
  if (!found) {
    res.status(404).json({ result: 'false' });
  }
}); */

module.exports = Router;
