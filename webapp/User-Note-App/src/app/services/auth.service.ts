import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private router: Router, private http: HttpClient) { }

  // dichiaro var currentUser per immagazzinare dati utente che sta loggando
  currentUser: any;

  // creo metodo che ritorna Observable con dati utente corrente
  getCurrentUser(): Observable<any> {
    // prendo utente dal local storage
    const user = localStorage.getItem('currentUser');
    // trasformo stringa in ogg con json parse
    return of(JSON.parse(user ? user : ''));
  }

  logIn(u: string, p: string): Observable<any> {
    console.log('login:' + u, p);
    return this.http.post('http://localhost:3000/user/users/login', { username: u, password: p }); // username e password = body
  }

  signUp(u: string, p: string): Observable<any> {
    console.log('signup:' + u, p);
    return this.http.post('http://localhost:3000/user/users/signup', { username: u, password: p });
  }
}
