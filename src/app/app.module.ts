import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { AnnonceFormComponent } from './annonce-form/annonce-form.component';
import { MatRadioModule } from '@angular/material/radio';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { ListeAnnonceComponent } from './liste-annonce/liste-annonce.component';
import { TableModule } from 'primeng/table';
import { FormsModule } from '@angular/forms';
import { CalendarModule } from 'primeng/calendar';
import { HomeComponent } from './home/home.component';
import { AdminviewComponent } from './adminview/adminview.component';
import { AnnoncesComponent } from './annonces/annonces.component';
import { DialogModule } from 'primeng/dialog';
import { ToolbarModule } from 'primeng/toolbar';
import { ToastModule } from 'primeng/toast';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import {MessageService} from "primeng/api";
import {CardModule} from "primeng/card";
import {InputTextModule} from "primeng/inputtext";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {ButtonModule} from "primeng/button";
import { TabMenuModule } from 'primeng/tabmenu';
import { BadgeModule } from 'primeng/badge';





@NgModule({
  declarations: [
    AppComponent,
    AnnonceFormComponent,
    ListeAnnonceComponent,
    HomeComponent,
    AdminviewComponent,
    AnnoncesComponent,
    LoginComponent,
    RegisterComponent,



  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ButtonModule,
    CardModule,
    AppRoutingModule,
    NgbModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatFormFieldModule,
    MatCardModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatRadioModule,
    MatSidenavModule,
    MatListModule,
    MatIconModule,
    MatToolbarModule,
    TableModule,
    FormsModule,
    CalendarModule,
    DialogModule,
    ToolbarModule,
    ToastModule,
    ConfirmDialogModule,
    CardModule,
    InputTextModule,
    BrowserAnimationsModule,
    TabMenuModule,
    BadgeModule
    
    


  ],

  providers: [
    MessageService,
    provideAnimationsAsync()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
