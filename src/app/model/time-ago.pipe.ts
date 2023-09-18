import {Input, Pipe, PipeTransform} from '@angular/core';
import {addHours, formatDistanceToNow, parseISO} from 'date-fns';

@Pipe({
  name: 'timeAgo',
})
export class TimeAgoPipe implements PipeTransform {
  transform(value: string): string {
    const parsedDate = parseISO(value);
    const dateWithOffset = addHours(parsedDate, 6);
    const formattedDistance = formatDistanceToNow(dateWithOffset);
    return `${formattedDistance} ago`;
  }
}
