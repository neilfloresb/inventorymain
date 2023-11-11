import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PayableRoutingModule } from './payable-routing.module';
import { PayableComponent } from './payable.component';


@NgModule({
  declarations: [
    PayableComponent
  ],
  imports: [
    CommonModule,
    PayableRoutingModule
  ]
})
export class PayableModule { }
