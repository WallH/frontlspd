import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HavePermission, NeedLoggedIn } from 'src/app/guards/auth.guard';

import { SupervisorComponent } from './supervisor.component';
import { FichaptbComponent } from './views/fichaptb/fichaptb.component';
import { MicuentaComponent } from './views/micuenta/micuenta.component';
import { ValoracionoficialComponent } from './views/valoracionoficial/valoracionoficial.component';

const routes: Routes = [{ path: '', canActivate:[NeedLoggedIn, HavePermission], data:{ permisosNested:["ficha.nuevo"]}, component:ValoracionoficialComponent},
  {path:'valoracionoficial', canActivate:[NeedLoggedIn, HavePermission], data:{ permisosNested:["ficha.nuevo"]}, component:ValoracionoficialComponent},
  {path:'fichaptb', canActivate:[NeedLoggedIn, HavePermission], data:{permisosNested:["fichaptb.nuevo"]}, component:FichaptbComponent},
  {path:'micuenta', canActivate:[NeedLoggedIn], component:MicuentaComponent}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SupervisorRoutingModule { }
