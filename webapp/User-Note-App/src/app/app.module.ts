import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';

import { ReactiveFormsModule } from '@angular/forms';
import { MatSliderModule } from '@angular/material/slider';
import { MatToolbarModule } from '@angular/material/toolbar'; // barra strumenti(es navbar)
import { MatTabsModule } from '@angular/material/tabs';
import { MatCardModule } from '@angular/material/card';   // card es.nel login
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { MatButtonModule } from '@angular/material/button';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatDialogModule } from '@angular/material/dialog';  // modulo Dialog di Material
import { FormsModule } from "@angular/forms";
import { SignupComponent } from './components/signup/signup.component';
import { NoteComponent } from './components/note/note.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignupComponent,
    NoteComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule, BrowserModule, BrowserAnimationsModule,
    AppRoutingModule, ReactiveFormsModule, MatSliderModule, MatToolbarModule, MatTabsModule,
    MatCardModule, MatFormFieldModule, MatSelectModule, MatInputModule, HttpClientModule, MatButtonModule, MatAutocompleteModule, MatIconModule,
    MatTableModule, MatDialogModule, FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
