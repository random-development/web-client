import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'filter',
    pure: false
})
export class FilterPipe implements PipeTransform {
    transform(value: any[], searchString: string ) {

        if (!searchString) {
          return value;
        }
        return value.filter(it => {
            const name = it.name.toLowerCase().includes(searchString.toLowerCase());
            const resourceName = it.resourceName.toLowerCase().includes(searchString.toLowerCase());
            const type = it.type.toLowerCase().includes(searchString.toLowerCase());
            return (name + resourceName + type);
        });
     }
}
