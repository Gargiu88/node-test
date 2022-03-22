import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NoteService } from 'src/app/services/note.service';

@Component({
  selector: 'app-add-note-dialog',
  templateUrl: './add-note-dialog.component.html',
  styleUrls: ['./add-note-dialog.component.css']
})
export class AddNoteDialogComponent implements OnInit {

  currentUser: string = '';

  // addNoteForm l'ho spostato in questo componente perchè va inserito nella modale!!
  addNoteForm = this.formBuilder.group({
    id: ['', [Validators.required, Validators.minLength(1)]],
    titolo: ['', [Validators.required, Validators.minLength(1)]],
    testo: ['', [Validators.required, Validators.minLength(1)]]
  });

  // inietto nel costruttore il servizio del componente Dialog Material + servizio NoteService che si occupa di gestore le note
  constructor(public dialogRef: MatDialogRef<AddNoteDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, private formBuilder: FormBuilder, private noteServ: NoteService) { }

  ngOnInit(): void {
    const user = localStorage.getItem('currentUser');
    this.currentUser = user !== null ? user : '';
  }

  addNote() {
    if (this.addNoteForm.get("id")?.value == '' || this.addNoteForm.get("titolo")?.value == '' || this.addNoteForm.get("testo")?.value == '') {
      alert("Errore compilare tutti i campi!");
      return; //solo return --> fermo metodo
    }
    this.noteServ.addNote(this.addNoteForm.get("id")?.value,
      this.addNoteForm.get("titolo")?.value,
      this.addNoteForm.get("testo")?.value,
      this.currentUser).subscribe((res: any) => {
      }, (err: any) => {
        alert("impossibile aggiungere nota!!!")
      });
  }

}
