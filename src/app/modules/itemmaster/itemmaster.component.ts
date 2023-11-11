import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { GridDataResult, RowArgs, SelectableMode, SelectableSettings, SelectionEvent } from '@progress/kendo-angular-grid';
import { State } from '@progress/kendo-data-query';
import { EMPTY, Observable, Subject, catchError, map, tap } from 'rxjs';
import { ItemmasterService } from 'src/app/service/itemmaster.service';
import { itemMaster } from 'src/app/shared/models/itemMaster';

@Component({
  selector: 'app-itemmaster',
  templateUrl: './itemmaster.component.html',
  styleUrls: ['./itemmaster.component.scss']
})
export class ItemmasterComponent {


  public gridView: Observable<itemMaster[]>;
  public checkboxOnly = false;
  public mode: SelectableMode = 'single';
  public mySelection: number[] = [];
  public drag = false;

  public loading = false;
  public loadingVirtual = false;

  public items: itemMaster[];

  public selectableSettings: SelectableSettings;
  private errorMessageSubject = new Subject<string>();

  public mySelectionKey(context: RowArgs): string {
    console.log(context.dataItem.item_desc);
    return context.dataItem.ProductName + " " + context.index;
  }

  // public mySelection: string[] = [];

  public view: Observable<itemMaster[]>;

  public itemMasterView: Observable<itemMaster[]>
  public state: State = { skip: 0, take: 5 };

  constructor(private itemMasterService: ItemmasterService, private fb: FormBuilder, private _router: Router,) {
    //this.itemMasterView = this.itemMaster2$;

    //this.gridView = this.itemMaster2$;
    this.gridView = this.itemMaster$;
    this.view = this.itemMaster$
    this.setSelectableSettings();

    this.loading = true;

    // this.loadItems();
  }

  // public ngOnInit(): void {
  //   this.gridView = this.gridData.slice(25, 50);
  // }

  public onSelectionChange(e: SelectionEvent): void {
    console.log(e.selectedRows[0]?.dataItem.item_code);
    // const selectedKey = e.selectedRows[0]?.dataItem.ProductID;
    // console.log(e.rangeStartRow?.dataItem.item_code ?? 1)
  }
  private loadItems(): void {
    // this.gridView = {
    //   data: this.items.slice(this.skip, this.skip + this.pageSize),
    //   total: this.items.length,
    // };
  }

  public setSelectableSettings(): void {
    if (this.checkboxOnly || this.mode === 'single') {
      this.drag = false;
    }

    this.selectableSettings = {
      checkboxOnly: this.checkboxOnly,
      mode: this.mode,
      drag: this.drag
    };
  }

  itemMaster$ = this.itemMasterService.billHeader$.pipe(
    catchError(err => {
      this.errorMessageSubject.next(err);
      return EMPTY;
    })
  );

  viewItems$ = this.itemMaster$.pipe(
    map((itemmaster: itemMaster[]) => (itemmaster)),
    //  tap(itemmaster => console.log('List Of Items', JSON.stringify(itemmaster))),
    //  tap(value => this.combocust.setSelectedItem(this.selectCustomer_val))
  );

  viewItems2$ = this.itemMaster$.pipe(
    map((values) => values),
    tap(values => console.log('List Of Items', JSON.stringify(values))),
    //  tap(value => this.combocust.setSelectedItem(this.selectCustomer_val))
  );

  itemMaster2$ = this.itemMasterService.billHeader$;

}
