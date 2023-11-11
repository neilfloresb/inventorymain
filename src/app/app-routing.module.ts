import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './user/login/login.component';
import { RegistrationComponent } from './user/registration/registration.component';
import { SupplierComponent } from './modules/supplier/supplier.component';
import { ItemmasterComponent } from './modules/itemmaster/itemmaster.component';
import { Sample1gridComponent } from './samples/GRID/sample1grid/sample1grid.component';
import { Sample12gridComponent } from './samples/GRID/sample12grid/sample12grid.component';
import { Sample3gridComponent } from './samples/GRID/sample3grid/sample3grid.component';
import { RemotedataComponent } from './samples/GRID/remotedata/remotedata.component';
import { DataloadingComponent } from './samples/GRID/dataloading/dataloading.component';
import { PayablentryComponent } from './modules/payablentry/payablentry.component';
import { PayableDetailComponent } from './modules/payablentry/payable-detail/payable-detail.component';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  // { path: 'registration', component: RegistrationComponent },
  // { path: 'supplier', component: SupplierComponent },
  // { path: 'items', component: ItemmasterComponent },
  // { path: 'gridsample', component: Sample1gridComponent },
  // { path: 'grid2sample', component: Sample12gridComponent },
  // { path: 'grid3sample', component: Sample3gridComponent },
  // { path: 'remotedata', component: RemotedataComponent },
  // { path: 'dataloading', component: DataloadingComponent },
  // { path: 'payable', component: PayablentryComponent },
  { path: 'mainmenuboard', loadChildren: () => import('./mainmenuboard/mainmenuboard.module').then(m => m.MainmenuboardModule) },
 // { path: 'payable2', component: PayableDetailComponent },
  // { path: '**', redirectTo: 'login' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
