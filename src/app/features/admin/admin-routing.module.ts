import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdminComponent } from './admin.component';
import { UsuarioComponent } from './views/usuario/usuario.component';
import { ValoracionoficialComponent } from './views/valoracionoficial/valoracionoficial.component';

const routes: Routes = [{ path: '', component: AdminComponent },
  {path:'usuarios', component:UsuarioComponent},
  {path:'valoracionoficial', component:ValoracionoficialComponent}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
