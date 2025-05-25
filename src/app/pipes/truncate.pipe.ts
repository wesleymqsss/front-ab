import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'truncate',
  standalone: false
})
export class TruncatePipe implements PipeTransform {

  transform(value: string | null | undefined, maxLength: number = 50, suffix: string = '...'): string {
    if (!value) {
      return ''; 
    }

    if (typeof value !== 'string') {
      console.warn(`EllipsisPipe: O valor esperado é uma string, mas recebeu ${typeof value}.`);
      return '';
    }

    if (isNaN(maxLength) || maxLength <= 0) {
      console.warn(`EllipsisPipe: maxLength deve ser um número positivo. Usando o valor original.`);
      return value;
    }

    if (value.length > maxLength) {
      return value.substring(0, maxLength) + suffix;
    }

    return value;
  }

}
