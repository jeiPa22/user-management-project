import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UnauthorizedPageComponent } from './features/shared/ui/pages/unauthorized-page/unauthorized-page.component';
import { CoreModule } from './core/core.module';

@NgModule({
  declarations: [AppComponent, UnauthorizedPageComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    CoreModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
