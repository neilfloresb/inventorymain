import { Component } from '@angular/core';
import { GridDataResult, PageChangeEvent } from '@progress/kendo-angular-grid';
import { products } from '../sample1grid/products';

@Component({
  selector: 'app-sample12grid',
  templateUrl: './sample12grid.component.html',
  styleUrls: ['./sample12grid.component.scss']
})
export class Sample12gridComponent {

  public gridView: GridDataResult;
  public items: any[] = products;
  public mySelection: number[] = [2];
  public pageSize = 10;
  public skip = 0;
  public extractDataItems;

  constructor() {
    this.loadItems();
    this.extract();
  }

  public pageChange(event: PageChangeEvent): void {
    this.skip = event.skip;
    this.loadItems();

    // Optionally, clear the selection when paging
    // this.mySelection = [];
  }

  private loadItems(): void {
    this.gridView = {
      data: this.items.slice(this.skip, this.skip + this.pageSize),
      total: this.items.length
    };
  }
  keyChange(e) {
    // console.log("Selected items:", e);
    this.extract();
  }
  public extract() {
    this.extractDataItems = this.mySelection.map(idx => {
      return this.items.find(item => item.ProductID === idx);
    });
    console.log(this.extractDataItems);
  }

}
