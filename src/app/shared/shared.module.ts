import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InputsModule } from '@progress/kendo-angular-inputs';
import { LabelModule } from '@progress/kendo-angular-label';
import { ButtonsModule } from '@progress/kendo-angular-buttons';
import { LayoutModule } from '@progress/kendo-angular-layout';
import { IconsModule } from "@progress/kendo-angular-icons";
import { HttpClientModule } from '@angular/common/http';
import { MenuModule } from '@progress/kendo-angular-menu';
import { GridModule } from '@progress/kendo-angular-grid';
import { IndicatorsModule } from '@progress/kendo-angular-indicators';
import { DropDownsModule } from '@progress/kendo-angular-dropdowns';
import { DateInputsModule } from '@progress/kendo-angular-dateinputs';
import { HeaderComponent } from '../mainmenuboard/header/header.component';
import { IntlModule } from '@progress/kendo-angular-intl';
import { TelerikReportingModule } from '@progress/telerik-angular-report-viewer';




@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  exports: [
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,

    InputsModule,
    LabelModule,
    ButtonsModule,
    LayoutModule,
    IconsModule,
    GridModule,
    MenuModule,
    IndicatorsModule,
    DropDownsModule,
    DateInputsModule,
    IntlModule,
    TelerikReportingModule

  ]
})
export class SharedModule { }
