import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './features/auth/login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CountUserComponent } from './features/users/count-user/count-user.component';
import { FormUserComponent } from './features/users/form-user/form-user.component';
import { TableUserComponent } from './features/users/table-user/table-user.component';

@NgModule({
  declarations: [AppComponent, LoginComponent, CountUserComponent, FormUserComponent, TableUserComponent],
  imports: [    
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
