import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { faLock } from '@fortawesome/free-solid-svg-icons';
import { AuthService } from '../services/auth.service';
import { Utente } from '../Utente';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  iconauser = faUser;
  iconapass = faLock;
  form: FormGroup;
  curruser: Utente = { username: '', password: '' };

  /* @Output() loggedevent: EventEmitter<Utente> = new EventEmitter(); */

  constructor(private ser: AuthService, private route: Router) {
    this.form = new FormGroup({
      username: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
    });
  }

  ngOnInit(): void {
    console.log('logincomponent');
  }

  accedi(): void {
    if (this.form.invalid) {
      alert('Username o pasword non validi');
    } else {
      let user: Utente;
      user = {
        username: this.form.controls['username'].value,
        password: this.form.controls['password'].value,
      };
      this.ser.checkuser(user).subscribe(
        (res) => {
          if (res) {
            this.ser.setCurrUser(user);
            this.route.navigate(['/home']);
          }
        },
        (error: any) => {
          alert('utente non presente');
        }
      );
    }
  }
}
