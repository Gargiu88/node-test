import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { timestamp } from 'rxjs';
import { Nota } from '../Nota';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-newnota',
  templateUrl: './newnota.component.html',
  styleUrls: ['./newnota.component.scss'],
})
export class NewnotaComponent implements OnInit {
  form: FormGroup;
  testo!: string;

  constructor(
    public dialogRef: MatDialogRef<NewnotaComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private ser: AuthService
  ) {
    this.form = new FormGroup({
      id: new FormControl('', [Validators.required]),
      titolo: new FormControl('', [Validators.required]),
      testo: new FormControl('', [Validators.required]),
    });
  }

  ngOnInit(): void {}

  conferma(): void {
    let nota: Nota;
    nota = {
      id: this.form.controls['id'].value,
      titolo: this.form.controls['titolo'].value,
      testo: this.form.controls['testo'].value,
      username_creatore: this.ser.getCurrUser().username,
      timestamp: new Date(),
    };
    console.log(nota);
    this.ser.addnota(nota).subscribe((res) => {
      if (res) {
        this.dialogRef.close(res);
      }
    });

    this.ser
      .shownote(this.ser.getCurrUser().username)
      .subscribe((res) => console.log(res));
    /* this.ser
      .shownote(this.ser.getCurrUser().username)
      .subscribe((res) => console.log(res)); */
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
