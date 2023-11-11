import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IssuanceComponent } from './issuance.component';

const routes: Routes = [{ path: '', component: IssuanceComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class IssuanceRoutingModule { }
