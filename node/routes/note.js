var express = require('express');
var router = express.Router();
var noteList = [{ id: '1', testo: 'prova', titolo: 'prova1', userCreator: 'a', timestamp: Date.now() }, { id: '2', testo: 'prova2', titolo: 'prova2', userCreator: 'b', timestamp: Date.now() }, { id: '3', testo: 'prova3', titolo: 'prova3', userCreator: 'a', timestamp: Date.now() }];

// ========== LISTA API ==========

// GET Lista Note (tipo id, Testo, Titolo, Username Creatore, Timestamp di creazione)  localhost:3000/note/note
router.get('/note', async (req, res) => {
    console.log("get tutte note")
    res.status(200).json({ result: true, listaNote: noteList });
});

// GET Lista Note di un Utente (es. /notes/<valore Username>)
router.get('/note/:userCreator', async (req, res) => {
    console.log("get note user for user=" + req.params.userCreator)
    let found = false;
    // creo lista vuota
    let noteUserList = [];
    // ciclo lista vecchia
    for (let nota of noteList) {
        // verifico condizione
        if (req.params.userCreator == nota.userCreator) {
            // se condizione è ok aggiungo elemento alla lista nuova
            noteUserList.push(nota);
        }
    }
    // ritorno response
    res.status(200).json({ result: true, listaNote: noteUserList });
});

// GET Nota singola (es. /notes/<valore ID>)
router.get('/nota/:id', (req, res) => {
    console.log("get nota")
    let found = false;
    for (let nota of noteList) {
        if (req.params.id == nota.id) {
            res.status(200).json({ result: true, nota: nota });
            found = true;
            break;
        }
    }
    if (!found) {
        res.status(404).json({ result: false });
    }
});

// POST Aggiunta di una nota da parte di un utente 
router.post('/note', (req, res) => {
    console.log("post note")
    let found = false;
    for (let nota of noteList) {
        // controllo se la nota inserita non esiste gia
        if (req.body.id == nota.id) {
            found = true;
            break;
        }
    }
    if (found) {
        res.status(409).json({ result: false });
    } else {
        noteList.push({ id: req.body.id, testo: req.body.testo, titolo: req.body.titolo, userCreator: req.body.userCreator, timestamp: Date.now() });
        res.status(200).json({ result: true });
    }
});

// DELETE Eliminare una nota specifica (es. /notes/<valore ID>)
router.delete('/nota/:id', (req, res) => {
    console.log("delete singolo")
    let id = req.params.id;
    let found = false;
    for (let nota of noteList) {
        if (id == nota.id) {
            var index = noteList.indexOf(nota);
            noteList.splice(index, 1);
            found = true;
            break;
        }
    }
    if (found) {
        res.status(200).json({ result: true });
    } else {
        console.log("Not found")
        res.status(400).json({ result: false });
    }
});

// DELETE Eliminare tutte le note di un utente (es. /notes/<valore Username>)
router.delete('/note/:userCreator', (req, res) => {
    console.log("delete")
    let userCreator = req.params.userCreator;
    for (var i = 0; i < noteList.length; i++) {
        if (userCreator == noteList[i].userCreator) {
            noteList.splice(i--, 1);
        }
    }
    res.status(200).json({ result: true });
});


module.exports = router;