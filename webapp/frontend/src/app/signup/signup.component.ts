import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { faLock } from '@fortawesome/free-solid-svg-icons';
import { AuthService } from '../services/auth.service';
import { Utente } from '../Utente';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent implements OnInit {
  iconauser = faUser;
  iconapass = faLock;
  form: FormGroup;
  user: Utente = { username: '', password: '' };

  @Output() loggedevent: EventEmitter<Utente> = new EventEmitter();

  constructor(private ser: AuthService, private route: Router) {
    this.form = new FormGroup({
      username: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
      checkpassword: new FormControl('', [Validators.required]),
    });
  }

  ngOnInit(): void {}

  iscriviti(): void {
    if (this.form.invalid) {
      alert('Username o pasword non validi');
    } else {
      if (
        this.form.controls['password'].value ==
        this.form.controls['checkpassword'].value
      ) {
        let user: Utente;
        user = {
          username: this.form.controls['username'].value,
          password: this.form.controls['password'].value,
        };
        this.ser.addUser(user).subscribe(
          (res) => {
            if (res) {
              console.log(this.ser.addUser(user));
              this.ser.setCurrUser(user);
              this.route.navigate(['']);
            }
          },
          (error: any) => {
            alert('utente già esistente');
          }
        );
      }
    }
  }
}
