import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IssuanceRoutingModule } from './issuance-routing.module';
import { IssuanceComponent } from './issuance.component';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [
    IssuanceComponent
  ],
  imports: [
    CommonModule,
    IssuanceRoutingModule,
    SharedModule
  ]
})
export class IssuanceModule { }
