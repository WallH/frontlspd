import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SupervisorRoutingModule } from './supervisor-routing.module';
import { SupervisorComponent } from './supervisor.component';
import { ValoracionoficialComponent } from './views/valoracionoficial/valoracionoficial.component';
import { CorecomponentsModule } from 'src/app/components/corecomponents/corecomponents.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [SupervisorComponent, ValoracionoficialComponent],
  imports: [
    CommonModule,
    SupervisorRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    CorecomponentsModule,
  ]
})
export class SupervisorModule { }
