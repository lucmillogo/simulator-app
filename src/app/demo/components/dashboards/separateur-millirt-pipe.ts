import { Pipe, PipeTransform } from "@angular/core";

@Pipe({name: 'separateurMillier'})
export class SeprateurMillierPipe implements PipeTransform {
    transform(value: any): any {
        if (value !== null) {
            return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
        }
        return '0';
    }
}
