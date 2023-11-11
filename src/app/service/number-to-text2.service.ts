import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NumberToText2Service {
  private units: string[] = ['Zero', 'One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine'];
  private teens: string[] = ['Eleven', 'Twelve', 'Thirteen', 'Fourteen', 'Fifteen', 'Sixteen', 'Seventeen', 'Eighteen', 'Nineteen'];
  private tens: string[] = ['', 'Ten', 'Twenty', 'Thirty', 'Forty', 'Fifty', 'Sixty', 'Seventy', 'Eighty', 'Ninety'];

 private convertToText(number: number): string {
    if (number === 0) {
      return this.units[number];
    }

    let result = '';

    // Convert billions
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
      result += this.units[Math.floor(number / 100)] + ' Hundred ';
      number %= 100;
    }

    // Convert tens and units
    if (number > 0) {
      if (number < 10) {
        result += this.units[number];
      } else if (number < 20) {
        result += this.teens[number - 11];
      } else {
        result += this.tens[Math.floor(number / 10)];
        if (number % 10 > 0) {
          result += '-' + this.units[number % 10];
        }
      }
    }
    return result.trim();
  }

  convertToTextWithDecimal(number: number): string {
    let finalResult = '';
    const integerPart = Math.floor(number);
    const decimalPart = Math.round((number - integerPart) * 100);
    const integerText = this.convertToText(integerPart);
    const decimalText = this.convertToText(decimalPart);

    if (decimalPart > 0) {
    //  result += ' Pesos and ' //+ decimalText + ' centavo(s) only';
      finalResult += `${integerText} pesos and ${decimalText} centavo(s) only`;
     // return `${integerText} pesos and ${decimalText} centavo(s) only`;
    }
    else {
     // result += ' pesos only';
     finalResult += `${integerText} pesos only`;
     // return `${integerText.charAt(0).toUpperCase() + integerText.charAt(0).toUpperCase()} pesos only`;
     // return `${integerText} pesos only`;
    }

   // return `${integerText} and ${decimalText}`;
    return finalResult.charAt(0).toUpperCase() + finalResult.slice(1).toLowerCase();
  }
}
