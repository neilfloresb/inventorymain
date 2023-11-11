import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject, catchError, concatMap, map, merge, observable, of, scan, shareReplay, tap, throwError } from 'rxjs';
import { Action, payDetailpo, payableDetailPO } from '../shared/models/payables';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { mapapi } from '../shared/iUrlpath';


const _payDetailpo = mapapi.payableDetailPOs;



@Injectable({
  providedIn: 'root'
})
export class PayableDetailService {

  private _tempPayableDetail = _payDetailpo;
  // private _tmpListPos = _listDetailpo;

  poDetailLIsting$ = this.http.get<payableDetailPO[]>(this._tempPayableDetail)
    .pipe(
      tap(data => console.log('PoDetail Listing: ', JSON.stringify(data))),
      catchError(this.handleError)
    );

  // Action Stream for adding/updating/deleting products
  private payDetailModifiedSubject = new Subject<Action<payableDetailPO>>
  payPOmodifiedAction$ = this.payDetailModifiedSubject.asObservable();


  payDetailpoWithCRUD$ = merge(
    this.poDetailLIsting$,
    this.payPOmodifiedAction$
      .pipe(
        concatMap(operation => this.SavePayableDetailPO(operation))
      ))
    .pipe(
      scan((acc, value) =>
        (value instanceof Array) ? [...value] : this.modifyPayableDetailPO(acc, value), [] as payableDetailPO[]),
      shareReplay(1)
    );

  // Save the product via http
  // And then create and buffer a new array of products with scan.

  // Support methods
  // Save the product to the backend server
  // NOTE: This could be broken into three additional methods.
  headers = new HttpHeaders({ 'Content-Type': 'application/json' });

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      "Access-Control-Allow-Origin": "*",

    }), responseType: 'text' as 'json', observe: 'responce' as 'body'
  };

  constructor(private http: HttpClient) {
    //  super([]);
  }

  SavePayableDetailPO(operation: Action<payableDetailPO>): Observable<Action<payableDetailPO>> {
    const payableDetail = operation.item;
    console.log('saveProduct', JSON.stringify(operation.item));

    if (operation.action === 'add') {

      //return this.http.post<payableDetailPO>(this._tempPayableDetail, { ...payableDetail, payidno: null }, { headers: this.headers })
     // return this.http.post<payableDetailPO>(this._tempPayableDetail, payableDetail, { headers: this.headers })
      return this.http.post<payableDetailPO>(this._tempPayableDetail, payableDetail, this.httpOptions)
        .pipe(
          map(payableDetail => ({ item: payableDetail, action: operation.action })),
          catchError(this.handleError)
        );
    }

    // if (operation.action === 'delete') {
    //   return
    // }

    // if (operation.action === 'update') {
    //   return
    // }

    return of(operation);
  }

  modifyPayableDetailPO(payabledetailpo: payableDetailPO[], operation: Action<payableDetailPO>): payableDetailPO[] {
    if (operation.action === 'add') {
      return [...payabledetailpo, operation.item];
    } else if (operation.action === 'update') {
      // Return a new array with the updated product replaced
      console.log('after modify', operation.item);
      return payabledetailpo.map(payablepo => payablepo.payidno === operation.item.payidno ? operation.item : payablepo)
    } else if (operation.action === 'delete') {
      // Filter out the deleted product
      return payabledetailpo.filter(payablepo => payablepo.payidno !== operation.item.payidno);
    }
    return [...payabledetailpo];
  }

  ADDpayableDetailPO(newPayableDtl?: payableDetailPO): void {
    newPayableDtl = newPayableDtl || this.fakeProduct();
    this.payDetailModifiedSubject.next({
      item: newPayableDtl,
      action: 'add'
    })
  }

  private fakeProduct(): payableDetailPO {
    return {
      payidno: 0,
      payid: 9,
      po_no: '048532',
      po_seq: 3,
      item_code: 'SAMPLE',
      item_desc: 'SAMPLE RUNNING CODE',
      qty_po: 5,
      qty_rcv: 5,
      po_um: 'pcs',
      unit_price: 250.00
    };
  }


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
