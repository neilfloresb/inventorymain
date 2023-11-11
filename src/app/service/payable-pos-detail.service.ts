import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, map, tap } from 'rxjs';
import { mapapi } from '../shared/iUrlpath';
import { payDetailpo } from '../shared/models/payables';
import { HttpClient } from '@angular/common/http';

const _listDetailpo = mapapi.payDetailPO;

const CREATE_ACTION = 'create';
const UPDATE_ACTION = 'update';
const REMOVE_ACTION = 'destroy';

@Injectable({
  providedIn: 'root'
})
export class PayablePOsDetailService extends BehaviorSubject<any[]>  {


  private _tmpListPos = _listDetailpo;

  constructor(private http: HttpClient) {
    super([]);
  }

  /*** USING Data FACTORY */
  private dataPODetail: any[] = [];

  public SavePayablePosDetail(val: string, data: any, isNew?: boolean) {
    const action = isNew ? CREATE_ACTION : UPDATE_ACTION;

    this.reset();

    this.getpoDetails(val, action, data).subscribe(
      () => this.READpayablePOsDtl(val),
    )
  }

  private reset() {
    this.dataPODetail = [];
  }

  public READpayablePOsDtl(val: string) {
    if (this.dataPODetail.length) {
      return super.next(this.dataPODetail);
    }
    this.getpoDetails(val)
      .pipe(
        tap((data) => {
          this.dataPODetail = data;
        })
      )
      .subscribe((data) => {
        super.next(data);
      });
  }

  private getpoDetails(po_num: string, action: string = '', dataPODetail?: any): Observable<payDetailpo[]> {
    return this.http.get<payDetailpo[]>(this._tmpListPos + `/${po_num}`).pipe(
      map((res: any) => {
        console.log('List of P.oS' + JSON.stringify(res));
        return res;
      })
    );
  };

  /** END of USING FACTORY*/

}
