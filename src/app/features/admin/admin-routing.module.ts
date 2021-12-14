import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HavePermission, NeedLoggedIn } from 'src/app/guards/auth.guard';

import { AdminComponent } from './admin.component';
import { RangosComponent } from './views/rangos/rangos.component';
import { UsuarioComponent } from './views/usuario/usuario.component';
import { ValoracionoficialComponent } from './views/valoracionoficial/valoracionoficial.component';

const routes: Routes = [{ path: '', component: AdminComponent },
  {path:'usuarios', canActivate:[NeedLoggedIn, HavePermission], data:{ permisosNested:["usuario.nuevo", "usuario.eliminar"]},component:UsuarioComponent},
  {path:'rangos', canActivate:[NeedLoggedIn], component:RangosComponent},
  {path:'valoracionoficial', component:ValoracionoficialComponent}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
