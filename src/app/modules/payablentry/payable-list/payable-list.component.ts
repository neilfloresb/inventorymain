import { Component } from '@angular/core';
import { NumToTextService } from 'src/app/service/num-to-text.service';
import { NumberToText2Service } from 'src/app/service/number-to-text2.service';

@Component({
  selector: 'app-payable-list',
  templateUrl: './payable-list.component.html',
  styleUrls: ['./payable-list.component.scss']
})
export class PayableListComponent {

  public numberintxt: string;
  numberkuno = 781975444.32;

  numberuno = 452.78;

  constructor(private numberText: NumToTextService, private numtext2: NumberToText2Service) {
    this.numberintxt = this.numberText.convertToText(this.numberkuno);
  }

  convertNumberToText(inputNumber: number): string {
    console.log(this.numtext2.convertToTextWithDecimal(inputNumber));
    return this.numtext2.convertToTextWithDecimal(inputNumber);
    // return this.numtext2.convertToText(inputNumber);
  }


}
