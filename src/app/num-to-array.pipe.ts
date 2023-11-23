import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'numToArray'
})
export class NumToArrayPipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    return [...Array(value).keys()];
  }

}
