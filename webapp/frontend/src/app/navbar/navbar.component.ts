import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { Utente } from '../Utente';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  curruser!: Utente;
  @Output() loggedevent: EventEmitter<Utente> = new EventEmitter();

  constructor(private ser: AuthService, private route: Router) {}

  ngOnInit(): void {
    this.curruser = this.ser.getCurrUser();
  }

  logout(): void {
    let ut: Utente = { username: '', password: '' };
    this.ser.setCurrUser(ut);
    this.loggedevent.emit(ut);
    this.route.navigate(['']);
  }
}
