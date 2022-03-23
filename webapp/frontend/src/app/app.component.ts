import { Component } from '@angular/core';
import { AuthService } from './services/auth.service';
import { Utente } from './Utente';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'frontend';
  curruser!: Utente;

  constructor(private ser: AuthService) {
    this.curruser = this.ser.getCurrUser();
  }

  ngOnInit(): void {}

  onActivate(elementref: any) {
    elementref.loggedevent.subscribe((res: any) => (this.curruser = res));
  }
}
