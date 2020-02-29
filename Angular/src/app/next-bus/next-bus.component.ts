import { Component, OnInit } from "@angular/core";
import { Observable } from 'rxjs';
import { NextBus } from "../../types/NextBus";
import { NextBusService } from "../services/NextBusService";

@Component({
  selector: "app-next-bus",
  templateUrl: "./next-bus.component.html"
})
export class NextBusComponent implements OnInit {
  constructor(private nextBusService: NextBusService) {}

  ngOnInit() {
    this.nextBuses$ = this.nextBusService.getNextBuses("17", "039025630002");
  }

  displayedColumns: string[] = ["DepartureTimeDate", "Overdue"];

  nextBuses$: Observable<NextBus[]>;
}
