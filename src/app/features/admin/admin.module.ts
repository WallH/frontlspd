import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import { UsuarioComponent } from './views/usuario/usuario.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ValoracionoficialComponent } from './views/valoracionoficial/valoracionoficial.component';
import { NavbarComponent } from 'src/app/components/navbar/navbar.component';
import { CorecomponentsModule } from 'src/app/components/corecomponents/corecomponents.module';


@NgModule({
  declarations: [AdminComponent, UsuarioComponent, ValoracionoficialComponent],
  imports: [
    CommonModule,
    AdminRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    CorecomponentsModule
  ]
})
export class AdminModule { }
