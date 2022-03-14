import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NoteService {

  constructor(private router: Router, private http: HttpClient){ }
  
  getNote(username : string) {
    console.log(username)
    return this.http.get('http://localhost:3000/note/note/' + username);
  }
}
