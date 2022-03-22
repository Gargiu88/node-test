import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NoteService {

  constructor(private router: Router, private http: HttpClient) { }

  getNote(username: string) {
    console.log(username)
    return this.http.get('http://localhost:3000/note/note/' + username);
  }

  removeNote(id: string): Observable<any> {
    console.log(id)
    return this.http.delete('http://localhost:3000/note/nota/' + id);
  }

  removeNotes(userCreator: string): Observable<any> {
    console.log(userCreator)
    return this.http.delete('http://localhost:3000/note/note/' + userCreator);

  }

  addNote(id: string, titolo: string, testo: string, user: string): Observable<any> {
    console.log(id)
    return this.http.post('http://localhost:3000/note/note', { id: id, titolo: titolo, testo: testo, userCreator: user });
  }

}
