import { Component } from '@angular/core';
import { DataStateChangeEvent, GridDataResult } from '@progress/kendo-angular-grid';
import { State } from '@progress/kendo-data-query';
import { BehaviorSubject, Observable, switchMap, tap } from 'rxjs';
import { CategoriesService, ProductsService } from './northwind.service';

@Component({
  selector: 'app-remotedata',
  templateUrl: './remotedata.component.html',
  styleUrls: ['./remotedata.component.scss']
})
export class RemotedataComponent {
  public view: ProductsService;
  public virtualView: Observable<State | GridDataResult>;

  public state: State = {
    skip: 0,
    take: 7
  };

  public loading = false;
  public loadingVirtual = false;

  public virtualState: State = {
    skip: 0,
    take: 30
  };

  private stateChange = new BehaviorSubject<State>(this.virtualState);

  constructor(private service: ProductsService) {
    this.view = service;
    service.subscribe(() => {
      this.loading = false;
    });

    this.virtualView = this.stateChange.pipe(
      tap(state => {
        this.virtualState = state;
        this.loadingVirtual = true;
      }),
      switchMap(state => service.fetch('Orders', state)),
      tap(() => {
        this.loadingVirtual = false;
      })
    );

    this.loading = true;
    this.service.query(this.state);
  }

  public dataStateChange(state: State): void {
    this.state = state;
    this.loading = true;
    this.service.query(state);
  }

  public virtualStateChange(state: State): void {
    this.stateChange.next(state);
  }

}
