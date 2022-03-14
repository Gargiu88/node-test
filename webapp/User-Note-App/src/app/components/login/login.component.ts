import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  // istanzio oggetto form(logInForm è il nome del form dichiarato nel .html)
  loginForm = this.formBuilder.group({
    username: ['', [Validators.required]],
    password: ['', [Validators.required]]
  });

  currentUser: any;

  constructor(private formBuilder: FormBuilder, private router: Router, private authServ: AuthService) { }

  ngOnInit(): void {

  }

  logIn() {
    this.authServ.logIn(this.loginForm.get("username")?.value, this.loginForm.get("password")?.value).subscribe((res) =>{ 
      // il backend torna TRUE se login ok, FALSE se login non ok { result : true/false}
      // se result = true faccio A....
      if(res.result) {
        localStorage.setItem('currentUser', res.username);
        this.router.navigate(['note']); // se il logIn è corretto, mi porta alla pagina delle note
      // altrimenti faccio B... 
      }else{
        alert("ERRORE credenziali sbagliate!") // altrimenti genera errore
      }
    });
  }

  goToSignup() {
    this.router.navigate(['signup']);
  }


}
