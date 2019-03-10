import { Component, OnInit } from "@angular/core";
import { ReadingBusesApiService } from "../services/reading-buses-api.service";

@Component({
  selector: "app-next-bus",
  templateUrl: "./next-bus.component.html",
  styleUrls: ["./next-bus.component.scss"]
})
export class NextBusComponent implements OnInit {
  constructor(private readingBusesApiService: ReadingBusesApiService) {}

  ngOnInit() {
    this.getNextBuses();
  }

  getNextBuses(): void {
    this.readingBusesApiService.getLiveJourneys("17").subscribe(response => {
      console.log(response);

      var filteredResponse = response.map(r => <IResponse> { visits:
        r.visits.filter(v => v.Location == "039025630002")
      });

      const reducer = (accumulator: IResponse, currentValue: IResponse) => {
        if (currentValue.visits.length > 0) {
          accumulator.visits = accumulator.visits.concat(currentValue.visits);
        }
        return accumulator;
      };

      var reducedResponse = filteredResponse.reduce(reducer);

      this.nextBus = reducedResponse.visits;
    });
  }

  displayedColumns: string[] = ['DepartureTime'];

  public nextBus: IVisit[];
}
