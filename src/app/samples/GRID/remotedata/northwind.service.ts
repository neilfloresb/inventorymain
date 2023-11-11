import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GridDataResult } from '@progress/kendo-angular-grid';
import { State, toODataString } from '@progress/kendo-data-query';
import { BehaviorSubject, Observable, delay, map, tap} from 'rxjs';


export abstract class NorthwindService extends BehaviorSubject<GridDataResult> {
  public loading = false;
  private BASE_URL = 'https://odatasampleservices.azurewebsites.net/V4/Northwind/Northwind.svc/';


  constructor(
    private http: HttpClient,
    protected tableName: string
  ) {
    super(null);
  }

  public query(state: State): void {
    this.loading = true;
    this.fetch(this.tableName, state)
      .subscribe(x => super.next(x));
  }

  public fetch(tableName: string, state: State): Observable<GridDataResult> {
    const queryStr = `${toODataString(state)}&$count=true`;

    return this.http
      .get(`${this.BASE_URL}${tableName}?${queryStr}`)
      .pipe(
        delay(2000),
        tap(() => this.loading = false),
        map(response => (<GridDataResult>{
          data: response['value'],
          total: parseInt(response['@odata.count'], 10)
        })));
  }
}

@Injectable()
export class ProductsService extends NorthwindService {
  constructor(http: HttpClient) { super(http, 'Products'); }

  public queryForCategory({ CategoryID }: { CategoryID: number }, state?: State): void {
    this.query(Object.assign({}, state, {
      filter: {
        filters: [{
          field: 'CategoryID', operator: 'eq', value: CategoryID
        }],
        logic: 'and'
      }
    }));
  }

  public queryForProductName(ProductName: string, state?: State): void {
    this.query(Object.assign({}, state, {
      filter: {
        filters: [{
          field: 'ProductName', operator: 'contains', value: ProductName
        }],
        logic: 'and'
      }
    }));
  }

}

@Injectable()
export class CategoriesService extends NorthwindService {
  constructor(http: HttpClient) { super(http, 'Categories'); }

  queryAll(st?: State): Observable<GridDataResult> {
    const state = Object.assign({}, st);
    delete state.skip;
    delete state.take;

    return this.fetch(this.tableName, state);
  }
}
