import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HavePermission, NeedLoggedIn } from 'src/app/guards/auth.guard';

import { SupervisorComponent } from './supervisor.component';
import { MicuentaComponent } from './views/micuenta/micuenta.component';
import { ValoracionoficialComponent } from './views/valoracionoficial/valoracionoficial.component';

const routes: Routes = [{ path: '', component: SupervisorComponent },
  {path:'valoracionoficial', canActivate:[NeedLoggedIn, HavePermission], data:{ permisosNested:["ficha.nuevo"]}, component:ValoracionoficialComponent},
  {path:'micuenta', canActivate:[NeedLoggedIn], component:MicuentaComponent}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SupervisorRoutingModule { }
