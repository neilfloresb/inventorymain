import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { mapapi } from '../shared/iUrlpath';
import { Router } from '@angular/router';
import { Observable, catchError, shareReplay, tap, throwError } from 'rxjs';
import { ISupplier, ISupplierCombo, PuchaseOrder } from '../shared/models/supplier';
import { bank, branchName } from '../shared/models/bankBranch';

const bankName = mapapi.bankName;
const branch_Name = mapapi.branchname;


@Injectable({
  providedIn: 'root'
})
export class BankbranchService {

  private _tmpBank = bankName;
  private _tmpBranch = branch_Name;


  constructor(private _http: HttpClient) { }

  // Get Supplier Listing
  bankname$ = this._http.get<bank[]>(this._tmpBank)
    .pipe(
      //  tap(value => console.log('Data from Supplier', JSON.stringify(value))),
      catchError(this.handleError),
      shareReplay(1)
    );

  branchname$ = this._http.get<branchName[]>(this._tmpBranch)
    .pipe(
    //  tap(value => console.log('Data from Supplier', JSON.stringify(value))),
      catchError(this.handleError),
      shareReplay(1)
    );


  // *** ERROR HANDLE
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
