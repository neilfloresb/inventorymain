import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainmenuboardComponent } from './mainmenuboard.component';
import { cloudIcon, globeOutlineIcon, questionCircleIcon } from '@progress/kendo-svg-icons';
import { PayablentryComponent } from '../modules/payablentry/payablentry.component';
import { PayableDetailComponent } from '../modules/payablentry/payable-detail/payable-detail.component';

const routes: Routes = [

  {
    path: '', component: MainmenuboardComponent, children: [
      { path: 'products', component: PayablentryComponent },
      { path: 'about', component: PayableDetailComponent },
      { path: 'issuance', loadChildren: () => import('../modules/issuance/issuance.module').then(m => m.IssuanceModule) },
      { path: 'payable', loadChildren: () => import('../modules/payablentry/payable/payable.module').then(m => m.PayableModule) },
    ]
  },

 // { path: 'payable', loadChildren: () => import('../modules/payablentry/payable/payable.module').then(m => m.PayableModule) },

  // { path: 'issuance', loadChildren: () => import('../modules/issuance/issuance.module').then(m => m.IssuanceModule) },

];

// const drawerRoutes = [
//   { path: '', component: MainmenuboardComponent, text: 'Home', svgIcon: globeOutlineIcon },
//   { path: 'products', component: PayablentryComponent, text: 'Products', svgIcon: cloudIcon },
//   { path: 'about', component: PayableDetailComponent, text: 'About', svgIcon: questionCircleIcon }
// ];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainmenuboardRoutingModule { }
