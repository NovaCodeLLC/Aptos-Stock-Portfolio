/**
 * Created by Thomas Lesperance on 10/23/2017.
 */
import {Pipe, PipeTransform} from "@angular/core";
/*
Allows a developer to use an *ngFor directive to iterate over a map object of type <string, any>.
 */
@Pipe({name: 'IterableMap'})
export class IterableMap implements PipeTransform {
  transform(value: Map<string, any>): any[] {

    //snag keys off the map and make an array hold the data
    let keyArr = value.keys();
    let dataArr = [];

    // loop through the Map, and
    // push values to the return array
    Array.from(keyArr).forEach( (key) => {
      dataArr.push(value.get(key));
    });

    // return the resulting array
    return dataArr;
  }
}
