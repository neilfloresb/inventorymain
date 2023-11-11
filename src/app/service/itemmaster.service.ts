import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { mapapi } from '../shared/iUrlpath';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, catchError, shareReplay, tap, throwError } from 'rxjs';
import { IitemMaster } from '../shared/models/itemMaster';

const itemMaster = mapapi.itemMaster;

@Injectable({
  providedIn: 'root'
})
export class ItemmasterService {

  private _tmpitemMaster = itemMaster;

  // To SUPPORT A refresh feature
  private refresh = new BehaviorSubject<Boolean>(true);

  constructor(private _http: HttpClient) { }


  // **** Get ItemMaster Listing
  billHeader$ = this._http.get<IitemMaster[]>(this._tmpitemMaster)
    .pipe(
  //    tap(value => console.log('Data from Header', JSON.stringify(value))),
      catchError(this.handleError),
      shareReplay(1)
    );


  //** REFRESH DATA */

  refreshData(): void {
    this.start();
  }

  start() {
    this.refresh.next(true);
  }

  // **** ERROR HANDLE

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
