import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { HavePermission, NeedLoggedIn, NeedLogout } from './guards/auth.guard';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [NeedLogout, NeedLoggedIn, HavePermission],
  bootstrap: [AppComponent]
})
export class AppModule { }
