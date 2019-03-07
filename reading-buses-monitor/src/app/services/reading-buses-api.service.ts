import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';

@Injectable({
    providedIn: 'root',
  })
export class ReadingBusesApiService {

  constructor(private http: HttpClient) { }

  getLiveJourneys(): Observable<string> {
    return this.http.get<string>(`https://readingbusesapiproxy.azurewebsites.net/liveJourneys?vehicle=&route=17`);
  }
}