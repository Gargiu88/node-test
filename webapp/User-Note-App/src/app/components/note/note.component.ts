import { Component, OnInit } from '@angular/core';
import { NoteService } from 'src/app/services/note.service';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';
import { AddNoteDialogComponent } from './add-note-dialog/add-note-dialog.component';
import { Router } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-note',
  templateUrl: './note.component.html',
  styleUrls: ['./note.component.css']
})
export class NoteComponent implements OnInit {
  noteList: any[] = [];
  currentUser: string = '';
  // Colonne x tabella nel .html:
  headElements = ['id', 'testo', 'titolo', 'userCreator', 'timestamp', 'delete'];

  constructor(private noteServ: NoteService, private dialog: MatDialog, private router: Router, private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    const user = localStorage.getItem('currentUser');
    this.currentUser = user !== null ? user : '';
    this.getNoteUser();
  }

  getNoteUser() {
    this.noteServ.getNote(this.currentUser).subscribe((res: any) => {
      this.noteList = res.listaNote;
    });
  }

  removeNote(id: any) {
    // apre la modale di conferma passandogli title e message
    const confirmDialog = this.dialog.open(ConfirmDialogComponent, { // open() prende due parametri: il componente e la configurazione opzionale
      data: {
        title: 'Conferma rimozione nota',
        message: 'Sei sicuro di voler rimuovere la nota ' + id + ' ?'  // dati che appariranno nella finsetra di dialog : titolo + messaggio conferma
      }
    });
    // aspetta la risposta della modale con la subscribe
    confirmDialog.afterClosed().subscribe((res: any) => {
      if (res === true) {
        // esegue la logica richiesta se si clicca "Conferma"
        this.noteServ.removeNote(id).subscribe((res: any) => {
          if (res) {
            // ritorna lista note aggiornata
            this.getNoteUser();
          } else {
            alert("impossibile eliminare")
          }
        });

      } else {
        console.log("annullato")
      }
    });
  }

  removeNotes() {
    // apre la modale di conferma passandogli title e message
    const confirmDialog = this.dialog.open(ConfirmDialogComponent, {
      data: {
        title: 'Conferma rimozione note',
        message: 'Sei sicuro di voler rimuovere tutte le note?'
      }
    });
    confirmDialog.afterClosed().subscribe((res: any) => {
      if (res === true) {
        this.noteServ.removeNotes(this.currentUser).subscribe((res: any) => {
          if (res) {
            // ritorna lista note aggiornata
            this.getNoteUser();
          } else {
            alert("impossibile eliminare")
          }
        });
      } else {
        console.log("annullato")
      }
    });
  }

  openAddNoteModal() {
    // apre la modale per riempire FORM
    const confirmDialog = this.dialog.open(AddNoteDialogComponent, {
      data: {
        title: 'Aggiunta nota: '
      }
    });
    confirmDialog.afterClosed().subscribe((res: any) => {
      if (res) {
        // ritorna lista note aggiornata
        this.getNoteUser();
      }
    });
  }

}
