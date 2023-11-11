import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NumToTextService {

  constructor() { }
  public convertToText(number: number): string {
    if (number === 0) {
      return 'Zero';
    }

    const units = ['', 'One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine'];
    const teens = ['Ten', 'Eleven', 'Twelve', 'Thirteen', 'Fourteen', 'Fifteen', 'Sixteen', 'Seventeen', 'Eighteen', 'Nineteen'];
    const tens = ['', '', 'Twenty', 'Thirty', 'Forty', 'Fifty', 'Sixty', 'Seventy', 'Eighty', 'Ninety'];

    let result = '';

    if (number >= 1e9) {
      result += this.convertToText(Math.floor(number / 1e9)) + ' Billion ';
      number %= 1e9;
    }

    // Convert millions
    if (number >= 1e6) {
      result += this.convertToText(Math.floor(number / 1e6)) + ' Million ';
      number %= 1e6;
    }

    // Convert thousands
    if (number >= 1000) {
      result += this.convertToText(Math.floor(number / 1000)) + ' Thousand ';
      number %= 1000;
    }

   // Convert hundreds
    if (number >= 100) {
      result += units[Math.floor(number / 100)] + ' Hundred ';
      number %= 100;
    }

    // Convert tens and units
    if (number > 0) {
      if (number < 10) {
        result += units[number];
      } else if (number < 20) {
        result += teens[number - 10];
      } else if (number < 100) {
        result += tens[Math.floor(number / 10)] + '-' + units[number % 10] ;
        // if (number % 10 > 0) {
        //   result += '-' + units[number % 10];
        // }
      }
      // else {
      //   return units[Math.floor(number / 100)] + ' Hundred ' + this.convertToText(number % 100);
      // }
    }

    // if (number > 0) {
    //   if (number < 10) {
    //     result += units[number];
    //   } else if (number < 20) {
    //     result += teens[number - 10];
    //   } else {
    //     result += tens[Math.floor(number / 10)];
    //     if (number % 10 > 0) {
    //       result += '-' + units[number % 10];
    //     }
    //   }
    // }

    const integerPart = Math.floor(number);
    const decimalPart = Math.round((number - integerPart) * 100);
    // const integerText = convert(integerPart);
    // const decimalText = convert(decimalPart);

    // let result = integerText;
    if (decimalPart > 0) {
      result += ' Pesos and ' //+ decimalText + ' centavo(s) only';
    }
    else {
      result += ' pesos only';
    }

    return result;
  }


}
