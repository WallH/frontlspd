import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { HavePermission, NeedLoggedIn, NeedLogout } from './guards/auth.guard';
import { RangosComponent } from './admin/views/rangos/rangos.component';

@NgModule({
  declarations: [
    AppComponent,
    RangosComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [NeedLogout, NeedLoggedIn, HavePermission],
  bootstrap: [AppComponent]
})
export class AppModule { }
