import { Injectable } from '@angular/core';
import { mapapi } from '../shared/iUrlpath';
import { BehaviorSubject, Observable, Subject, catchError, combineLatest, concatMap, map, merge, scan, shareReplay, switchMap, tap, throwError } from 'rxjs';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { StatusCode, payablehdr, Action, payDetailpo } from '../shared/models/payables';
//import { Action } from '@progress/kendo-angular-grid/scrolling/scroller.service';

const _payhdr = mapapi.paybables;
const _payDetailpo = mapapi.payDetailPO;

@Injectable({
  providedIn: 'root'
})
export class PayableService {

  private _tmpPayhdr = _payhdr;
  private _tmpayDetailpo = _payDetailpo;

  public _ctrl_no: string;

  private payhdrSelectedSubject = new BehaviorSubject<number>(0);
  payhdrSelectAction$ = this.payhdrSelectedSubject.asObservable();

  constructor(private _http: HttpClient) { }

  private itemSubject = new Subject<Action<payablehdr>>();
  itemAction$ = this.itemSubject.asObservable();


  // payHeadersCrud$ = this.itemAction$.pipe(
  //   scan((items, itemAction) =>
  //     this.modifyPayables(items, itemAction), [] as payablehdr[]),
  //   shareReplay(1)
  // )

  /**  DATA FROM PAYABLE HEADERS */
  payableHdr$ = this._http.get<payablehdr[]>(this._tmpPayhdr)
    .pipe(
      /// tap(value => console.log('Data from Payable Header', JSON.stringify(value))),
      catchError(this.handleError),
      shareReplay(1)
    );

  /** Get the Selected Data from PAYABLEhdr */
  paySelectedHdr$ = combineLatest([
    this.payableHdr$, this.payhdrSelectAction$,
  ]).pipe(
       map(([payhdr,selectedHrdno]) => payhdr.find(payhdr => payhdr.payid === selectedHrdno)),
       tap(payhdrno => console.log('SELECTED NO.:' , payhdrno)),
       shareReplay(1)
  );

  /** end of script */


  SelectedPayhdrChanged(selectedPayhdr: number): void{
    this.payhdrSelectedSubject.next(selectedPayhdr);
  }


  /**  PO DETAIL LISTING  and Retrieval SCRIPT */
  /**                    */

  PayDetailPOListing$ = this._http.get<payDetailpo[]>(this._tmpayDetailpo)
    .pipe(
      //   tap(value => console.log('Updated po Detail:' + JSON.stringify(value))),
      catchError(this.handleError),
      shareReplay(1)
    );


  SelectedPayDetailPOListing$ = this._http.get<payDetailpo[]>(this._tmpayDetailpo)
    .pipe(
      //   tap(value => console.log('Updated po Detail:' + JSON.stringify(value))),
      catchError(this.handleError),
      shareReplay(1)
    );


  private ponoSelectedSubject = new BehaviorSubject<string>('');
  ponoSelectedAction$ = this.ponoSelectedSubject.asObservable();


  SelectedPayDetailPOFind$ = combineLatest([this.SelectedPayDetailPOListing$,
  this.ponoSelectedAction$]).pipe(
    map(([ponolist, selectedPoNo]) =>
      ponolist.find(ponolist => ponolist.po_no === selectedPoNo)),
    tap(pono => console.log('Selected', pono)),
    shareReplay(1)
  )


  // this.ponoSelectedAction$
  //   .pipe(switchMap(selectedPONO =>
  //     this._http.get<payDetailpo>(`${this._tmpayDetailpo}/${selectedPONO}`)
  //       .pipe(
  //         tap(value => console.log(JSON.stringify(value))),
  //         catchError(this.handleError)
  //       ))
  //   );


  // SelectedPayDetailPOparam$ = this.ponoSelectedAction$
  //   .pipe(switchMap(selectedPONO =>
  //     this._http.get<payDetailpo>(`${this._tmpayDetailpo}/${selectedPONO}`)
  //       .pipe(
  //         tap(value => console.log(JSON.stringify(value))),
  //         catchError(this.handleError)
  //       ))
  //   );


  ///  SELECTED CHANGE
  // SelectedPayDetailPO$ = this.ponoSelectedAction$
  //   .pipe(switchMap(selectedPONO =>
  //     this._http.get<payDetailpo>(`${this._tmpayDetailpo}/${selectedPONO}`)
  //       .pipe(
  //         tap(value => console.log(JSON.stringify(value))),
  //         catchError(this.handleError)
  //       ))
  //   );



