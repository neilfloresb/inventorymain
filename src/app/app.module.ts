import { LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './user/login/login.component';
import { RegistrationComponent } from './user/registration/registration.component';
import { CommonModule } from '@angular/common';
import { SharedModule } from './shared/shared.module';
import { SupplierComponent } from './modules/supplier/supplier.component';
import { ItemmasterComponent } from './modules/itemmaster/itemmaster.component';
import { ItemmasterService } from './service/itemmaster.service';
import { Sample1gridComponent } from './samples/GRID/sample1grid/sample1grid.component';
import { Sample12gridComponent } from './samples/GRID/sample12grid/sample12grid.component';
import { IndicatorsModule } from '@progress/kendo-angular-indicators';
import { Sample3gridComponent } from './samples/GRID/sample3grid/sample3grid.component';
import { RemotedataComponent } from './samples/GRID/remotedata/remotedata.component';
import { CategoriesService, ProductsService } from './samples/GRID/remotedata/northwind.service';
import { DataloadingComponent } from './samples/GRID/dataloading/dataloading.component';
import { Categories2Service } from './samples/GRID/dataloading/datawind.service';
import { PayablentryComponent } from './modules/payablentry/payablentry.component';
import { SupplierService } from './service/supplier.service';
import { BankbranchService } from './service/bankbranch.service';
import { PayableService } from './service/payable.service';
import { PayableDetailComponent } from './modules/payablentry/payable-detail/payable-detail.component';
import { PayableDetailService } from './service/payable-detail.service';
import { HttpClient } from '@angular/common/http';
import { PayablePOsDetailService } from './service/payable-pos-detail.service';
import { CustomMessagesService } from './service/custom-messages.service';
import { MessageService } from '@progress/kendo-angular-l10n';
import { PayableListComponent } from './modules/payablentry/payable-list/payable-list.component';
import { PayableUpdateComponent } from './modules/payablentry/payable-update/payable-update.component';
import { PayablesampleComponent } from './modules/payablentry/payablesample/payablesample.component';
import { NumberToTextPipe } from './service/number-to-text';
//import { PayableListComponent } from './payablentry/payable-list/payable-list.component';
// import { HeaderComponent } from './mainmenuboard/header/header.component';



@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegistrationComponent,
    SupplierComponent,
    ItemmasterComponent,
    Sample1gridComponent,
    Sample12gridComponent,
    Sample3gridComponent,
    RemotedataComponent,
    DataloadingComponent,
    PayablentryComponent,
    PayableDetailComponent,
    PayableListComponent,
    PayableUpdateComponent,
    PayablesampleComponent,
    // HeaderComponent
    // AdminboardComponent
    NumberToTextPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    SharedModule,
    CommonModule,
    IndicatorsModule
  ],
  providers: [ItemmasterService, CategoriesService, ProductsService, Categories2Service, SupplierService, BankbranchService, PayableService,
    {
      deps: [HttpClient],
      provide: PayablePOsDetailService,
      useFactory: (jsonp: HttpClient) => () => new PayableDetailService(jsonp)
    },
    { provide: MessageService, useClass: CustomMessagesService },
    { provide: LOCALE_ID, useValue: 'en-US' }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
