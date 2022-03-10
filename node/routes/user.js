var express = require('express');
var router = express.Router();
var userList = [{ username: 'a', password: 'a'}, { username: 'b', password: 'b'}, { username: 'c', password: 'c'}];

// ========== LISTA API ==========

// GET LISTA UTENTI  localhost:3000/user/users
router.get('/users', (req, res) => {
    return res.status(200).json(userList);
});

// GET UTENTE SINGOLO data l'username (es. /user/<valore Username>) -> path variable
router.get('/users/:username', (req, res) => {
    console.log(req.params.username);
    let found = false;
    for (let user of userList) {
        if (req.params.username == user.username) {
            res.status(200).json({ result: true, username: user.username});
            found = true;
            break;
        }
    }
    if (!found) {
        res.status(404).json({ result: false });
    }
});

// POST Aggiungere utente alla lista
router.post('/users', (req, res) => {
    let found = false;
    for (let user of userList) {
        if (req.body.username == user.username) {
            found = true;
            break;
        }
    }
    if (found) {
        res.status(409).json({ result: false });
    } else {
        userList.push({ username: req.body.username, password: req.body.password })
        res.status(200).json({ result: true });
    }
});

// DELETE Eliminare un utente dalla lista (es. /user/<valore Username>)
router.delete('/users/:username', (req, res) => {
    const username = req.params.username;
    let found = false;
    for (let user of userList) {
        if (username == user.username) {
            var index = userList.indexOf(user);
            userList.splice(index, 1);
            found = true;
            break;
        }
    }
    if (found) {
        res.status(200).json({ result: true });
    } else {
        console.log("Not found")
        res.status(404).json({ result: false });
    }
});



module.exports = router;