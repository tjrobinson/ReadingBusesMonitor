import { Component, OnInit } from "@angular/core";
import { NextBusService } from '../services/nextBus.service';
import { Observable, from } from 'rxjs';
import { map, filter, debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { getLocaleDateTimeFormat } from '@angular/common';

@Component({
  selector: "app-next-bus",
  templateUrl: "./next-bus.component.html",
  styleUrls: ["./next-bus.component.scss"]
})
export class NextBusComponent implements OnInit {

  constructor(private nextBusService: NextBusService) {}

  ngOnInit() {
    this.nextBuses$ = from(this.nextBusService.getNextBuses("17", "039025630002")).
    pipe(
      map((v: IVisit[]) => v.map(x => {
        x.DepartureTimeDate = new Date(x.DepartureTime);
        return x;
      })
      .filter(x => x.DepartureTimeDate > new Date())
      )
      );

  }

  displayedColumns: string[] = ['DepartureTimeDate'];

  nextBuses$: Observable<IVisit[]>;
}
