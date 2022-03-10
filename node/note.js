const { Nota } = require('./Nota.js');
const express = require('express');
const Router = express.Router();

let listaNote = [
  new Nota('ab1234', 'ciao ciao ciao', 'ciao', 'Lillo'),
  new Nota('ab1235', 'amo marchu', 'love', 'Andrea'),
  new Nota('ab1236', 'amo tanto marchu', 'lovii', 'Andrea'),
];

Router.get('', async (req, res) => {
  res.status(200).json(listaNote);
});

Router.get('/:username', async (req, res) => {
  var us = req.params.username;
  var note = listaNote.filter((no) => no.username_creatore == us);
  res.status(200).json(note);
});

Router.get('/id/:id', async (req, res) => {
  //due / perchè altrimenti vanno in conflitto
  console.log(listaNote);
  var ids = req.params.id;
  console.log(ids);
  var nota = listaNote.filter((no) => no.id == ids)[0];
  res.status(200).json(nota);
});

Router.post('/nuovanota', async (req, res) => {
  let ce = false;
  for (let u of listaNote) {
    if (u.id == req.body.id) {
      ce = true;
      break;
    }
  }
  if (ce) {
    res.status(409).json({ dice: 'conflitto' });
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
  var not = req.params.noteid;
  listaNote = listaNote.filter((u) => u.id !== not);
  res.status(200).json({ dico: 'nota cancellata' });
  console.log(listaNote);
});

Router.delete('/user/:utente', async (req, res) => {
  var ute = req.params.utente;
  listaNote = listaNote.filter((u) => u.username_creatore !== ute);
  res.status(200).json({ dico: 'note cancellate' });
  console.log(listaNote);
});

module.exports = Router;
