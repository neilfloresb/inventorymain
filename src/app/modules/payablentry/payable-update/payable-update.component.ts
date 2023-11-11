import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { IntlService } from '@progress/kendo-angular-intl';
import { BehaviorSubject, EMPTY, Observable, Subject, catchError, combineLatest, map, tap, throwError } from 'rxjs';
import { BankbranchService } from 'src/app/service/bankbranch.service';
import { PayableService } from 'src/app/service/payable.service';
import { SupplierService } from 'src/app/service/supplier.service';

@Component({
  selector: 'app-payable-update',
  templateUrl: './payable-update.component.html',
  styleUrls: ['./payable-update.component.scss']
})
export class PayableUpdateComponent implements OnInit {
  public SelectedPayId;
  private errorMessageSubject = new Subject<string>();
  public current_date: Date = new Date(Date.now());
  public dateTran: string;

  dateCheque: string;

  public min: Date = new Date(2020, 0, 1);
  public fullFormat = "MM/dd/yyyy";

  private refresh = new BehaviorSubject<Boolean>(true);
  //podetaiListing$ = this.payablehdr.PayDetailPOListing$;

  constructor(private route: ActivatedRoute, private payablehdr: PayableService, private supplierService: SupplierService, private bankBranchService: BankbranchService, private intl: IntlService) {

  }

  public formPay: FormGroup = new FormGroup({
    supp_code: new FormControl('', [Validators.required]),
    po_no: new FormControl('', [Validators.required]),
    ref_no: new FormControl(''),
    dr_date: new FormControl(this.current_date),
    branchname: new FormControl('', [Validators.required]),
    projectname: new FormControl(''),
    bankcode: new FormControl(''),
    checkno: new FormControl(''),
    checkdate: new FormControl(this.current_date),
    cvno: new FormControl(''),
    // issuedby: new FormControl(JSON.parse(localStorage.getItem('userName').toUpperCase())),
  });

  payableHdr$ = this.payablehdr.paySelectedHdr$.pipe(
    catchError((err) => {
      this.errorMessageSubject.next(err);
      return EMPTY;
    })
  )
  SelectedNOhdr$ = this.payablehdr.payhdrSelectAction$;

  PayHdrSelected$ = combineLatest(
    [this.payableHdr$, this.SelectedNOhdr$, this.payablehdr.payHDRcrud$]
  ).pipe(
    map(([payablehdr, selectedno, modihdr]) => ([payablehdr, selectedno, modihdr])),

    tap(values => console.log("values:", values))
  )

  ngOnInit(): void {

    this.route.paramMap.subscribe(params => {
      let id = params.get('id');
      this.payablehdr.SelectedPayhdrChanged(parseInt(id));
    })
  }

  bankListing$ = this.bankBranchService.bankname$.pipe(
    catchError(err => {
      this.errorMessageSubject.next(err);
      return EMPTY;
    })
  )

  public clearForm(): void {
    this.formPay.reset();
  }


  public submitForm(): void {
    this.formPay.markAllAsTouched();

    ///    console.log(this.formPay.value);
    // this.mapCurrentValue();
    // this.hide_details = true
  }



  /** RENDER FOR DROPDOWN BOX */
  public selectedTmpPONO: string

  branchListing$ = this.bankBranchService.branchname$.pipe(
    catchError(err => {
      this.errorMessageSubject.next(err);
      return EMPTY;
    })
  )

  polisting$ = this.supplierService.PurchaseOrder$.pipe(
    catchError(err => {
      this.errorMessageSubject.next(err);
      return EMPTY;
    })
  );
  podetaiListing$ = this.payablehdr.PayDetailPOListing$;

  selectedPO$ = this.podetaiListing$.pipe(
    map(value => value.filter(value => value.po_no === this.selectedTmpPONO)),
    tap(value => console.log('Customer Datas', JSON.stringify(value))),
    catchError(this.handleError)
  )
  ponoDetailListing$ = this.payablehdr.SelectedPayDetailPOListing$.pipe(
    catchError(err => {
      this.errorMessageSubject.next(err);
      return EMPTY;
    })
  )
  supplierMaster$ = this.supplierService.Supplier$.pipe(
    catchError(err => {
      this.errorMessageSubject.next(err);
      return EMPTY;
    })
  );

  payableMaster$ = this.payablehdr.payHDRcrud$.pipe(
    catchError(err => {
      this.errorMessageSubject.next(err);
      return EMPTY;
    })
  );

  viewData$ = combineLatest([this.payableMaster$, this.supplierMaster$, this.ponoDetailListing$, this.selectedPO$]).pipe(
    map(([payables, supplier]) => ({ payables, supplier })),
    // tap(values => console.log('View Data ', JSON.stringify(values))),
    //  tap(value => this.combocust.setSelectedItem(this.selectCustomer_val))
  );

  public BankselectionChange(value: any): void {
    if (value != undefined) {
      //  console.log("selectionChange", value.bankcode);
    }
  }

  public SupselectionChange(value: any): void {
    if (value != undefined) {
      //   console.log("selectionChange", value.supp_code);
    }
  }

  public ChequeonChange(value: Date) {
    this.dateCheque = this.intl.formatDate(value, "MM/dd/yyyy");
    //    console.log(this.dateCheque);
  }

  public POselectionChange(value: any): void {
    if (value != undefined) {
      console.log("selectionChange", value.po_no);
      this.selectedTmpPONO = value.po_no.trim();
      this.start();
    }
  }

  public BranchselectionChange(value: any): void {
    if (value != undefined) {
      //  console.log("selectionChange", value.branchname);
    }
  }

  public TranonChange(value: Date): void {
    //  console.log("", value ? ` ${this.intl.formatDate(value, "MM/dd/yyyy")}` : "");
    this.dateTran = this.intl.formatDate(value, "MM/dd/yyyy");
    //   console.log(this.dateTran);
  }

  start() {
    this.refresh.next(true);
  }
  /**  */


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
