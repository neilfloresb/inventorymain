import { ChangeDetectionStrategy, Component, Inject, Input, OnInit } from '@angular/core';
import { CancelEvent, EditEvent, GridComponent, GridDataResult, RemoveEvent, SaveEvent, SelectionEvent } from '@progress/kendo-angular-grid';
import { BehaviorSubject, EMPTY, Observable, catchError, combineLatest, map, mergeMap, switchMap, tap, throwError, } from 'rxjs';
import { Subject } from 'rxjs/internal/Subject';
import { products } from 'src/app/samples/GRID/sample1grid/products';
import { PayableService } from 'src/app/service/payable.service';
import { payablehdr } from 'src/app/shared/models/payables';
import { AggregateDescriptor, AggregateResult, State, aggregateBy, process } from '@progress/kendo-data-query';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { PayableDetailService } from 'src/app/service/payable-detail.service';
import { PayablePOsDetailService } from 'src/app/service/payable-pos-detail.service';

@Component({
  selector: 'app-payable-detail',
  templateUrl: './payable-detail.component.html',
  styleUrls: ['./payable-detail.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PayableDetailComponent implements OnInit {

  private loaded: boolean = false;

  public SelectedPoNO: string;
  @Input()
  set tmpPoNum(val: string) {
    this.SelectedPoNO = val;
    if (this.loaded) {
      this.start();
    }
  }
  get tmpPoNum(): string {
    return this.SelectedPoNO;
  }

  public aggregate: AggregateDescriptor[] = [
    { field: "unit_price", aggregate: "sum" }
  ];


  public total: AggregateResult; //= aggregateBy(this.payableDetailPO$,this.aggregate);

  public view: Observable<payablehdr[]>;
  private errorMessageSubject = new Subject<string>();
  errorMessage$ = this.errorMessageSubject.asObservable();

  private _selectedTmpPO: string;

  private payHdrSelectedSubject = new BehaviorSubject<string>('');
  payHdrSelectedAction$ = this.payHdrSelectedSubject.asObservable();

  payableHeaders$ = this.payableService.payableHdr$
    .pipe(
      catchError(err => {
        this.errorMessageSubject.next(err);
        return EMPTY;
      })
    );

  payableDetailPO$ = this.payableDtlPoService.payDetailpoWithCRUD$
    .pipe(
      //     tap(data => console.log('PO Detail Pos: ', JSON.stringify(data))),
      catchError(err => {
        this.errorMessageSubject.next(err);
        return EMPTY;
      })
    );

  podetaiListing$ = this.payableService.PayDetailPOListing$;

  selectedPayHeader$ = combineLatest([this.podetaiListing$, this.payHdrSelectedAction$])
    .pipe(
      map(([podetailData, selectedpayHdr]) =>
        podetailData.filter(podetailData => selectedpayHdr ? podetailData.po_no === selectedpayHdr : true
        )),
      ///      tap(value => console.log('selected pono:' + JSON.stringify(value))),
      catchError(err => {
        this.errorMessageSubject.next(err);
        return EMPTY;
      })
    )


  public gridState: State = {
    take: 10,
    skip: 0
  }

  selectedPO$ = this.podetaiListing$.pipe(
    map(value => value.filter(value => value.po_no === this.tmpPoNum)),
    //  tap(value => console.log('Customer Datas', JSON.stringify(value))),
    //public total: AggregateResult; //= aggregateBy(this.payableDetailPO$,this.aggregate);
    //map(value2 => {value2}),
    // tap(value2 => console.log(this.total = aggregateBy(value2, this.aggregate))),
    tap(value2 => {
      if (this.tmpPoNum != undefined) {
        console.log(this.total = aggregateBy(value2, this.aggregate))
      }
    }
    ),


    catchError(this.handleError)
  )

  private refresh = new BehaviorSubject<Boolean>(true);

  start() {
    this.refresh.next(true);
  }

  selectedPOrefresh$ = this.refresh
    .pipe(
      mergeMap(() => this.selectedPO$
        .pipe(
          //        tap(data => console.log('refresh data', JSON.stringify(data))),

          // tap(data => this.payableDtlPoService.ADDpayableDetailPO(JSON.stringify(data))),
          catchError(this.handleError)
        )
      ),
    );

  vmpay$ = combineLatest([this.payableHeaders$, this.selectedPayHeader$, this.selectedPO$, this.payableDetailPO$])
    .pipe(
      map(([poAlpha, poBravo, poCharlie, poDelta]) =>
        ({ poAlpha, poBravo, poCharlie, poDelta })),
      tap(poCharlie => console.log('', poCharlie)),
    );


  private payableEditDtlService: PayablePOsDetailService;
  constructor(@Inject(PayableDetailService) payableEditDtlServiceFactory, private payableService: PayableService, private payableDtlPoService: PayableDetailService) {
    // constructor(private payableService: PayableService, private payableDtlPoService: PayableDetailService) {
    //  this.payableEditDtlService = payableEditDtlServiceFactory();
    // this.comboView = this.supplierMaster$;
    this.view = this.payableHeaders$
  }


  ngOnInit(): void {
    // this.goPoDtlView();

    // this.tmpPoNum = this.tmpPoNum;
    this.loaded = true;
    // CALL Start Function for Retrieve the selected PO no.
    this.start();

  }

  public PoDtlView: Observable<GridDataResult>;

  // goPoDtlView() {
  //   this.PoDtlView = this.payableEditDtlService.pipe(map((res) => process(res, this.gridState)),
  //     tap(res => console.log('this is po list sample:', JSON.stringify(res)))
  //   );
  //   this.payableEditDtlService.READpayablePOsDtl(this.tmpPoNum);
  // }


  /** */


  /**  EVENTS  START */
  private editedRowIndex: number;
  public formGroup: FormGroup;
  private closeEditor(grid: GridComponent, rowIndex = this.editedRowIndex): void {
    grid.closeRow(rowIndex);
    this.editedRowIndex = undefined;
    this.formGroup = undefined;
  }

  public editHandler({ sender, rowIndex, dataItem }: EditEvent): void {
    this.closeEditor(sender);

    this.formGroup = createFormGroup(dataItem);

    this.editedRowIndex = rowIndex;

    sender.editRow(rowIndex, this.formGroup);
  }

  public cancelHandler({ sender, rowIndex }: CancelEvent): void {
    this.closeEditor(sender, rowIndex);
  }

  public saveHandler({ sender, rowIndex, formGroup, isNew }: SaveEvent): void {
    const product = formGroup.value;

    // this.service.save(product, isNew);
    sender.closeRow(rowIndex);
  }

  public removeHandler({ dataItem }: RemoveEvent): void {
    //  this.service.remove(dataItem);
  }

  /** EVENTS END */


  onAdd(): void {
    this.payableDtlPoService.ADDpayableDetailPO();
  }


  public onSelectionChange(e: SelectionEvent): void {
    console.log(e.selectedRows[0]?.dataItem.po_no);
    const selectedKey = e.selectedRows[0]?.dataItem.po_no.trim();

    // console.log(e.rangeStartRow?.dataItem.item_code ?? 1)
    this.payHdrSelectedSubject.next(selectedKey.trim());
    this._selectedTmpPO = selectedKey;
    //   this.tmpPoNum = '037968'

    // CALL Start Function for Retrieve the selected PO no.
    this.start();
  }

  private handleError(err: any): Observable<never> {
    // in a real world app, we may send the server to some remote logging infrastructure
    // instead of just logging it to the console
    let errorMessage: string;
    if (err.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      errorMessage = `An error occurred: ${err.error.message}`;
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      errorMessage = `Backend returned code ${err.status}: ${err.body.error}`;
    }
    console.error(err);
    return throwError(errorMessage);
  }

}
const createFormGroup = (dataItem) =>
  new FormGroup({
    item_code: new FormControl(dataItem.item_code),
    item_desc: new FormControl(dataItem.item_desc)
    // UnitPrice: new FormControl(dataItem.UnitPrice),
    // UnitsInStock: new FormControl(dataItem.UnitsInStock, Validators.compose([Validators.required, Validators.pattern('^[0-9]{1,3}')])),
    // CategoryID: new FormControl(dataItem.CategoryID, Validators.required)
  });
