import { Component } from '@angular/core';
import { DataStateChangeEvent, GridDataResult } from '@progress/kendo-angular-grid';
import { State } from '@progress/kendo-data-query';
import { Observable } from 'rxjs';
import { CategoriesService } from './northwind.service';

@Component({
  selector: 'app-sample3grid',
  templateUrl: './sample3grid.component.html',
  styleUrls: ['./sample3grid.component.scss']
})
export class Sample3gridComponent {
  public view: Observable<GridDataResult>;
  public state: State = {
    skip: 0,
    take: 5
  };

  constructor(private service: CategoriesService) {
    this.view = service;
    this.service.query(this.state);
  }

  public dataStateChange(state: DataStateChangeEvent): void {
    this.state = state;
    this.service.query(state);
  }
}
