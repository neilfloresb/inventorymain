import { DatePipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input, ViewEncapsulation } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { IntlService } from '@progress/kendo-angular-intl';
import { BehaviorSubject, EMPTY, Observable, Subject, catchError, combineLatest, map, mergeMap, tap, throwError } from 'rxjs';
import { BankbranchService } from 'src/app/service/bankbranch.service';
import { PayableService } from 'src/app/service/payable.service';
import { SupplierService } from 'src/app/service/supplier.service';
import { payablehdr } from 'src/app/shared/models/payables';
import { ISupplier, ISupplierCombo } from 'src/app/shared/models/supplier';
// import { HorizontalAlign, VerticalAlign } from '@progress/kendo-angular-layout';
@Component({
  selector: 'app-payablentry',
  templateUrl: './payablentry.component.html',
  styleUrls: ['./payablentry.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None
})
export class PayablentryComponent {

  private errorMessageSubject = new Subject<string>();
  pipe = new DatePipe('en-US')
  // public phoneNumberValue: string = "";
  // public phoneNumberMask: string = "(999) 000-00-00-00";
  public form: FormGroup;

  public selectedTmpPONO: string

  public comboView: Observable<ISupplierCombo[]>;

  public current_date: Date = new Date(Date.now());
  public hide_details: boolean = true;

  public min: Date = new Date(2020, 0, 1);
  // public max: Date = new Date(2000, 11, 31);
  dateTran: string;
  dateCheque: string;
  public fullFormat = "MM/dd/yyyy";

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



  constructor(private supplierService: SupplierService, private bankBranchService: BankbranchService, private intl: IntlService, private payableService: PayableService) {
    this.comboView = this.supplierMaster$;
  }

  payableMaster$ = this.payableService.payHDRcrud$.pipe(
    catchError(err => {
      this.errorMessageSubject.next(err);
      return EMPTY;
    })
  );

  /** ADD OF PO DETIALS */
  AddDetailsPO() {

  }
  /*** END OF ADD POs Details */


  mapCurrentValue() {

    if (this.dateTran == undefined) {
      //this.f.dr_date.value,
      this.dateTran = this.pipe.transform(Date.now(), 'MM/dd/yyyy');
    }

    if (this.dateCheque == undefined) {
      this.dateCheque = this.pipe.transform(Date.now(), 'MM/dd/yyyy');
    }





    let PayHdr: payablehdr = {
      payid: 5,
      supp_code: this.f.supp_code.value,
      po_no: this.f.po_no.value,
      ref_no: this.f.ref_no.value,
      dr_date: this.dateTran,
      branchname: this.f.branchname.value,
      projectname: this.f.projectname.value,
      bankcode: this.f.bankcode.value,
      checkno: this.f.checkno.value,
      checkdate: this.dateCheque,
      cvno: this.f.cvno.value
    };


    console.log('data from payHdr', PayHdr);
    this.payableService.addPayHdr(PayHdr);
    //this.payableService.addToPayhdr(PayHdr);
  };


  /**   payable detail retrieval  */
  private refresh = new BehaviorSubject<Boolean>(true);
  podetaiListing$ = this.payableService.PayDetailPOListing$;

  selectedPO$ = this.podetaiListing$.pipe(
    map(value => value.filter(value => value.po_no === this.selectedTmpPONO)),
    tap(value => console.log('Customer Datas', JSON.stringify(value))),
    catchError(this.handleError)
  )


  start() {
    this.refresh.next(true);
  }

  selectedPOrefresh$ = this.refresh
    .pipe(
      mergeMap(() => this.selectedPO$
        .pipe(
          tap(data => console.log('refresh data', JSON.stringify(data))),

          // tap(data => this.payableDtlPoService.ADDpayableDetailPO(JSON.stringify(data))),
          catchError(this.handleError)
        )
      ),
    );

  /** end of script */

  public TranonChange(value: Date): void {
    //  console.log("", value ? ` ${this.intl.formatDate(value, "MM/dd/yyyy")}` : "");
    this.dateTran = this.intl.formatDate(value, "MM/dd/yyyy");
    //   console.log(this.dateTran);
  }

  public ChequeonChange(value: Date) {
    this.dateCheque = this.intl.formatDate(value, "MM/dd/yyyy");
    //    console.log(this.dateCheque);
  }

  supplierMaster$ = this.supplierService.Supplier$.pipe(
    catchError(err => {
      this.errorMessageSubject.next(err);
      return EMPTY;
    })
  );

  ponoDetailListing$ = this.payableService.SelectedPayDetailPOListing$.pipe(
    catchError(err => {
      this.errorMessageSubject.next(err);
      return EMPTY;
    })
  )

  viewData$ = combineLatest([this.payableMaster$, this.supplierMaster$, this.ponoDetailListing$, this.selectedPO$]).pipe(
    map(([payables, supplier]) => ({ payables, supplier })),
    // tap(values => console.log('View Data ', JSON.stringify(values))),
    //  tap(value => this.combocust.setSelectedItem(this.selectCustomer_val))
  );



  polisting$ = this.supplierService.PurchaseOrder$.pipe(
    catchError(err => {
      this.errorMessageSubject.next(err);
      return EMPTY;
    })
  );

  bankListing$ = this.bankBranchService.bankname$.pipe(
    catchError(err => {
      this.errorMessageSubject.next(err);
      return EMPTY;
    })
  )

  branchListing$ = this.bankBranchService.branchname$.pipe(
    catchError(err => {
      this.errorMessageSubject.next(err);
      return EMPTY;
    })
  )


  get f() { return this.formPay.controls; }

  public submitForm(): void {
    this.formPay.markAllAsTouched();

    ///    console.log(this.formPay.value);
    this.mapCurrentValue();
    this.hide_details = true
  }


  public clearForm(): void {
    this.formPay.reset();
  }



  public SupselectionChange(value: any): void {
    if (value != undefined) {
      //   console.log("selectionChange", value.supp_code);
    }
  }

  public BankselectionChange(value: any): void {
    if (value != undefined) {
      //  console.log("selectionChange", value.bankcode);
    }
  }

  public BranchselectionChange(value: any): void {
    if (value != undefined) {
      //  console.log("selectionChange", value.branchname);
    }
  }

  public POselectionChange(value: any): void {
    if (value != undefined) {
      console.log("selectionChange", value.po_no);
      this.selectedTmpPONO = value.po_no.trim();
      this.start();
    }
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
