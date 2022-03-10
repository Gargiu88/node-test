class Nota {
  id;
  testo;
  titolo;
  username_creatore;
  timestamp;

  constructor(id, testo, titolo, username_creatore) {
    this.id = id;
    this.testo = testo;
    this.titolo = titolo;
    this.username_creatore = username_creatore;
    this.timestamp = new Date();
  }
}

module.exports.Nota = Nota;
