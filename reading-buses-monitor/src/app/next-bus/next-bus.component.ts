import { Component, OnInit } from '@angular/core';
import { ReadingBusesApiService } from '../services/reading-buses-api.service';

@Component({
  selector: 'app-next-bus',
  templateUrl: './next-bus.component.html',
  styleUrls: ['./next-bus.component.scss']
})
export class NextBusComponent implements OnInit {

  constructor(private readingBusesApiService: ReadingBusesApiService) { }

  ngOnInit() {
    this.getHeroes();
  }

  getHeroes(): void {
    this.readingBusesApiService.getLiveJourneys()
        .subscribe(nextBus => this.nextBus = nextBus);
  }

  public nextBus;

}
