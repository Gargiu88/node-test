import { Component, OnInit } from '@angular/core';
import { NoteService } from 'src/app/services/note.service';

@Component({
  selector: 'app-note',
  templateUrl: './note.component.html',
  styleUrls: ['./note.component.css']
})
export class NoteComponent implements OnInit {
  noteList: any[] = [];
  currrentUser: any;
  headElements = ['id', 'testo', 'titolo', 'userCreator', 'timestamp', 'delete'];

  constructor(private noteServ: NoteService) { }

  ngOnInit(): void {
    this.getNoteUser();
  }

  getNoteUser() {
    let currentUser = localStorage.getItem('currentUser');
    if (currentUser) {
      this.noteServ.getNote(currentUser).subscribe((res : any) => {
        this.noteList = res.listaNote;
      });
    }
  }
}
