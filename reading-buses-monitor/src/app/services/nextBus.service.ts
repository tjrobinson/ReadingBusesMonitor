import { Injectable } from "@angular/core";
import { ReadingBusesApiService } from "./reading-buses-api.service";
import { Observable } from "rxjs";
import { map, filter, flatMap, tap, throttleTime } from "rxjs/operators";
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
            <IResponse>{
              visits: r.visits.filter(v => v.Location == location)
            }
        );

        const reducer = (accumulator: IResponse, currentValue: IResponse) => {
          if (currentValue.visits.length > 0) {
            accumulator.visits = accumulator.visits.concat(currentValue.visits);
          }
          return accumulator;
        };

        var reducedResponse = filteredResponse.reduce(reducer);

        return reducedResponse.visits;
      }),
      map((visits: IVisit[]) => {

        return visits.map((visit:IVisit) => {
          var nextBus = <NextBus>{
            DepartureTimeDate: new Date(DateTime.fromSQL(visit.DepartureTime)), // e.g. 2019-06-14 20:00:00
            //Overdue: DateTime.local() > DateTime.fromSQL(visit.DepartureTime)
          };

          return nextBus;
        });
      }),
      // filter(
      //   nextBus => nextBus.DepartureTimeDate > DateTime.local().minus({ minutes: 10 })
      // ),
      tap(nextBus => console.log(nextBus))
    );
  }
}
