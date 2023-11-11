import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PayableComponent } from './payable.component';
import { PayablentryComponent } from '../payablentry.component';
import { PayableListComponent } from '../payable-list/payable-list.component';
import { PayableUpdateComponent } from '../payable-update/payable-update.component';
import { PayablesampleComponent } from '../payablesample/payablesample.component';

const routes: Routes = [{
  path: '', component: PayableComponent, children: [
    { path: 'create', component: PayablentryComponent },
    { path: 'update/:id', component: PayableUpdateComponent },
    { path: 'list', component: PayableListComponent },
    { path: 'sample', component: PayablesampleComponent },

  ]

}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PayableRoutingModule { }
