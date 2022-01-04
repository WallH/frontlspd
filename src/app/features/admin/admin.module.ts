import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import { UsuarioComponent } from './views/usuario/usuario.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ValoracionoficialComponent } from './views/valoracionoficial/valoracionoficial.component';
import { NavbarComponent } from 'src/app/components/navbar/navbar.component';
import { CorecomponentsModule } from 'src/app/components/corecomponents/corecomponents.module';
import { RangosComponent } from './views/rangos/rangos.component';
import { PermisosendpointComponent } from './views/permisosendpoint/permisosendpoint.component';
import { GoogleChartsModule } from 'angular-google-charts';
import { ComisariaComponent } from './views/comisaria/comisaria.component';
import { FichasptbComponent } from './views/fichasptb/fichasptb.component';
import { GradosancionComponent } from './views/gradosancion/gradosancion.component'; 

@NgModule({
  declarations: [AdminComponent, UsuarioComponent, ValoracionoficialComponent, RangosComponent, PermisosendpointComponent, ComisariaComponent, FichasptbComponent, GradosancionComponent],
  imports: [
    CommonModule,
    AdminRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    CorecomponentsModule,
    GoogleChartsModule  
  ]
})
export class AdminModule { }
