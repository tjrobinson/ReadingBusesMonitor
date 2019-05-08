import { Injectable } from '@angular/core';
import { ReadingBusesApiService } from './reading-buses-api.service';
import { Observable } from 'rxjs';
import { map, filter, switchMap } from 'rxjs/operators';

@Injectable({
    providedIn: 'root',
  })
export class NextBusService {

  constructor(private readingBusesApiService: ReadingBusesApiService) { }

  getNextBuses(route: string, location: string): Observable<IVisit[]> {
    
      return this.readingBusesApiService
        .getLiveJourneys(route)
        .pipe(map(response => {
          console.log(response);

          var filteredResponse = response.map(r => <IResponse> {
            visits: r.visits.filter(v => v.Location == location)
          });

          const reducer = (accumulator: IResponse, currentValue: IResponse) => {
            if (currentValue.visits.length > 0) {
              accumulator.visits = accumulator.visits.concat(currentValue.visits);
            }
            return accumulator;
          };

          var reducedResponse = filteredResponse.reduce(reducer);

          return reducedResponse.visits;
        }));
  }
}