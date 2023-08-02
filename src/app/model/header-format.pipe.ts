import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'headerFormat'
})
export class HeaderFormatPipe implements PipeTransform {

  transform(value: string): string {
    const words = value.split('_');
    const capitalizedWords = words.map(word => word.charAt(0).toUpperCase() + word.slice(1));
    return capitalizedWords.join(' ');
  }

}
