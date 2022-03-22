import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  // signupForm è il nome del form che ho messo nel .html x fare il binding delle proprieta inserite(al posto del ngModel)
  signupForm = this.formBuilder.group({
    username: ['', [Validators.required, Validators.minLength(1)]],
    password: ['', [Validators.required, Validators.minLength(1)]],
    confPassword: ['', [Validators.required, Validators.minLength(1)]]
  });

  // nel costruttore importo il form builder per implementare form nel .html
  // importo anche l'authService e il Router per cambiare view
  constructor(private formBuilder: FormBuilder, private authServ: AuthService, private router: Router) { }

  ngOnInit(): void {
  }

  checkPassword(): boolean {
    let passwordCorrect = false;
    if (this.signupForm.get("password")?.value == '' || this.signupForm.get("confPassword")?.value == '') {
      alert("Errore compilare i campi password!");
      return false;
    }
    if (this.signupForm.get("password")?.value == this.signupForm.get("confPassword")?.value) {
      // controlla se le password corrispondono
      passwordCorrect = true;
    }
    if (!passwordCorrect) {
      alert("ERRORE le password non corrispondono!")
    }
    return passwordCorrect;
  }

  save() {
    if (this.checkPassword()) { // true
      console.log("Password correct")
      this.authServ.signUp(this.signupForm.get("username")?.value, this.signupForm.get("password")?.value).subscribe(response => {
        if (response) {
          if (this.signupForm.get("username")?.value != '') {
            this.router.navigate(['/']);
          } else {
            alert("Errore inserire username");
          }
        }
      }, (err: any) => {
        alert("Errore utente già registrato!")
      });
    }
  }

}
