import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  currentUser: string = '';

  constructor(private router: Router) { }

  ngOnInit(): void {
    const user = localStorage.getItem('currentUser');
    this.currentUser = user !== null ? user : '';
    if(this.currentUser == ''){
      this.router.navigate(['/']);
    }
  }

  logOut() {
    this.router.navigate(['/']);
    localStorage.setItem('currentUser', '');
  }

}
