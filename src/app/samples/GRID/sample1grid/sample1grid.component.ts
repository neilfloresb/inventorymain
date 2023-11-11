import { Component } from '@angular/core';
import { CellClickEvent, SelectionEvent } from '@progress/kendo-angular-grid';
import { products } from './products';

@Component({
  selector: 'app-sample1grid',
  templateUrl: './sample1grid.component.html',
  styleUrls: ['./sample1grid.component.scss']
})
export class Sample1gridComponent {
  public data: any[] = products;
  public selectedKeys: number[] = [1, 2];

  public onSelectionChange(e: SelectionEvent): void {
    if (e.shiftKey) {
      const startKey = e.rangeStartRow?.dataItem.ProductID ?? 1;
      const normalizedStart = Math.min(startKey, e.rangeEndRow?.dataItem.ProductID);
      const normalizedEnd = Math.max(startKey, e.rangeEndRow?.dataItem.ProductID);
      this.selectedKeys = this.data.slice(normalizedStart - 1, normalizedEnd).map(item => item.ProductID);
    } else if (e.ctrlKey) {
      // const selectedKey = e.selectedRows[0]?.dataItem.ProductID;
      // const deselectedKey = e.deselectedRows[0]?.dataItem.ProductID;

      // if (selectedKey) {
      //   this.selectedKeys.push(selectedKey);
      // } else {
      //   this.selectedKeys = this.selectedKeys.filter(key => key !== deselectedKey);
      // }
      console.log(e.selectedRows);
    }
  }

  public onCellClick(e: CellClickEvent) {
    const { ctrlKey, metaKey, shiftKey } = e.originalEvent;
    const hasModifier = ctrlKey || metaKey || shiftKey;

    if (!hasModifier) {
      this.selectedKeys = [e.dataItem.ProductName];
      console.log(this.selectedKeys[0]);
    }
  }

}
