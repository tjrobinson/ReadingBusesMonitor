import { Component, OnInit, Pipe, PipeTransform } from "@angular/core";
import { NextBusService } from "../services/nextBus.service";
import { Observable, from, pipe } from 'rxjs';
import { NextBus } from '../reading-buses-api/types/NextBus';

@Component({
  selector: "app-next-bus",
  templateUrl: "./next-bus.component.html",
  styleUrls: ["./next-bus.component.scss"]
})
export class NextBusComponent implements OnInit {
  constructor(private nextBusService: NextBusService) {}

  ngOnInit() {
    this.nextBuses$ = this.nextBusService.getNextBuses("17", "039025630002");
  }

  displayedColumns: string[] = ["DepartureTimeDate", "Overdue"];

  nextBuses$: Observable<NextBus[]>;
}
