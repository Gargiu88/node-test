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
    username: ['', [Validators.required]],
    password: ['', [Validators.required]],
    confPassword: ['', [Validators.required]]
  });

  // nel costruttore importo il form builder per implementare form nel .html
  // importo anche l'authService e il Router per cambiare view
  constructor(private formBuilder: FormBuilder, private authServ: AuthService, private router: Router) { }

  ngOnInit(): void {
  }

 

}
