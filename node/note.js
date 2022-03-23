const { Nota } = require('./Nota.js');
const express = require('express');
const Router = express.Router();

let listaNote = [
  new Nota('a1', 'ciao1', 'ciao1', 'a'),
  new Nota('a2', 'ciao2', 'ciao2', 'b'),
  new Nota('a3', 'ciao3', 'ciao3', 'c'),
];

Router.get('', async (req, res) => {
  //tutte le note di tutti gli utenti
  res.status(200).json(listaNote);
});

Router.get('/:username', async (req, res) => {
  //tutte le note di un utente
  console.log('GET:\n', listaNote);
  var us = req.params.username;
  var note = listaNote.filter((no) => no.username_creatore == us);
  res.status(200).json(note);
});

Router.get('/id/:id', async (req, res) => {
  //singola nota per id
  //due / perchè altrimenti vanno in conflitto
  console.log(listaNote);
  var ids = req.params.id;
  console.log(ids);
  var nota = listaNote.filter((no) => no.id == ids)[0];
  res.status(200).json(nota);
});

Router.post('/newnota', async (req, res) => {
  //add nuova nota
  let ce = false;
  for (let u of listaNote) {
    if (u.id == req.body.id) {
      ce = true;
      break;
    }
  }
  if (ce) {
    res.status(409).json({ result: 'collision' });
  } else {
    listaNote.push(
      new Nota(
        req.body.id,
        req.body.testo,
        req.body.titolo,
        req.body.username_creatore
      )
    );
    res.status(200).json({
      id: req.body.id,
      testo: req.body.testo,
      titolo: req.body.titolo,
      username_creatore: req.body.username_creatore,
    });
  }
});

Router.delete('/:noteid', async (req, res) => {
  //cancella nota per id
  var not = req.params.noteid;
  listaNote = listaNote.filter((u) => u.id !== not);
  res.status(200).json({ result: 'nota deleted' });
  console.log(listaNote);
});

Router.delete('/user/:user', async (req, res) => {
  //cancella tutte le note di un utente
  var ute = req.params.user;
  listaNote = listaNote.filter((u) => u.username_creatore != ute);
  res.status(200).json({ result: 'note delelted' });
  console.log('DELETE:\n', listaNote);
});

module.exports = Router;
