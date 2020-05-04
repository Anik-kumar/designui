import { Injectable } from '@angular/core';
import { interval } from 'rxjs';
import { take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CronService {

  constructor() { 
    // const numbers = interval(1000);
    //
    // const takeFourNumbers = numbers.pipe(take(4));
    //
    // takeFourNumbers.subscribe(x => console.log('Next: ', x));
  }
}
