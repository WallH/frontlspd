import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [{ path: 'auth', loadChildren: () => import('./features/auth/auth.module').then(m => m.AuthModule) }, { path: 'admin', loadChildren: () => import('./features/admin/admin.module').then(m => m.AdminModule) }, { path: 'supervisor', loadChildren: () => import('./features/supervisor/supervisor.module').then(m => m.SupervisorModule) }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
