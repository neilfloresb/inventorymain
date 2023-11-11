import { Component } from '@angular/core';
import { DataStateChangeEvent, GridDataResult } from '@progress/kendo-angular-grid';
import { State } from '@progress/kendo-data-query';
import { Observable } from 'rxjs';
import { Categories2Service } from './datawind.service';

@Component({
  selector: 'app-dataloading',
  templateUrl: './dataloading.component.html',
  styleUrls: ['./dataloading.component.scss']
})
export class DataloadingComponent {

  public view: Observable<GridDataResult>;
  public state: State = {
    skip: 0,
    take: 5
  };

  constructor(private service: Categories2Service) {
    this.view = service;
    this.service.query(this.state);
  }

  public dataStateChange(state: DataStateChangeEvent): void {
    this.state = state;
    this.service.query(state);
  }

}
