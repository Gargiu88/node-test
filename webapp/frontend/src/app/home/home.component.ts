import { Component, OnInit } from '@angular/core';
import { Nota } from '../Nota';
import { AuthService } from '../services/auth.service';
import { Utente } from '../Utente';
import { MatDialog } from '@angular/material/dialog';
import { NewnotaComponent } from '../newnota/newnota.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  note: Nota[] = [];
  utlog!: Utente;

  constructor(private ser: AuthService, public dialog: MatDialog) {}

  ngOnInit(): void {
    this.utlog = this.ser.getCurrUser();
    this.getlistanote(this.utlog.username);
  }

  getlistanote(username: string): void {
    this.ser.shownote(username).subscribe((res) => (this.note = res));
  }

  deleteall(): void {
    this.ser.deleteall(this.utlog).subscribe((res) => {
      if (res) {
        this.note = [];
      }
    });
  }

  deletenota(n: Nota): void {
    let id = n.id;
    this.ser.deletenota(id).subscribe((res) => {
      if (res) {
        this.note = this.note.filter((n) => n.id != id);
      }
    });
  }

  aggiunginota(): void {
    let confermDialog = this.dialog.open(NewnotaComponent, {
      data: { titolo: 'aggiungi nota' },
    });
    confermDialog.afterClosed().subscribe((res) => {
      console.log('chiuso dialog', res);
      if (res) {
        console.log(res);
        this.ser
          .shownote(this.utlog.username)
          .subscribe((res) => (this.note = res));
      }
    });
  }
}
