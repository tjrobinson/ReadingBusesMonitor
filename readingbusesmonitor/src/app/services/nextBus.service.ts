import { Injectable } from "@angular/core";
import { ReadingBusesApiService } from "./reading-buses-api/reading-buses-api.service";
import { Observable } from "rxjs";
import { map, tap } from "rxjs/operators";
import { DateTime } from "luxon";

@Injectable({
  providedIn: "root"
})
export class NextBusService {
  constructor(private readingBusesApiService: ReadingBusesApiService) {}

  getNextBuses(route: string, location: string): Observable<NextBus[]> {
    return this.readingBusesApiService.getLiveJourneys(route).pipe(
      map(response => {
        var filteredResponse = response.map(
          r =>
            <LiveJourneysResponseItem>{
              visits: r.visits.filter(v => v.Location == location)
            }
        );

        const reducer = (accumulator: LiveJourneysResponseItem, currentValue: LiveJourneysResponseItem) => {
          if (currentValue.visits.length > 0) {
            accumulator.visits = accumulator.visits.concat(currentValue.visits);
          }
          return accumulator;
        };

        var reducedResponse = filteredResponse.reduce(reducer);

        return reducedResponse.visits;
      }),
      map((visits: Visit[]) => {
        return visits.reduce(function(filtered, visit: Visit) {

          const departureTimeDateTime = DateTime.fromSQL(visit.DepartureTime);

          if (
            departureTimeDateTime > DateTime.local().minus({ minutes: 10 })
          ) {
            var nextBus = <NextBus>{
              DepartureTimeDate: new Date(DateTime.fromSQL(visit.DepartureTime)), // e.g. 2019-06-14 20:00:00
              Overdue: DateTime.local() > DateTime.fromSQL(visit.DepartureTime)
            };
            filtered.push(nextBus);
          }
          return filtered;
        }, []);
      }),
      tap(nextBus => console.log(nextBus))
    );
  }
}
