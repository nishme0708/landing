import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'trimOutletName'
})
export class TrimOutletNamePipe implements PipeTransform {
    transform(value: string, ...args: unknown[]): unknown {
        return value.split(' - ')[0];
    }
}
