import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Utente } from '../Utente';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Nota } from '../Nota';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  curruser: Utente = { username: '', password: '' };

  constructor(private http: HttpClient) {}

  setCurrUser(us: Utente): void {
    this.curruser = us;
  }

  getCurrUser(): Utente {
    return this.curruser;
  }

  checkuser(user: Utente): Observable<Utente> {
    return this.http.post<Utente>('http://localhost:3000/user/userexist', user);
  }

  addUser(u: Utente): Observable<Utente> {
    return this.http.post<Utente>('http://localhost:3000/user/newuser', u);
  }

  shownote(username: string): Observable<Nota[]> {
    return this.http.get<Nota[]>('http://localhost:3000/note/' + username);
  }

  deleteall(u: Utente): Observable<Utente> {
    return this.http.delete<Utente>(
      'http://localhost:3000/note/user/' + u.username
    );
  }

  deletenota(id: string): Observable<string> {
    return this.http.delete<string>('http://localhost:3000/note/' + id);
  }

  addnota(nota: Nota): Observable<Nota> {
    return this.http.post<Nota>('http://localhost:3000/note/newnota', nota);
  }

  returnutenti(): Observable<Utente[]> {
    return this.http.get<Utente[]>('http://localhost:3000/user');
  }
}
