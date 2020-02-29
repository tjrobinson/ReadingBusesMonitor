import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { map, tap } from "rxjs/operators";
import { DateTime } from "luxon";
import { NextBus } from "../../types/NextBus";
import { ReadingBusesApiService } from "./ReadingBusesApiService";
import { Visit } from "../../types/Visit";
import { LiveJourneysResponseItem } from "../../types/LiveJourneysResponseItem";

@Injectable({
  providedIn: "root"
})
export class NextBusService {
  constructor(private readingBusesApiService: ReadingBusesApiService) {}

  getNextBuses(route: string, location: string): Observable<NextBus[]> {
    return this.readingBusesApiService.getLiveJourneys(route).pipe(
      map(response => {
        const filteredResponse = response.map(
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

        const reducedResponse = filteredResponse.reduce(reducer);

        return reducedResponse.visits;
      }),
      map((visits: Visit[]) => {
        return visits.reduce(function(filtered, visit: Visit) {

          const departureTimeDateTime = DateTime.fromSQL(visit.DepartureTime);

          if (
            departureTimeDateTime > DateTime.local().minus({ minutes: 10 })
          ) {
            const nextBus = <NextBus>{
              DepartureTimeDate: new Date(DateTime.fromSQL(visit.DepartureTime).toJSDate()), // e.g. 2019-06-14 20:00:00
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
