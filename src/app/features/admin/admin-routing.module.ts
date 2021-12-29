import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HavePermission, NeedLoggedIn } from 'src/app/guards/auth.guard';

import { AdminComponent } from './admin.component';
import { ComisariaComponent } from './views/comisaria/comisaria.component';
import { PermisosendpointComponent } from './views/permisosendpoint/permisosendpoint.component';
import { RangosComponent } from './views/rangos/rangos.component';
import { UsuarioComponent } from './views/usuario/usuario.component';
import { ValoracionoficialComponent } from './views/valoracionoficial/valoracionoficial.component';

const routes: Routes = [{ path: '', component: AdminComponent },
  {path:'usuarios', canActivate:[NeedLoggedIn, HavePermission], data:{ permisosNested:["usuario.nuevo", "usuario.eliminar", "usuario.obtener", "usuario.editar"]},component:UsuarioComponent},
  {path:'rangos', canActivate:[NeedLoggedIn, HavePermission], data:{ permisosNested:["rango.nuevo", "rango.eliminar", "rango.obtener", "rango.editar"]}, component:RangosComponent},
  {path:'valoracionoficial', canActivate:[NeedLoggedIn, HavePermission], data:{ permisosNested:["ficha.nuevo", "ficha.obtener"]}, component:ValoracionoficialComponent},
  {path:'permisosendpoint', canActivate:[NeedLoggedIn, HavePermission], data:{ permisosNested:["rango.nuevo", "rango.eliminar", "rango.obtener", "rango.editar"]}, component:PermisosendpointComponent},
  {path:'comisaria', canActivate:[NeedLoggedIn,HavePermission], data:{ permisosNested:["rango.nuevo", "rango.eliminar", "rango.obtener", "rango.editar"]}, component:ComisariaComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
