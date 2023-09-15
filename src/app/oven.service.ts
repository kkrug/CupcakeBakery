import { Injectable } from '@angular/core';
import { Observable, of, timer } from 'rxjs';
import { tap, switchMap, delay, concatMap, last } from 'rxjs/operators';
import { Oven } from './oven.model';

@Injectable({
  providedIn: 'root'
})
export class OvenService {
  constructor() {}

  preheatOven(oven: Oven, temperature: number): Observable<any> {
    // Simulate preheating the oven
    return timer(2000).pipe(
      tap(() => {
        console.log(`${oven.name} is preheated to ${temperature}°F`);
      })
    );
  }
}
