import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MainmenuboardRoutingModule } from './mainmenuboard-routing.module';
import { MainmenuboardComponent } from './mainmenuboard.component';
import { SharedModule } from '../shared/shared.module';
import { HeaderComponent } from './header/header.component';



@NgModule({
  declarations: [
    MainmenuboardComponent,HeaderComponent
  ],
  imports: [
    CommonModule,
    MainmenuboardRoutingModule,
    SharedModule,

  ]
})
export class MainmenuboardModule { }
