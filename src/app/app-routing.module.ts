import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NeedLogout } from './guards/auth.guard';

const routes: Routes = [{ path: 'auth', canActivate:[NeedLogout], loadChildren: () => import('./features/auth/auth.module').then(m => m.AuthModule) }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