  //  SelectedPayDetailPO$ = this._http.get<payDetailpo[]>(this._tmpPayhdr)
  //   .pipe(
  //     tap(value => console.log('Data from Supplier', JSON.stringify(value))),
  //     catchError(this.handleError),
  //     shareReplay(1)
  //   );


  SelectedPoNoChanged(pono: string): void {
    this.ponoSelectedSubject.next(pono);
  }


  /**  */
  /**     end of Script               */


  //** ACTION STREAM for adding / updating / deleting */

  private payHdrModifiedSubject = new Subject<payablehdr>();
  payHdrModifiedAction$ = this.payHdrModifiedSubject.asObservable();


  addPayHdr(payhdr: payablehdr) {
    payhdr.status = StatusCode.Added;
    this.payHdrModifiedSubject.next(payhdr);
  }

/**  payHDRCrud mas be called first for action process */
  payHDRcrud$ = merge(this.payableHdr$,
    this.payHdrModifiedAction$.pipe(
      concatMap(billHdr => this.saveBillHdr(billHdr))
    ))
    .pipe(
      //  scan((acc: IBillHeader[], value: IBillHeader) => [...acc, value]),
      scan((acc: payablehdr[], value: payablehdr) => this.modifyBillhdr(acc, value)),
      shareReplay(1)
    );

  // Support methods
  // Save the product to the backend server
  // NOTE: This could be broken into three additional methods.
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      "Access-Control-Allow-Origin": "*",

    }), responseType: 'text' as 'json'
    //,observe: 'responce' as 'body'
  };

  saveBillHdr(payhdr: payablehdr): Observable<payablehdr> {

    const _tmpPayid = payhdr.payid;
    if (payhdr.status === StatusCode.Added) {
      return this.
      _http.post<payablehdr>(this._tmpPayhdr, payhdr, this.httpOptions)
        .pipe(
          // tap(data => console.log('Added Billing Header:', JSON.stringify(data))),
          //      tap(() => this._router.navigate(['/home/billing/create', _billno])),
          tap(data => console.log('Data Return Value from payable:', JSON.stringify(data))),
          tap(data2 => this._ctrl_no = JSON.stringify(data2)),
          catchError((err) => {
            console.error(err);
            return throwError(err);
          })
        );
    }

    if (payhdr.status === StatusCode.Updated) {
      const url = `${this._tmpPayhdr}/${payhdr.payid}`;
      return this._http.put<payablehdr>(url, payhdr, this.httpOptions)
        .pipe(
          tap(value => console.log('Updated Pay Header:' + JSON.stringify(value))),
          map(() => payhdr),
          catchError(this.handleError)
        )
    }
  }

  // Modify the Array of BillHeader
  modifyBillhdr(payHeaders: payablehdr[], payhdr: payablehdr): payablehdr[] {
    if (payhdr.status === StatusCode.Added) {
      return [...payHeaders,
      { ...payhdr, status: StatusCode.Unchanged }
      ];
    }

    if (payhdr.status === StatusCode.Updated) {
      return payHeaders.map(b => b.payid === payhdr.payid ?
        { ...payhdr, status: StatusCode.Unchanged } : b);
    }
  }

  //** end of ACTION STREAM for adding / updating / deleting */


  /**
   *
   */

  /**  ADD RXJS VERION 2023  SAVING / UPDATE / DELETE */
  // private itemSubject = new Subject<Action<payablehdr>>()
  // itemAction$ = this.itemSubject.asObservable();


  addToPayhdr(payableHeader: payablehdr): void {
    this.itemSubject.next({
      item: payableHeader,
      action: 'add'
    });
  }


  private modifyPayables(payHdr: payablehdr[], operation: Action<payablehdr>): payablehdr[] {
    if (operation.action === 'add') {
      return [...payHdr, operation.item];
    } else if (operation.action === 'update') {
      return payHdr.map(item => item.payid === operation.item.payid ? operation.item : item)
    } else if (operation.action === 'delete') {
      return payHdr.filter(item => item.payid !== operation.item.payid);
    }
    return [...payHdr];

  }



  /*** for ***/

  /** end of payable details */



  /**  FOR SELECTED HEADER SCRIPT */

  /** END OF SELECTED HEADER SCRIPT */


  /**  END OF SCRIPT */

  private handleError(err: HttpErrorResponse): Observable<never> {
    // in a real world app, we may send the server to some remote logging infrastructure
    // instead of just logging it to the console
    let errorMessage: string;
    if (err.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      errorMessage = `An error occurred: ${err.error.message}`;
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      errorMessage = `Backend returned code ${err.status}: ${err.message}`;
    }
    console.error(err);
    return throwError(() => errorMessage);
  }
}

