import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'numberToText'
})
export class NumberToTextPipe implements PipeTransform {
  transform(value: number, currency: string = ''): string {
    if (isNaN(value) || value < 0) {
      return 'Invalid Number';
    }

    const units = ['', 'One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine'];
    const teens = ['Ten', 'Eleven', 'Twelve', 'Thirteen', 'Fourteen', 'Fifteen', 'Sixteen', 'Seventeen', 'Eighteen', 'Nineteen'];
    const tens = ['', '', 'Twenty', 'Thirty', 'Forty', 'Fifty', 'Sixty', 'Seventy', 'Eighty', 'Ninety'];

    function convertLessThanThousand(num: number): string {
      if (num === 0) {
        return '';
      } else if (num < 10) {
        return units[num];
      } else if (num < 20) {
        return teens[num - 10];
      } else if (num < 100) {
        return tens[Math.floor(num / 10)] + '-' + units[num % 10];
      } else {
        return units[Math.floor(num / 100)] + ' Hundred ' + convertLessThanThousand(num % 100);
      }
    }

    function convert(number) {
      if (number === 0) {
        return 'Zero';
      }

      let result = '';
      if (number < 0) {
        result = 'Negative ';
        number = Math.abs(number);
      }

      if (number >= 1e9) {
        result += convertLessThanThousand(Math.floor(number / 1e9)) + ' Billion ';
        number %= 1e9;
      }

      if (number >= 1e6) {
        result += convertLessThanThousand(Math.floor(number / 1e6)) + ' Million ';
        number %= 1e6;
      }

      if (number >= 1000) {
        result += convertLessThanThousand(Math.floor(number / 1000)) + ' Thousand ';
        number %= 1000;
      }

      if (number > 0) {
        if (result !== '') {
          result += 'and ';
        }
        result += convertLessThanThousand(number);
      }

      return result.trim();
    }


    const integerPart = Math.floor(value);
    const decimalPart = Math.round((value - integerPart) * 100);
    const integerText = convert(integerPart);
    const decimalText = convert(decimalPart);

    let result = integerText;
    if (decimalPart > 0) {
      result += ' pesos and ' + decimalText + ' centavo(s) only';
    } else
      result += ' pesos only';

    // if (currency) {
    //   result += 'Pesos Only' + currency;
    // }

    return result.charAt(0).toUpperCase() + result.slice(1).toLowerCase();
  }

}
